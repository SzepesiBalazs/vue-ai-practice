<template>
  <textarea
    :value="modelValue"
    :disabled="disabled"
    class="h-full w-full rounded-lg border border-gray-300 bg-gray-900 p-3 font-mono text-sm text-green-300 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none"
    spellcheck="false"
    autocomplete="off"
    autocorrect="off"
    @input="
      $emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)
    "
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    modelValue: { type: String, required: true },
    disabled: { type: Boolean, default: false },
  },
  emits: ["update:modelValue"],
  setup() {
    return {};
  },
});
</script>
