import { defineComponent, ref } from "vue";
export default defineComponent({
    setup(_, { expose }) {
        const containerRef = ref(null);
        function getRoot() {
            return containerRef.value;
        }
        expose({ getRoot });
        return { containerRef };
    },
});
debugger; /* PartiallyEnd: #3632/script.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ref: "containerRef",
    ...{ class: "relative" },
});
/** @type {typeof __VLS_ctx.containerRef} */ ;
var __VLS_0 = {};
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
// @ts-ignore
var __VLS_1 = __VLS_0;
var __VLS_dollars;
let __VLS_self;
