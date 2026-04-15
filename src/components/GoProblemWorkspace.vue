<template>
  <div class="flex flex-col gap-4">
    <!-- Problem statement -->
    <div class="rounded-lg bg-white p-5 shadow-sm border border-gray-200">
      <div class="flex items-start justify-between gap-3">
        <h2 class="text-lg font-semibold text-gray-800">{{ problem.title }}</h2>
        <span
          class="shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium"
          :class="difficultyBadge[problem.difficulty]"
        >
          {{ problem.difficulty }}
        </span>
      </div>
      <p class="mt-2 text-sm text-gray-600">{{ problem.prompt }}</p>
      <div class="mt-3 flex flex-wrap gap-1.5">
        <span
          v-for="tag in problem.tags"
          :key="tag"
          class="rounded bg-indigo-50 px-2 py-0.5 text-xs text-indigo-700"
          >{{ tag }}</span
        >
      </div>
    </div>

    <!-- Code editor -->
    <div class="flex flex-col gap-2">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <p class="text-sm font-semibold text-gray-700">Code</p>
          <!-- Execution mode toggle -->
          <label class="flex items-center gap-1.5 text-xs text-gray-500">
            <input
              type="checkbox"
              class="h-3.5 w-3.5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              v-model="usePlayground"
            />
            Run in Playground
          </label>
        </div>
        <div class="flex gap-2">
          <button
            type="button"
            class="rounded-md bg-indigo-600 px-4 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 disabled:opacity-50"
            :disabled="revealed || loading"
            @click="handleRun"
          >
            <span v-if="loading">Running…</span>
            <span v-else>▶ Run</span>
          </button>
          <button
            type="button"
            class="rounded-md border border-gray-300 bg-white px-4 py-1.5 text-sm text-gray-600 hover:bg-gray-50"
            @click="handleReset"
          >
            Reset
          </button>
          <button
            v-if="!revealed"
            type="button"
            class="rounded-md border border-amber-300 bg-amber-50 px-4 py-1.5 text-sm text-amber-700 hover:bg-amber-100"
            @click="handleReveal"
          >
            Reveal
          </button>
          <button
            v-else
            type="button"
            class="rounded-md border border-gray-300 bg-white px-4 py-1.5 text-sm text-gray-600 hover:bg-gray-50"
            @click="handleReset"
          >
            Try again
          </button>
        </div>
      </div>

      <div class="h-64">
        <CodeEditor
          :modelValue="code"
          :disabled="revealed"
          @update:modelValue="code = $event"
        />
      </div>
    </div>

    <!-- Output Console -->
    <div class="flex flex-col gap-1">
      <div class="flex items-center gap-3">
        <p class="text-sm font-semibold text-gray-700">Output</p>
        <span
          v-if="runResult && runResult.passed === true"
          class="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700"
          >✓ Correct</span
        >
        <span
          v-else-if="runResult && runResult.passed === false"
          class="rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-700"
          >✗ Incorrect</span
        >
        <span
          v-else-if="runResult && runResult.passed === null"
          class="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600"
          >Ran</span
        >
      </div>
      <OutputConsole :lines="output" :errorMessage="runResult?.errorMessage" />
    </div>

    <!-- Expected output hint -->
    <div
      v-if="problem.expectedOutput.length > 0"
      class="rounded-lg border border-gray-200 bg-gray-50 p-4"
    >
      <p
        class="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500"
      >
        Expected Output
      </p>
      <pre
        class="text-xs text-gray-700 leading-5"
      ><code>{{ problem.expectedOutput.join('\n') }}</code></pre>
    </div>

    <!-- Explanation panel (shown after Reveal) -->
    <div
      v-if="revealed"
      class="rounded-lg border border-amber-200 bg-amber-50 p-5"
    >
      <h3 class="mb-2 font-semibold text-amber-800">Explanation</h3>
      <p class="text-sm text-amber-900 leading-relaxed">
        {{ problem.explanation }}
      </p>

      <div class="mt-4">
        <p
          class="mb-1 text-xs font-semibold uppercase tracking-wide text-amber-700"
        >
          Solution
        </p>
        <pre
          class="overflow-x-auto rounded-lg bg-gray-900 p-4 text-xs text-green-300 leading-5"
        ><code>{{ problem.solutionCode }}</code></pre>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, type PropType } from "vue";
import type { GoProblem } from "@/types/go-explorer";
import { useGoRunner } from "@/composables/useGoRunner";
import CodeEditor from "@/components/CodeEditor.vue";
import OutputConsole from "@/components/OutputConsole.vue";

export default defineComponent({
  components: { CodeEditor, OutputConsole },
  props: {
    problem: { type: Object as PropType<GoProblem>, required: true },
  },
  setup(props) {
    const code = ref(props.problem.starterCode);
    const revealed = ref(false);
    const usePlayground = ref(false);

    let runner = useGoRunner(props.problem);
    const output = ref(runner.output.value);
    const runResult = ref(runner.result.value);
    const loading = ref(false);

    watch(
      () => props.problem,
      (newProblem) => {
        runner = useGoRunner(newProblem);
        code.value = newProblem.starterCode;
        revealed.value = false;
        output.value = [];
        runResult.value = null;
        loading.value = false;
      },
    );

    async function handleRun() {
      runner = useGoRunner(props.problem);

      if (usePlayground.value) {
        loading.value = true;
        await runner.runPlayground(code.value);
        loading.value = false;
      } else {
        runner.runLocal(code.value);
      }

      output.value = runner.output.value;
      runResult.value = runner.result.value;
    }

    async function handleReveal() {
      revealed.value = true;
      code.value = props.problem.solutionCode;
      runner = useGoRunner(props.problem);

      if (usePlayground.value) {
        loading.value = true;
        await runner.runPlayground(props.problem.solutionCode);
        loading.value = false;
      } else {
        runner.runLocal(props.problem.solutionCode);
      }

      output.value = runner.output.value;
      runResult.value = runner.result.value;
    }

    function handleReset() {
      code.value = props.problem.starterCode;
      revealed.value = false;
      output.value = [];
      runResult.value = null;
      loading.value = false;
    }

    const difficultyBadge: Record<string, string> = {
      beginner: "bg-green-100 text-green-700",
      intermediate: "bg-yellow-100 text-yellow-700",
      advanced: "bg-red-100 text-red-700",
    };

    return {
      code,
      revealed,
      usePlayground,
      output,
      runResult,
      loading,
      handleRun,
      handleReveal,
      handleReset,
      difficultyBadge,
    };
  },
});
</script>
