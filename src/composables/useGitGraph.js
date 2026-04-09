import { ref, readonly, computed } from "vue";
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
function generateId() {
    return crypto.randomUUID().slice(0, 7);
}
export function useGitGraph() {
    const commits = ref([]);
    const branches = ref([]);
    const head = ref("main");
    const selectedCommitId = ref(null);
    // --- Command log & step playback ---
    const commandLog = ref([]);
    const currentScenario = ref(featureBranchWorkflow);
    const currentStepIndex = ref(0);
    const isFinished = computed(() => currentStepIndex.value >= currentScenario.value.steps.length);
    // --- Graph layout constants ---
    const NODE_RADIUS = 12;
    const ROW_HEIGHT = 60;
    const COL_WIDTH = 80;
    const PADDING = 40;
    // --- Computed: branch column assignments ---
    const branchColumns = computed(() => {
        const cols = {};
        branches.value.forEach((b, i) => {
            cols[b.name] = i;
        });
        return cols;
    });
    // --- Computed: color map ---
    const branchColorMap = computed(() => {
        const map = {};
        branches.value.forEach((b) => {
            map[b.name] = b.color;
        });
        return map;
    });
    // --- Computed: layout nodes ---
    const layoutNodes = computed(() => {
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
    const layoutEdges = computed(() => {
        const commitIndexMap = new Map();
        commits.value.forEach((c, i) => commitIndexMap.set(c.id, i));
        const edges = [];
        for (const node of layoutNodes.value) {
            for (const parentId of node.commit.parentIds) {
                const parentIdx = commitIndexMap.get(parentId);
                if (parentIdx === undefined)
                    continue;
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
    const selectedCommit = computed(() => {
        if (!selectedCommitId.value)
            return null;
        return commits.value.find((c) => c.id === selectedCommitId.value) ?? null;
    });
    // --- Computed: SVG canvas dimensions ---
    const graphWidth = computed(() => {
        const maxCol = Math.max(branches.value.length - 1, 0);
        return PADDING * 2 + maxCol * COL_WIDTH + NODE_RADIUS * 2;
    });
    const graphHeight = computed(() => {
        return (PADDING * 2 +
            Math.max(commits.value.length - 1, 0) * ROW_HEIGHT +
            NODE_RADIUS * 2);
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
    function doCommit(message) {
        const currentBranch = branches.value.find((b) => b.name === head.value);
        if (!currentBranch)
            return;
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
    function doBranch(name) {
        const exists = branches.value.find((b) => b.name === name);
        if (exists)
            return;
        const currentBranch = branches.value.find((b) => b.name === head.value);
        if (!currentBranch)
            return;
        const colorIndex = branches.value.length % BRANCH_COLORS.length;
        branches.value.push({
            name,
            color: BRANCH_COLORS[colorIndex],
            headCommitId: currentBranch.headCommitId,
        });
        head.value = name;
    }
    function doCheckout(branchName) {
        const branch = branches.value.find((b) => b.name === branchName);
        if (!branch)
            return;
        head.value = branchName;
    }
    function doMerge(sourceBranchName) {
        const currentBranch = branches.value.find((b) => b.name === head.value);
        const sourceBranch = branches.value.find((b) => b.name === sourceBranchName);
        if (!currentBranch || !sourceBranch)
            return;
        if (currentBranch.name === sourceBranch.name)
            return;
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
    function executeStep(step) {
        commandLog.value.push("$ " + step.command);
        switch (step.action) {
            case "init":
                doInit();
                break;
            case "commit":
                doCommit(step.args.message ?? "untitled commit");
                break;
            case "branch":
                if (step.args.branchName)
                    doBranch(step.args.branchName);
                break;
            case "checkout":
                if (step.args.branchName)
                    doCheckout(step.args.branchName);
                break;
            case "merge":
                if (step.args.sourceBranch)
                    doMerge(step.args.sourceBranch);
                break;
        }
    }
    // --- Step forward one step ---
    function nextStep() {
        if (isFinished.value)
            return;
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
    function loadScenario(scenario) {
        currentScenario.value = scenario;
        currentStepIndex.value = 0;
        commits.value = [];
        branches.value = [];
        head.value = "main";
        commandLog.value = [];
        selectedCommitId.value = null;
    }
    // --- Select a commit for detail view ---
    function selectCommit(commitId) {
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
