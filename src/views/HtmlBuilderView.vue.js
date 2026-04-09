import { useHtmlBuilder } from "@/composables/useHtmlBuilder";
import ElementPalette from "@/components/ElementPalette.vue";
import CanvasArea from "@/components/CanvasArea.vue";
import PropertiesPanel from "@/components/PropertiesPanel.vue";
import A11yPanel from "@/components/A11yPanel.vue";
import HtmlOutput from "@/components/HtmlOutput.vue";
export default (await import('vue')).defineComponent({
    components: {
        ElementPalette,
        CanvasArea,
        PropertiesPanel,
        A11yPanel,
        HtmlOutput,
    },
    setup() {
        const { nodes, selectedNodeId, selectedNode, a11yIssues, htmlOutput, draggedTag, dropElement, removeNode, updateAttribute, updateTextContent, moveNode, selectNode, startDrag, endDrag, clearCanvas, } = useHtmlBuilder();
        return {
            nodes,
            selectedNodeId,
            selectedNode,
            a11yIssues,
            htmlOutput,
            draggedTag,
            dropElement,
            removeNode,
            updateAttribute,
            updateTextContent,
            moveNode,
            selectNode,
            startDrag,
            endDrag,
            clearCanvas,
        };
    },
});
const __VLS_ctx = {};
const __VLS_componentsOption = {
    ElementPalette,
    CanvasArea,
    PropertiesPanel,
    A11yPanel,
    HtmlOutput,
};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "mx-auto max-w-screen-2xl space-y-4" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "flex items-center justify-between" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({
    ...{ class: "text-2xl font-bold text-gray-800" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.clearCanvas) },
    type: "button",
    ...{ class: "rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "grid grid-cols-[220px_1fr_280px] gap-4" },
});
const __VLS_0 = {}.ElementPalette;
/** @type {[typeof __VLS_components.ElementPalette, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ 'onDragStart': {} },
    ...{ 'onDragEnd': {} },
}));
const __VLS_2 = __VLS_1({
    ...{ 'onDragStart': {} },
    ...{ 'onDragEnd': {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_4;
let __VLS_5;
let __VLS_6;
const __VLS_7 = {
    onDragStart: (__VLS_ctx.startDrag)
};
const __VLS_8 = {
    onDragEnd: (__VLS_ctx.endDrag)
};
var __VLS_3;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "flex flex-col gap-4" },
});
const __VLS_9 = {}.CanvasArea;
/** @type {[typeof __VLS_components.CanvasArea, ]} */ ;
// @ts-ignore
const __VLS_10 = __VLS_asFunctionalComponent(__VLS_9, new __VLS_9({
    ...{ 'onSelect': {} },
    ...{ 'onRemove': {} },
    ...{ 'onMove': {} },
    ...{ 'onDropInto': {} },
    ...{ 'onRootDrop': {} },
    nodes: (__VLS_ctx.nodes),
    selectedNodeId: (__VLS_ctx.selectedNodeId),
    draggedTag: (__VLS_ctx.draggedTag),
}));
const __VLS_11 = __VLS_10({
    ...{ 'onSelect': {} },
    ...{ 'onRemove': {} },
    ...{ 'onMove': {} },
    ...{ 'onDropInto': {} },
    ...{ 'onRootDrop': {} },
    nodes: (__VLS_ctx.nodes),
    selectedNodeId: (__VLS_ctx.selectedNodeId),
    draggedTag: (__VLS_ctx.draggedTag),
}, ...__VLS_functionalComponentArgsRest(__VLS_10));
let __VLS_13;
let __VLS_14;
let __VLS_15;
const __VLS_16 = {
    onSelect: (__VLS_ctx.selectNode)
};
const __VLS_17 = {
    onRemove: (__VLS_ctx.removeNode)
};
const __VLS_18 = {
    onMove: (__VLS_ctx.moveNode)
};
const __VLS_19 = {
    onDropInto: (({ tag, parentId }) => __VLS_ctx.dropElement(tag, parentId))
};
const __VLS_20 = {
    onRootDrop: (() => __VLS_ctx.draggedTag && __VLS_ctx.dropElement(__VLS_ctx.draggedTag, null))
};
var __VLS_12;
const __VLS_21 = {}.HtmlOutput;
/** @type {[typeof __VLS_components.HtmlOutput, ]} */ ;
// @ts-ignore
const __VLS_22 = __VLS_asFunctionalComponent(__VLS_21, new __VLS_21({
    html: (__VLS_ctx.htmlOutput),
}));
const __VLS_23 = __VLS_22({
    html: (__VLS_ctx.htmlOutput),
}, ...__VLS_functionalComponentArgsRest(__VLS_22));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "flex flex-col gap-4" },
});
const __VLS_25 = {}.PropertiesPanel;
/** @type {[typeof __VLS_components.PropertiesPanel, ]} */ ;
// @ts-ignore
const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({
    ...{ 'onUpdateAttr': {} },
    ...{ 'onUpdateText': {} },
    ...{ 'onRemove': {} },
    node: (__VLS_ctx.selectedNode),
}));
const __VLS_27 = __VLS_26({
    ...{ 'onUpdateAttr': {} },
    ...{ 'onUpdateText': {} },
    ...{ 'onRemove': {} },
    node: (__VLS_ctx.selectedNode),
}, ...__VLS_functionalComponentArgsRest(__VLS_26));
let __VLS_29;
let __VLS_30;
let __VLS_31;
const __VLS_32 = {
    onUpdateAttr: (__VLS_ctx.updateAttribute)
};
const __VLS_33 = {
    onUpdateText: (__VLS_ctx.updateTextContent)
};
const __VLS_34 = {
    onRemove: (__VLS_ctx.removeNode)
};
var __VLS_28;
const __VLS_35 = {}.A11yPanel;
/** @type {[typeof __VLS_components.A11yPanel, ]} */ ;
// @ts-ignore
const __VLS_36 = __VLS_asFunctionalComponent(__VLS_35, new __VLS_35({
    ...{ 'onSelectNode': {} },
    issues: (__VLS_ctx.a11yIssues),
}));
const __VLS_37 = __VLS_36({
    ...{ 'onSelectNode': {} },
    issues: (__VLS_ctx.a11yIssues),
}, ...__VLS_functionalComponentArgsRest(__VLS_36));
let __VLS_39;
let __VLS_40;
let __VLS_41;
const __VLS_42 = {
    onSelectNode: (__VLS_ctx.selectNode)
};
var __VLS_38;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-screen-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-4']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-800']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-gray-300']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1.5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-gray-100']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-cols-[220px_1fr_280px]']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
var __VLS_dollars;
let __VLS_self;
