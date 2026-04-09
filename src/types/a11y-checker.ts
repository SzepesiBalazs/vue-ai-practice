export type IssueSeverity = "error" | "warning" | "notice";

export type RuleCategory =
  | "contrast"
  | "label"
  | "aria"
  | "focus"
  | "image"
  | "heading"
  | "landmark"
  | "language";

export interface A11yIssue {
  id: string;
  ruleId: string;
  category: RuleCategory;
  severity: IssueSeverity;
  element: HTMLElement;
  message: string;
  wcag: string;
  fix: string;
}

export interface A11yRule {
  id: string;
  category: RuleCategory;
  severity: IssueSeverity;
  description: string;
  wcag: string;
  test: (el: HTMLElement, root: HTMLElement) => string | null;
  selector: string;
}

export interface AuditResult {
  issues: A11yIssue[];
  scannedAt: Date;
  elementCount: number;
}
