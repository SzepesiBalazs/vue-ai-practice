<template>
  <svg
    class="h-full w-full cursor-default select-none"
    viewBox="0 0 900 680"
    @click.self="selectNode(null)"
  >
    <!-- Edges -->
    <g class="edges">
      <line
        v-for="edge in edges"
        :key="`${edge.source}->${edge.target}`"
        :x1="nodePos(edge.source)?.x"
        :y1="nodePos(edge.source)?.y"
        :x2="nodePos(edge.target)?.x"
        :y2="nodePos(edge.target)?.y"
        :class="edgeClass(edge.kind)"
        stroke-width="1.5"
      />
    </g>

    <!-- Nodes -->
    <g class="nodes">
      <g
        v-for="node in nodes"
        :key="node.id"
        :transform="`translate(${node.x}, ${node.y})`"
        class="cursor-pointer"
        @click.stop="selectNode(node.id)"
      >
        <circle
          :r="node.depth === 0 ? 42 : 30"
          :class="nodeClass(node)"
          :stroke="selectedId === node.id ? '#f59e0b' : 'transparent'"
          stroke-width="3"
        />
        <text
          font-size="11"
          font-weight="500"
          fill="white"
          text-anchor="middle"
          dominant-baseline="middle"
          class="pointer-events-none"
        >
          {{ node.name.length > 13 ? node.name.slice(0, 12) + "…" : node.name }}
        </text>
      </g>
    </g>
  </svg>
</template>

<script lang="ts">
import { computed, defineComponent, type PropType } from "vue";
import type { LayoutNode, DepEdge, DepKind } from "@/types/dependency-graph";

function nodeClass(node: LayoutNode): string {
  const base = "transition-colors";
  const colors: Record<DepKind | "root", string> = {
    root: "fill-slate-800",
    direct: "fill-indigo-500",
    transitive: "fill-sky-400",
    dev: "fill-emerald-500",
    peer: "fill-amber-500",
    optional: "fill-rose-400",
  };
  const kind = node.depth === 0 ? "root" : node.kind;
  return `${base} ${colors[kind] ?? colors.direct}`;
}

function edgeClass(kind: DepKind): string {
  const colors: Record<DepKind, string> = {
    direct: "stroke-indigo-300",
    transitive: "stroke-sky-200",
    dev: "stroke-emerald-300",
    peer: "stroke-amber-300",
    optional: "stroke-rose-300",
  };
  return `opacity-60 ${colors[kind] ?? colors.direct}`;
}

export default defineComponent({
  props: {
    nodes: { type: Array as PropType<LayoutNode[]>, required: true },
    edges: { type: Array as PropType<DepEdge[]>, required: true },
    selectedId: { type: String as PropType<string | null>, default: null },
  },
  emits: ["select"],
  setup(props, { emit }) {
    const posMap = computed(() => {
      const m = new Map<string, { x: number; y: number }>();
      for (const n of props.nodes) m.set(n.id, { x: n.x, y: n.y });
      return m;
    });

    function nodePos(id: string) {
      return posMap.value.get(id);
    }

    function selectNode(id: string | null) {
      emit("select", id);
    }

    return { nodePos, nodeClass, edgeClass, selectNode };
  },
});
</script>
