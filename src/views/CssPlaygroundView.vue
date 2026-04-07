<template>
  <div class="mx-auto max-w-7xl space-y-6">
    <h1 class="text-2xl font-bold text-gray-800">Live CSS Playground</h1>

    <PresetPicker
      :presets="allPresets"
      :activeName="activePreset.name"
      @select="loadPreset"
    />

    <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <!-- Editor side -->
      <EditorPane
        :htmlSource="htmlSource"
        :cssSource="cssSource"
        @update:htmlSource="htmlSource = $event"
        @update:cssSource="cssSource = $event"
      />

      <!-- Preview side -->
      <div class="space-y-3">
        <BreakpointBar
          :breakpoints="breakpointOptions"
          :activeName="activeBreakpoint.name"
          @select="setBreakpoint"
        />
        <PreviewPane
          :previewDocument="previewDocument"
          :previewWidth="previewWidth"
        />
      </div>
    </div>

    <PropertyPanel
      :panelType="activePreset.panelType"
      :getCssProperty="getCssProperty"
      :updateCssProperty="updateCssProperty"
    />
  </div>
</template>

<script lang="ts">
import { onBeforeMount } from "vue";
import { useCssPlayground } from "@/composables/useCssPlayground";
import { allPresets, breakpointOptions } from "@/data/css-presets";
import EditorPane from "@/components/EditorPane.vue";
import PreviewPane from "@/components/PreviewPane.vue";
import PresetPicker from "@/components/PresetPicker.vue";
import BreakpointBar from "@/components/BreakpointBar.vue";
import PropertyPanel from "@/components/PropertyPanel.vue";

export default {
  components: {
    EditorPane,
    PreviewPane,
    PresetPicker,
    BreakpointBar,
    PropertyPanel,
  },
  setup() {
    const {
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
      init,
    } = useCssPlayground();

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
};
</script>
