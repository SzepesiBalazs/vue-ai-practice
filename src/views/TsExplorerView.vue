<template>
  <div class="mx-auto max-w-7xl space-y-6">
    <div>
      <h1 class="text-2xl font-bold text-gray-800">
        TypeScript Concept Explorer
      </h1>
      <p class="mt-1 text-sm text-gray-500">
        Work through interactive problems covering generics, utility types,
        discriminated unions, mapped types, type guards, and more — or explore
        the Type Error Playground to learn real compiler diagnostics.
      </p>
    </div>

    <!-- Legend (concept mode only) -->
    <div v-if="mode === 'concept'" class="flex gap-4 text-xs text-gray-500">
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
          <TsConceptSidebar
            :problems="problems"
            :activeProblemId="activeProblem.id"
            :mode="mode"
            @select="activeProblem = $event"
            @update:mode="mode = $event"
          />
        </div>
      </aside>

      <!-- Main content area -->
      <main class="min-w-0 flex-1">
        <TsProblemWorkspace
          v-if="mode === 'concept'"
          :key="activeProblem.id"
          :problem="activeProblem"
        />
        <TypeErrorPlayground v-else />
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
import { problems } from "@/data/ts-problems";
import TsConceptSidebar from "@/components/TsConceptSidebar.vue";
import TsProblemWorkspace from "@/components/TsProblemWorkspace.vue";
import TypeErrorPlayground from "@/components/TypeErrorPlayground.vue";
import type { TsProblem } from "@/types/ts-explorer";

export default defineComponent({
  components: { TsConceptSidebar, TsProblemWorkspace, TypeErrorPlayground },
  setup() {
    const mode = ref<"concept" | "playground">("concept");
    const activeProblem = ref<TsProblem>(problems[0]);

    return { problems, mode, activeProblem };
  },
});
</script>
