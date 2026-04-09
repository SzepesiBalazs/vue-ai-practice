// ✅ moved to outer scope (pure function)
function edgePath(edge) {
    if (edge.fromX === edge.toX) {
        return `M ${edge.fromX} ${edge.fromY} L ${edge.toX} ${edge.toY}`;
    }
    const midY = (edge.fromY + edge.toY) / 2;
    return `M ${edge.fromX} ${edge.fromY} C ${edge.fromX} ${midY}, ${edge.toX} ${midY}, ${edge.toX} ${edge.toY}`;
}
export default (await import('vue')).defineComponent({
    props: {
        layoutNodes: { type: Array, required: true },
        layoutEdges: { type: Array, required: true },
        branches: { type: Array, required: true },
        branchColorMap: {
            type: Object,
            required: true,
        },
        graphWidth: { type: Number, required: true },
        graphHeight: { type: Number, required: true },
        nodeRadius: { type: Number, required: true },
        selectedCommitId: {
            type: [String, null],
            default: null,
        },
    },
    emits: ["select-commit"],
    setup(props) {
        function branchHeadNode(branchName) {
            const branch = props.branches.find((b) => b.name === branchName);
            if (!branch)
                return undefined;
            return props.layoutNodes.find((n) => n.commit.id === branch.headCommitId);
        }
        // still expose edgePath to template
        return { edgePath, branchHeadNode };
    },
});
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
let __VLS_self;
