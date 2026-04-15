<template>
  <div class="mx-auto max-w-7xl space-y-6">
    <div>
      <h1 class="text-2xl font-bold text-gray-800">Go Concept Explorer</h1>
      <p class="mt-1 text-sm text-gray-500">
        Work through interactive problems covering goroutines, channels,
        interfaces, pointers, error handling, slices, maps, defer, generics, and
        more.
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
          <GoConceptSidebar
            :problems="problems"
            :activeProblemId="activeProblem.id"
            @select="activeProblem = $event"
          />
        </div>
      </aside>

      <!-- Workspace -->
      <main class="min-w-0 flex-1">
        <GoProblemWorkspace :key="activeProblem.id" :problem="activeProblem" />
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { problems } from "@/data/go-problems";
import GoConceptSidebar from "@/components/GoConceptSidebar.vue";
import GoProblemWorkspace from "@/components/GoProblemWorkspace.vue";
import type { GoProblem } from "@/types/go-explorer";

export default {
  components: { GoConceptSidebar, GoProblemWorkspace },
  setup() {
    const activeProblem = ref<GoProblem>(problems[0]);
    return { problems, activeProblem };
  },
};
</script>
