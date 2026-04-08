<template>
  <div
    class="relative min-h-[400px] rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-4 transition-colors"
    :class="{ 'border-indigo-400 bg-indigo-50': isDragOver && !nodes.length }"
    @dragover.prevent="isDragOver = true"
    @dragleave="isDragOver = false"
    @drop="onRootDrop"
  >
    <div
      v-if="!nodes.length"
      class="flex h-full min-h-[360px] items-center justify-center"
    >
      <p class="text-sm text-gray-400">
        Drag elements from the palette to start building
      </p>
    </div>

    <div v-else class="flex flex-col gap-2">
      <CanvasNode
        v-for="node in nodes"
        :key="node.id"
        :node="node"
        :selectedNodeId="selectedNodeId"
        :draggedTag="draggedTag"
        @select="$emit('select', $event)"
        @remove="$emit('remove', $event)"
        @move="(id: string, dir: 'up' | 'down') => $emit('move', id, dir)"
        @drop-into="$emit('drop-into', $event)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, type DeepReadonly, type PropType } from "vue";
import type { HtmlNode } from "@/types/html-builder";
import CanvasNode from "./CanvasNode.vue";

export default defineComponent({
  components: { CanvasNode },
  props: {
    nodes: {
      type: Array as PropType<ReadonlyArray<DeepReadonly<HtmlNode>>>,
      required: true,
    },
    selectedNodeId: { type: String as PropType<string | null>, default: null },
    draggedTag: { type: String as PropType<string | null>, default: null },
  },
  emits: ["select", "remove", "move", "drop-into", "root-drop"],
  setup(_, { emit }) {
    const isDragOver = ref(false);

    function onRootDrop() {
      isDragOver.value = false;
      emit("root-drop");
    }

    return { isDragOver, onRootDrop };
  },
});
</script>
