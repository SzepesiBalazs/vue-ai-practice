import { defineComponent, computed, ref, } from "vue";
import { elementDefinitions } from "@/data/html-elements";
export default defineComponent({
    name: "CanvasNode",
    props: {
        node: { type: Object, required: true },
        selectedNodeId: { type: String, default: null },
        draggedTag: { type: String, default: null },
    },
    emits: ["select", "remove", "move", "drop-into"],
    setup(props, { emit }) {
        const isDragOver = ref(false);
        const isSelected = computed(() => props.node.id === props.selectedNodeId);
        const def = computed(() => elementDefinitions.find((d) => d.tag === props.node.tag));
        function onDrop() {
            isDragOver.value = false;
            if (props.draggedTag) {
                emit("drop-into", { tag: props.draggedTag, parentId: props.node.id });
            }
        }
        return { isSelected, def, isDragOver, onDrop };
    },
});
debugger; /* PartiallyEnd: #3632/script.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.$emit('select', __VLS_ctx.node.id);
        } },
    ...{ class: "group relative rounded border-2 transition-colors" },
    ...{ class: ([
            __VLS_ctx.isSelected
                ? 'border-indigo-500 bg-indigo-50'
                : 'border-gray-200 bg-white hover:border-indigo-300',
        ]) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "flex items-center gap-2 px-2 py-1 text-xs font-mono" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "text-indigo-600 font-semibold" },
});
(__VLS_ctx.node.tag);
if (__VLS_ctx.node.attributes['id']) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "text-orange-500" },
    });
    (__VLS_ctx.node.attributes["id"]);
}
if (__VLS_ctx.node.attributes['class']) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "text-green-600" },
    });
    (__VLS_ctx.node.attributes["class"].split(" ").join(" ."));
}
if (__VLS_ctx.node.attributes['aria-label']) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "ml-auto text-blue-500 text-xs" },
    });
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "ml-auto hidden group-hover:flex items-center gap-1" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.$emit('move', __VLS_ctx.node.id, 'up');
        } },
    type: "button",
    ...{ class: "text-gray-400 hover:text-gray-700" },
    title: "Move up",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.$emit('move', __VLS_ctx.node.id, 'down');
        } },
    type: "button",
    ...{ class: "text-gray-400 hover:text-gray-700" },
    title: "Move down",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.$emit('remove', __VLS_ctx.node.id);
        } },
    type: "button",
    ...{ class: "text-red-400 hover:text-red-600" },
    title: "Remove element",
});
if (__VLS_ctx.node.textContent) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: "px-3 pb-1 text-xs text-gray-500 italic" },
    });
    (__VLS_ctx.node.textContent);
}
if (__VLS_ctx.def?.allowChildren) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ onDragover: (...[$event]) => {
                if (!(__VLS_ctx.def?.allowChildren))
                    return;
                __VLS_ctx.isDragOver = true;
            } },
        ...{ onDragleave: (...[$event]) => {
                if (!(__VLS_ctx.def?.allowChildren))
                    return;
                __VLS_ctx.isDragOver = false;
            } },
        ...{ onDrop: (__VLS_ctx.onDrop) },
        ...{ class: "mx-2 mb-2 min-h-[40px] rounded border border-dashed border-gray-300 p-2" },
        ...{ class: ({ 'border-indigo-400 bg-indigo-50': __VLS_ctx.isDragOver }) },
    });
    for (const [child] of __VLS_getVForSourceType((__VLS_ctx.node.children))) {
        const __VLS_0 = {}.CanvasNode;
        /** @type {[typeof __VLS_components.CanvasNode, ]} */ ;
        // @ts-ignore
        const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
            ...{ 'onSelect': {} },
            ...{ 'onRemove': {} },
            ...{ 'onMove': {} },
            ...{ 'onDropInto': {} },
            key: (child.id),
            node: (child),
            selectedNodeId: (__VLS_ctx.selectedNodeId),
            draggedTag: (__VLS_ctx.draggedTag),
        }));
        const __VLS_2 = __VLS_1({
            ...{ 'onSelect': {} },
            ...{ 'onRemove': {} },
            ...{ 'onMove': {} },
            ...{ 'onDropInto': {} },
            key: (child.id),
            node: (child),
            selectedNodeId: (__VLS_ctx.selectedNodeId),
            draggedTag: (__VLS_ctx.draggedTag),
        }, ...__VLS_functionalComponentArgsRest(__VLS_1));
        let __VLS_4;
        let __VLS_5;
        let __VLS_6;
        const __VLS_7 = {
            onSelect: (...[$event]) => {
                if (!(__VLS_ctx.def?.allowChildren))
                    return;
                __VLS_ctx.$emit('select', $event);
            }
        };
        const __VLS_8 = {
            onRemove: (...[$event]) => {
                if (!(__VLS_ctx.def?.allowChildren))
                    return;
                __VLS_ctx.$emit('remove', $event);
            }
        };
        const __VLS_9 = {
            onMove: ((id, dir) => __VLS_ctx.$emit('move', id, dir))
        };
        const __VLS_10 = {
            onDropInto: (...[$event]) => {
                if (!(__VLS_ctx.def?.allowChildren))
                    return;
                __VLS_ctx.$emit('drop-into', $event);
            }
        };
        var __VLS_3;
    }
    if (!__VLS_ctx.node.children.length) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
            ...{ class: "text-center text-xs text-gray-400 py-2" },
        });
        (__VLS_ctx.node.tag);
    }
}
/** @type {__VLS_StyleScopedClasses['group']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['border-2']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['px-2']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
/** @type {__VLS_StyleScopedClasses['text-indigo-600']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-orange-500']} */ ;
/** @type {__VLS_StyleScopedClasses['text-green-600']} */ ;
/** @type {__VLS_StyleScopedClasses['ml-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['text-blue-500']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['ml-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['group-hover:flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-400']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-400']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['text-red-400']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:text-red-600']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['pb-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['italic']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-2']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['min-h-[40px]']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-dashed']} */ ;
/** @type {__VLS_StyleScopedClasses['border-gray-300']} */ ;
/** @type {__VLS_StyleScopedClasses['p-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-400']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
var __VLS_dollars;
let __VLS_self;
