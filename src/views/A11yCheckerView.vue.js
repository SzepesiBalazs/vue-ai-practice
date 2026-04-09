import { ref, computed } from "vue";
import { useA11yChecker } from "@/composables/useA11yChecker";
import AuditTarget from "@/components/AuditTarget.vue";
import A11yOverlay from "@/components/A11yOverlay.vue";
import RuleSummaryBar from "@/components/RuleSummaryBar.vue";
import RuleFilterBar from "@/components/RuleFilterBar.vue";
import IssueList from "@/components/IssueList.vue";
export default (await import('vue')).defineComponent({
    components: {
        AuditTarget,
        A11yOverlay,
        RuleSummaryBar,
        RuleFilterBar,
        IssueList,
    },
    setup() {
        const auditTargetRef = ref(null);
        const overlayIssue = ref(null);
        const overlayRect = ref(null);
        const { result, isScanning, activeFilter, highlightedElementId, filteredIssues, summary, scan, clearResults, setFilter, setHighlight, focusElement, } = useA11yChecker();
        function runScan() {
            const root = auditTargetRef.value?.getRoot();
            if (root)
                scan(root);
        }
        function onHighlight(issue) {
            overlayIssue.value = issue;
            overlayRect.value = issue ? issue.element.getBoundingClientRect() : null;
            setHighlight(issue?.id ?? null);
        }
        function onFocusElement(issue) {
            focusElement(issue.element);
        }
        const filterOptions = computed(() => [
            { value: "all", label: "All", count: result.value?.issues.length },
            { value: "error", label: "Errors", count: summary.value.errors },
            { value: "warning", label: "Warnings", count: summary.value.warnings },
            { value: "notice", label: "Notices", count: summary.value.notices },
            { value: "contrast", label: "Contrast" },
            { value: "label", label: "Labels" },
            { value: "image", label: "Images" },
            { value: "aria", label: "ARIA" },
            { value: "focus", label: "Focus" },
            { value: "heading", label: "Headings" },
            { value: "landmark", label: "Landmarks" },
            { value: "language", label: "Language" },
        ]);
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
});
const __VLS_ctx = {};
const __VLS_componentsOption = {
    AuditTarget,
    A11yOverlay,
    RuleSummaryBar,
    RuleFilterBar,
    IssueList,
};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "mx-auto max-w-screen-xl space-y-4" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "flex items-center justify-between" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({
    ...{ class: "text-2xl font-bold text-gray-800" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "flex gap-2" },
    'data-a11y-ignore': true,
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.runScan) },
    type: "button",
    ...{ class: "rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50" },
    disabled: (__VLS_ctx.isScanning),
});
(__VLS_ctx.isScanning ? "Scanning..." : "Scan Page");
if (__VLS_ctx.result) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.clearResults) },
        type: "button",
        ...{ class: "rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-600 hover:bg-gray-100" },
    });
}
if (__VLS_ctx.result) {
    const __VLS_0 = {}.RuleSummaryBar;
    /** @type {[typeof __VLS_components.RuleSummaryBar, ]} */ ;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        summary: (__VLS_ctx.summary),
    }));
    const __VLS_2 = __VLS_1({
        summary: (__VLS_ctx.summary),
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    const __VLS_4 = {}.RuleFilterBar;
    /** @type {[typeof __VLS_components.RuleFilterBar, ]} */ ;
    // @ts-ignore
    const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
        ...{ 'onFilter': {} },
        activeFilter: (__VLS_ctx.activeFilter),
        filterOptions: (__VLS_ctx.filterOptions),
    }));
    const __VLS_6 = __VLS_5({
        ...{ 'onFilter': {} },
        activeFilter: (__VLS_ctx.activeFilter),
        filterOptions: (__VLS_ctx.filterOptions),
    }, ...__VLS_functionalComponentArgsRest(__VLS_5));
    let __VLS_8;
    let __VLS_9;
    let __VLS_10;
    const __VLS_11 = {
        onFilter: (__VLS_ctx.setFilter)
    };
    var __VLS_7;
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "grid grid-cols-1 gap-6 lg:grid-cols-2" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "flex flex-col gap-4" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
    ...{ class: "text-sm font-semibold text-gray-600" },
});
const __VLS_12 = {}.AuditTarget;
/** @type {[typeof __VLS_components.AuditTarget, typeof __VLS_components.AuditTarget, ]} */ ;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
    ref: "auditTargetRef",
}));
const __VLS_14 = __VLS_13({
    ref: "auditTargetRef",
}, ...__VLS_functionalComponentArgsRest(__VLS_13));
/** @type {typeof __VLS_ctx.auditTargetRef} */ ;
var __VLS_16 = {};
__VLS_15.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "space-y-4 rounded-lg border border-gray-200 bg-white p-6" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
    src: "https://picsum.photos/200/100",
    alt: "Decorative banner image",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    type: "text",
    'aria-label': "Search",
    placeholder: "Search...",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    type: "submit",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.nav, __VLS_intrinsicElements.nav)({
    'aria-label': "Primary",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.nav, __VLS_intrinsicElements.nav)({
    'aria-label': "Secondary",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    'aria-hidden': "true",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({});
var __VLS_15;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "flex flex-col gap-4" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
    ...{ class: "text-sm font-semibold text-gray-600" },
});
if (__VLS_ctx.result) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "ml-1 font-normal text-gray-400" },
    });
    (__VLS_ctx.filteredIssues.length);
}
const __VLS_18 = {}.IssueList;
/** @type {[typeof __VLS_components.IssueList, ]} */ ;
// @ts-ignore
const __VLS_19 = __VLS_asFunctionalComponent(__VLS_18, new __VLS_18({
    ...{ 'onHighlight': {} },
    ...{ 'onFocusElement': {} },
    issues: (__VLS_ctx.filteredIssues),
    highlightedId: (__VLS_ctx.highlightedElementId),
    scanned: (!!__VLS_ctx.result),
}));
const __VLS_20 = __VLS_19({
    ...{ 'onHighlight': {} },
    ...{ 'onFocusElement': {} },
    issues: (__VLS_ctx.filteredIssues),
    highlightedId: (__VLS_ctx.highlightedElementId),
    scanned: (!!__VLS_ctx.result),
}, ...__VLS_functionalComponentArgsRest(__VLS_19));
let __VLS_22;
let __VLS_23;
let __VLS_24;
const __VLS_25 = {
    onHighlight: (__VLS_ctx.onHighlight)
};
const __VLS_26 = {
    onFocusElement: (__VLS_ctx.onFocusElement)
};
var __VLS_21;
const __VLS_27 = {}.A11yOverlay;
/** @type {[typeof __VLS_components.A11yOverlay, ]} */ ;
// @ts-ignore
const __VLS_28 = __VLS_asFunctionalComponent(__VLS_27, new __VLS_27({
    rect: (__VLS_ctx.overlayRect),
    severity: (__VLS_ctx.overlayIssue?.severity ?? 'error'),
    label: (__VLS_ctx.overlayIssue
        ? `${__VLS_ctx.overlayIssue.category} · WCAG ${__VLS_ctx.overlayIssue.wcag}`
        : ''),
}));
const __VLS_29 = __VLS_28({
    rect: (__VLS_ctx.overlayRect),
    severity: (__VLS_ctx.overlayIssue?.severity ?? 'error'),
    label: (__VLS_ctx.overlayIssue
        ? `${__VLS_ctx.overlayIssue.category} · WCAG ${__VLS_ctx.overlayIssue.wcag}`
        : ''),
}, ...__VLS_functionalComponentArgsRest(__VLS_28));
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-screen-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-4']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-800']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-indigo-600']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-indigo-700']} */ ;
/** @type {__VLS_StyleScopedClasses['disabled:opacity-50']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-gray-300']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-gray-100']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-cols-1']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-6']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:grid-cols-2']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-4']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-gray-200']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['p-6']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['ml-1']} */ ;
/** @type {__VLS_StyleScopedClasses['font-normal']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-400']} */ ;
// @ts-ignore
var __VLS_17 = __VLS_16;
var __VLS_dollars;
let __VLS_self;
