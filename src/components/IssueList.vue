<template>
  <div
    class="flex max-h-[32rem] flex-col divide-y divide-gray-100 overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-sm"
    data-a11y-ignore
  >
    <div
      v-if="!issues.length"
      class="flex flex-col items-center justify-center px-4 py-12 text-center"
    >
      <svg
        v-if="!scanned"
        class="mb-3 h-10 w-10 text-gray-300"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="1.5"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
        />
      </svg>
      <svg
        v-else
        class="mb-3 h-10 w-10 text-green-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="1.5"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <p class="text-sm font-medium text-gray-500">
        {{
          scanned
            ? "No issues match the current filter."
            : "Click Scan Page to start the audit."
        }}
      </p>
    </div>

    <div
      v-for="issue in issues"
      :key="issue.id"
      class="cursor-pointer px-4 py-3 transition-colors hover:bg-gray-50"
      :class="{
        'ring-2 ring-inset ring-indigo-300 bg-indigo-50':
          highlightedId === issue.id,
      }"
      @mouseenter="$emit('highlight', issue)"
      @mouseleave="$emit('highlight', null)"
      @click="$emit('focus-element', issue)"
    >
      <div class="flex items-start gap-3">
        <!-- Severity icon -->
        <span
          class="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
          :class="{
            'bg-red-500': issue.severity === 'error',
            'bg-amber-400': issue.severity === 'warning',
            'bg-blue-400': issue.severity === 'notice',
          }"
        >
          {{
            issue.severity === "error"
              ? "!"
              : issue.severity === "warning"
                ? "?"
                : "i"
          }}
        </span>

        <div class="min-w-0 flex-1">
          <!-- Rule + WCAG + element tag -->
          <div class="mb-1 flex flex-wrap items-center gap-1.5">
            <span
              class="rounded bg-gray-100 px-1.5 py-0.5 text-xs font-mono text-gray-600"
            >
              {{ issue.category }}
            </span>
            <span
              class="rounded bg-indigo-50 px-1.5 py-0.5 text-xs font-mono text-indigo-600"
            >
              WCAG {{ issue.wcag }}
            </span>
            <span
              class="rounded bg-gray-50 px-1.5 py-0.5 text-xs font-mono text-gray-400"
            >
              &lt;{{ issue.element.tagName.toLowerCase() }}&gt;
            </span>
          </div>

          <!-- Message -->
          <p class="text-xs font-medium leading-relaxed text-gray-800">
            {{ issue.message }}
          </p>

          <!-- Fix hint -->
          <p class="mt-1.5 text-xs leading-relaxed text-emerald-700">
            <span class="font-semibold">Fix:</span> {{ issue.fix }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import type { A11yIssue } from "@/types/a11y-checker";

export default defineComponent({
  props: {
    issues: {
      type: Array as PropType<A11yIssue[]>,
      required: true,
    },
    highlightedId: { type: String as PropType<string | null>, default: null },
    scanned: { type: Boolean, default: false },
  },
  emits: ["highlight", "focus-element"],
  setup() {
    return {};
  },
});
</script>
