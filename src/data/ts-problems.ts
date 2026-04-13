import type { TsProblem } from "@/types/ts-explorer";

export const problems: TsProblem[] = [
  // ── Type System ──────────────────────────────────────────────────────────
  {
    id: "type-inference-gotcha",
    title: "Widened inference vs. literal types",
    category: "type-system",
    difficulty: "intermediate",
    prompt:
      "TypeScript infers `direction` as `string`, not `'left' | 'right'`. Why? Fix it so `move` only accepts the two literal values without widening.",
    starterCode: `function move(dir: "left" | "right") {
  console.log("Moving:", dir);
}

const direction = "left"; // inferred as string
move(direction);           // TS error: Argument of type 'string' is not assignable to parameter of type '"left" | "right"'

// Fix: use a const assertion or type annotation
`,
    expectedOutput: ["Moving: left"],
    explanation:
      "When you write `const direction = 'left'`, TypeScript widens the type to `string` by default. To keep the narrow literal type, use `as const` (`const direction = 'left' as const`) or annotate explicitly (`const direction: 'left' = 'left'`). `as const` is preferred because it scales to objects and arrays.",
    solutionCode: `function move(dir: "left" | "right") {
  console.log("Moving:", dir);
}

const direction = "left" as const; // type is 'left', not string
move(direction); // OK`,
    tags: ["literal types", "as const", "type widening", "inference"],
  },
  {
    id: "union-narrowing",
    title: "Narrowing a string | number union",
    category: "type-system",
    difficulty: "beginner",
    prompt:
      "Implement `formatValue` so it logs the value padded to 6 chars if it's a string, or multiplied by 10 if it's a number. Use a type guard to narrow the union.",
    starterCode: `function formatValue(value: string | number): void {
  // your code here
}

formatValue("hi");   // "hi    "
formatValue(7);      // 70`,
    expectedOutput: ["hi    ", "70"],
    explanation:
      "`typeof value === 'string'` is a type guard — inside the `if` branch TypeScript narrows `value` to `string`, giving access to `.padEnd`. In the `else` branch it's narrowed to `number`. This is control-flow based narrowing: no cast needed.",
    solutionCode: `function formatValue(value: string | number): void {
  if (typeof value === "string") {
    console.log(value.padEnd(6));
  } else {
    console.log(value * 10);
  }
}`,
    tags: ["typeof", "narrowing", "union", "type guard", "control flow"],
  },

  // ── Generics ─────────────────────────────────────────────────────────────
  {
    id: "generic-identity",
    title: "Generic identity — preserving the literal type",
    category: "generics",
    difficulty: "beginner",
    prompt:
      "Write a generic `identity<T>` function. Then call it twice: once letting TS infer `T`, once passing `T` explicitly. Log the output. Notice how inference preserves the literal type.",
    starterCode: `function identity<T>(value: T): T {
  return value;
}

const a = identity(42);           // T inferred as 42 (literal)
const b = identity<string>("hi"); // T explicitly string
console.log(a);
console.log(b);`,
    expectedOutput: ["42", "hi"],
    explanation:
      "Generics let you write one function that works for any type while preserving type information. When you pass `42`, TypeScript infers `T = 42` (the literal). When you write `identity<string>('hi')`, you widen to `string`. The key insight: generics tie the return type to the input type without losing precision.",
    solutionCode: `function identity<T>(value: T): T {
  return value;
}`,
    tags: ["generics", "type inference", "explicit type parameter"],
  },
  {
    id: "generic-constraint",
    title: "Generic constraint with extends",
    category: "generics",
    difficulty: "intermediate",
    prompt:
      "Write a generic `getLength<T extends { length: number }>` function that returns the length of anything with a length property. Call it with a string and an array.",
    starterCode: `function getLength<T>(thing: T): number {
  return thing.length; // TS error: Property 'length' does not exist on type 'T'
}

console.log(getLength("hello")); // 5
console.log(getLength([1, 2, 3])); // 3`,
    expectedOutput: ["5", "3"],
    explanation:
      "Without a constraint, TypeScript can't assume `T` has a `length` property. Adding `T extends { length: number }` tells the compiler: 'T can be any type, as long as it has a numeric `length`'. The constraint is structural — any object with a `length: number` satisfies it.",
    solutionCode: `function getLength<T extends { length: number }>(thing: T): number {
  return thing.length;
}

console.log(getLength("hello")); // 5
console.log(getLength([1, 2, 3])); // 3`,
    tags: ["generics", "extends", "constraint", "structural typing"],
  },
  {
    id: "conditional-infer",
    title: "Extracting a return type with infer",
    category: "generics",
    difficulty: "advanced",
    prompt:
      "Implement `MyReturnType<T>` — a re-implementation of TypeScript's built-in `ReturnType` utility — using conditional types and `infer`. Then extract the return type of `getUser`.",
    starterCode: `type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

function getUser() {
  return { id: 1, name: "Alice" };
}

type User = MyReturnType<typeof getUser>;
// User should be: { id: number; name: string }

const user: User = { id: 2, name: "Bob" };
console.log(user.name);`,
    expectedOutput: ["Bob"],
    explanation:
      "`T extends (...args: any[]) => infer R` checks whether `T` is a function type, and if so, captures its return type in the local variable `R` using `infer`. `infer` only works inside conditional types. This is exactly how `ReturnType<T>` is defined in TypeScript's lib. `never` is the fallback for non-function types.",
    solutionCode: `type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never;`,
    tags: ["infer", "conditional types", "ReturnType", "advanced generics"],
  },

  // ── Utility Types ─────────────────────────────────────────────────────────
  {
    id: "partial-required",
    title: "Partial updates with Partial and Required",
    category: "utility-types",
    difficulty: "beginner",
    prompt:
      "Implement `updateSettings` that takes the current settings and a partial patch object, and returns the merged result fully typed. Then call it and log the merged host.",
    starterCode: `interface AppSettings {
  host: string;
  port: number;
  debug: boolean;
}

function updateSettings(
  current: AppSettings,
  patch: Partial<AppSettings>
): AppSettings {
  return { ...current, ...patch };
}

const defaults: AppSettings = { host: "localhost", port: 3000, debug: false };
const updated = updateSettings(defaults, { port: 8080, debug: true });
console.log(updated.host);
console.log(updated.port);`,
    expectedOutput: ["localhost", "8080"],
    explanation:
      "`Partial<T>` makes every property optional by mapping over all keys with `?`. This is the standard pattern for update/patch functions — the caller only provides what changed. `Required<T>` is the inverse: removes all `?` modifiers. Both are built-in mapped types in TypeScript's lib.",
    solutionCode: `function updateSettings(
  current: AppSettings,
  patch: Partial<AppSettings>
): AppSettings {
  return { ...current, ...patch };
}`,
    tags: ["Partial", "Required", "utility types", "patch pattern"],
  },
  {
    id: "pick-omit",
    title: "Shape types with Pick and Omit",
    category: "utility-types",
    difficulty: "intermediate",
    prompt:
      "Given the `User` type, create `PublicUser` using `Omit` to remove sensitive fields, and `UserPreview` using `Pick` for just the id and name. Log both.",
    starterCode: `interface User {
  id: number;
  name: string;
  email: string;
  passwordHash: string;
}

type PublicUser = Omit<User, "passwordHash" | "email">;
type UserPreview = Pick<User, "id" | "name">;

const user: User = { id: 1, name: "Alice", email: "a@b.com", passwordHash: "abc123" };

const pub: PublicUser = { id: user.id, name: user.name };
const preview: UserPreview = { id: user.id, name: user.name };

console.log(pub.name);
console.log(preview.id);`,
    expectedOutput: ["Alice", "1"],
    explanation:
      "`Pick<T, K>` keeps only the listed keys; `Omit<T, K>` keeps everything except them. Both construct new object types structurally — no runtime behaviour, compile-time only. Use `Omit` when you want to remove sensitive or internals-only fields before passing data across a boundary (e.g. to the UI layer).",
    solutionCode: `type PublicUser = Omit<User, "passwordHash" | "email">;
type UserPreview = Pick<User, "id" | "name">;`,
    tags: ["Pick", "Omit", "utility types", "structural typing"],
  },
  {
    id: "record-type",
    title: "Typed look-up maps with Record",
    category: "utility-types",
    difficulty: "beginner",
    prompt:
      "Build a `statusLabels` map from HTTP status codes to display strings using `Record`. Ensure both keys and values are strongly typed.",
    starterCode: `type HttpStatus = 200 | 404 | 500;

const statusLabels: Record<HttpStatus, string> = {
  200: "OK",
  404: "Not Found",
  500: "Internal Server Error",
};

console.log(statusLabels[200]);
console.log(statusLabels[404]);`,
    expectedOutput: ["OK", "Not Found"],
    explanation:
      "`Record<K, V>` is a shorthand for `{ [P in K]: V }`. When `K` is a union (like `200 | 404 | 500`), TypeScript enforces that all three keys are present — missing one is a compile error. This makes `Record` a great pattern for exhaustive look-up tables.",
    solutionCode: `const statusLabels: Record<HttpStatus, string> = {
  200: "OK",
  404: "Not Found",
  500: "Internal Server Error",
};`,
    tags: ["Record", "utility types", "mapped type", "exhaustive"],
  },

  // ── Discriminated Unions ──────────────────────────────────────────────────
  {
    id: "discriminated-union-basic",
    title: "Discriminated union for a result type",
    category: "discriminated-unions",
    difficulty: "intermediate",
    prompt:
      "Define a `Result<T>` discriminated union with `{ ok: true; value: T }` and `{ ok: false; error: string }`. Write `unwrap` that logs the value or error. TypeScript must narrow automatically — no casts.",
    starterCode: `type Result<T> =
  | { ok: true; value: T }
  | { ok: false; error: string };

function unwrap<T>(result: Result<T>): void {
  if (result.ok) {
    console.log("Value:", result.value);
  } else {
    console.log("Error:", result.error);
  }
}

unwrap({ ok: true, value: 42 });
unwrap({ ok: false, error: "Not found" });`,
    expectedOutput: ["Value: 42", "Error: Not found"],
    explanation:
      "The `ok` field is the discriminant — a literal type that uniquely identifies each branch. When TypeScript sees `result.ok === true`, it narrows the union to only the first branch, making `result.value` available without a cast. This pattern is safer than throwing exceptions for expected failures.",
    solutionCode: `type Result<T> =
  | { ok: true; value: T }
  | { ok: false; error: string };`,
    tags: [
      "discriminated union",
      "narrowing",
      "result type",
      "pattern matching",
    ],
  },
  {
    id: "exhaustive-never",
    title: "Exhaustive checking with never",
    category: "discriminated-unions",
    difficulty: "advanced",
    prompt:
      "Add a `'pending'` state to `Status` and update `describe` so TypeScript enforces that every branch is handled. Use a `never` assertion to make new unhandled variants a compile error.",
    starterCode: `type Status = "active" | "inactive"; // add 'pending' here

function describe(s: Status): void {
  switch (s) {
    case "active":
      console.log("Active");
      break;
    case "inactive":
      console.log("Inactive");
      break;
    default: {
      const _exhaustive: never = s; // compile error if a case is missing
      throw new Error("Unhandled status: " + _exhaustive);
    }
  }
}

describe("active");
describe("inactive");`,
    expectedOutput: ["Active", "Inactive"],
    explanation:
      "Assigning `s` to a variable typed `never` in the default branch makes TypeScript check that all variants are handled. If you add `'pending'` but forget a case, the assignment `const _: never = s` becomes a compile error because `s` would have type `'pending'` there, not `never`. This is exhaustive checking.",
    solutionCode: `type Status = "active" | "inactive" | "pending";

function describe(s: Status): void {
  switch (s) {
    case "active":   console.log("Active");   break;
    case "inactive": console.log("Inactive"); break;
    case "pending":  console.log("Pending");  break;
    default: {
      const _exhaustive: never = s;
      throw new Error("Unhandled status: " + _exhaustive);
    }
  }
}`,
    tags: ["never", "exhaustive", "switch", "discriminated union"],
  },

  // ── Mapped Types & Template Literals ──────────────────────────────────────
  {
    id: "mapped-readonly",
    title: "Building DeepReadonly with mapped types",
    category: "mapped-template",
    difficulty: "advanced",
    prompt:
      "The built-in `Readonly<T>` is shallow — nested objects stay mutable. Implement `DeepReadonly<T>` that recursively makes all nested properties readonly.",
    starterCode: `type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};

interface Config {
  server: { host: string; port: number };
  debug: boolean;
}

const cfg: DeepReadonly<Config> = {
  server: { host: "localhost", port: 3000 },
  debug: false,
};

// cfg.server.host = "prod"; // TS error — nested readonly works
console.log(cfg.server.host);
console.log(cfg.debug);`,
    expectedOutput: ["localhost", "false"],
    explanation:
      "Mapped types iterate over `keyof T` using `[K in keyof T]`. The `readonly` modifier is added to each key. The conditional `T[K] extends object ? DeepReadonly<T[K]> : T[K]` recurses into nested objects. Functions and primitive values pass through unchanged. This pattern is the foundation of many Vue and Redux immutability utilities.",
    solutionCode: `type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};`,
    tags: ["mapped types", "readonly", "recursive", "immutability"],
  },
  {
    id: "template-literal-events",
    title: "Template literal event name types",
    category: "mapped-template",
    difficulty: "intermediate",
    prompt:
      "Use a template literal type to derive strongly-typed event handler names from a union of event names. Then implement `on` so the handler name is always `'on' + Capitalize<EventName>`.",
    starterCode:
      'type EventName = "click" | "focus" | "blur";\ntype HandlerName = `on${Capitalize<EventName>}`;\n// HandlerName = \'onClick\' | \'onFocus\' | \'onBlur\'\n\ntype EventMap = {\n  [K in EventName as `on${Capitalize<K>}`]: () => void;\n};\n\nconst handlers: EventMap = {\n  onClick: () => console.log("clicked"),\n  onFocus: () => console.log("focused"),\n  onBlur:  () => console.log("blurred"),\n};\n\nhandlers.onClick();\nhandlers.onFocus();',
    expectedOutput: ["clicked", "focused"],
    explanation:
      "Template literal types combine string literal unions with string manipulation intrinsics (`Capitalize`, `Uppercase`, `Lowercase`, `Uncapitalize`). `[K in EventName as \\`on${Capitalize<K>}\\`]` remaps the key name during the mapped type iteration — a feature called 'key remapping'. This is the pattern Vue and many event emitters use to derive typed handler names at compile time.",
    solutionCode:
      "type EventMap = {\n  [K in EventName as `on${Capitalize<K>}`]: () => void;\n};",
    tags: [
      "template literal types",
      "Capitalize",
      "key remapping",
      "mapped types",
    ],
  },

  // ── Type Guards ───────────────────────────────────────────────────────────
  {
    id: "custom-type-predicate",
    title: "Custom type predicate function",
    category: "type-guards",
    difficulty: "intermediate",
    prompt:
      "Write `isError(value: unknown): value is Error` so TypeScript narrows the type inside `if (isError(v))` blocks. Test it with an Error and a plain string.",
    starterCode: `function isError(value: unknown): value is Error {
  return value instanceof Error;
}

function handle(value: unknown): void {
  if (isError(value)) {
    console.log("Error:", value.message); // .message available — narrowed to Error
  } else {
    console.log("Value:", String(value));
  }
}

handle(new Error("oops"));
handle("hello");`,
    expectedOutput: ["Error: oops", "Value: hello"],
    explanation:
      "A function returning `value is SomeType` is a type predicate. When TypeScript sees the call in an `if` condition, it narrows the argument to `SomeType` inside the true branch. This is more powerful than inline `typeof`/`instanceof` checks because it centralises the guard logic and works with complex, multi-property checks.",
    solutionCode: `function isError(value: unknown): value is Error {
  return value instanceof Error;
}`,
    tags: ["type predicate", "is", "instanceof", "unknown", "narrowing"],
  },
  {
    id: "satisfies-operator",
    title: "satisfies for inference without widening",
    category: "type-guards",
    difficulty: "intermediate",
    prompt:
      "Use `satisfies` to validate that `palette` matches `Record<string, string | string[]>` while preserving the narrow inferred type of each value so `.toUpperCase()` and `.join` are accessible without casts.",
    starterCode: `type Palette = Record<string, string | string[]>;

const palette = {
  red:   "#ff0000",
  green: ["#00ff00", "#33ff33"],
  blue:  "#0000ff",
} satisfies Palette;

// These work because satisfies preserves the narrow inferred types:
console.log(palette.red.toUpperCase());
console.log(palette.green.join(", "));`,
    expectedOutput: ["#FF0000", "#00ff00, #33ff33"],
    explanation:
      "`satisfies` (TS 4.9+) validates that an expression matches a type without widening the inferred type of the variable. If you used `: Palette` instead, `palette.red` would be `string | string[]` and `.toUpperCase()` would be a type error. With `satisfies`, the constraint is checked but the narrow type (`string` for `red`, `string[]` for `green`) is preserved.",
    solutionCode: `const palette = {
  red:   "#ff0000",
  green: ["#00ff00", "#33ff33"],
  blue:  "#0000ff",
} satisfies Palette;`,
    tags: ["satisfies", "type widening", "inference", "TS 4.9"],
  },
];

export const categoryLabels: Record<string, string> = {
  "type-system": "Type System",
  generics: "Generics",
  "utility-types": "Utility Types",
  "discriminated-unions": "Discriminated Unions",
  "mapped-template": "Mapped Types & Template Literals",
  "type-guards": "Type Guards",
};
