<template>
  <div
    class="flex flex-wrap items-center gap-4 rounded-lg border border-gray-200 bg-white px-5 py-3 shadow-sm"
    data-a11y-ignore
  >
    <div
      v-if="summary.total === 0"
      class="flex items-center gap-2 text-green-600"
    >
      <svg
        class="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span class="text-sm font-medium">No issues found</span>
    </div>
    <template v-else>
      <div class="flex items-center gap-1.5 text-red-600">
        <span class="text-lg font-bold leading-none">{{ summary.errors }}</span>
        <span class="text-xs">error{{ summary.errors !== 1 ? "s" : "" }}</span>
      </div>
      <div class="h-4 w-px bg-gray-200" />
      <div class="flex items-center gap-1.5 text-amber-500">
        <span class="text-lg font-bold leading-none">{{
          summary.warnings
        }}</span>
        <span class="text-xs"
          >warning{{ summary.warnings !== 1 ? "s" : "" }}</span
        >
      </div>
      <div class="h-4 w-px bg-gray-200" />
      <div class="flex items-center gap-1.5 text-blue-500">
        <span class="text-lg font-bold leading-none">{{
          summary.notices
        }}</span>
        <span class="text-xs"
          >notice{{ summary.notices !== 1 ? "s" : "" }}</span
        >
      </div>
    </template>
    <div class="ml-auto flex gap-4 text-xs text-gray-400">
      <span v-if="elementCount !== undefined"
        >{{ elementCount }} elements scanned</span
      >
      <span v-if="scannedAt">{{ formattedTime }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, type PropType } from "vue";

export default defineComponent({
  props: {
    summary: {
      type: Object as PropType<{
        total: number;
        errors: number;
        warnings: number;
        notices: number;
      }>,
      required: true,
    },
    elementCount: { type: Number, default: undefined },
    scannedAt: { type: Date as PropType<Date | null>, default: null },
  },
  setup(props) {
    const formattedTime = computed(() => {
      if (!props.scannedAt) return "";
      return props.scannedAt.toLocaleTimeString();
    });
    return { formattedTime };
  },
});
</script>
