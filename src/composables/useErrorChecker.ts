import { ref, watch } from "vue";
import ts from "typescript";
import * as tsvfs from "@typescript/vfs";
import type { TsDiagnostic, ErrorScenario } from "@/types/ts-explorer";

// Singleton lib map — loaded once from CDN on first check, then reused
let libMapPromise: Promise<Map<string, string>> | null = null;

function getLibMap(): Promise<Map<string, string>> {
  if (!libMapPromise) {
    libMapPromise = tsvfs.createDefaultMapFromCDN(
      { target: ts.ScriptTarget.ES2020 },
      ts.version,
      true,
      ts,
    );
  }
  return libMapPromise;
}

export function useErrorChecker(scenario: ErrorScenario) {
  const userCode = ref(scenario.brokenCode);
  // Start with the pre-computed diagnostics so the editor shows squiggles immediately
  const liveDiagnostics = ref<TsDiagnostic[]>([...scenario.diagnostics]);
  const checking = ref(false);
  const passed = ref<boolean | null>(null);
  const revealed = ref(false);

  // Reset state when the scenario changes
  watch(
    () => scenario.id,
    () => {
      userCode.value = scenario.brokenCode;
      liveDiagnostics.value = [...scenario.diagnostics];
      passed.value = null;
      revealed.value = false;
    },
  );

  async function checkFix(): Promise<void> {
    checking.value = true;
    passed.value = null;

    try {
      const libMap = await getLibMap();
      const projectMap = new Map(libMap);
      projectMap.set("input.ts", userCode.value);

      const system = tsvfs.createSystem(projectMap);
      const { compilerHost } = tsvfs.createVirtualCompilerHost(
        system,
        { strict: true, noEmit: true, target: ts.ScriptTarget.ES2020 },
        ts,
      );

      const program = ts.createProgram(
        ["input.ts"],
        { strict: true, noEmit: true, target: ts.ScriptTarget.ES2020 },
        compilerHost,
      );

      const semanticDiags = program.getSemanticDiagnostics();
      const results: TsDiagnostic[] = semanticDiags
        .filter((d) => d.file?.fileName === "input.ts")
        .map((d) => ({
          code: d.code,
          message: ts.flattenDiagnosticMessageText(d.messageText, "\n"),
          line:
            d.file && d.start !== undefined
              ? d.file.getLineAndCharacterOfPosition(d.start).line + 1
              : 0,
        }));

      liveDiagnostics.value = results;
      passed.value = results.length === 0;
    } catch (err) {
      // Checker failure — surface as a diagnostic rather than crashing
      liveDiagnostics.value = [
        {
          code: 0,
          message: err instanceof Error ? err.message : String(err),
          line: 0,
        },
      ];
      passed.value = false;
    } finally {
      checking.value = false;
    }
  }

  function reset(): void {
    userCode.value = scenario.brokenCode;
    liveDiagnostics.value = [...scenario.diagnostics];
    passed.value = null;
    revealed.value = false;
  }

  return {
    userCode,
    liveDiagnostics,
    checking,
    passed,
    revealed,
    checkFix,
    reset,
  };
}
