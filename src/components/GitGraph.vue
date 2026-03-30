<script lang="ts">
import type { LayoutEdge, LayoutNode } from "@/composables/useGitGraph";
import type { Branch } from "@/types/git-graph";

// ✅ moved to outer scope (pure function)
function edgePath(edge: LayoutEdge): string {
  if (edge.fromX === edge.toX) {
    return `M ${edge.fromX} ${edge.fromY} L ${edge.toX} ${edge.toY}`;
  }
  const midY = (edge.fromY + edge.toY) / 2;
  return `M ${edge.fromX} ${edge.fromY} C ${edge.fromX} ${midY}, ${edge.toX} ${midY}, ${edge.toX} ${edge.toY}`;
}

export default {
  props: {
    layoutNodes: { type: Array as () => LayoutNode[], required: true },
    layoutEdges: { type: Array as () => LayoutEdge[], required: true },
    branches: { type: Array as () => readonly Branch[], required: true },
    branchColorMap: {
      type: Object as () => Record<string, string>,
      required: true,
    },
    graphWidth: { type: Number, required: true },
    graphHeight: { type: Number, required: true },
    nodeRadius: { type: Number, required: true },
    selectedCommitId: {
      type: [String, null] as unknown as () => string | null,
      default: null,
    },
  },
  emits: ["select-commit"],
  setup(props) {
    function branchHeadNode(branchName: string): LayoutNode | undefined {
      const branch = props.branches.find((b) => b.name === branchName);
      if (!branch) return undefined;
      return props.layoutNodes.find((n) => n.commit.id === branch.headCommitId);
    }

    // still expose edgePath to template
    return { edgePath, branchHeadNode };
  },
};
</script>
