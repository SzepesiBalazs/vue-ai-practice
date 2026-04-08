<template>
  <aside class="rounded-lg border border-gray-200 bg-white shadow-sm">
    <div
      class="border-b border-gray-100 px-4 py-3 flex items-center justify-between"
    >
      <h3 class="text-xs font-semibold uppercase tracking-wide text-gray-500">
        Accessibility Audit
      </h3>
      <span
        class="rounded-full px-2 py-0.5 text-xs font-medium"
        :class="
          issues.length
            ? 'bg-red-100 text-red-600'
            : 'bg-green-100 text-green-600'
        "
      >
        {{
          issues.length
            ? `${issues.length} issue${issues.length > 1 ? "s" : ""}`
            : "All clear"
        }}
      </span>
    </div>

    <div class="divide-y divide-gray-100 max-h-64 overflow-y-auto">
      <div
        v-for="issue in issues"
        :key="issue.nodeId + issue.message"
        class="cursor-pointer px-4 py-3 hover:bg-gray-50"
        @click="$emit('select-node', issue.nodeId)"
      >
        <div class="flex items-start gap-2">
          <span
            class="mt-0.5 shrink-0 text-base"
            :class="
              issue.severity === 'error' ? 'text-red-500' : 'text-amber-500'
            "
          >
            {{ issue.severity === "error" ? "✕" : "⚠" }}
          </span>
          <div>
            <p class="text-xs font-medium text-gray-800">{{ issue.message }}</p>
            <p class="mt-0.5 text-xs text-gray-500">{{ issue.fix }}</p>
          </div>
        </div>
      </div>

      <div
        v-if="!issues.length"
        class="px-4 py-6 text-center text-xs text-green-600"
      >
        No accessibility issues detected.
      </div>
    </div>
  </aside>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import type { A11yIssue } from "@/types/html-builder";

export default defineComponent({
  props: {
    issues: { type: Array as PropType<A11yIssue[]>, required: true },
  },
  emits: ["select-node"],
  setup() {
    return {};
  },
});
</script>
