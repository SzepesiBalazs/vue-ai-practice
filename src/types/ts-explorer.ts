export type ConceptCategory =
  | "type-system"
  | "generics"
  | "utility-types"
  | "discriminated-unions"
  | "mapped-template"
  | "type-guards";

export type Difficulty = "beginner" | "intermediate" | "advanced";

export interface TsProblem {
  id: string;
  title: string;
  category: ConceptCategory;
  difficulty: Difficulty;
  /** Short prompt shown above the editor */
  prompt: string;
  /** Starting TypeScript code in the editor */
  starterCode: string;
  /** Expected runtime output lines after transpilation */
  expectedOutput: string[];
  /** Plain-language explanation shown on Reveal */
  explanation: string;
  /** Annotated solution code shown on Reveal */
  solutionCode: string;
  /** Key concept tags for filtering */
  tags: string[];
}

export interface OutputLine {
  kind: "log" | "error" | "warn" | "type-error";
  value: string;
}

export interface RunResult {
  lines: OutputLine[];
  transpileError: string | null;
  /** true if every expectedOutput line matches in order; null if no check defined */
  passed: boolean | null;
}

// ── Type Error Playground ─────────────────────────────────────────────────

export interface TsDiagnostic {
  /** TS error code, e.g. 2322 */
  code: number;
  /** Plain-text message as the compiler would emit it */
  message: string;
  /** 1-based line number the squiggly should appear on */
  line: number;
}

export interface ErrorScenario {
  id: string;
  /** Primary error code this scenario teaches */
  errorCode: number;
  title: string;
  /** Short challenge prompt shown above the editor — tells the user what to fix */
  prompt: string;
  /** TypeScript code with intentional type errors */
  brokenCode: string;
  /** Pre-computed diagnostics (mirrors what tsc would emit) */
  diagnostics: TsDiagnostic[];
  /** Corrected code that removes all type errors */
  fixedCode: string;
  /**
   * Plain-language explanation: what caused the error and the mental model
   * needed to understand and prevent it
   */
  lesson: string;
}
