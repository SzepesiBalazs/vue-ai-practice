<template>
  <div class="flex flex-col gap-5">
    <!-- Challenge header -->
    <div class="rounded-lg bg-white p-5 shadow-sm border border-gray-200">
      <div class="flex items-center gap-3 mb-2">
        <h3 class="font-semibold text-gray-800">{{ scenario.title }}</h3>
        <span
          class="rounded bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700"
          >TS{{ scenario.errorCode }}</span
        >
      </div>
      <p class="text-sm text-gray-600">{{ scenario.prompt }}</p>
    </div>

    <!-- Editable code editor -->
    <div class="flex flex-col gap-2">
      <div class="flex items-center justify-between">
        <p class="text-sm font-semibold text-gray-700">Code</p>
        <div class="flex gap-2">
          <button
            type="button"
            class="rounded-md bg-indigo-600 px-4 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 disabled:opacity-50"
            :disabled="checking"
            @click="checkFix"
          >
            {{ checking ? "Checking\u2026" : "\u25b6 Check Fix" }}
          </button>
          <button
            type="button"
            class="rounded-md border border-gray-300 bg-white px-4 py-1.5 text-sm text-gray-600 hover:bg-gray-50"
            :disabled="checking"
            @click="reset"
          >
            Reset
          </button>
          <button
            type="button"
            class="rounded-md border border-amber-300 bg-amber-50 px-4 py-1.5 text-sm text-amber-700 hover:bg-amber-100"
            @click="revealed = !revealed"
          >
            {{ revealed ? "Hide solution" : "Reveal" }}
          </button>
        </div>
      </div>

      <div class="h-52">
        <CodeEditor
          :modelValue="userCode"
          :disabled="checking"
          @update:modelValue="userCode = $event"
        />
      </div>
    </div>

    <!-- Pass / fail badge -->
    <div v-if="passed !== null" class="flex items-center gap-2">
      <span
        v-if="passed"
        class="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700"
        >\u2713 All type errors fixed!</span
      >
      <span
        v-else
        class="rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-700"
        >\u2717 {{ liveDiagnostics.length }} error{{
          liveDiagnostics.length !== 1 ? "s" : ""
        }}
        remaining</span
      >
    </div>

    <!-- Live diagnostics -->
    <div class="rounded-lg bg-white p-5 shadow-sm border border-gray-200">
      <p
        class="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500"
      >
        TypeScript Diagnostics
      </p>
      <p
        v-if="liveDiagnostics.length === 0"
        class="text-sm text-green-600 italic"
      >
        No type errors \u2014 looks good!
      </p>
      <ul v-else class="flex flex-col gap-3" aria-label="Compiler errors">
        <li
          v-for="(diag, i) in liveDiagnostics"
          :key="i"
          class="rounded-md border border-red-200 bg-red-50 p-3 text-sm"
        >
          <div class="flex items-center gap-2 mb-1">
            <span v-if="diag.code" class="font-mono font-bold text-red-700"
              >error TS{{ diag.code }}</span
            >
            <span v-if="diag.line" class="text-gray-500 text-xs"
              >Line {{ diag.line }}</span
            >
          </div>
          <span class="text-red-800">{{ diag.message }}</span>
        </li>
      </ul>
    </div>

    <!-- Solution revealed on demand -->
    <div
      v-if="revealed"
      class="rounded-lg border border-amber-200 bg-amber-50 p-5"
    >
      <h3 class="mb-2 font-semibold text-amber-800">Fix</h3>
      <pre
        class="overflow-x-auto rounded-lg bg-gray-900 p-4 text-xs text-green-300 leading-5 mb-4"
      ><code>{{ scenario.fixedCode }}</code></pre>
      <p class="text-sm text-amber-900 leading-relaxed">
        {{ scenario.lesson }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import type { ErrorScenario } from "@/types/ts-explorer";
import { useErrorChecker } from "@/composables/useErrorChecker";
import CodeEditor from "@/components/CodeEditor.vue";

export default defineComponent({
  components: { CodeEditor },
  props: {
    scenario: { type: Object as PropType<ErrorScenario>, required: true },
  },
  setup(props) {
    const {
      userCode,
      liveDiagnostics,
      checking,
      passed,
      revealed,
      checkFix,
      reset,
    } = useErrorChecker(props.scenario);

    return {
      userCode,
      liveDiagnostics,
      checking,
      passed,
      revealed,
      checkFix,
      reset,
    };
  },
});
</script>
