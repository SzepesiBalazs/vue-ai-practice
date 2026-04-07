<template>
  <div class="flex flex-col items-center">
    <div
      class="overflow-hidden rounded-lg border border-gray-300 bg-white transition-all duration-300"
      :style="{ width: previewWidth }"
    >
      <iframe
        ref="previewFrame"
        :srcdoc="previewDocument"
        sandbox="allow-scripts"
        class="h-96 w-full border-0"
        title="CSS Preview"
      ></iframe>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    previewDocument: { type: String, required: true },
    previewWidth: { type: String, required: true },
  },
  setup() {
    return {};
  },
});
</script>
