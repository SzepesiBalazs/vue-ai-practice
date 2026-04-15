import { ref, computed, readonly, watch } from "vue";
import type {
  GraphData,
  PackageNode,
  LayoutNode,
  PackageManager,
} from "@/types/dependency-graph";
import { sampleGraph, getSampleGraph } from "@/data/buildSampleGraph";

function npmUrl(name: string): string {
  // Allowlist: only valid npm package name characters to prevent open-redirect
  const safeName = name.replaceAll(/[^a-zA-Z0-9@/._-]/g, "");
  return `https://www.npmjs.com/package/${safeName}`;
}

export function useDependencyGraph() {
  const graph = ref<GraphData>(sampleGraph);
  const selectedNodeId = ref<string | null>(null);
  const packageManager = ref<PackageManager>("npm");
  const showDevDeps = ref(true);
  const maxDepth = ref(3);
  const searchQuery = ref("");

  // ── Filtered nodes ─────────────────────────────────────────────────────
  const filteredNodes = computed<PackageNode[]>(() =>
    graph.value.nodes.filter((n) => {
      if (!showDevDeps.value && n.kind === "dev") return false;
      if (n.depth > maxDepth.value) return false;
      if (searchQuery.value) {
        return n.name.toLowerCase().includes(searchQuery.value.toLowerCase());
      }
      return true;
    }),
  );

  const filteredNodeIds = computed(
    () => new Set(filteredNodes.value.map((n) => n.id)),
  );

  const filteredEdges = computed(() =>
    graph.value.edges.filter(
      (e) =>
        filteredNodeIds.value.has(e.source) &&
        filteredNodeIds.value.has(e.target),
    ),
  );

  // ── Layout: radial tiers ───────────────────────────────────────────────
  const layoutNodes = computed<LayoutNode[]>(() => {
    const tiers: Map<number, PackageNode[]> = new Map();
    for (const node of filteredNodes.value) {
      const tier = tiers.get(node.depth) ?? [];
      tier.push(node);
      tiers.set(node.depth, tier);
    }

    const centerX = 450;
    const centerY = 340;
    const radiusStep = 165;
    const result: LayoutNode[] = [];

    for (const [depth, nodes] of tiers) {
      const radius = depth * radiusStep;
      nodes.forEach((node, i) => {
        const angle = (2 * Math.PI * i) / nodes.length - Math.PI / 2;
        result.push({
          ...node,
          x: depth === 0 ? centerX : centerX + radius * Math.cos(angle),
          y: depth === 0 ? centerY : centerY + radius * Math.sin(angle),
          vx: 0,
          vy: 0,
        });
      });
    }
    return result;
  });

  // ── Selection ──────────────────────────────────────────────────────────
  const selectedNode = computed<PackageNode | null>(() =>
    selectedNodeId.value
      ? (graph.value.nodes.find((n) => n.id === selectedNodeId.value) ?? null)
      : null,
  );

  function selectNode(id: string | null) {
    selectedNodeId.value = id;
  }

  function loadGraph(data: GraphData) {
    graph.value = data;
    selectedNodeId.value = null;
  }

  watch(packageManager, (pm) => {
    loadGraph(getSampleGraph(pm));
  });

  return {
    graph: readonly(graph),
    filteredNodes,
    filteredEdges,
    layoutNodes,
    selectedNode,
    selectedNodeId: readonly(selectedNodeId),
    packageManager,
    showDevDeps,
    maxDepth,
    searchQuery,
    selectNode,
    loadGraph,
    npmUrl,
  };
}
