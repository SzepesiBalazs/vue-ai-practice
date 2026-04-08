<template>
  <aside class="flex flex-col gap-4 overflow-y-auto">
    <div v-for="(elements, category) in elementsByCategory" :key="category">
      <h3
        class="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400"
      >
        {{ category }}
      </h3>
      <div class="flex flex-col gap-1">
        <div
          v-for="el in elements"
          :key="el.tag"
          draggable="true"
          :title="el.a11yHint"
          class="flex cursor-grab items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm font-mono text-gray-700 shadow-sm select-none hover:border-indigo-400 hover:bg-indigo-50 active:cursor-grabbing"
          @dragstart="onDragStart(el.tag)"
          @dragend="$emit('drag-end')"
        >
          <span class="text-indigo-500">&lt;{{ el.tag }}&gt;</span>
          <span class="text-xs text-gray-500">{{ el.label }}</span>
        </div>
      </div>
    </div>
  </aside>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { elementsByCategory } from "@/data/html-elements";

export default defineComponent({
  emits: ["drag-start", "drag-end"],
  setup(_, { emit }) {
    function onDragStart(tag: string) {
      emit("drag-start", tag);
    }
    return { elementsByCategory, onDragStart };
  },
});
</script>
