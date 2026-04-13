import { ref } from "vue";
import type { OutputLine, RunResult, TsProblem } from "@/types/ts-explorer";
// TypeScript compiler is a standard npm dependency in any TS project
import ts from "typescript";

export function useTsRunner(problem: TsProblem) {
  const output = ref<OutputLine[]>([]);
  const result = ref<RunResult | null>(null);

  function run(tsCode: string): void {
    const lines: OutputLine[] = [];
    let transpileError: string | null = null;

    // Step 1 — Transpile TypeScript → JavaScript
    let jsCode: string;
    try {
      const transpileOutput = ts.transpileModule(tsCode, {
        compilerOptions: {
          target: ts.ScriptTarget.ES2020,
          module: ts.ModuleKind.None,
          strict: true,
        },
        reportDiagnostics: true,
      });

      // Surface syntax/transpile-time errors (not full type errors — those need
      // a full program; transpileModule gives syntax errors only)
      for (const diag of transpileOutput.diagnostics ?? []) {
        const msg = ts.flattenDiagnosticMessageText(diag.messageText, "\n");
        lines.push({ kind: "type-error", value: `TS${diag.code} — ${msg}` });
      }

      jsCode = transpileOutput.outputText;
    } catch (err) {
      transpileError = err instanceof Error ? err.message : String(err);
      lines.push({ kind: "error", value: transpileError });
      output.value = lines;
      result.value = { lines, transpileError, passed: null };
      return;
    }

    // Step 2 — Run the transpiled JS in a sandboxed scope
    const sandboxConsole = {
      log: (...args: unknown[]) =>
        lines.push({ kind: "log", value: args.map(String).join(" ") }),
      warn: (...args: unknown[]) =>
        lines.push({ kind: "warn", value: args.map(String).join(" ") }),
      error: (...args: unknown[]) =>
        lines.push({ kind: "error", value: args.map(String).join(" ") }),
    };

    try {
      // Scope-isolated; only sandboxed console is passed in
      const fn = new Function("console", jsCode);
      fn(sandboxConsole);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      transpileError = msg;
      lines.push({ kind: "error", value: msg });
    }

    const runtimeLines = lines.filter((l) => l.kind === "log");
    const passed =
      problem.expectedOutput.length > 0
        ? problem.expectedOutput.every(
            (expected, i) => runtimeLines[i]?.value === expected,
          )
        : null;

    output.value = lines;
    result.value = { lines, transpileError, passed };
  }

  function reset(): void {
    output.value = [];
    result.value = null;
  }

  return { output, result, run, reset };
}
