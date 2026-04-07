<template>
  <div class="flex flex-wrap items-center gap-2">
    <span class="text-sm font-medium text-gray-600">Presets:</span>
    <button
      v-for="preset in presets"
      :key="preset.name"
      class="rounded-lg px-4 py-2 text-sm font-medium transition-colors"
      :class="
        activeName === preset.name
          ? 'bg-indigo-600 text-white shadow-md'
          : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
      "
      @click="$emit('select', preset)"
    >
      {{ preset.name }}
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import type { CssPreset } from "@/types/css-playground";

export default defineComponent({
  props: {
    presets: { type: Array as PropType<CssPreset[]>, required: true },
    activeName: { type: String, required: true },
  },
  emits: ["select"],
  setup() {
    return {};
  },
});
</script>
