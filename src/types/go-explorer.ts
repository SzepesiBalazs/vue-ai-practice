export type GoCategory =
  | "types-variables"
  | "functions"
  | "pointers"
  | "structs-interfaces"
  | "error-handling"
  | "slices-maps"
  | "goroutines-channels"
  | "defer-panic-recover"
  | "generics"
  | "testing";

export type Difficulty = "beginner" | "intermediate" | "advanced";

export interface GoProblem {
  id: string;
  title: string;
  category: GoCategory;
  difficulty: Difficulty;
  prompt: string;
  starterCode: string;
  expectedOutput: string[];
  explanation: string;
  solutionCode: string;
  tags: string[];
}

export interface OutputLine {
  type: "log" | "error" | "warn";
  value: string;
}

export interface RunResult {
  lines: OutputLine[];
  /** null when expectedOutput is [] */
  passed: boolean | null;
  errorMessage: string | null;
}
