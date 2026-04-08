<template>
  <div class="rounded-lg border border-gray-200 bg-gray-900 shadow-sm">
    <div
      class="flex items-center justify-between border-b border-gray-700 px-4 py-2"
    >
      <span class="text-xs font-medium text-gray-400">Generated HTML</span>
      <button
        type="button"
        class="rounded px-2 py-1 text-xs text-gray-400 hover:bg-gray-700 hover:text-white"
        @click="copy"
      >
        {{ copied ? "Copied!" : "Copy" }}
      </button>
    </div>
    <pre
      class="overflow-x-auto p-4 text-xs text-green-400 font-mono leading-relaxed whitespace-pre"
    >{{ html || '<!-- start dragging elements -->' }}</pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  props: {
    html: { type: String, required: true },
  },
  setup(props) {
    const copied = ref(false);

    async function copy() {
      if (!props.html) return;
      await navigator.clipboard.writeText(props.html);
      copied.value = true;
      setTimeout(() => (copied.value = false), 2000);
    }

    return { copied, copy };
  },
});
</script>
