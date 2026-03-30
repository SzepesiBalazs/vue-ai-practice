<template>
  <div
    class="rounded-lg border border-gray-700 bg-gray-900 p-4 font-mono text-sm text-green-400"
  >
    <div class="mb-2 flex items-center gap-2 border-b border-gray-700 pb-2">
      <span class="h-3 w-3 rounded-full bg-red-500"></span>
      <span class="h-3 w-3 rounded-full bg-yellow-500"></span>
      <span class="h-3 w-3 rounded-full bg-green-500"></span>
      <span class="ml-2 text-xs text-gray-400">Terminal</span>
    </div>
    <div ref="logContainer" class="max-h-64 overflow-y-auto">
      <div v-if="log.length === 0" class="text-gray-500">
        Click "Next Step" to start the workflow...
      </div>
      <div
        v-for="(line, i) in log"
        :key="i"
        :class="[
          'py-0.5 leading-relaxed',
          i === log.length - 1 ? 'font-bold text-white' : 'text-green-400',
        ]"
      >
        {{ line }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, watch, nextTick } from "vue";

export default {
  props: {
    log: { type: Array as () => readonly string[], required: true },
  },
  setup(props) {
    const logContainer = ref<HTMLElement | null>(null);

    watch(
      () => props.log.length,
      () => {
        nextTick(() => {
          if (logContainer.value) {
            logContainer.value.scrollTop = logContainer.value.scrollHeight;
          }
        });
      },
    );

    return { logContainer };
  },
};
</script>
