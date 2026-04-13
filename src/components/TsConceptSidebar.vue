<template>
  <nav class="flex flex-col gap-3">
    <!-- Mode toggle -->
    <div
      class="flex rounded-lg border border-gray-200 overflow-hidden text-xs font-medium"
    >
      <button
        class="flex-1 py-2 transition-colors"
        :class="
          mode === 'concept'
            ? 'bg-indigo-600 text-white'
            : 'bg-white text-gray-600 hover:bg-indigo-50'
        "
        @click="$emit('update:mode', 'concept')"
      >
        Concept Problems
      </button>
      <button
        class="flex-1 py-2 transition-colors"
        :class="
          mode === 'playground'
            ? 'bg-indigo-600 text-white'
            : 'bg-white text-gray-600 hover:bg-indigo-50'
        "
        @click="$emit('update:mode', 'playground')"
      >
        Type Error Playground
      </button>
    </div>

    <!-- Problem list (concept mode only) -->
    <template v-if="mode === 'concept'">
      <div
        v-for="(groupProblems, category) in grouped"
        :key="category"
        class="mb-2"
      >
        <p
          class="mb-1 px-2 text-xs font-semibold uppercase tracking-wide text-gray-500"
        >
          {{ categoryLabels[category] }}
        </p>
        <button
          v-for="problem in groupProblems"
          :key="problem.id"
          class="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors"
          :class="
            activeProblemId === problem.id
              ? 'bg-indigo-600 text-white'
              : 'text-gray-700 hover:bg-indigo-50'
          "
          @click="$emit('select', problem)"
        >
          <span
            class="inline-block h-2 w-2 shrink-0 rounded-full"
            :class="difficultyColor[problem.difficulty]"
            :title="problem.difficulty"
          />
          {{ problem.title }}
        </button>
      </div>
    </template>
  </nav>
</template>

<script lang="ts">
import { defineComponent, computed, type PropType } from "vue";
import type { TsProblem, ConceptCategory } from "@/types/ts-explorer";
import { categoryLabels } from "@/data/ts-problems";

export default defineComponent({
  props: {
    problems: { type: Array as PropType<TsProblem[]>, required: true },
    activeProblemId: { type: String, default: null },
    mode: {
      type: String as PropType<"concept" | "playground">,
      required: true,
    },
  },
  emits: ["select", "update:mode"],
  setup(props) {
    const grouped = computed(() => {
      const groups: Partial<Record<ConceptCategory, TsProblem[]>> = {};
      for (const p of props.problems) {
        if (!groups[p.category]) groups[p.category] = [];
        groups[p.category]!.push(p);
      }
      return groups;
    });

    const difficultyColor: Record<string, string> = {
      beginner: "bg-green-400",
      intermediate: "bg-yellow-400",
      advanced: "bg-red-400",
    };

    return { grouped, categoryLabels, difficultyColor };
  },
});
</script>
