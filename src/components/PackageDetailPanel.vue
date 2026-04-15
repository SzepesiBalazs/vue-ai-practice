<template>
  <aside
    v-if="node"
    class="flex flex-col gap-3 rounded-lg border border-gray-200 bg-white p-5 shadow-sm"
  >
    <div>
      <h2 class="text-lg font-bold text-gray-800">{{ node.name }}</h2>
      <p class="text-sm text-gray-500">{{ node.version }}</p>
    </div>

    <div class="flex flex-wrap gap-2">
      <span
        :class="kindBadge(node.kind)"
        class="rounded-full px-2.5 py-0.5 text-xs font-medium"
      >
        {{ node.kind }}
      </span>
      <span
        v-if="node.license"
        class="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-600"
      >
        {{ node.license }}
      </span>
    </div>

    <div v-if="node.requiredBy.length">
      <p
        class="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-400"
      >
        Required by
      </p>
      <ul class="space-y-0.5">
        <li
          v-for="dep in node.requiredBy"
          :key="dep"
          class="cursor-pointer text-sm text-indigo-600 hover:underline"
          @click="$emit('select', dep)"
        >
          {{ dep }}
        </li>
      </ul>
    </div>

    <div v-if="node.size" class="text-sm text-gray-500">
      Install size: {{ formatSize(node.size) }}
    </div>

    <a
      :href="npmUrl(node.name)"
      target="_blank"
      rel="noopener noreferrer"
      class="mt-auto inline-flex items-center gap-1 text-sm text-indigo-600 hover:underline"
    >
      View on npm ↗
    </a>
  </aside>

  <div
    v-else
    class="flex h-full items-center justify-center rounded-lg border border-dashed border-gray-300 p-8 text-sm text-gray-400"
  >
    Click a node to inspect it
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import type { PackageNode, DepKind } from "@/types/dependency-graph";

function kindBadge(kind: DepKind): string {
  const map: Record<DepKind, string> = {
    direct: "bg-indigo-100 text-indigo-700",
    transitive: "bg-sky-100 text-sky-700",
    dev: "bg-emerald-100 text-emerald-700",
    peer: "bg-amber-100 text-amber-700",
    optional: "bg-rose-100 text-rose-700",
  };
  return map[kind] ?? map.direct;
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} kB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default defineComponent({
  props: {
    node: { type: Object as PropType<PackageNode | null>, default: null },
    npmUrl: {
      type: Function as PropType<(name: string) => string>,
      required: true,
    },
  },
  emits: ["select"],
  setup() {
    return { kindBadge, formatSize };
  },
});
</script>
