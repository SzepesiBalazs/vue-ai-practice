import { ref, readonly, computed } from "vue";
import type {
  Commit,
  Branch,
  WorkflowScenario,
  WorkflowStep,
} from "@/types/git-graph";
import { featureBranchWorkflow } from "@/data/git-scenarios";

const BRANCH_COLORS = [
  "#6366f1", // indigo
  "#10b981", // emerald
  "#f59e0b", // amber
  "#ef4444", // red
  "#8b5cf6", // violet
  "#06b6d4", // cyan
  "#ec4899", // pink
  "#84cc16", // lime
];

function generateId(): string {
  return crypto.randomUUID().slice(0, 7);
}

export interface LayoutNode {
  commit: Commit;
  x: number;
  y: number;
  color: string;
}

export interface LayoutEdge {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  color: string;
}

export function useGitGraph() {
  const commits = ref<Commit[]>([]);
  const branches = ref<Branch[]>([]);
  const head = ref<string>("main");
  const selectedCommitId = ref<string | null>(null);

  // --- Command log & step playback ---
  const commandLog = ref<string[]>([]);
  const currentScenario = ref<WorkflowScenario>(featureBranchWorkflow);
  const currentStepIndex = ref<number>(0);
  const isFinished = computed(
    () => currentStepIndex.value >= currentScenario.value.steps.length,
  );

  // --- Graph layout constants ---
  const NODE_RADIUS = 12;
  const ROW_HEIGHT = 60;
  const COL_WIDTH = 80;
  const PADDING = 40;

  // --- Computed: branch column assignments ---
  const branchColumns = computed<Record<string, number>>(() => {
    const cols: Record<string, number> = {};
    branches.value.forEach((b, i) => {
      cols[b.name] = i;
    });
    return cols;
  });

  // --- Computed: color map ---
  const branchColorMap = computed<Record<string, string>>(() => {
    const map: Record<string, string> = {};
    branches.value.forEach((b) => {
      map[b.name] = b.color;
    });
    return map;
  });

  // --- Computed: layout nodes ---
  const layoutNodes = computed<LayoutNode[]>(() => {
    return commits.value.map((commit, index) => {
      const col = branchColumns.value[commit.branchName] ?? 0;
      return {
        commit,
        x: PADDING + col * COL_WIDTH,
        y: PADDING + index * ROW_HEIGHT,
        color: branchColorMap.value[commit.branchName] ?? BRANCH_COLORS[0],
      };
    });
  });

  // --- Computed: layout edges ---
  const layoutEdges = computed<LayoutEdge[]>(() => {
    const commitIndexMap = new Map<string, number>();
    commits.value.forEach((c, i) => commitIndexMap.set(c.id, i));

    const edges: LayoutEdge[] = [];
    for (const node of layoutNodes.value) {
      for (const parentId of node.commit.parentIds) {
        const parentIdx = commitIndexMap.get(parentId);
        if (parentIdx === undefined) continue;
        const parentNode = layoutNodes.value[parentIdx];
        edges.push({
          fromX: node.x,
          fromY: node.y,
          toX: parentNode.x,
          toY: parentNode.y,
          color: node.color,
        });
      }
    }
    return edges;
  });

  // --- Computed: selected commit details ---
  const selectedCommit = computed<Commit | null>(() => {
    if (!selectedCommitId.value) return null;
    return commits.value.find((c) => c.id === selectedCommitId.value) ?? null;
  });

  // --- Computed: SVG canvas dimensions ---
  const graphWidth = computed(() => {
    const maxCol = Math.max(branches.value.length - 1, 0);
    return PADDING * 2 + maxCol * COL_WIDTH + NODE_RADIUS * 2;
  });

  const graphHeight = computed(() => {
    return (
      PADDING * 2 +
      Math.max(commits.value.length - 1, 0) * ROW_HEIGHT +
      NODE_RADIUS * 2
    );
  });

  // --- Internal actions (driven by executeStep) ---

  function doInit() {
    commits.value = [];
    branches.value = [
      { name: "main", color: BRANCH_COLORS[0], headCommitId: "" },
    ];
    head.value = "main";
    selectedCommitId.value = null;
  }

  function doCommit(message: string) {
    const currentBranch = branches.value.find((b) => b.name === head.value);
    if (!currentBranch) return;

    const newId = generateId();
    const parentIds = currentBranch.headCommitId
      ? [currentBranch.headCommitId]
      : [];
    commits.value.push({
      id: newId,
      message,
      branchName: head.value,
      parentIds,
      timestamp: Date.now(),
    });
    currentBranch.headCommitId = newId;
  }

  function doBranch(name: string) {
    const exists = branches.value.find((b) => b.name === name);
    if (exists) return;

    const currentBranch = branches.value.find((b) => b.name === head.value);
    if (!currentBranch) return;

    const colorIndex = branches.value.length % BRANCH_COLORS.length;
    branches.value.push({
      name,
      color: BRANCH_COLORS[colorIndex],
      headCommitId: currentBranch.headCommitId,
    });
    head.value = name;
  }

  function doCheckout(branchName: string) {
    const branch = branches.value.find((b) => b.name === branchName);
    if (!branch) return;
    head.value = branchName;
  }

  function doMerge(sourceBranchName: string) {
    const currentBranch = branches.value.find((b) => b.name === head.value);
    const sourceBranch = branches.value.find(
      (b) => b.name === sourceBranchName,
    );
    if (!currentBranch || !sourceBranch) return;
    if (currentBranch.name === sourceBranch.name) return;

    const newId = generateId();
    commits.value.push({
      id: newId,
      message: `Merge '${sourceBranchName}' into '${head.value}'`,
      branchName: head.value,
      parentIds: [currentBranch.headCommitId, sourceBranch.headCommitId],
      timestamp: Date.now(),
    });
    currentBranch.headCommitId = newId;
  }

  // --- Execute a single workflow step ---
  function executeStep(step: WorkflowStep) {
    commandLog.value.push("$ " + step.command);

    switch (step.action) {
      case "init":
        doInit();
        break;
      case "commit":
        doCommit(step.args.message ?? "untitled commit");
        break;
      case "branch":
        if (step.args.branchName) doBranch(step.args.branchName);
        break;
      case "checkout":
        if (step.args.branchName) doCheckout(step.args.branchName);
        break;
      case "merge":
        if (step.args.sourceBranch) doMerge(step.args.sourceBranch);
        break;
    }
  }

  // --- Step forward one step ---
  function nextStep() {
    if (isFinished.value) return;
    executeStep(currentScenario.value.steps[currentStepIndex.value]);
    currentStepIndex.value++;
  }

  // --- Play all remaining steps ---
  function playAll() {
    while (!isFinished.value) {
      nextStep();
    }
  }

  // --- Load a scenario and reset ---
  function loadScenario(scenario: WorkflowScenario) {
    currentScenario.value = scenario;
    currentStepIndex.value = 0;
    commits.value = [];
    branches.value = [];
    head.value = "main";
    commandLog.value = [];
    selectedCommitId.value = null;
  }

  // --- Select a commit for detail view ---
  function selectCommit(commitId: string | null) {
    selectedCommitId.value = commitId;
  }

  return {
    commits: readonly(commits),
    branches: readonly(branches),
    head: readonly(head),
    selectedCommitId: readonly(selectedCommitId),
    selectedCommit,
    commandLog: readonly(commandLog),
    currentScenario: readonly(currentScenario),
    currentStepIndex: readonly(currentStepIndex),
    isFinished,
    layoutNodes,
    layoutEdges,
    graphWidth,
    graphHeight,
    NODE_RADIUS,
    branchColorMap,
    nextStep,
    playAll,
    loadScenario,
    selectCommit,
  };
}
