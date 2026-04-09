import { computed, defineComponent } from "vue";
export default defineComponent({
    props: {
        rect: { type: Object, default: null },
        severity: { type: String, default: "error" },
        label: { type: String, default: "" },
    },
    setup(props) {
        const overlayStyle = computed(() => {
            if (!props.rect)
                return {};
            return {
                top: `${props.rect.top + window.scrollY}px`,
                left: `${props.rect.left + window.scrollX}px`,
                width: `${props.rect.width}px`,
                height: `${props.rect.height}px`,
            };
        });
        return { overlayStyle };
    },
});
debugger; /* PartiallyEnd: #3632/script.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
if (__VLS_ctx.rect) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        'data-a11y-ignore': true,
        ...{ class: "pointer-events-none fixed z-[9998] transition-all duration-100" },
        ...{ style: (__VLS_ctx.overlayStyle) },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div)({
        ...{ class: "absolute inset-0 border-2" },
        ...{ class: ({
                'border-red-500 bg-red-500/10': __VLS_ctx.severity === 'error',
                'border-amber-400 bg-amber-400/10': __VLS_ctx.severity === 'warning',
                'border-blue-400 bg-blue-400/10': __VLS_ctx.severity === 'notice',
            }) },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "absolute -top-6 left-0 whitespace-nowrap rounded px-1.5 py-0.5 text-xs font-semibold text-white" },
        ...{ class: ({
                'bg-red-500': __VLS_ctx.severity === 'error',
                'bg-amber-400': __VLS_ctx.severity === 'warning',
                'bg-blue-400': __VLS_ctx.severity === 'notice',
            }) },
    });
    (__VLS_ctx.label);
}
/** @type {__VLS_StyleScopedClasses['pointer-events-none']} */ ;
/** @type {__VLS_StyleScopedClasses['fixed']} */ ;
/** @type {__VLS_StyleScopedClasses['z-[9998]']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-100']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
/** @type {__VLS_StyleScopedClasses['border-2']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['-top-6']} */ ;
/** @type {__VLS_StyleScopedClasses['left-0']} */ ;
/** @type {__VLS_StyleScopedClasses['whitespace-nowrap']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['px-1.5']} */ ;
/** @type {__VLS_StyleScopedClasses['py-0.5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
var __VLS_dollars;
let __VLS_self;
