import { onBeforeMount } from "vue";
import { useCssPlayground } from "@/composables/useCssPlayground";
import { allPresets, breakpointOptions } from "@/data/css-presets";
import EditorPane from "@/components/EditorPane.vue";
import PreviewPane from "@/components/PreviewPane.vue";
import PresetPicker from "@/components/PresetPicker.vue";
import BreakpointBar from "@/components/BreakpointBar.vue";
import PropertyPanel from "@/components/PropertyPanel.vue";
export default (await import('vue')).defineComponent({
    components: {
        EditorPane,
        PreviewPane,
        PresetPicker,
        BreakpointBar,
        PropertyPanel,
    },
    setup() {
        const { htmlSource, cssSource, activePreset, activeBreakpoint, previewDocument, previewWidth, loadPreset, updateCssProperty, getCssProperty, setBreakpoint, init, } = useCssPlayground();
        onBeforeMount(() => init());
        return {
            htmlSource,
            cssSource,
            activePreset,
            activeBreakpoint,
            previewDocument,
            previewWidth,
            loadPreset,
            updateCssProperty,
            getCssProperty,
            setBreakpoint,
            allPresets,
            breakpointOptions,
        };
    },
});
const __VLS_ctx = {};
const __VLS_componentsOption = {
    EditorPane,
    PreviewPane,
    PresetPicker,
    BreakpointBar,
    PropertyPanel,
};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "mx-auto max-w-7xl space-y-6" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({
    ...{ class: "text-2xl font-bold text-gray-800" },
});
const __VLS_0 = {}.PresetPicker;
/** @type {[typeof __VLS_components.PresetPicker, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ 'onSelect': {} },
    presets: (__VLS_ctx.allPresets),
    activeName: (__VLS_ctx.activePreset.name),
}));
const __VLS_2 = __VLS_1({
    ...{ 'onSelect': {} },
    presets: (__VLS_ctx.allPresets),
    activeName: (__VLS_ctx.activePreset.name),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_4;
let __VLS_5;
let __VLS_6;
const __VLS_7 = {
    onSelect: (__VLS_ctx.loadPreset)
};
var __VLS_3;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "grid grid-cols-1 gap-6 lg:grid-cols-2" },
});
const __VLS_8 = {}.EditorPane;
/** @type {[typeof __VLS_components.EditorPane, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
    ...{ 'onUpdate:htmlSource': {} },
    ...{ 'onUpdate:cssSource': {} },
    htmlSource: (__VLS_ctx.htmlSource),
    cssSource: (__VLS_ctx.cssSource),
}));
const __VLS_10 = __VLS_9({
    ...{ 'onUpdate:htmlSource': {} },
    ...{ 'onUpdate:cssSource': {} },
    htmlSource: (__VLS_ctx.htmlSource),
    cssSource: (__VLS_ctx.cssSource),
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
let __VLS_12;
let __VLS_13;
let __VLS_14;
const __VLS_15 = {
    'onUpdate:htmlSource': (...[$event]) => {
        __VLS_ctx.htmlSource = $event;
    }
};
const __VLS_16 = {
    'onUpdate:cssSource': (...[$event]) => {
        __VLS_ctx.cssSource = $event;
    }
};
var __VLS_11;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "space-y-3" },
});
const __VLS_17 = {}.BreakpointBar;
/** @type {[typeof __VLS_components.BreakpointBar, ]} */ ;
// @ts-ignore
const __VLS_18 = __VLS_asFunctionalComponent(__VLS_17, new __VLS_17({
    ...{ 'onSelect': {} },
    breakpoints: (__VLS_ctx.breakpointOptions),
    activeName: (__VLS_ctx.activeBreakpoint.name),
}));
const __VLS_19 = __VLS_18({
    ...{ 'onSelect': {} },
    breakpoints: (__VLS_ctx.breakpointOptions),
    activeName: (__VLS_ctx.activeBreakpoint.name),
}, ...__VLS_functionalComponentArgsRest(__VLS_18));
let __VLS_21;
let __VLS_22;
let __VLS_23;
const __VLS_24 = {
    onSelect: (__VLS_ctx.setBreakpoint)
};
var __VLS_20;
const __VLS_25 = {}.PreviewPane;
/** @type {[typeof __VLS_components.PreviewPane, ]} */ ;
// @ts-ignore
const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({
    previewDocument: (__VLS_ctx.previewDocument),
    previewWidth: (__VLS_ctx.previewWidth),
}));
const __VLS_27 = __VLS_26({
    previewDocument: (__VLS_ctx.previewDocument),
    previewWidth: (__VLS_ctx.previewWidth),
}, ...__VLS_functionalComponentArgsRest(__VLS_26));
const __VLS_29 = {}.PropertyPanel;
/** @type {[typeof __VLS_components.PropertyPanel, ]} */ ;
// @ts-ignore
const __VLS_30 = __VLS_asFunctionalComponent(__VLS_29, new __VLS_29({
    panelType: (__VLS_ctx.activePreset.panelType),
    getCssProperty: (__VLS_ctx.getCssProperty),
    updateCssProperty: (__VLS_ctx.updateCssProperty),
}));
const __VLS_31 = __VLS_30({
    panelType: (__VLS_ctx.activePreset.panelType),
    getCssProperty: (__VLS_ctx.getCssProperty),
    updateCssProperty: (__VLS_ctx.updateCssProperty),
}, ...__VLS_functionalComponentArgsRest(__VLS_30));
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-7xl']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-6']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-800']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-cols-1']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-6']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:grid-cols-2']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-3']} */ ;
var __VLS_dollars;
let __VLS_self;
