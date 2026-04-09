<template>
  <div class="mx-auto max-w-screen-2xl space-y-4">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-gray-800">Semantic HTML Builder</h1>
      <button
        type="button"
        class="rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100"
        @click="clearCanvas"
      >
        Clear canvas
      </button>
    </div>

    <div class="grid grid-cols-[220px_1fr_280px] gap-4">
      <!-- Left: palette -->
      <ElementPalette @drag-start="startDrag" @drag-end="endDrag" />

      <!-- Center: canvas + output -->
      <div class="flex flex-col gap-4">
        <CanvasArea
          :nodes="nodes"
          :selectedNodeId="selectedNodeId"
          :draggedTag="draggedTag"
          @select="selectNode"
          @remove="removeNode"
          @move="moveNode"
          @drop-into="({ tag, parentId }) => dropElement(tag, parentId)"
          @root-drop="() => draggedTag && dropElement(draggedTag, null)"
        />
        <HtmlOutput :html="htmlOutput" />
      </div>

      <!-- Right: properties + a11y -->
      <div class="flex flex-col gap-4">
        <PropertiesPanel
          :node="selectedNode"
          @update-attr="updateAttribute"
          @update-text="updateTextContent"
          @remove="removeNode"
        />
        <A11yPanel :issues="a11yIssues" @select-node="selectNode" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useHtmlBuilder } from "@/composables/useHtmlBuilder";
import ElementPalette from "@/components/ElementPalette.vue";
import CanvasArea from "@/components/CanvasArea.vue";
import PropertiesPanel from "@/components/PropertiesPanel.vue";
import A11yPanel from "@/components/A11yPanel.vue";
import HtmlOutput from "@/components/HtmlOutput.vue";

export default {
  components: {
    ElementPalette,
    CanvasArea,
    PropertiesPanel,
    A11yPanel,
    HtmlOutput,
  },
  setup() {
    const {
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
    } = useHtmlBuilder();

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
};
</script>
