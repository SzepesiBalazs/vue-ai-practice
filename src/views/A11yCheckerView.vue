<template>
  <div class="mx-auto max-w-screen-xl space-y-6">
    <!-- Header -->
    <div
      class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"
    >
      <div>
        <h1 class="text-2xl font-bold text-gray-800">Accessibility Checker</h1>
        <p class="mt-1 text-sm text-gray-500">
          Scan live HTML for WCAG 2.1 violations. Hover an issue to highlight
          the offending element.
        </p>
      </div>
      <div class="flex gap-2" data-a11y-ignore>
        <button
          type="button"
          class="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-5 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 disabled:opacity-50"
          :disabled="isScanning"
          @click="runScan"
        >
          <svg
            v-if="!isScanning"
            class="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
            />
          </svg>
          <svg
            v-else
            class="h-4 w-4 animate-spin"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            />
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
          {{ isScanning ? "Scanning..." : "Scan Page" }}
        </button>
        <button
          v-if="result"
          type="button"
          class="inline-flex items-center gap-1.5 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-600 shadow-sm hover:bg-gray-50"
          @click="clearResults"
        >
          Clear
        </button>
      </div>
    </div>

    <!-- Summary + Filters -->
    <template v-if="result">
      <RuleSummaryBar
        :summary="summary"
        :elementCount="result.elementCount"
        :scannedAt="result.scannedAt"
      />
      <div>
        <p
          class="mb-2 text-xs font-medium uppercase tracking-wide text-gray-400"
        >
          Filter by
        </p>
        <RuleFilterBar
          :activeFilter="activeFilter"
          :filterOptions="filterOptions"
          @filter="setFilter"
        />
      </div>
    </template>

    <div class="grid grid-cols-1 gap-6 lg:grid-cols-5">
      <!-- Left: Audit Target (wider) -->
      <div class="flex flex-col gap-3 lg:col-span-3">
        <div class="flex items-center justify-between">
          <h2 class="text-sm font-semibold text-gray-600">Audit Target</h2>
          <span class="text-xs text-gray-400"
            >Demo page with intentional WCAG violations</span
          >
        </div>
        <AuditTarget ref="auditTargetRef">
          <!-- Demo content with intentional a11y violations for scanning -->
          <div
            class="space-y-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
          >
            <!-- Heading hierarchy violation: h1 -> h3 (skip h2) -->
            <header>
              <h1
                style="color: #999; background-color: #fff"
                class="text-xl font-bold"
              >
                Welcome to Our Store
              </h1>
              <h3 class="text-sm text-gray-600">Featured Products</h3>
            </header>

            <!-- Image without alt -->
            <div class="flex items-center gap-4">
              <img
                src="https://picsum.photos/seed/a11y/160/90"
                class="rounded"
              />
              <div>
                <p class="text-sm text-gray-700">
                  A banner with no alt text — screen readers cannot describe it.
                </p>
              </div>
            </div>

            <!-- Image with filename as alt -->
            <img
              src="https://picsum.photos/seed/a11y2/120/60"
              alt="hero-banner.jpg"
              class="rounded"
            />

            <!-- Form with unlabelled input -->
            <form class="flex items-end gap-3">
              <div>
                <input
                  type="text"
                  placeholder="Enter your email..."
                  class="rounded border border-gray-300 px-3 py-1.5 text-sm"
                />
              </div>
              <div>
                <label class="block text-xs text-gray-500">Name</label>
                <input
                  id="demo-name"
                  type="text"
                  class="rounded border border-gray-300 px-3 py-1.5 text-sm"
                />
              </div>
              <button
                type="submit"
                class="rounded bg-indigo-600 px-4 py-1.5 text-sm text-white"
              >
                Subscribe
              </button>
            </form>

            <!-- Empty label -->
            <label></label>

            <!-- ARIA: role=button without accessible name -->
            <div class="flex gap-3">
              <div
                role="button"
                class="rounded bg-gray-200 px-3 py-1.5 text-sm"
              ></div>
              <div
                role="checkbox"
                class="rounded border border-gray-300 px-3 py-1.5 text-sm"
              >
                Option A
              </div>
            </div>

            <!-- aria-hidden containing focusable child -->
            <div aria-hidden="true" class="rounded bg-gray-100 p-3">
              <p class="text-xs text-gray-500">
                This section is aria-hidden but contains a focusable element:
              </p>
              <button
                class="mt-1 rounded bg-red-500 px-3 py-1 text-xs text-white"
              >
                Hidden Button
              </button>
            </div>

            <!-- Two navs without labels -->
            <nav class="flex gap-4 text-sm text-indigo-600">
              <a href="#">Home</a>
              <a href="#">Products</a>
            </nav>
            <nav class="flex gap-4 text-sm text-indigo-600">
              <a href="#">Help</a>
              <a href="#">Contact</a>
            </nav>
          </div>
        </AuditTarget>
      </div>

      <!-- Right: Issue List -->
      <div class="flex flex-col gap-3 lg:col-span-2">
        <div class="flex items-center justify-between">
          <h2 class="text-sm font-semibold text-gray-600">Issues</h2>
          <span v-if="result" class="text-xs text-gray-400">
            {{ filteredIssues.length }} of {{ result.issues.length }} shown
          </span>
        </div>
        <IssueList
          :issues="filteredIssues"
          :highlightedId="highlightedElementId"
          :scanned="!!result"
          @highlight="onHighlight"
          @focus-element="onFocusElement"
        />
      </div>
    </div>

    <!-- Overlay rendered at view level so it sits above all content -->
    <A11yOverlay
      :rect="overlayRect"
      :severity="overlayIssue?.severity ?? 'error'"
      :label="
        overlayIssue
          ? `${overlayIssue.category} · WCAG ${overlayIssue.wcag}`
          : ''
      "
    />
  </div>
