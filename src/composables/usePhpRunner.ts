import { ref } from "vue";
import type { OutputLine, RunResult, PhpProblem } from "@/types/php-explorer";

export function usePhpRunner(problem: PhpProblem) {
  const output = ref<OutputLine[]>([]);
  const result = ref<RunResult | null>(null);

  /**
   * PHP cannot run in-browser. This simulates output using pre-computed
   * expectedOutput from the problem definition.
   */
  function runLocal(code: string): void {
    const isStarter = code.trim() === problem.starterCode.trim();
    const isSolution = code.trim() === problem.solutionCode.trim();

    if (isSolution && problem.expectedOutput.length > 0) {
      const lines: OutputLine[] = problem.expectedOutput.map((v) => ({
        type: "output" as const,
        value: v,
      }));
      output.value = lines;
      result.value = { lines, passed: true, errorMessage: null };
      return;
    }

    if (isStarter && problem.expectedOutput.length > 0) {
      output.value = [];
      result.value = {
        lines: [],
        passed: false,
        errorMessage:
          "This is the starter code. Modify it to produce the expected output, then click Run.",
      };
      return;
    }

    if (problem.expectedOutput.length === 0) {
      output.value = [];
      result.value = {
        lines: [],
        passed: null,
        errorMessage:
          "No auto-check defined for this problem. Click Reveal to see the solution.",
      };
      return;
    }

    output.value = [];
    result.value = {
      lines: [],
      passed: null,
      errorMessage:
        "PHP runs server-side and cannot be executed in the browser. Click Reveal to see the expected output.",
    };
  }

  function reset(): void {
    output.value = [];
    result.value = null;
  }

  return { output, result, runLocal, reset };
}
