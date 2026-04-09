import { onBeforeMount } from "vue";
import { useGitGraph } from "@/composables/useGitGraph";
import { allScenarios } from "@/data/git-scenarios";
import GitGraph from "@/components/GitGraph.vue";
import CommandLog from "@/components/CommandLog.vue";
import CommitDetailPanel from "@/components/CommitDetailPanel.vue";
export default (await import('vue')).defineComponent({
    components: { GitGraph, CommandLog, CommitDetailPanel },
    setup() {
        const { commits, branches, head, selectedCommitId, selectedCommit, commandLog, currentScenario, currentStepIndex, isFinished, layoutNodes, layoutEdges, graphWidth, graphHeight, NODE_RADIUS, branchColorMap, nextStep, playAll, loadScenario, selectCommit, } = useGitGraph();
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
});
const __VLS_ctx = {};
const __VLS_componentsOption = { GitGraph, CommandLog, CommitDetailPanel };
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "mx-auto max-w-6xl" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({
    ...{ class: "mb-4 text-2xl font-bold text-gray-800" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "mb-4" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "mr-2 text-sm font-medium text-gray-600" },
});
for (const [scenario] of __VLS_getVForSourceType((__VLS_ctx.scenarios))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.loadScenario(scenario);
            } },
        key: (scenario.name),
        ...{ class: "mr-2 rounded-full px-4 py-1.5 text-sm font-medium transition" },
        ...{ class: (__VLS_ctx.currentScenario.name === scenario.name
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300') },
    });
    (scenario.name);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "mb-4 flex items-center justify-between" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "text-sm text-gray-500" },
});
(__VLS_ctx.currentScenario.description);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "flex gap-2" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.nextStep) },
    ...{ class: "rounded bg-indigo-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-40" },
    disabled: (__VLS_ctx.isFinished),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.playAll) },
    ...{ class: "rounded bg-emerald-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-40" },
    disabled: (__VLS_ctx.isFinished),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.loadScenario(__VLS_ctx.currentScenario);
        } },
    ...{ class: "rounded bg-gray-500 px-4 py-1.5 text-sm font-medium text-white hover:bg-gray-600" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "mb-4 text-sm text-gray-500" },
});
(__VLS_ctx.currentStepIndex);
(__VLS_ctx.currentScenario.steps.length);
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "ml-3" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "ml-1 font-semibold text-indigo-600" },
});
(__VLS_ctx.head || "—");
if (__VLS_ctx.isFinished) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "ml-3 font-semibold text-emerald-600" },
    });
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "flex gap-6" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "overflow-auto rounded-lg border border-gray-200 bg-white p-4" },
});
const __VLS_0 = {}.GitGraph;
/** @type {[typeof __VLS_components.GitGraph, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ 'onSelectCommit': {} },
    layoutNodes: (__VLS_ctx.layoutNodes),
    layoutEdges: (__VLS_ctx.layoutEdges),
    branches: (__VLS_ctx.branches),
    branchColorMap: (__VLS_ctx.branchColorMap),
    graphWidth: (__VLS_ctx.graphWidth),
    graphHeight: (__VLS_ctx.graphHeight),
    nodeRadius: (__VLS_ctx.NODE_RADIUS),
    selectedCommitId: (__VLS_ctx.selectedCommitId),
}));
const __VLS_2 = __VLS_1({
    ...{ 'onSelectCommit': {} },
    layoutNodes: (__VLS_ctx.layoutNodes),
    layoutEdges: (__VLS_ctx.layoutEdges),
    branches: (__VLS_ctx.branches),
    branchColorMap: (__VLS_ctx.branchColorMap),
    graphWidth: (__VLS_ctx.graphWidth),
    graphHeight: (__VLS_ctx.graphHeight),
    nodeRadius: (__VLS_ctx.NODE_RADIUS),
    selectedCommitId: (__VLS_ctx.selectedCommitId),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_4;
let __VLS_5;
let __VLS_6;
const __VLS_7 = {
    onSelectCommit: (__VLS_ctx.selectCommit)
};
var __VLS_3;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "flex w-80 shrink-0 flex-col gap-4" },
});
const __VLS_8 = {}.CommandLog;
/** @type {[typeof __VLS_components.CommandLog, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
    log: (__VLS_ctx.commandLog),
}));
const __VLS_10 = __VLS_9({
    log: (__VLS_ctx.commandLog),
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
const __VLS_12 = {}.CommitDetailPanel;
/** @type {[typeof __VLS_components.CommitDetailPanel, ]} */ ;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
    commit: (__VLS_ctx.selectedCommit),
}));
const __VLS_14 = __VLS_13({
    commit: (__VLS_ctx.selectedCommit),
}, ...__VLS_functionalComponentArgsRest(__VLS_13));
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-6xl']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-800']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1.5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['transition']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-indigo-600']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1.5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-indigo-700']} */ ;
/** @type {__VLS_StyleScopedClasses['disabled:opacity-40']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-emerald-600']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1.5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-emerald-700']} */ ;
/** @type {__VLS_StyleScopedClasses['disabled:opacity-40']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1.5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['ml-3']} */ ;
/** @type {__VLS_StyleScopedClasses['ml-1']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-indigo-600']} */ ;
/** @type {__VLS_StyleScopedClasses['ml-3']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-emerald-600']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-6']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-gray-200']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['w-80']} */ ;
/** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
var __VLS_dollars;
let __VLS_self;
