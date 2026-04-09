export type ConceptCategory =
  | "scope-closures"
  | "this-prototypes"
  | "async-promises"
  | "event-loop"
  | "destructuring-spread"
  | "iterators-generators"
  | "functional";

export type Difficulty = "beginner" | "intermediate" | "advanced";

export interface JsProblem {
  id: string;
  title: string;
  category: ConceptCategory;
  difficulty: Difficulty;
  /** Short prompt shown above the editor */
  prompt: string;
  /** Starting code in the editor */
  starterCode: string;
  /** Expected output lines (used to auto-check the user's run result) */
  expectedOutput: string[];
  /** Plain-language explanation shown on Reveal */
  explanation: string;
  /** Annotated solution code shown on Reveal */
  solutionCode: string;
  /** Key concept tags for filtering */
  tags: string[];
}

export interface OutputLine {
  type: "log" | "error" | "warn";
  value: string;
}

export interface RunResult {
  lines: OutputLine[];
  /** true if every expectedOutput line matches in order */
  passed: boolean | null;
  errorMessage: string | null;
}
