import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { useA11yChecker } from "@/composables/useA11yChecker";

function makeRoot(html: string): HTMLElement {
  const div = document.createElement("div");
  div.innerHTML = html;
  document.body.appendChild(div);
  return div;
}

describe("useA11yChecker", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("flags an img missing alt", () => {
    const root = makeRoot('<img src="photo.jpg">');
    const { scan, result } = useA11yChecker();
    scan(root);
    expect(
      result.value?.issues.some((i) => i.ruleId === "img-missing-alt"),
    ).toBe(true);
  });

  it('passes an img with alt=""', () => {
    const root = makeRoot('<img src="photo.jpg" alt="">');
    const { scan, result } = useA11yChecker();
    scan(root);
    expect(
      result.value?.issues.some((i) => i.ruleId === "img-missing-alt"),
    ).toBe(false);
  });

  it("flags an input with no label", () => {
    const root = makeRoot('<input type="text">');
    const { scan, result } = useA11yChecker();
    scan(root);
    expect(
      result.value?.issues.some((i) => i.ruleId === "input-missing-label"),
    ).toBe(true);
  });

  it("passes an input with aria-label", () => {
    const root = makeRoot('<input type="text" aria-label="Search">');
    const { scan, result } = useA11yChecker();
    scan(root);
    expect(
      result.value?.issues.some((i) => i.ruleId === "input-missing-label"),
    ).toBe(false);
  });

  it("flags a heading skip", () => {
    const root = makeRoot("<h1>Title</h1><h3>Sub</h3>");
    const { scan, result } = useA11yChecker();
    scan(root);
    expect(
      result.value?.issues.some((i) => i.ruleId === "heading-skip-level"),
    ).toBe(true);
  });

  it("filters issues by severity", () => {
    const root = makeRoot('<img src="x.jpg">');
    const { scan, filteredIssues, setFilter } = useA11yChecker();
    scan(root);
    setFilter("error");
    expect(filteredIssues.value.every((i) => i.severity === "error")).toBe(
      true,
    );
  });

  it("summary counts match issue list", () => {
    const root = makeRoot('<img src="x.jpg"><input type="text">');
    const { scan, summary, result } = useA11yChecker();
    scan(root);
    const total = result.value?.issues.length ?? 0;
    expect(
      summary.value.errors + summary.value.warnings + summary.value.notices,
    ).toBe(total);
  });
});
