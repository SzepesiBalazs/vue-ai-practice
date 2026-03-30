<template>
  <aside
    v-if="info"
    data-inspector-ignore
    class="fixed bottom-4 right-4 z-[9999] w-72 rounded-lg border border-gray-200 bg-white p-4 shadow-lg text-sm font-mono"
  >
    <h3 class="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
      Inspector
    </h3>
    <p>
      <span class="text-purple-600">&lt;{{ info.tagName }}&gt;</span>
      <span v-if="info.id" class="ml-1 text-orange-500">#{{ info.id }}</span>
    </p>
    <p v-if="info.classList.length" class="mt-1 text-green-600">
      .{{ info.classList.join(' .') }}
    </p>
    <p class="mt-2 text-gray-500">
      {{ Math.round(info.rect.width) }} &times; {{ Math.round(info.rect.height) }}px
    </p>
  </aside>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import type { ElementInfo } from '../composables/useInspector'

export default defineComponent({
  props: {
    info: {
      type: Object as PropType<ElementInfo | null>,
      default: null,
    },
  },
  setup() {
    return {}
  },
})
</script>
