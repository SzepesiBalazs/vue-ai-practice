<template>
  <div
    v-if="commit"
    class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
  >
    <h3 class="mb-2 text-sm font-semibold text-gray-500 uppercase tracking-wide">Commit Details</h3>
    <dl class="space-y-2 text-sm">
      <div>
        <dt class="font-medium text-gray-600">ID</dt>
        <dd class="font-mono text-indigo-600">{{ commit.id }}</dd>
      </div>
      <div>
        <dt class="font-medium text-gray-600">Message</dt>
        <dd>{{ commit.message }}</dd>
      </div>
      <div>
        <dt class="font-medium text-gray-600">Branch</dt>
        <dd>{{ commit.branchName }}</dd>
      </div>
      <div>
        <dt class="font-medium text-gray-600">Parents</dt>
        <dd class="font-mono">{{ commit.parentIds.length ? commit.parentIds.join(', ') : '(root)' }}</dd>
      </div>
      <div>
        <dt class="font-medium text-gray-600">Time</dt>
        <dd>{{ new Date(commit.timestamp).toLocaleString() }}</dd>
      </div>
    </dl>
  </div>
</template>

<script lang="ts">
import type { Commit } from '@/types/git-graph'

export default {
  props: {
    commit: { type: Object as () => Commit | null, default: null },
  },
  setup() {
    return {}
  },
}
</script>
