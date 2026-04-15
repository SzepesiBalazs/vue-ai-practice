<template>
  <div class="mx-auto max-w-screen-xl space-y-4">
    <h1 class="text-2xl font-bold text-gray-800">Dependency Graph</h1>

    <DepGraphToolBar
      v-model:packageManager="packageManager"
      v-model:searchQuery="searchQuery"
      v-model:maxDepth="maxDepth"
      v-model:showDevDeps="showDevDeps"
    />

    <div class="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_280px]">
      <div
        class="h-[560px] overflow-hidden rounded-xl border border-gray-200 bg-slate-50"
      >
        <DepGraphCanvas
          :nodes="layoutNodes"
          :edges="filteredEdges"
          :selectedId="selectedNodeId"
          @select="selectNode"
        />
      </div>

      <PackageDetailPanel
        :node="selectedNode"
        :npmUrl="npmUrl"
        @select="selectNode"
      />
    </div>

    <DepGraphLegendBar />
  </div>
</template>

<script lang="ts">
import { useDependencyGraph } from "@/composables/useDependencyGraph";
import DepGraphCanvas from "@/components/DepGraphCanvas.vue";
import PackageDetailPanel from "@/components/PackageDetailPanel.vue";
import DepGraphToolBar from "@/components/DepGraphToolBar.vue";
import DepGraphLegendBar from "@/components/DepGraphLegendBar.vue";

export default {
  components: {
    DepGraphCanvas,
    PackageDetailPanel,
    DepGraphToolBar,
    DepGraphLegendBar,
  },
  setup() {
    const {
      filteredEdges,
      layoutNodes,
      selectedNode,
      selectedNodeId,
      packageManager,
      showDevDeps,
      maxDepth,
      searchQuery,
      selectNode,
      npmUrl,
    } = useDependencyGraph();

    return {
      filteredEdges,
      layoutNodes,
      selectedNode,
      selectedNodeId,
      packageManager,
      showDevDeps,
      maxDepth,
      searchQuery,
      selectNode,
      npmUrl,
    };
  },
};
</script>
