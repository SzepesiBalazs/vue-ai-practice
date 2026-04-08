import { describe, it, expect } from "vitest";
import { useHtmlBuilder } from "@/composables/useHtmlBuilder";

describe("useHtmlBuilder", () => {
  it("drops an element onto the root", () => {
    const { nodes, dropElement } = useHtmlBuilder();
    dropElement("header", null);
    expect(nodes.value).toHaveLength(1);
    expect(nodes.value[0].tag).toBe("header");
  });

  it("drops an element into a parent", () => {
    const { nodes, dropElement } = useHtmlBuilder();
    dropElement("main", null);
    const parentId = nodes.value[0].id;
    dropElement("h1", parentId);
    expect(nodes.value[0].children).toHaveLength(1);
    expect(nodes.value[0].children[0].tag).toBe("h1");
  });

  it("removes a node", () => {
    const { nodes, dropElement, removeNode } = useHtmlBuilder();
    dropElement("header", null);
    const id = nodes.value[0].id;
    removeNode(id);
    expect(nodes.value).toHaveLength(0);
  });

  it("updates an attribute", () => {
    const { nodes, dropElement, updateAttribute } = useHtmlBuilder();
    dropElement("img", null);
    const id = nodes.value[0].id;
    updateAttribute(id, "alt", "A photo of a cat");
    expect(nodes.value[0].attributes["alt"]).toBe("A photo of a cat");
  });

  it("flags img missing alt as an error", () => {
    const { nodes, dropElement, updateAttribute, a11yIssues } =
      useHtmlBuilder();
    dropElement("img", null);
    const id = nodes.value[0].id;
    // Remove the alt attribute by updating it to empty so composable deletes it
    updateAttribute(id, "alt", "");
    expect(
      a11yIssues.value.some((i) => i.message.includes("missing an alt")),
    ).toBe(true);
  });

  it("flags a heading skip as a warning", () => {
    const { dropElement, a11yIssues } = useHtmlBuilder();
    dropElement("h1", null);
    dropElement("h3", null); // skips h2
    expect(
      a11yIssues.value.some((i) => i.message.includes("skips a heading level")),
    ).toBe(true);
  });

  it("serializes nodes to HTML", () => {
    const { dropElement, htmlOutput } = useHtmlBuilder();
    dropElement("main", null);
    expect(htmlOutput.value).toContain("<main>");
    expect(htmlOutput.value).toContain("</main>");
  });
});
