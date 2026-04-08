<template>
  <aside class="flex flex-col gap-4">
    <div
      v-if="!node"
      class="rounded-lg border border-gray-200 bg-white p-4 text-sm text-gray-400"
    >
      Select an element to edit its properties.
    </div>

    <div
      v-else
      class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
    >
      <h3
        class="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500"
      >
        &lt;{{ node.tag }}&gt; Properties
      </h3>

      <!-- Text content -->
      <div v-if="node.textContent !== undefined" class="mb-3">
        <label class="block text-xs font-medium text-gray-600 mb-1"
          >Text content</label
        >
        <input
          :value="node.textContent"
          type="text"
          class="w-full rounded border border-gray-300 px-2 py-1 text-sm font-mono"
          @input="
            $emit(
              'update-text',
              node.id,
              ($event.target as HTMLInputElement).value,
            )
          "
        />
      </div>

      <!-- Attributes -->
      <div class="flex flex-col gap-2">
        <div
          v-for="(value, key) in node.attributes"
          :key="key"
          class="flex items-center gap-2"
        >
          <label class="w-28 shrink-0 text-xs font-mono text-indigo-600">{{
            key
          }}</label>
          <input
            :value="value"
            type="text"
            class="flex-1 rounded border border-gray-300 px-2 py-1 text-sm font-mono"
            @input="
              $emit(
                'update-attr',
                node.id,
                key,
                ($event.target as HTMLInputElement).value,
              )
            "
          />
        </div>
      </div>

      <!-- Add new attribute -->
      <div class="mt-3 flex gap-2">
        <input
          v-model="newAttrKey"
          type="text"
          placeholder="aria-label, role…"
          class="flex-1 rounded border border-gray-300 px-2 py-1 text-xs font-mono"
        />
        <button
          type="button"
          class="rounded bg-indigo-600 px-2 py-1 text-xs font-medium text-white hover:bg-indigo-700"
          @click="addAttribute"
        >
          + Attr
        </button>
      </div>

      <!-- Delete -->
      <button
        type="button"
        class="mt-4 w-full rounded border border-red-300 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"
        @click="$emit('remove', node.id)"
      >
        Remove &lt;{{ node.tag }}&gt;
      </button>
    </div>
  </aside>
</template>

<script lang="ts">
import { defineComponent, ref, type PropType } from "vue";
import type { HtmlNode } from "@/types/html-builder";

export default defineComponent({
  props: {
    node: { type: Object as PropType<HtmlNode | null>, default: null },
  },
  emits: ["update-attr", "update-text", "remove"],
  setup(props, { emit }) {
    const newAttrKey = ref("");

    function addAttribute() {
      if (!props.node || !newAttrKey.value.trim()) return;
      emit("update-attr", props.node.id, newAttrKey.value.trim(), "");
      newAttrKey.value = "";
    }

    return { newAttrKey, addAttribute };
  },
});
</script>
