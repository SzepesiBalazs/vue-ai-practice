<template>
  <nav class="flex flex-col gap-1">
    <div
      v-for="(groupProblems, category) in grouped"
      :key="category"
      class="mb-3"
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
  </nav>
</template>

<script lang="ts">
import { defineComponent, computed, type PropType } from "vue";
import type { GoProblem, GoCategory } from "@/types/go-explorer";
import { categoryLabels } from "@/data/go-problems";

export default defineComponent({
  props: {
    problems: { type: Array as PropType<GoProblem[]>, required: true },
    activeProblemId: { type: String, default: null },
  },
  emits: ["select"],
  setup(props) {
    const grouped = computed(() => {
      const groups: Partial<Record<GoCategory, GoProblem[]>> = {};
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
