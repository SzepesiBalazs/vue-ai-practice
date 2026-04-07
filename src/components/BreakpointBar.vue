<template>
  <div class="flex items-center gap-2">
    <span class="text-xs font-medium text-gray-500">Preview width:</span>
    <button
      v-for="bp in breakpoints"
      :key="bp.name"
      class="rounded-md px-3 py-1 text-xs font-medium transition-colors"
      :class="
        activeName === bp.name
          ? 'bg-indigo-600 text-white'
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      "
      @click="$emit('select', bp)"
    >
      {{ bp.label }}
      <span v-if="bp.width > 0" class="ml-1 text-[10px] opacity-70"
        >{{ bp.width }}px</span
      >
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import type { BreakpointOption } from "@/types/css-playground";

export default defineComponent({
  props: {
    breakpoints: {
      type: Array as PropType<BreakpointOption[]>,
      required: true,
    },
    activeName: { type: String, required: true },
  },
  emits: ["select"],
  setup() {
    return {};
  },
});
</script>
