import { defineComponent } from "vue";
export default defineComponent({
    props: {
        activeFilter: { type: String, required: true },
        filterOptions: {
            type: Array,
            required: true,
        },
    },
    emits: ["filter"],
    setup() {
        return {};
    },
});
debugger; /* PartiallyEnd: #3632/script.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "flex flex-wrap gap-2" },
    'data-a11y-ignore': true,
});
for (const [option] of __VLS_getVForSourceType((__VLS_ctx.filterOptions))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.$emit('filter', option.value);
            } },
        key: (option.value),
        type: "button",
        ...{ class: "rounded-full px-3 py-1 text-xs font-medium transition-colors" },
        ...{ class: (__VLS_ctx.activeFilter === option.value
                ? 'bg-indigo-600 text-white'
                : 'border border-gray-300 bg-white text-gray-600 hover:border-indigo-400') },
    });
    (option.label);
    if (option.count !== undefined) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "ml-1 opacity-75" },
        });
        (option.count);
    }
}
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-wrap']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['ml-1']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-75']} */ ;
var __VLS_dollars;
let __VLS_self;
