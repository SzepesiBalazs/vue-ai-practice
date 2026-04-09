import { ref, readonly, computed } from "vue";
import { a11yRules } from "@/data/a11y-rules";
import type {
  A11yIssue,
  AuditResult,
  RuleCategory,
  IssueSeverity,
} from "@/types/a11y-checker";

export type FilterMode = IssueSeverity | RuleCategory | "all";

function getFixForRule(ruleId: string): string {
  const fixes: Record<string, string> = {
    "contrast-normal-text":
      "Increase text/background contrast. Tool: https://webaim.org/resources/contrastchecker/",
    "contrast-large-text":
      "Large text needs 3:1 minimum contrast. Darken text or lighten background.",
    "input-missing-label":
      'Wrap the input in a <label>, or use <label for="...">, or add aria-label.',
    "label-empty": "Add visible text inside the <label> element.",
    "img-missing-alt":
      'Add alt="" for decorative images, or a descriptive alt for meaningful ones.',
    "img-alt-filename":
      "Replace filename-like alt text with a content description.",
    "aria-role-button-label": 'Add visible text content or aria-label="...".',
    "aria-hidden-focusable":
      'Remove aria-hidden from focusable content, or set descendants to tabindex="-1".',
    "aria-required-attr":
      "Add the missing required ARIA attribute(s) for the role.",
    "tabindex-positive": 'Use tabindex="0" or tabindex="-1".',
    "interactive-disabled-focus": 'Set tabindex="-1" on disabled elements.',
    "heading-empty": "Remove empty headings or add meaningful text.",
    "heading-skip-level": "Follow heading order: h1 -> h2 -> h3.",
    "landmark-main-missing": "Wrap the primary content in a <main> element.",
    "landmark-duplicate-main": 'Keep only one <main> or role="main".',
    "nav-missing-label":
      "Add aria-label to each <nav> when multiple navs exist.",
    "html-lang-missing": 'Set <html lang="en"> (or matching locale).',
    "html-lang-valid": "Use a valid BCP 47 tag, e.g. en or en-US.",
  };
  return fixes[ruleId] ?? "Review WCAG guidance for this rule.";
}

function focusElement(el: HTMLElement) {
  if (!el.hasAttribute("tabindex")) {
    el.setAttribute("tabindex", "-1");
  }
  el.scrollIntoView({ behavior: "smooth", block: "center" });
  el.focus({ preventScroll: true });
}

function isIgnored(el: HTMLElement): boolean {
  return (
    "a11yIgnore" in el.dataset || el.closest("[data-a11y-ignore]") !== null
  );
}

export function useA11yChecker() {
  const result = ref<AuditResult | null>(null);
  const isScanning = ref(false);
  const activeFilter = ref<FilterMode>("all");
  const highlightedElementId = ref<string | null>(null);

  const filteredIssues = computed<A11yIssue[]>(() => {
    if (!result.value) return [];
    const issues = result.value.issues;
    if (activeFilter.value === "all") return issues;
    return issues.filter(
      (i) =>
        i.severity === activeFilter.value || i.category === activeFilter.value,
    );
  });

  const summary = computed(() => ({
    total: result.value?.issues.length ?? 0,
    errors:
      result.value?.issues.filter((i) => i.severity === "error").length ?? 0,
    warnings:
      result.value?.issues.filter((i) => i.severity === "warning").length ?? 0,
    notices:
      result.value?.issues.filter((i) => i.severity === "notice").length ?? 0,
  }));

  function scan(root: HTMLElement) {
    isScanning.value = true;
    const issues: A11yIssue[] = [];
    let elementCount = 0;

    for (const rule of a11yRules) {
      const elements = Array.from(
        root.querySelectorAll<HTMLElement>(rule.selector),
      ).filter((el) => !isIgnored(el));
      elementCount += elements.length;

      for (const el of elements) {
        const message = rule.test(el, root);
        if (message) {
          issues.push({
            id: crypto.randomUUID().slice(0, 8),
            ruleId: rule.id,
            category: rule.category,
            severity: rule.severity,
            element: el,
            message,
            wcag: rule.wcag,
            fix: getFixForRule(rule.id),
          });
        }
      }
    }

    result.value = {
      issues,
      scannedAt: new Date(),
      elementCount,
    };
    isScanning.value = false;
  }

  function clearResults() {
    result.value = null;
    highlightedElementId.value = null;
    activeFilter.value = "all";
  }

  function setFilter(filter: FilterMode) {
    activeFilter.value = filter;
  }

  function setHighlight(issueId: string | null) {
    highlightedElementId.value = issueId;
  }

  return {
    result: readonly(result),
    isScanning: readonly(isScanning),
    activeFilter: readonly(activeFilter),
    highlightedElementId: readonly(highlightedElementId),
    filteredIssues,
    summary,
    scan,
    clearResults,
    setFilter,
    setHighlight,
    focusElement,
  };
}
