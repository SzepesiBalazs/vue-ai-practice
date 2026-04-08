import { ref, readonly, computed } from "vue";
import type { HtmlNode, A11yIssue } from "@/types/html-builder";
import { elementDefinitions } from "@/data/html-elements";

function generateId(): string {
  return crypto.randomUUID().slice(0, 8);
}

export function useHtmlBuilder() {
  const nodes = ref<HtmlNode[]>([]);
  const selectedNodeId = ref<string | null>(null);
  const draggedTag = ref<string | null>(null);

  // --- Selected node (resolved) ---
  const selectedNode = computed<HtmlNode | null>(() => {
    if (!selectedNodeId.value) return null;
    return findNode(nodes.value, selectedNodeId.value);
  });

  // --- A11y audit ---
  const a11yIssues = computed<A11yIssue[]>(() => auditTree(nodes.value));

  // --- Serialized HTML output ---
  const htmlOutput = computed<string>(() => serializeNodes(nodes.value, 0));

  // --- Find a node anywhere in the tree ---
  function findNode(list: HtmlNode[], id: string): HtmlNode | null {
    for (const node of list) {
      if (node.id === id) return node;
      const found = findNode(node.children, id);
      if (found) return found;
    }
    return null;
  }

  // --- Drop an element onto the root or into a parent ---
  function dropElement(tag: string, parentId: string | null) {
    const def = elementDefinitions.find((d) => d.tag === tag);
    if (!def) return;

    const newNode: HtmlNode = {
      id: generateId(),
      tag,
      attributes: { ...def.defaultAttributes },
      textContent: def.defaultText,
      children: [],
    };

    if (parentId === null) {
      nodes.value.push(newNode);
    } else {
      const parent = findNode(nodes.value, parentId);
      if (parent) parent.children.push(newNode);
    }
    selectedNodeId.value = newNode.id;
  }

  // --- Remove a node from the tree ---
  function removeNode(id: string) {
    if (selectedNodeId.value === id) selectedNodeId.value = null;
    nodes.value = removeFromList(nodes.value, id);
  }

  function removeFromList(list: HtmlNode[], id: string): HtmlNode[] {
    return list
      .filter((n) => n.id !== id)
      .map((n) => ({ ...n, children: removeFromList(n.children, id) }));
  }

  // --- Update attribute on selected node ---
  function updateAttribute(nodeId: string, key: string, value: string) {
    const node = findNode(nodes.value, nodeId);
    if (!node) return;
    if (value === "") {
      delete node.attributes[key];
    } else {
      node.attributes[key] = value;
    }
  }

  // --- Update text content ---
  function updateTextContent(nodeId: string, text: string) {
    const node = findNode(nodes.value, nodeId);
    if (node) node.textContent = text;
  }

  // --- Move a node up or down within its parent's children list ---
  function moveNode(id: string, direction: "up" | "down") {
    moveInList(nodes.value, id, direction);
  }

  function moveInList(
    list: HtmlNode[],
    id: string,
    direction: "up" | "down",
  ): boolean {
    const idx = list.findIndex((n) => n.id === id);
    if (idx !== -1) {
      const target = direction === "up" ? idx - 1 : idx + 1;
      if (target < 0 || target >= list.length) return true;
      [list[idx], list[target]] = [list[target], list[idx]];
      return true;
    }
    for (const node of list) {
      if (moveInList(node.children, id, direction)) return true;
    }
    return false;
  }

  // --- Select a node ---
  function selectNode(id: string | null) {
    selectedNodeId.value = id;
  }

  // --- Set drag data ---
  function startDrag(tag: string) {
    draggedTag.value = tag;
  }

  function endDrag() {
    draggedTag.value = null;
  }

  // --- Clear the canvas ---
  function clearCanvas() {
    nodes.value = [];
    selectedNodeId.value = null;
  }

  // --- HTML serialization ---
  function serializeNodes(list: HtmlNode[], depth: number): string {
    const indent = "  ".repeat(depth);
    return list
      .map((node) => {
        const attrs = Object.entries(node.attributes)
          .filter(([, v]) => v !== "")
          .map(([k, v]) => ` ${k}="${v}"`)
          .join("");
        const voidTags = ["input", "img", "br", "hr", "meta", "link"];
        if (voidTags.includes(node.tag)) {
          return `${indent}<${node.tag}${attrs} />`;
        }
        const inner =
          node.children.length > 0
            ? `\n${serializeNodes(node.children, depth + 1)}\n${indent}`
            : node.textContent;
        return `${indent}<${node.tag}${attrs}>${inner}</${node.tag}>`;
      })
      .join("\n");
  }

  // --- Accessibility audit ---
  function auditTree(list: HtmlNode[]): A11yIssue[] {
    const issues: A11yIssue[] = [];
    const headingsFound: number[] = [];

    function walk(nodeList: HtmlNode[]) {
      for (const node of nodeList) {
        // img must have alt
        if (node.tag === "img" && node.attributes["alt"] === undefined) {
          issues.push({
            nodeId: node.id,
            severity: "error",
            message: `<img> is missing an alt attribute`,
            fix: 'Add alt="" for decorative images or a descriptive alt for meaningful ones.',
          });
        }

        // input/textarea/select must have a label
        if (["input", "textarea", "select"].includes(node.tag)) {
          const hasId = !!node.attributes["id"];
          const hasAriaLabel = !!node.attributes["aria-label"];
          const hasAriaLabelledBy = !!node.attributes["aria-labelledby"];
          if (!hasId && !hasAriaLabel && !hasAriaLabelledBy) {
            issues.push({
              nodeId: node.id,
              severity: "error",
              message: `<${node.tag}> has no accessible label`,
              fix: 'Add an id and pair with a <label for="...">, or add aria-label.',
            });
          }
        }

        // button must have text or aria-label
        if (
          node.tag === "button" &&
          !node.textContent.trim() &&
          !node.attributes["aria-label"]
        ) {
          issues.push({
            nodeId: node.id,
            severity: "error",
            message: "<button> has no accessible name",
            fix: "Add visible text content or an aria-label attribute.",
          });
        }

        // a must have text or aria-label
        if (
          node.tag === "a" &&
          !node.textContent.trim() &&
          !node.attributes["aria-label"]
        ) {
          issues.push({
            nodeId: node.id,
            severity: "error",
            message: "<a> link has no accessible name",
            fix: "Add link text or an aria-label.",
          });
        }

        // heading order check
        const headingMatch = node.tag.match(/^h([1-6])$/);
        if (headingMatch) {
          const level = Number(headingMatch[1]);
          const last = headingsFound[headingsFound.length - 1];
          if (last !== undefined && level > last + 1) {
            issues.push({
              nodeId: node.id,
              severity: "warning",
              message: `<${node.tag}> skips a heading level (previous was h${last})`,
              fix: `Use h${last + 1} before h${level}, or restructure content.`,
            });
          }
          headingsFound.push(level);
        }

        // section should have aria-labelledby or aria-label
        if (
          node.tag === "section" &&
          !node.attributes["aria-labelledby"] &&
          !node.attributes["aria-label"]
        ) {
          issues.push({
            nodeId: node.id,
            severity: "warning",
            message: "<section> has no accessible name",
            fix: "Add aria-labelledby pointing to a heading inside, or aria-label.",
          });
        }

        walk(node.children);
      }
    }

    walk(list);
    return issues;
  }

  return {
    nodes: readonly(nodes),
    selectedNodeId: readonly(selectedNodeId),
    selectedNode,
    a11yIssues,
    htmlOutput,
    draggedTag: readonly(draggedTag),
    dropElement,
    removeNode,
    updateAttribute,
    updateTextContent,
    moveNode,
    selectNode,
    startDrag,
    endDrag,
    clearCanvas,
  };
}
