import { defineComponent, ref } from "vue";
import CanvasNode from "./CanvasNode.vue";
export default defineComponent({
    components: { CanvasNode },
    props: {
        nodes: {
            type: Array,
            required: true,
        },
        selectedNodeId: { type: String, default: null },
        draggedTag: { type: String, default: null },
    },
    emits: ["select", "remove", "move", "drop-into", "root-drop"],
    setup(_, { emit }) {
        const isDragOver = ref(false);
        function onRootDrop() {
            isDragOver.value = false;
            emit("root-drop");
        }
        return { isDragOver, onRootDrop };
    },
});
debugger; /* PartiallyEnd: #3632/script.vue */
const __VLS_ctx = {};
const __VLS_componentsOption = { CanvasNode };
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ onDragover: (...[$event]) => {
            __VLS_ctx.isDragOver = true;
        } },
    ...{ onDragleave: (...[$event]) => {
            __VLS_ctx.isDragOver = false;
        } },
    ...{ onDrop: (__VLS_ctx.onRootDrop) },
    ...{ class: "relative min-h-[400px] rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-4 transition-colors" },
    ...{ class: ({ 'border-indigo-400 bg-indigo-50': __VLS_ctx.isDragOver && !__VLS_ctx.nodes.length }) },
});
if (!__VLS_ctx.nodes.length) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "flex h-full min-h-[360px] items-center justify-center" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: "text-sm text-gray-400" },
    });
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "flex flex-col gap-2" },
    });
    for (const [node] of __VLS_getVForSourceType((__VLS_ctx.nodes))) {
        const __VLS_0 = {}.CanvasNode;
        /** @type {[typeof __VLS_components.CanvasNode, ]} */ ;
        // @ts-ignore
        const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
            ...{ 'onSelect': {} },
            ...{ 'onRemove': {} },
            ...{ 'onMove': {} },
            ...{ 'onDropInto': {} },
            key: (node.id),
            node: (node),
            selectedNodeId: (__VLS_ctx.selectedNodeId),
            draggedTag: (__VLS_ctx.draggedTag),
        }));
        const __VLS_2 = __VLS_1({
            ...{ 'onSelect': {} },
            ...{ 'onRemove': {} },
            ...{ 'onMove': {} },
            ...{ 'onDropInto': {} },
            key: (node.id),
            node: (node),
            selectedNodeId: (__VLS_ctx.selectedNodeId),
            draggedTag: (__VLS_ctx.draggedTag),
        }, ...__VLS_functionalComponentArgsRest(__VLS_1));
        let __VLS_4;
        let __VLS_5;
        let __VLS_6;
        const __VLS_7 = {
            onSelect: (...[$event]) => {
                if (!!(!__VLS_ctx.nodes.length))
                    return;
                __VLS_ctx.$emit('select', $event);
            }
        };
        const __VLS_8 = {
            onRemove: (...[$event]) => {
                if (!!(!__VLS_ctx.nodes.length))
                    return;
                __VLS_ctx.$emit('remove', $event);
            }
        };
        const __VLS_9 = {
            onMove: ((id, dir) => __VLS_ctx.$emit('move', id, dir))
        };
        const __VLS_10 = {
            onDropInto: (...[$event]) => {
                if (!!(!__VLS_ctx.nodes.length))
                    return;
                __VLS_ctx.$emit('drop-into', $event);
            }
        };
        var __VLS_3;
    }
}
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['min-h-[400px]']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['border-2']} */ ;
/** @type {__VLS_StyleScopedClasses['border-dashed']} */ ;
/** @type {__VLS_StyleScopedClasses['border-gray-300']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gray-50']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['h-full']} */ ;
/** @type {__VLS_StyleScopedClasses['min-h-[360px]']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-400']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
var __VLS_dollars;
let __VLS_self;
