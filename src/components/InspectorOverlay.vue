<template>
  <div
    v-if="rect"
    data-inspector-ignore
    class="pointer-events-none fixed z-[9999] border-2 border-blue-500 bg-blue-500/10 transition-all duration-75"
    :style="overlayStyle"
  >
    <span
      class="absolute -top-6 left-0 rounded bg-blue-600 px-1.5 py-0.5 text-xs text-white whitespace-nowrap"
    >
      {{ label }}
    </span>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, type PropType } from 'vue'

export default defineComponent({
  props: {
    rect: {
      type: Object as PropType<DOMRectReadOnly | null>,
      default: null,
    },
    label: { type: String, default: '' },
  },
  setup(props) {
    const overlayStyle = computed(() => {
      if (!props.rect) return {}
      return {
        top: `${props.rect.top}px`,
        left: `${props.rect.left}px`,
        width: `${props.rect.width}px`,
        height: `${props.rect.height}px`,
      }
    })

    return { overlayStyle }
  },
})
</script>
