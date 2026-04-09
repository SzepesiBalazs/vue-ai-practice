<template>
  <div
    class="output-console rounded-lg bg-gray-900 p-4 font-mono text-sm min-h-[120px]"
    role="log"
    aria-label="Console output"
    aria-live="polite"
  >
    <p v-if="lines.length === 0" class="text-gray-500 italic">
      Run your code to see output.
    </p>
    <p
      v-for="(line, i) in lines"
      :key="i"
      :class="[
        'leading-6',
        line.type === 'error'
          ? 'text-red-400'
          : line.type === 'warn'
            ? 'text-yellow-400'
            : 'text-green-300',
      ]"
    >
      <span aria-hidden="true" class="text-gray-500">&gt; </span
      >{{ line.value }}
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import type { OutputLine } from "@/types/js-explorer";

export default defineComponent({
  props: {
    lines: { type: Array as PropType<OutputLine[]>, required: true },
    errorMessage: { type: String as PropType<string | null>, default: null },
  },
  setup() {
    return {};
  },
});
</script>
