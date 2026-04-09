import type { A11yRule } from "@/types/a11y-checker";

function parseRgb(color: string): [number, number, number] | null {
  const rgbRegex = /rgba?\((\d+),\s*(\d+),\s*(\d+)/;
  const m = rgbRegex.exec(color);
  if (!m) return null;
  return [Number(m[1]), Number(m[2]), Number(m[3])];
}

function toLinear(c: number): number {
  const s = c / 255;
  return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
}

function luminance(r: number, g: number, b: number): number {
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

function contrastRatio(l1: number, l2: number): number {
  const [lighter, darker] = l1 > l2 ? [l1, l2] : [l2, l1];
  return (lighter + 0.05) / (darker + 0.05);
}

function getContrastRatio(el: HTMLElement): number | null {
  const style = globalThis.getComputedStyle(el);
  const fg = parseRgb(style.color);
  const bg = parseRgb(style.backgroundColor);
  if (!fg || !bg) return null;
  if (style.backgroundColor === "rgba(0, 0, 0, 0)") return null;
  return contrastRatio(luminance(...fg), luminance(...bg));
}

export const a11yRules: A11yRule[] = [
  {
    id: "contrast-normal-text",
    category: "contrast",
    severity: "error",
    description: "Normal text must have a contrast ratio of at least 4.5:1",
    wcag: "1.4.3",
    selector:
      "p, span, li, td, th, label, a, h1, h2, h3, h4, h5, h6, button, legend",
    test(el) {
      const style = globalThis.getComputedStyle(el);
      const fontSize = Number.parseFloat(style.fontSize);
      const fontWeight = style.fontWeight;
      const isLargeText =
        fontSize >= 24 ||
        (fontSize >= 18.67 &&
          (fontWeight === "bold" || Number(fontWeight) >= 700));
      if (isLargeText) return null;
      const ratio = getContrastRatio(el);
      if (ratio === null) return null;
      if (ratio < 4.5) {
        return `Contrast ratio ${ratio.toFixed(2)}:1 is below the 4.5:1 minimum for normal text`;
      }
      return null;
    },
  },
  {
    id: "contrast-large-text",
    category: "contrast",
    severity: "error",
    description: "Large text must have a contrast ratio of at least 3:1",
    wcag: "1.4.3",
    selector: "p, span, li, td, th, label, a, h1, h2, h3, h4, h5, h6, button",
    test(el) {
      const style = globalThis.getComputedStyle(el);
      const fontSize = Number.parseFloat(style.fontSize);
      const fontWeight = style.fontWeight;
      const isLargeText =
        fontSize >= 24 ||
        (fontSize >= 18.67 &&
          (fontWeight === "bold" || Number(fontWeight) >= 700));
      if (!isLargeText) return null;
      const ratio = getContrastRatio(el);
      if (ratio === null) return null;
      if (ratio < 3) {
        return `Contrast ratio ${ratio.toFixed(2)}:1 is below the 3:1 minimum for large text`;
      }
      return null;
    },
  },
  {
    id: "input-missing-label",
    category: "label",
    severity: "error",
    description: "Form inputs must have an accessible label",
    wcag: "1.3.1",
    selector:
      'input:not([type="hidden"]):not([type="submit"]):not([type="button"]):not([type="reset"]), textarea, select',
    test(el, root) {
      const id = el.getAttribute("id");
      const ariaLabel = el.getAttribute("aria-label");
      const ariaLabelledBy = el.getAttribute("aria-labelledby");
      const title = el.getAttribute("title");
      if (ariaLabel || ariaLabelledBy || title) return null;
      if (id && root.querySelector(`label[for="${id}"]`)) return null;
      if (el.closest("label")) return null;
      return "Input has no associated label (id+for, aria-label, aria-labelledby, or wrapping label)";
    },
  },
  {
    id: "label-empty",
    category: "label",
    severity: "warning",
    description: "Label elements must have non-empty text",
    wcag: "1.3.1",
    selector: "label",
    test(el) {
      if (!el.textContent?.trim()) {
        return "Label element is empty - screen readers will announce nothing";
      }
      return null;
    },
  },
  {
    id: "img-missing-alt",
    category: "image",
    severity: "error",
    description: "Images must have an alt attribute",
    wcag: "1.1.1",
    selector: "img",
    test(el) {
      if (!el.hasAttribute("alt")) {
        return "<img> is missing an alt attribute entirely";
      }
      return null;
    },
  },
  {
    id: "img-alt-filename",
    category: "image",
    severity: "warning",
    description: "Alt text should not be a filename",
    wcag: "1.1.1",
    selector: "img[alt]",
    test(el) {
      const alt = el.getAttribute("alt") ?? "";
      if (/\.(png|jpe?g|gif|svg|webp|bmp)$/i.test(alt)) {
        return `Alt text "${alt}" looks like a filename - use a meaningful description`;
      }
      return null;
    },
  },
  {
    id: "aria-role-button-label",
    category: "aria",
    severity: "error",
    description: 'Elements with role="button" must have an accessible name',
    wcag: "4.1.2",
    selector: '[role="button"]',
    test(el) {
      const ariaLabel = el.getAttribute("aria-label");
      const ariaLabelledBy = el.getAttribute("aria-labelledby");
      const text = el.textContent?.trim();
      const title = el.getAttribute("title");
      if (!text && !ariaLabel && !ariaLabelledBy && !title) {
        return 'Element with role="button" has no accessible name';
      }
      return null;
    },
  },
  {
    id: "aria-hidden-focusable",
    category: "aria",
    severity: "error",
    description: 'Elements with aria-hidden="true" must not be focusable',
    wcag: "4.1.2",
    selector: '[aria-hidden="true"]',
    test(el) {
      const focusable = el.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length > 0) {
        return `aria-hidden="true" element contains ${focusable.length} focusable child(ren) - they will be unreachable by keyboard`;
      }
      return null;
    },
  },
  {
    id: "aria-required-attr",
    category: "aria",
    severity: "error",
    description: "ARIA roles must have their required attributes",
    wcag: "4.1.2",
    selector: "[role]",
    test(el) {
      const role = el.getAttribute("role");
      const requiredAttrs: Record<string, string[]> = {
        checkbox: ["aria-checked"],
        combobox: ["aria-expanded"],
        slider: ["aria-valuenow", "aria-valuemin", "aria-valuemax"],
        scrollbar: [
          "aria-valuenow",
          "aria-valuemin",
          "aria-valuemax",
          "aria-controls",
        ],
        progressbar: ["aria-valuenow"],
      };
      if (!role || !requiredAttrs[role]) return null;
      const missing = requiredAttrs[role].filter(
        (attr) => !el.hasAttribute(attr),
      );
      if (missing.length) {
        return `role="${role}" is missing required attribute(s): ${missing.join(", ")}`;
      }
      return null;
    },
  },
  {
    id: "tabindex-positive",
    category: "focus",
    severity: "warning",
    description:
      "Avoid positive tabindex values - they disrupt natural focus order",
    wcag: "2.4.3",
    selector: "[tabindex]",
    test(el) {
      const val = Number(el.getAttribute("tabindex"));
      if (val > 0) {
        return `tabindex="${val}" disrupts the natural tab order - use 0 or -1 instead`;
      }
      return null;
    },
  },
  {
    id: "interactive-disabled-focus",
    category: "focus",
    severity: "notice",
    description: "Disabled interactive elements should not be focusable",
    wcag: "2.1.1",
    selector: "[disabled][tabindex]",
    test(el) {
      if (el.getAttribute("tabindex") !== "-1") {
        return 'Disabled element is still in the tab order - add tabindex="-1" to remove it';
      }
      return null;
    },
  },
  {
    id: "heading-empty",
    category: "heading",
    severity: "error",
    description: "Heading elements must not be empty",
    wcag: "2.4.6",
    selector: "h1, h2, h3, h4, h5, h6",
    test(el) {
      if (!el.textContent?.trim()) {
        return `<${el.tagName.toLowerCase()}> is empty - remove it or add meaningful text`;
      }
      return null;
    },
  },
  {
    id: "heading-skip-level",
    category: "heading",
    severity: "warning",
    description: "Heading levels should not be skipped",
    wcag: "1.3.1",
    selector: "h1, h2, h3, h4, h5, h6",
    test(el, root) {
      const level = Number(el.tagName[1]);
      const allHeadings = Array.from(
        root.querySelectorAll("h1,h2,h3,h4,h5,h6"),
      );
      const idx = allHeadings.indexOf(el);
      if (idx === 0) return null;
      const prevLevel = Number(allHeadings[idx - 1].tagName[1]);
      if (level > prevLevel + 1) {
        return `<h${level}> skips from h${prevLevel} - use h${prevLevel + 1} to maintain hierarchy`;
      }
      return null;
    },
  },
  {
    id: "landmark-main-missing",
    category: "landmark",
    severity: "warning",
    description: "Page should contain a <main> landmark",
    wcag: "1.3.6",
    selector: "body",
    test(el) {
      if (!el.querySelector('main, [role="main"]')) {
        return "No <main> landmark found - screen reader users cannot jump to main content";
      }
      return null;
    },
  },
  {
    id: "landmark-duplicate-main",
    category: "landmark",
    severity: "error",
    description: "Page must not have more than one <main> landmark",
    wcag: "1.3.6",
    selector: "body",
    test(el) {
      const mains = el.querySelectorAll('main, [role="main"]');
      if (mains.length > 1) {
        return `Found ${mains.length} <main> landmarks - only one is allowed per page`;
      }
      return null;
    },
  },
  {
    id: "nav-missing-label",
    category: "landmark",
    severity: "warning",
    description:
      "Multiple <nav> elements should be distinguished with aria-label",
    wcag: "2.4.1",
    selector: "nav",
    test(el, root) {
      const navCount = root.querySelectorAll('nav, [role="navigation"]').length;
      if (navCount < 2) return null;
      if (
        !el.getAttribute("aria-label") &&
        !el.getAttribute("aria-labelledby")
      ) {
        return "Page has multiple <nav> elements - add aria-label to distinguish them";
      }
      return null;
    },
  },
  {
    id: "html-lang-missing",
    category: "language",
    severity: "error",
    description: "The <html> element must have a lang attribute",
    wcag: "3.1.1",
    selector: "html",
    test(el) {
      if (!el.getAttribute("lang")) {
        return "<html> is missing a lang attribute - screen readers need this to select the correct voice";
      }
      return null;
    },
  },
  {
    id: "html-lang-valid",
    category: "language",
    severity: "error",
    description: "The lang attribute must be a valid BCP 47 language tag",
    wcag: "3.1.1",
    selector: "html[lang]",
    test(el) {
      const lang = el.getAttribute("lang") ?? "";
      if (!/^[a-zA-Z]{2,3}(-[a-zA-Z0-9]{2,8})*$/.test(lang)) {
        return `lang="${lang}" is not a valid BCP 47 tag (examples: "en", "en-US", "fr-FR")`;
      }
      return null;
    },
  },
];
