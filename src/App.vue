<template>
  <header>
    <div class="wrapper">
      <nav class="bg-indigo-800">
        <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div class="relative flex h-16 items-center justify-between">
            <!-- Mobile menu button -->
            <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                type="button"
                class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                <span class="sr-only">Menu</span>
                <svg
                  class="block size-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </button>
            </div>
            <!-- Desktop nav links -->
            <div
              class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start"
            >
              <div class="hidden sm:ml-6 sm:block">
                <div class="flex space-x-4">
                  <RouterLink
                    class="rounded-md px-3 py-2 text-sm font-medium text-white"
                    :to="{ name: 'home' }"
                    >Home</RouterLink
                  >
                  <RouterLink
                    class="rounded-md px-3 py-2 text-sm font-medium text-white"
                    :to="{ name: 'git-graph' }"
                    >Git Graph</RouterLink
                  >
                  <RouterLink
                    class="rounded-md px-3 py-2 text-sm font-medium text-white"
                    :to="{ name: 'css-playground' }"
                    >CSS Playground</RouterLink
                  >
                  <RouterLink
                    class="rounded-md px-3 py-2 text-sm font-medium text-white"
                    :to="{ name: 'html-builder' }"
                    >HTML Builder</RouterLink
                  >
                  <RouterLink
                    class="rounded-md px-3 py-2 text-sm font-medium text-white"
                    :to="{ name: 'a11y-checker' }"
                    >A11y Checker</RouterLink
                  >
                  <RouterLink
                    class="rounded-md px-3 py-2 text-sm font-medium text-white"
                    :to="{ name: 'js-explorer' }"
                    >JS Explorer</RouterLink
                  >
                  <RouterLink
                    class="rounded-md px-3 py-2 text-sm font-medium text-white"
                    :to="{ name: 'ts-explorer' }"
                    >TS Explorer</RouterLink
                  >
                  <RouterLink
                    class="rounded-md px-3 py-2 text-sm font-medium text-white"
                    :to="{ name: 'go-explorer' }"
                    >Go Explorer</RouterLink
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Mobile menu -->
        <div class="sm:hidden" id="mobile-menu">
          <div class="space-y-1 px-2 pb-3 pt-2">
            <RouterLink
              class="block rounded-md px-3 py-2 text-base font-medium text-white"
              to="/"
              >Home</RouterLink
            >
            <RouterLink
              class="block rounded-md px-3 py-2 text-base font-medium text-white"
              to="/git-graph"
              >Git Graph</RouterLink
            >
            <RouterLink
              class="block rounded-md px-3 py-2 text-base font-medium text-white"
              to="/css-playground"
              >CSS Playground</RouterLink
            >
            <RouterLink
              class="block rounded-md px-3 py-2 text-base font-medium text-white"
              to="/html-builder"
              >HTML Builder</RouterLink
            >
            <RouterLink
              class="block rounded-md px-3 py-2 text-base font-medium text-white"
              to="/a11y-checker"
              >A11y Checker</RouterLink
            >
            <RouterLink
              class="block rounded-md px-3 py-2 text-base font-medium text-white"
              to="/js-explorer"
              >JS Explorer</RouterLink
            >
            <RouterLink
              class="block rounded-md px-3 py-2 text-base font-medium text-white"
              to="/ts-explorer"
              >TS Explorer</RouterLink
            >
            <RouterLink
              class="block rounded-md px-3 py-2 text-base font-medium text-white"
              to="/go-explorer"
              >Go Explorer</RouterLink
            >
          </div>
        </div>
      </nav>
    </div>
  </header>
  <div class="pt-6 pl-10 pr-10 pb-8 bg-indigo-100 min-h-screen">
    <RouterView></RouterView>
  </div>

  <!-- Inspector toggle button -->
  <button
    data-inspector-ignore
    class="fixed bottom-4 left-4 z-[9999] rounded-full p-2 shadow-lg"
    :class="inspecting ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'"
    @click="toggleInspecting"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
      />
    </svg>
  </button>

  <!-- Inspector UI -->
  <InspectorOverlay :rect="overlayRect" :label="hoveredInfo?.tagName ?? ''" />
  <InspectorPanel :info="selectedInfo" />
</template>

<script lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { useInspector } from "./composables/useInspector";
import InspectorOverlay from "./components/InspectorOverlay.vue";
import InspectorPanel from "./components/InspectorPanel.vue";

export default {
  components: { RouterLink, RouterView, InspectorOverlay, InspectorPanel },
  setup() {
    const {
      inspecting,
      hoveredInfo,
      selectedInfo,
      overlayRect,
      toggleInspecting,
    } = useInspector();

    return {
      inspecting,
      hoveredInfo,
      selectedInfo,
      overlayRect,
      toggleInspecting,
    };
  },
};
</script>
