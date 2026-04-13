<template>
  <div class="flex flex-col gap-5">
    <!-- Broken code with CSS squiggly underlines on errored lines -->
    <div class="rounded-lg bg-white p-5 shadow-sm border border-gray-200">
      <div class="flex items-center gap-3 mb-3">
        <h3 class="font-semibold text-gray-800">{{ scenario.title }}</h3>
        <span
          class="rounded bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700"
          >TS{{ scenario.errorCode }}</span
        >
      </div>

      <p
        class="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500"
      >
        Broken Code
      </p>
      <pre
        class="overflow-x-auto rounded-lg bg-gray-900 p-4 text-xs leading-6"
      ><code
        v-for="(line, i) in scenario.brokenCode.split('\n')"
        :key="i"
        :class="[
          'block',
          scenario.diagnostics.some((d) => d.line === i + 1)
            ? 'ts-line-error'
            : 'text-green-300',
        ]"
      >{{ line }}</code></pre>
    </div>

    <!-- Diagnostic messages as the compiler would format them -->
    <div class="rounded-lg bg-white p-5 shadow-sm border border-gray-200">
      <p
        class="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500"
      >
        TypeScript Diagnostics
      </p>
      <ul class="flex flex-col gap-3" aria-label="Compiler errors">
        <li
          v-for="diag in scenario.diagnostics"
          :key="diag.code + '-' + diag.line"
          class="rounded-md border border-red-200 bg-red-50 p-3 text-sm"
        >
          <div class="flex items-center gap-2 mb-1">
            <span class="font-mono font-bold text-red-700"
              >error TS{{ diag.code }}</span
            >
            <span class="text-gray-500 text-xs">Line {{ diag.line }}</span>
          </div>
          <span class="text-red-800">{{ diag.message }}</span>
        </li>
      </ul>
    </div>

    <!-- Fix guide, revealed on demand -->
    <div class="rounded-lg bg-white p-5 shadow-sm border border-gray-200">
      <div class="flex items-center justify-between mb-3">
        <p class="text-xs font-semibold uppercase tracking-wide text-gray-500">
          Fix Guide
        </p>
        <button
          class="rounded-md border border-amber-300 bg-amber-50 px-4 py-1.5 text-sm text-amber-700 hover:bg-amber-100 transition-colors"
          @click="showFix = !showFix"
        >
          {{ showFix ? "Hide fix" : "Show fix" }}
        </button>
      </div>

      <template v-if="showFix">
        <pre
          class="overflow-x-auto rounded-lg bg-gray-900 p-4 text-xs text-green-300 leading-5 mb-4"
        ><code>{{ scenario.fixedCode }}</code></pre>
        <div
          class="rounded-md border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 leading-relaxed"
        >
          {{ scenario.lesson }}
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, type PropType } from "vue";
import type { ErrorScenario } from "@/types/ts-explorer";

export default defineComponent({
  props: {
    scenario: { type: Object as PropType<ErrorScenario>, required: true },
  },
  setup(props) {
    const showFix = ref(false);

    watch(
      () => props.scenario.id,
      () => {
        showFix.value = false;
      },
    );

    return { showFix };
  },
});
</script>

<style scoped>
.ts-line-error {
  color: #f87171;
  text-decoration: underline wavy #ef4444;
  text-underline-offset: 3px;
}
</style>
