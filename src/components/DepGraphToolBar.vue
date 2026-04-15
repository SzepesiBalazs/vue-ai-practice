<template>
  <div class="flex flex-wrap items-center gap-2">
    <!-- Package manager -->
    <div class="relative">
      <select
        :value="packageManager"
        @change="
          $emit(
            'update:packageManager',
            ($event.target as HTMLSelectElement).value,
          )
        "
        class="appearance-none rounded-lg border border-gray-300 bg-white py-1.5 pl-3 pr-8 text-sm text-gray-700 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
      >
        <option value="npm">npm</option>
        <option value="yarn">yarn</option>
        <option value="pnpm">pnpm</option>
      </select>
      <svg
        class="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400"
        width="14"
        height="14"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
          clip-rule="evenodd"
        />
      </svg>
    </div>

    <!-- Search -->
    <input
      type="search"
      :value="searchQuery"
      placeholder="Search packages…"
      @input="
        $emit('update:searchQuery', ($event.target as HTMLInputElement).value)
      "
      class="w-44 rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
    />

    <!-- Max depth -->
    <div class="relative">
      <select
        :value="maxDepth"
        @change="
          $emit(
            'update:maxDepth',
            Number(($event.target as HTMLSelectElement).value),
          )
        "
        class="appearance-none rounded-lg border border-gray-300 bg-white py-1.5 pl-3 pr-8 text-sm text-gray-700 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
      >
        <option :value="1">Depth: 1</option>
        <option :value="2">Depth: 2</option>
        <option :value="3">Depth: 3</option>
        <option :value="99">Depth: All</option>
      </select>
      <svg
        class="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400"
        width="14"
        height="14"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
          clip-rule="evenodd"
        />
      </svg>
    </div>

    <!-- Show dev deps -->
    <label
      class="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 select-none"
    >
      <input
        type="checkbox"
        :checked="showDevDeps"
        @change="
          $emit(
            'update:showDevDeps',
            ($event.target as HTMLInputElement).checked,
          )
        "
        class="rounded accent-indigo-500"
      />
      Show dev deps
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import type { PackageManager } from "@/types/dependency-graph";

export default defineComponent({
  props: {
    packageManager: {
      type: String as PropType<PackageManager>,
      required: true,
    },
    searchQuery: { type: String, required: true },
    maxDepth: { type: Number, required: true },
    showDevDeps: { type: Boolean, required: true },
  },
  emits: [
    "update:packageManager",
    "update:searchQuery",
    "update:maxDepth",
    "update:showDevDeps",
  ],
});
</script>
