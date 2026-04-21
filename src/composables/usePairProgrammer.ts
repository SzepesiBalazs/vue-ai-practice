import { ref } from "vue";

export function usePairProgrammer() {
  const panelOpen = ref(false);

  function openPanel() {
    panelOpen.value = true;
  }
  function closePanel() {
    panelOpen.value = false;
  }
  function togglePanel() {
    panelOpen.value = !panelOpen.value;
  }

  return { panelOpen, openPanel, closePanel, togglePanel };
}
