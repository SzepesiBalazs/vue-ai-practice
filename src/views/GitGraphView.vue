<template>
  <div class="mx-auto max-w-6xl">
    <h1 class="mb-4 text-2xl font-bold text-gray-800">
      Git Workflow Simulator
    </h1>

    <!-- Scenario picker -->
    <div class="mb-4">
      <span class="mr-2 text-sm font-medium text-gray-600">Scenario:</span>
      <button
        v-for="scenario in scenarios"
        :key="scenario.name"
        class="mr-2 rounded-full px-4 py-1.5 text-sm font-medium transition"
        :class="
          currentScenario.name === scenario.name
            ? 'bg-indigo-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        "
        @click="loadScenario(scenario)"
      >
        {{ scenario.name }}
      </button>
    </div>

    <!-- Description + controls -->
    <div class="mb-4 flex items-center justify-between">
      <p class="text-sm text-gray-500">{{ currentScenario.description }}</p>
      <div class="flex gap-2">
        <button
          class="rounded bg-indigo-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-40"
          :disabled="isFinished"
          @click="nextStep"
        >
          ▶ Next Step
        </button>
        <button
          class="rounded bg-emerald-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-40"
          :disabled="isFinished"
          @click="playAll"
        >
          ⏭ Play All
        </button>
        <button
          class="rounded bg-gray-500 px-4 py-1.5 text-sm font-medium text-white hover:bg-gray-600"
          @click="loadScenario(currentScenario)"
        >
          ↺ Reset
        </button>
      </div>
    </div>

    <!-- Progress -->
    <p class="mb-4 text-sm text-gray-500">
      Step {{ currentStepIndex }} / {{ currentScenario.steps.length }}
      <span class="ml-3">HEAD →</span>
      <span class="ml-1 font-semibold text-indigo-600">{{ head || "—" }}</span>
      <span v-if="isFinished" class="ml-3 font-semibold text-emerald-600"
        >✓ Workflow complete</span
      >
    </p>

    <!-- Graph + sidebar (command log & detail) -->
    <div class="flex gap-6">
      <div class="overflow-auto rounded-lg border border-gray-200 bg-white p-4">
        <GitGraph
          :layout-nodes="layoutNodes"
          :layout-edges="layoutEdges"
          :branches="branches"
          :branch-color-map="branchColorMap"
          :graph-width="graphWidth"
          :graph-height="graphHeight"
          :node-radius="NODE_RADIUS"
          :selected-commit-id="selectedCommitId"
          @select-commit="selectCommit"
        />
      </div>

      <div class="flex w-80 shrink-0 flex-col gap-4">
        <CommandLog :log="commandLog" />
        <CommitDetailPanel :commit="selectedCommit" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { onBeforeMount } from "vue";
import { useGitGraph } from "@/composables/useGitGraph";
import { allScenarios } from "@/data/git-scenarios";
import GitGraph from "@/components/GitGraph.vue";
import CommandLog from "@/components/CommandLog.vue";
import CommitDetailPanel from "@/components/CommitDetailPanel.vue";

export default {
  components: { GitGraph, CommandLog, CommitDetailPanel },
  setup() {
    const {
      commits,
      branches,
      head,
      selectedCommitId,
      selectedCommit,
      commandLog,
      currentScenario,
      currentStepIndex,
      isFinished,
      layoutNodes,
      layoutEdges,
      graphWidth,
      graphHeight,
      NODE_RADIUS,
      branchColorMap,
      nextStep,
      playAll,
      loadScenario,
      selectCommit,
    } = useGitGraph();

    const scenarios = allScenarios;

    onBeforeMount(() => {
      loadScenario(allScenarios[0]);
    });

    return {
      commits,
      branches,
      head,
      selectedCommitId,
      selectedCommit,
      commandLog,
      currentScenario,
      currentStepIndex,
      isFinished,
      layoutNodes,
      layoutEdges,
      graphWidth,
      graphHeight,
      NODE_RADIUS,
      branchColorMap,
      scenarios,
      nextStep,
      playAll,
      loadScenario,
      selectCommit,
    };
  },
};
</script>
