import { ref } from "vue";
import type { OutputLine, RunResult, JsProblem } from "@/types/js-explorer";

export function useJsRunner(problem: JsProblem) {
  const output = ref<OutputLine[]>([]);
  const result = ref<RunResult | null>(null);

  function run(code: string): void {
    const lines: OutputLine[] = [];

    // Intercept console methods — never eval untrusted external input in production
    const sandboxConsole = {
      log: (...args: unknown[]) =>
        lines.push({ type: "log", value: args.map(String).join(" ") }),
      warn: (...args: unknown[]) =>
        lines.push({ type: "warn", value: args.map(String).join(" ") }),
      error: (...args: unknown[]) =>
        lines.push({ type: "error", value: args.map(String).join(" ") }),
    };

    let errorMessage: string | null = null;

    try {
      // Sandboxed with new Function — scope is isolated; no access to module internals
      // Only expose the sandboxed console, not the real one
      const fn = new Function("console", code);
      fn(sandboxConsole);
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
  }

  function reset(): void {
    output.value = [];
    result.value = null;
  }

  return { output, result, run, reset };
}
