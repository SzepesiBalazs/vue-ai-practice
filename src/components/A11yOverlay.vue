<template>
  <div
    v-if="rect"
    data-a11y-ignore
    class="pointer-events-none fixed z-[9998] transition-all duration-100"
    :style="overlayStyle"
  >
    <div
      class="absolute inset-0 border-2"
      :class="{
        'border-red-500 bg-red-500/10': severity === 'error',
        'border-amber-400 bg-amber-400/10': severity === 'warning',
        'border-blue-400 bg-blue-400/10': severity === 'notice',
      }"
    />
    <span
      class="absolute -top-6 left-0 whitespace-nowrap rounded px-1.5 py-0.5 text-xs font-semibold text-white"
      :class="{
        'bg-red-500': severity === 'error',
        'bg-amber-400': severity === 'warning',
        'bg-blue-400': severity === 'notice',
      }"
    >
      {{ label }}
    </span>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, type PropType } from "vue";
import type { IssueSeverity } from "@/types/a11y-checker";

export default defineComponent({
  props: {
    rect: { type: Object as PropType<DOMRect | null>, default: null },
    severity: { type: String as PropType<IssueSeverity>, default: "error" },
    label: { type: String, default: "" },
  },
  setup(props) {
    const overlayStyle = computed(() => {
      if (!props.rect) return {};
      return {
        top: `${props.rect.top + window.scrollY}px`,
        left: `${props.rect.left + window.scrollX}px`,
        width: `${props.rect.width}px`,
        height: `${props.rect.height}px`,
      };
    });

    return { overlayStyle };
  },
});
</script>
