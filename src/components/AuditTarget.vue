<template>
  <div ref="containerRef" class="relative">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup(_, { expose }) {
    const containerRef = ref<HTMLElement | null>(null);

    function getRoot(): HTMLElement | null {
      return containerRef.value;
    }

    expose({ getRoot });
    return { containerRef };
  },
});
</script>
