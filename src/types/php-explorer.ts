export type ConceptCategory =
  | "type-juggling"
  | "arrays"
  | "closures"
  | "oop"
  | "php8-features"
  | "strings"
  | "error-handling"
  | "patterns";

export type Difficulty = "beginner" | "intermediate" | "advanced";

export interface PhpProblem {
  id: string;
  title: string;
  category: ConceptCategory;
  difficulty: Difficulty;
  /** Short prompt shown above the code block */
  prompt: string;
  /** Starting code shown to the learner */
  starterCode: string;
  /** Expected output lines for auto-check (empty when non-deterministic) */
  expectedOutput: string[];
  /** Plain-language explanation revealed on "Reveal" */
  explanation: string;
  /** Annotated solution shown on "Reveal" */
  solutionCode: string;
  /** Key concept tags */
  tags: string[];
}

export interface OutputLine {
  type: "output" | "error" | "warn";
  value: string;
}

export interface RunResult {
  lines: OutputLine[];
  /** true when all expectedOutput lines match; null when expectedOutput is empty */
  passed: boolean | null;
  errorMessage: string | null;
}
