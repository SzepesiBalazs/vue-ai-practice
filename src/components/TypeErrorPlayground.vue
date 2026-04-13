<template>
  <div class="flex gap-6">
    <!-- Scenario list sidebar -->
    <aside class="w-64 shrink-0">
      <div class="rounded-lg bg-white p-4 shadow-sm border border-gray-200">
        <ErrorScenarioList
          :scenarios="errorScenarios"
          :activeId="selectedId"
          @select="selectedId = $event"
        />
      </div>
    </aside>

    <!-- Error workspace -->
    <main class="min-w-0 flex-1">
      <ErrorWorkspace :scenario="selected" />
    </main>
  </div>
</template>

<script lang="ts">
import { ref, computed, defineComponent } from "vue";
import { errorScenarios } from "@/data/ts-error-scenarios";
import type { ErrorScenario } from "@/types/ts-explorer";
import ErrorScenarioList from "./ErrorScenarioList.vue";
import ErrorWorkspace from "./ErrorWorkspace.vue";

export default defineComponent({
  components: { ErrorScenarioList, ErrorWorkspace },
  setup() {
    const selectedId = ref<string>(errorScenarios[0].id);

    const selected = computed<ErrorScenario>(
      () => errorScenarios.find((s) => s.id === selectedId.value)!,
    );

    return { errorScenarios, selectedId, selected };
  },
});
</script>
