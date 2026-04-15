<template>
  <div class="flex flex-wrap items-center gap-4 text-xs">
    <span
      v-for="item in items"
      :key="item.label"
      class="flex items-center gap-1.5"
    >
      <span
        class="inline-block h-3 w-3 rounded-full"
        :class="item.color"
      ></span>
      {{ item.label }}
    </span>
  </div>
</template>

<script lang="ts">
export default {
  setup() {
    const items = [
      { label: "Root", color: "bg-slate-800" },
      { label: "Direct", color: "bg-indigo-500" },
      { label: "Transitive", color: "bg-sky-400" },
      { label: "Dev", color: "bg-emerald-500" },
      { label: "Peer", color: "bg-amber-500" },
      { label: "Optional", color: "bg-rose-400" },
    ];
    return { items };
  },
};
</script>
