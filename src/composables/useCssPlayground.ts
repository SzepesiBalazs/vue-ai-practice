import { ref, readonly, computed } from "vue";
import type { CssPreset, BreakpointOption } from "@/types/css-playground";
import { flexboxPreset, breakpointOptions } from "@/data/css-presets";

function escapeRegExp(str: string): string {
  return str.replaceAll(/[.*+?^${}()|[\]\\]/g, String.raw`\$&`);
}

export function useCssPlayground() {
  const htmlSource = ref("");
  const cssSource = ref("");
  const activePreset = ref<CssPreset>(flexboxPreset);
  const activeBreakpoint = ref<BreakpointOption>(
    breakpointOptions.find((b) => b.name === "full") ??
      breakpointOptions.at(-1)!,
  );

  // --- Computed: combined preview document ---
  const previewDocument = computed(() => {
    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>${cssSource.value}</style>
</head>
<body style="margin:0;padding:0;">
  ${htmlSource.value}
</body>
</html>`;
  });

  // --- Computed: preview container width ---
  const previewWidth = computed(() => {
    if (activeBreakpoint.value.width === 0) return "100%";
    return `${activeBreakpoint.value.width}px`;
  });

  // --- Load a preset ---
  function loadPreset(preset: CssPreset) {
    activePreset.value = preset;
    htmlSource.value = preset.html;
    cssSource.value = preset.css;
  }

  // --- Update CSS from property panel controls ---
  function updateCssProperty(property: string, value: string) {
    const regex = new RegExp(
      String.raw`(${escapeRegExp(property)}\s*:\s*)([^;]+)(;)`,
    );
    if (regex.test(cssSource.value)) {
      cssSource.value = cssSource.value.replace(regex, `$1${value}$3`);
    }
  }

  // --- Extract current value of a CSS property from .container rule ---
  function getCssProperty(property: string): string {
    const regex = new RegExp(
      String.raw`${escapeRegExp(property)}\s*:\s*([^;]+);`,
    );
    const match = regex.exec(cssSource.value);
    return match ? match[1].trim() : "";
  }

  // --- Set breakpoint ---
  function setBreakpoint(bp: BreakpointOption) {
    activeBreakpoint.value = bp;
  }

  // --- Initialize with default preset ---
  function init() {
    loadPreset(flexboxPreset);
  }

  return {
    htmlSource,
    cssSource,
    activePreset: readonly(activePreset),
    activeBreakpoint: readonly(activeBreakpoint),
    previewDocument,
    previewWidth,
    loadPreset,
    updateCssProperty,
    getCssProperty,
    setBreakpoint,
    init,
  };
}
