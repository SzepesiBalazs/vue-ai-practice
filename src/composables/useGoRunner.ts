import { ref } from "vue";
import type { OutputLine, RunResult, GoProblem } from "@/types/go-explorer";

export function useGoRunner(problem: GoProblem) {
  const output = ref<OutputLine[]>([]);
  const result = ref<RunResult | null>(null);
  const loading = ref(false);

  /**
   * Strategy B — show expected output from the problem definition.
   * No backend needed; keeps the UX interactive offline.
   */
  function runLocal(code: string): void {
    const isStarter = code.trim() === problem.starterCode.trim();
    const isSolution = code.trim() === problem.solutionCode.trim();

    if (isSolution && problem.expectedOutput.length > 0) {
      const lines: OutputLine[] = problem.expectedOutput.map((v) => ({
        type: "log" as const,
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
          "Starter code — modify it to produce the expected output, or use Run in Playground.",
      };
      return;
    }

    // For arbitrary edits in offline mode, we can't evaluate Go
    output.value = [];
    result.value = {
      lines: [],
      passed: null,
      errorMessage:
        "Local mode cannot execute Go code. Use Run in Playground to compile and run.",
    };
  }

  /**
   * Strategy A — compile and run via the Go Playground API.
   */
  async function runPlayground(code: string): Promise<void> {
    loading.value = true;
    const lines: OutputLine[] = [];
    let errorMessage: string | null = null;

    try {
      const response = await fetch("https://go.dev/_/compile", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ version: "2", body: code }),
      });
      const data = await response.json();

      if (data.Errors) {
        errorMessage = data.Errors;
        lines.push({ type: "error", value: data.Errors });
      } else {
        for (const event of data.Events ?? []) {
          const trimmed = event.Message.replace(/\n$/, "");
          for (const line of trimmed.split("\n")) {
            lines.push({
              type: event.Kind === "stderr" ? "error" : "log",
              value: line,
            });
          }
        }
      }
    } catch (err) {
      errorMessage = err instanceof Error ? err.message : String(err);
      lines.push({ type: "error", value: errorMessage });
    }

    const passed =
      problem.expectedOutput.length > 0
        ? problem.expectedOutput.every(
            (expected, i) => lines[i]?.value === expected,
          )
        : null;

    output.value = lines;
    result.value = { lines, passed, errorMessage };
    loading.value = false;
  }

  function reset(): void {
    output.value = [];
    result.value = null;
    loading.value = false;
  }

  return { output, result, loading, runLocal, runPlayground, reset };
}
