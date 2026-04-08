<template>
  <div
    class="group relative rounded border-2 transition-colors"
    :class="[
      isSelected
        ? 'border-indigo-500 bg-indigo-50'
        : 'border-gray-200 bg-white hover:border-indigo-300',
    ]"
    @click.stop="$emit('select', node.id)"
  >
    <!-- Node header bar -->
    <div class="flex items-center gap-2 px-2 py-1 text-xs font-mono">
      <span class="text-indigo-600 font-semibold">&lt;{{ node.tag }}&gt;</span>
      <span v-if="node.attributes['id']" class="text-orange-500"
        >#{{ node.attributes["id"] }}</span
      >
      <span v-if="node.attributes['class']" class="text-green-600">
        .{{ node.attributes["class"].split(" ").join(" .") }}
      </span>
      <span
        v-if="node.attributes['aria-label']"
        class="ml-auto text-blue-500 text-xs"
      >
        aria-label
      </span>
      <!-- Up / Down / Remove controls -->
      <div class="ml-auto hidden group-hover:flex items-center gap-1">
        <button
          type="button"
          class="text-gray-400 hover:text-gray-700"
          title="Move up"
          @click.stop="$emit('move', node.id, 'up')"
        >
          ↑
        </button>
        <button
          type="button"
          class="text-gray-400 hover:text-gray-700"
          title="Move down"
          @click.stop="$emit('move', node.id, 'down')"
        >
          ↓
        </button>
        <button
          type="button"
          class="text-red-400 hover:text-red-600"
          title="Remove element"
          @click.stop="$emit('remove', node.id)"
        >
          ✕
        </button>
      </div>
    </div>

    <!-- Text content preview -->
    <p v-if="node.textContent" class="px-3 pb-1 text-xs text-gray-500 italic">
      {{ node.textContent }}
    </p>

    <!-- Children + drop zone -->
    <div
      v-if="def?.allowChildren"
      class="mx-2 mb-2 min-h-[40px] rounded border border-dashed border-gray-300 p-2"
      :class="{ 'border-indigo-400 bg-indigo-50': isDragOver }"
      @dragover.prevent="isDragOver = true"
      @dragleave="isDragOver = false"
      @drop.stop="onDrop"
    >
      <CanvasNode
        v-for="child in node.children"
        :key="child.id"
        :node="child"
        :selectedNodeId="selectedNodeId"
        :draggedTag="draggedTag"
        @select="$emit('select', $event)"
        @remove="$emit('remove', $event)"
        @move="(id: string, dir: 'up' | 'down') => $emit('move', id, dir)"
        @drop-into="$emit('drop-into', $event)"
      />
      <p
        v-if="!node.children.length"
        class="text-center text-xs text-gray-400 py-2"
      >
        Drop inside &lt;{{ node.tag }}&gt;
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  ref,
  type DeepReadonly,
  type PropType,
} from "vue";
import type { HtmlNode } from "@/types/html-builder";
import { elementDefinitions } from "@/data/html-elements";

export default defineComponent({
  name: "CanvasNode",
  props: {
    node: { type: Object as PropType<DeepReadonly<HtmlNode>>, required: true },
    selectedNodeId: { type: String as PropType<string | null>, default: null },
    draggedTag: { type: String as PropType<string | null>, default: null },
  },
  emits: ["select", "remove", "move", "drop-into"],
  setup(props, { emit }) {
    const isDragOver = ref(false);

    const isSelected = computed(() => props.node.id === props.selectedNodeId);
    const def = computed(() =>
      elementDefinitions.find((d) => d.tag === props.node.tag),
    );

    function onDrop() {
      isDragOver.value = false;
      if (props.draggedTag) {
        emit("drop-into", { tag: props.draggedTag, parentId: props.node.id });
      }
    }

    return { isSelected, def, isDragOver, onDrop };
  },
});
</script>
