<template>
  <div class="flex flex-col gap-2">
    <div v-for="(group, code) in grouped" :key="code" class="mb-2">
      <p
        class="mb-1 px-2 text-xs font-semibold uppercase tracking-wide text-gray-500"
      >
        TS{{ code }}
      </p>
      <button
        v-for="scenario in group"
        :key="scenario.id"
        class="flex w-full items-start gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors"
        :class="
          activeId === scenario.id
            ? 'bg-indigo-600 text-white'
            : 'text-gray-700 hover:bg-indigo-50'
        "
        @click="$emit('select', scenario.id)"
      >
        {{ scenario.title }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, type PropType } from "vue";
import type { ErrorScenario } from "@/types/ts-explorer";

export default defineComponent({
  props: {
    scenarios: {
      type: Array as PropType<ErrorScenario[]>,
      required: true,
    },
    activeId: { type: String, default: null },
  },
  emits: ["select"],
  setup(props) {
    const grouped = computed(() => {
      const groups: Record<number, ErrorScenario[]> = {};
      for (const s of props.scenarios) {
        if (!groups[s.errorCode]) groups[s.errorCode] = [];
        groups[s.errorCode].push(s);
      }
      return groups;
    });

    return { grouped };
  },
});
</script>
