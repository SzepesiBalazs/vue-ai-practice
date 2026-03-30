import { ref, readonly, onBeforeUnmount } from 'vue'

export interface ElementInfo {
  tagName: string
  id: string
  classList: readonly string[]
  rect: DOMRectReadOnly
}

export function useInspector() {
  const inspecting = ref(false)
  const hoveredInfo = ref<ElementInfo | null>(null)
  const selectedInfo = ref<ElementInfo | null>(null)
  const overlayRect = ref<DOMRect | null>(null)
  const lastPointerPosition = ref<{ x: number; y: number } | null>(null)

  function getElementInfo(el: HTMLElement): ElementInfo {
    return {
      tagName: el.tagName.toLowerCase(),
      id: el.id,
      classList: Array.from(el.classList),
      rect: el.getBoundingClientRect(),
    }
  }

  function updateHoveredElement(clientX: number, clientY: number) {
    const el = document.elementFromPoint(clientX, clientY) as HTMLElement | null
    if (!el || el.closest('[data-inspector-ignore]')) {
      hoveredInfo.value = null
      overlayRect.value = null
      return
    }

    const info = getElementInfo(el)
    hoveredInfo.value = info
    overlayRect.value = info.rect
  }

  function onMouseMove(e: MouseEvent) {
    if (!inspecting.value) return
    lastPointerPosition.value = { x: e.clientX, y: e.clientY }
    updateHoveredElement(e.clientX, e.clientY)
  }

  function onMouseDown(e: MouseEvent) {
    if (!inspecting.value) return
    e.preventDefault()
    e.stopPropagation()
    const el = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null
    if (!el || el.closest('[data-inspector-ignore]')) return
    selectedInfo.value = getElementInfo(el)
  }

  function onScroll() {
    if (!inspecting.value || !lastPointerPosition.value) return
    updateHoveredElement(lastPointerPosition.value.x, lastPointerPosition.value.y)
  }

  function onKeyDown(e: KeyboardEvent) {
    if (e.ctrlKey && e.shiftKey && e.key === 'C') {
      e.preventDefault()
      toggleInspecting()
    }
  }

  function startInspecting() {
    inspecting.value = true
    lastPointerPosition.value = null
    document.addEventListener('mousemove', onMouseMove, true)
    document.addEventListener('mousedown', onMouseDown, true)
    document.addEventListener('scroll', onScroll, true)
    document.addEventListener('keydown', onKeyDown)
  }

  function stopInspecting() {
    inspecting.value = false
    hoveredInfo.value = null
    overlayRect.value = null
    lastPointerPosition.value = null
    document.removeEventListener('mousemove', onMouseMove, true)
    document.removeEventListener('mousedown', onMouseDown, true)
    document.removeEventListener('scroll', onScroll, true)
    document.removeEventListener('keydown', onKeyDown)
  }

  function toggleInspecting() {
    inspecting.value ? stopInspecting() : startInspecting()
  }

  onBeforeUnmount(() => stopInspecting())

  return {
    inspecting: readonly(inspecting),
    hoveredInfo: readonly(hoveredInfo),
    selectedInfo: readonly(selectedInfo),
    overlayRect: readonly(overlayRect),
    startInspecting,
    stopInspecting,
    toggleInspecting,
  }
}
