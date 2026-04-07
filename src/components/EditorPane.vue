<template>
  <div class="flex flex-col gap-4">
    <div>
      <label
        for="html-editor"
        class="mb-1 block text-sm font-semibold text-gray-700"
        >HTML</label
      >
      <textarea
        id="html-editor"
        :value="htmlSource"
        @input="
          $emit(
            'update:htmlSource',
            ($event.target as HTMLTextAreaElement).value,
          )
        "
        class="h-40 w-full rounded-lg border border-gray-300 bg-gray-900 p-3 font-mono text-sm text-green-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        spellcheck="false"
      ></textarea>
    </div>
    <div>
      <label
        for="css-editor"
        class="mb-1 block text-sm font-semibold text-gray-700"
        >CSS</label
      >
      <textarea
        id="css-editor"
        :value="cssSource"
        @input="
          $emit(
            'update:cssSource',
            ($event.target as HTMLTextAreaElement).value,
          )
        "
        class="h-56 w-full rounded-lg border border-gray-300 bg-gray-900 p-3 font-mono text-sm text-blue-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        spellcheck="false"
      ></textarea>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    htmlSource: { type: String, required: true },
    cssSource: { type: String, required: true },
  },
  emits: ["update:htmlSource", "update:cssSource"],
  setup() {
    return {};
  },
});
</script>
