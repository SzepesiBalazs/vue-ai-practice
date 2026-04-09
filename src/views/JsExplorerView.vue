<template>
  <div class="mx-auto max-w-7xl space-y-6">
    <div>
      <h1 class="text-2xl font-bold text-gray-800">
        JavaScript Concept Explorer
      </h1>
      <p class="mt-1 text-sm text-gray-500">
        Work through interactive problems covering closures, prototypes,
        async/await, the event loop, and more.
      </p>
    </div>

    <!-- Legend -->
    <div class="flex gap-4 text-xs text-gray-500">
      <span class="flex items-center gap-1.5">
        <span class="inline-block h-2 w-2 rounded-full bg-green-400"></span>
        Beginner
      </span>
      <span class="flex items-center gap-1.5">
        <span class="inline-block h-2 w-2 rounded-full bg-yellow-400"></span>
        Intermediate
      </span>
      <span class="flex items-center gap-1.5">
        <span class="inline-block h-2 w-2 rounded-full bg-red-400"></span>
        Advanced
      </span>
    </div>

    <div class="flex gap-6">
      <!-- Sidebar -->
      <aside class="w-64 shrink-0">
        <div class="rounded-lg bg-white p-4 shadow-sm border border-gray-200">
          <ConceptSidebar
            :problems="problems"
            :activeProblemId="activeProblem.id"
            @select="activeProblem = $event"
          />
        </div>
      </aside>

      <!-- Workspace -->
      <main class="min-w-0 flex-1">
        <ProblemWorkspace :key="activeProblem.id" :problem="activeProblem" />
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { problems } from "@/data/js-problems";
import ConceptSidebar from "@/components/ConceptSidebar.vue";
import ProblemWorkspace from "@/components/ProblemWorkspace.vue";
import type { JsProblem } from "@/types/js-explorer";

export default {
  components: { ConceptSidebar, ProblemWorkspace },
  setup() {
    const activeProblem = ref<JsProblem>(problems[0]);
    return { problems, activeProblem };
  },
};
</script>
