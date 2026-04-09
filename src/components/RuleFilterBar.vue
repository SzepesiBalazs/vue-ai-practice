<template>
  <div class="flex flex-wrap items-center gap-2" data-a11y-ignore>
    <button
      v-for="(option, idx) in filterOptions"
      :key="option.value"
      type="button"
      class="rounded-full px-3 py-1 text-xs font-medium transition-colors"
      :class="[
        activeFilter === option.value
          ? 'bg-indigo-600 text-white shadow-sm'
          : 'border border-gray-300 bg-white text-gray-600 hover:border-indigo-400 hover:text-indigo-600',
        idx === separatorIndex ? 'ml-2' : '',
      ]"
      @click="$emit('filter', option.value)"
    >
      {{ option.label }}
      <span
        v-if="option.count !== undefined && option.count > 0"
        class="ml-1 opacity-70"
        >({{ option.count }})</span
      >
    </button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, type PropType } from "vue";
import type { FilterMode } from "@/composables/useA11yChecker";

export interface FilterOption {
  value: FilterMode;
  label: string;
  count?: number;
}

const SEVERITY_VALUES = new Set(["all", "error", "warning", "notice"]);

export default defineComponent({
  props: {
    activeFilter: { type: String as PropType<FilterMode>, required: true },
    filterOptions: {
      type: Array as PropType<ReadonlyArray<FilterOption>>,
      required: true,
    },
  },
  emits: ["filter"],
  setup(props) {
    const separatorIndex = computed(() =>
      props.filterOptions.findIndex((o) => !SEVERITY_VALUES.has(o.value)),
    );
    return { separatorIndex };
  },
});
</script>
