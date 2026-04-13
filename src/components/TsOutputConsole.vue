<template>
  <div
    class="rounded-lg bg-gray-900 p-4 font-mono text-sm min-h-[120px]"
    role="log"
    aria-label="Output"
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
        line.kind === 'type-error'
          ? 'text-red-400'
          : line.kind === 'error'
            ? 'text-red-400'
            : line.kind === 'warn'
              ? 'text-yellow-400'
              : 'text-green-300',
      ]"
    >
      <span v-if="line.kind === 'type-error'" class="text-red-500 font-bold"
        >◆ TYPE
      </span>
      <span v-else aria-hidden="true" class="text-gray-500">&gt; </span
      >{{ line.value }}
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import type { OutputLine } from "@/types/ts-explorer";

export default defineComponent({
  props: {
    lines: { type: Array as PropType<OutputLine[]>, required: true },
    transpileError: { type: String as PropType<string | null>, default: null },
  },
});
</script>
