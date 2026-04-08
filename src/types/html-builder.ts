export interface HtmlNode {
  id: string;
  tag: string;
  attributes: Record<string, string>;
  textContent: string;
  children: HtmlNode[];
}

export interface ElementDefinition {
  tag: string;
  label: string;
  /** Category shown in the palette */
  category: "structure" | "content" | "interactive" | "media";
  /** Default attributes applied when the element is first dropped */
  defaultAttributes: Record<string, string>;
  /** Default text content */
  defaultText: string;
  /** Whether this element can have child nodes dropped into it */
  allowChildren: boolean;
  /** Accessibility hint shown in the palette tooltip */
  a11yHint: string;
}

export interface A11yIssue {
  nodeId: string;
  severity: "error" | "warning";
  message: string;
  fix: string;
}
