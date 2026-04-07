<template>
  <div
    v-if="panelType !== 'none'"
    class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
  >
    <h3
      class="mb-3 text-sm font-semibold text-gray-600 uppercase tracking-wide"
    >
      Quick Controls
    </h3>

    <!-- Flex controls -->
    <div v-if="panelType === 'flex'" class="flex flex-wrap gap-4">
      <div>
        <label for="flex-direction" class="mb-1 block text-xs text-gray-500"
          >flex-direction</label
        >
        <select
          id="flex-direction"
          :value="getCssProperty('flex-direction')"
          @change="
            updateCssProperty(
              'flex-direction',
              ($event.target as HTMLSelectElement).value,
            )
          "
          class="rounded border border-gray-300 px-2 py-1 text-sm"
        >
          <option value="row">row</option>
          <option value="row-reverse">row-reverse</option>
          <option value="column">column</option>
          <option value="column-reverse">column-reverse</option>
        </select>
      </div>
      <div>
        <label for="justify-content" class="mb-1 block text-xs text-gray-500"
          >justify-content</label
        >
        <select
          id="justify-content"
          :value="getCssProperty('justify-content')"
          @change="
            updateCssProperty(
              'justify-content',
              ($event.target as HTMLSelectElement).value,
            )
          "
          class="rounded border border-gray-300 px-2 py-1 text-sm"
        >
          <option value="flex-start">flex-start</option>
          <option value="flex-end">flex-end</option>
          <option value="center">center</option>
          <option value="space-between">space-between</option>
          <option value="space-around">space-around</option>
          <option value="space-evenly">space-evenly</option>
        </select>
      </div>
      <div>
        <label for="align-items" class="mb-1 block text-xs text-gray-500"
          >align-items</label
        >
        <select
          id="align-items"
          :value="getCssProperty('align-items')"
          @change="
            updateCssProperty(
              'align-items',
              ($event.target as HTMLSelectElement).value,
            )
          "
          class="rounded border border-gray-300 px-2 py-1 text-sm"
        >
          <option value="stretch">stretch</option>
          <option value="flex-start">flex-start</option>
          <option value="flex-end">flex-end</option>
          <option value="center">center</option>
          <option value="baseline">baseline</option>
        </select>
      </div>
      <div>
        <label for="flex-wrap" class="mb-1 block text-xs text-gray-500"
          >flex-wrap</label
        >
        <select
          id="flex-wrap"
          :value="getCssProperty('flex-wrap')"
          @change="
            updateCssProperty(
              'flex-wrap',
              ($event.target as HTMLSelectElement).value,
            )
          "
          class="rounded border border-gray-300 px-2 py-1 text-sm"
        >
          <option value="nowrap">nowrap</option>
          <option value="wrap">wrap</option>
          <option value="wrap-reverse">wrap-reverse</option>
        </select>
      </div>
      <div>
        <label for="flex-gap" class="mb-1 block text-xs text-gray-500"
          >gap</label
        >
        <input
          id="flex-gap"
          type="range"
          min="0"
          max="40"
          :value="parseInt(getCssProperty('gap')) || 0"
          @input="
            updateCssProperty(
              'gap',
              ($event.target as HTMLInputElement).value + 'px',
            )
          "
          class="w-24"
        />
        <span class="ml-1 text-xs text-gray-500">{{
          getCssProperty("gap")
        }}</span>
      </div>
    </div>

    <!-- Grid controls -->
    <div v-if="panelType === 'grid'" class="flex flex-wrap gap-4">
      <div>
        <label
          for="grid-template-columns"
          class="mb-1 block text-xs text-gray-500"
          >grid-template-columns</label
        >
        <select
          id="grid-template-columns"
          :value="getCssProperty('grid-template-columns')"
          @change="
            updateCssProperty(
              'grid-template-columns',
              ($event.target as HTMLSelectElement).value,
            )
          "
          class="rounded border border-gray-300 px-2 py-1 text-sm"
        >
          <option value="repeat(2, 1fr)">2 columns</option>
          <option value="repeat(3, 1fr)">3 columns</option>
          <option value="repeat(4, 1fr)">4 columns</option>
          <option value="1fr 2fr">1fr 2fr</option>
          <option value="2fr 1fr">2fr 1fr</option>
          <option value="1fr 1fr 2fr">1fr 1fr 2fr</option>
        </select>
      </div>
      <div>
        <label for="grid-gap" class="mb-1 block text-xs text-gray-500"
          >gap</label
        >
        <input
          id="grid-gap"
          type="range"
          min="0"
          max="40"
          :value="parseInt(getCssProperty('gap')) || 0"
          @input="
            updateCssProperty(
              'gap',
              ($event.target as HTMLInputElement).value + 'px',
            )
          "
          class="w-24"
        />
        <span class="ml-1 text-xs text-gray-500">{{
          getCssProperty("gap")
        }}</span>
      </div>
    </div>

    <!-- Responsive controls: just breakpoint switcher info -->
    <div v-if="panelType === 'responsive'" class="text-sm text-gray-600">
      Use the breakpoint bar above the preview to test different screen widths.
      Edit the <code class="rounded bg-gray-100 px-1">@media</code> rules in the
      CSS editor.
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";

export default defineComponent({
  props: {
    panelType: {
      type: String as PropType<"flex" | "grid" | "responsive" | "none">,
      required: true,
    },
    getCssProperty: {
      type: Function as PropType<(prop: string) => string>,
      required: true,
    },
    updateCssProperty: {
      type: Function as PropType<(prop: string, val: string) => void>,
      required: true,
    },
  },
  setup() {
    return {};
  },
});
</script>
