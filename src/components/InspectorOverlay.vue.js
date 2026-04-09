import { computed, defineComponent } from 'vue';
export default defineComponent({
    props: {
        rect: {
            type: Object,
            default: null,
        },
        label: { type: String, default: '' },
    },
    setup(props) {
        const overlayStyle = computed(() => {
            if (!props.rect)
                return {};
            return {
                top: `${props.rect.top}px`,
                left: `${props.rect.left}px`,
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
        'data-inspector-ignore': true,
        ...{ class: "pointer-events-none fixed z-[9999] border-2 border-blue-500 bg-blue-500/10 transition-all duration-75" },
        ...{ style: (__VLS_ctx.overlayStyle) },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "absolute -top-6 left-0 rounded bg-blue-600 px-1.5 py-0.5 text-xs text-white whitespace-nowrap" },
    });
    (__VLS_ctx.label);
}
/** @type {__VLS_StyleScopedClasses['pointer-events-none']} */ ;
/** @type {__VLS_StyleScopedClasses['fixed']} */ ;
/** @type {__VLS_StyleScopedClasses['z-[9999]']} */ ;
/** @type {__VLS_StyleScopedClasses['border-2']} */ ;
/** @type {__VLS_StyleScopedClasses['border-blue-500']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-blue-500/10']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-75']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['-top-6']} */ ;
/** @type {__VLS_StyleScopedClasses['left-0']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-blue-600']} */ ;
/** @type {__VLS_StyleScopedClasses['px-1.5']} */ ;
/** @type {__VLS_StyleScopedClasses['py-0.5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['whitespace-nowrap']} */ ;
var __VLS_dollars;
let __VLS_self;