</template>

<script lang="ts">
import { ref, computed } from "vue";
import { useA11yChecker } from "@/composables/useA11yChecker";
import type { A11yIssue } from "@/types/a11y-checker";
import type { FilterOption } from "@/components/RuleFilterBar.vue";
import AuditTarget from "@/components/AuditTarget.vue";
import A11yOverlay from "@/components/A11yOverlay.vue";
import RuleSummaryBar from "@/components/RuleSummaryBar.vue";
import RuleFilterBar from "@/components/RuleFilterBar.vue";
import IssueList from "@/components/IssueList.vue";

interface AuditTargetExpose {
  getRoot: () => HTMLElement | null;
}

export default {
  components: {
    AuditTarget,
    A11yOverlay,
    RuleSummaryBar,
    RuleFilterBar,
    IssueList,
  },
  setup() {
    const auditTargetRef = ref<AuditTargetExpose | null>(null);
    const overlayIssue = ref<A11yIssue | null>(null);
    const overlayRect = ref<DOMRect | null>(null);

    const {
      result,
      isScanning,
      activeFilter,
      highlightedElementId,
      filteredIssues,
      summary,
      scan,
      clearResults,
      setFilter,
      setHighlight,
      focusElement,
    } = useA11yChecker();

    function runScan() {
      const root = auditTargetRef.value?.getRoot();
      if (root) scan(root);
    }

    function onHighlight(issue: A11yIssue | null) {
      overlayIssue.value = issue;
      overlayRect.value = issue ? issue.element.getBoundingClientRect() : null;
      setHighlight(issue?.id ?? null);
    }

    function onFocusElement(issue: A11yIssue) {
      focusElement(issue.element);
    }

    const filterOptions = computed<FilterOption[]>(() => {
      const issues = result.value?.issues ?? [];
      const countCategory = (cat: string) =>
        issues.filter((i) => i.category === cat).length;
      return [
        { value: "all", label: "All", count: issues.length },
        { value: "error", label: "Errors", count: summary.value.errors },
        { value: "warning", label: "Warnings", count: summary.value.warnings },
        { value: "notice", label: "Notices", count: summary.value.notices },
        {
          value: "contrast",
          label: "Contrast",
          count: countCategory("contrast"),
        },
        { value: "label", label: "Labels", count: countCategory("label") },
        { value: "image", label: "Images", count: countCategory("image") },
        { value: "aria", label: "ARIA", count: countCategory("aria") },
        { value: "focus", label: "Focus", count: countCategory("focus") },
        {
          value: "heading",
          label: "Headings",
          count: countCategory("heading"),
        },
        {
          value: "landmark",
          label: "Landmarks",
          count: countCategory("landmark"),
        },
        {
          value: "language",
          label: "Language",
          count: countCategory("language"),
        },
      ];
    });

    return {
      auditTargetRef,
      overlayIssue,
      overlayRect,
      result,
      isScanning,
      activeFilter,
      highlightedElementId,
      filteredIssues,
      summary,
      runScan,
      clearResults,
      setFilter,
      filterOptions,
      onHighlight,
      onFocusElement,
    };
  },
};
</script>
