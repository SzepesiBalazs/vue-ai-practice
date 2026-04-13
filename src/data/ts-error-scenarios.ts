import type { ErrorScenario } from "@/types/ts-explorer";

export const errorScenarios: ErrorScenario[] = [
  // ── TS2322 ────────────────────────────────────────────────────────────────
  {
    id: "ts2322-basic",
    errorCode: 2322,
    title: "Assigning a string to a number",
    brokenCode: `let count: number = 0;
count = "five"; // TS2322`,
    diagnostics: [
      {
        code: 2322,
        message: "Type 'string' is not assignable to type 'number'.",
        line: 2,
      },
    ],
    fixedCode: `let count: number = 0;
count = 5; // OK — a real number`,
    lesson:
      "TS2322 fires whenever you try to assign a value to a variable or property whose declared type doesn't include the type of the value. The fix is either to change the value's type (cast or convert) or to widen the declared type (e.g. `number | string`).",
  },
  {
    id: "ts2322-object-shape",
    errorCode: 2322,
    title: "Object missing a required property",
    brokenCode: `interface Point {
  x: number;
  y: number;
}

const p: Point = { x: 10 }; // TS2322 — y is missing`,
    diagnostics: [
      {
        code: 2322,
        message:
          "Type '{ x: number; }' is not assignable to type 'Point'. Property 'y' is missing in type '{ x: number; }' but required in type 'Point'.",
        line: 6,
      },
    ],
    fixedCode: `const p: Point = { x: 10, y: 0 }; // OK`,
    lesson:
      "When assigning an object literal to a typed variable, TypeScript requires all non-optional properties to be present. To make a property optional, add `?` to its declaration (`y?: number`). Otherwise, provide the missing property in the literal.",
  },

  // ── TS2345 ────────────────────────────────────────────────────────────────
  {
    id: "ts2345-argument",
    errorCode: 2345,
    title: "Passing the wrong type to a function",
    brokenCode: `function double(n: number): number {
  return n * 2;
}

const result = double("4"); // TS2345`,
    diagnostics: [
      {
        code: 2345,
        message:
          "Argument of type 'string' is not assignable to parameter of type 'number'.",
        line: 5,
      },
    ],
    fixedCode: `const result = double(4);        // OK — pass a number
// or convert: double(Number("4"))`,
    lesson:
      "TS2345 is the argument-passing version of TS2322. The call site passes a type the function's parameter signature doesn't accept. Fix by converting the value at the call site (`Number(str)`, `parseInt`) or by widening the parameter type if that makes sense for the API.",
  },

  // ── TS2339 ────────────────────────────────────────────────────────────────
  {
    id: "ts2339-no-property",
    errorCode: 2339,
    title: "Accessing a property that doesn't exist on the type",
    brokenCode: `interface Car {
  make: string;
  model: string;
}

const car: Car = { make: "Toyota", model: "Corolla" };
console.log(car.year); // TS2339`,
    diagnostics: [
      {
        code: 2339,
        message: "Property 'year' does not exist on type 'Car'.",
        line: 7,
      },
    ],
    fixedCode: `interface Car {
  make: string;
  model: string;
  year?: number; // add the property to the type
}
console.log(car.year); // OK (possibly undefined)`,
    lesson:
      "TS2339 means you're reading a property that TypeScript doesn't know exists on the type. Either add the property to the interface/type, or narrow to a subtype where the property exists, or use optional chaining: `car?.year`. Never use a cast (`(car as any).year`) just to silence this error — it hides real mistakes.",
  },
  {
    id: "ts2339-union-access",
    errorCode: 2339,
    title: "Accessing a property only present on one union member",
    brokenCode: `type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "rect"; width: number; height: number };

function area(s: Shape): number {
  return Math.PI * s.radius ** 2; // TS2339 — radius only on circle
}`,
    diagnostics: [
      {
        code: 2339,
        message:
          "Property 'radius' does not exist on type 'Shape'. Property 'radius' does not exist on type '{ kind: \"rect\"; width: number; height: number; }'.",
        line: 6,
      },
    ],
    fixedCode: `function area(s: Shape): number {
  if (s.kind === "circle") {
    return Math.PI * s.radius ** 2; // narrowed to circle branch
  }
  return s.width * s.height;
}`,
    lesson:
      "When a property only exists on some members of a union, TypeScript won't let you access it before narrowing. Use the discriminant (`kind`) to narrow to the specific branch, then the property is safely accessible. This is the primary motivation for discriminated unions.",
  },

  // ── TS7006 ────────────────────────────────────────────────────────────────
  {
    id: "ts7006-implicit-any",
    errorCode: 7006,
    title: "Parameter implicitly has an 'any' type",
    brokenCode: `// tsconfig: "noImplicitAny": true

function greet(name) { // TS7006
  return "Hello, " + name;
}`,
    diagnostics: [
      {
        code: 7006,
        message: "Parameter 'name' implicitly has an 'any' type.",
        line: 3,
      },
    ],
    fixedCode: `function greet(name: string): string {
  return "Hello, " + name;
}`,
    lesson:
      "With `noImplicitAny: true` in `tsconfig.json` (which strict mode enables), TypeScript requires every parameter to have an explicit type or a type it can infer from a default value. `any` is the escape hatch that defeats type checking — TypeScript warns when you accidentally opt into it via omission rather than intent.",
  },

  // ── TS2366 ────────────────────────────────────────────────────────────────
  {
    id: "ts2366-missing-return",
    errorCode: 2366,
    title: "Function lacks ending return statement",
    brokenCode: `function divide(a: number, b: number): number {
  if (b !== 0) {
    return a / b;
  }
  // TS2366 — no return for the b === 0 case
}`,
    diagnostics: [
      {
        code: 2366,
        message:
          "Function lacks ending return statement and return type does not include 'undefined'.",
        line: 1,
      },
    ],
    fixedCode: `function divide(a: number, b: number): number {
  if (b !== 0) {
    return a / b;
  }
  throw new Error("Division by zero");
  // Alternative: return NaN; or change return type to number | undefined
}`,
    lesson:
      "TypeScript requires that all code paths in a function return the declared type. A missing `else` or `default` branch means some executions fall off the end without returning anything (implicitly `undefined`). Fix by covering all paths: add a final `return`, `throw`, or change the return type to include `undefined`.",
  },

  // ── TS2769 ────────────────────────────────────────────────────────────────
  {
    id: "ts2769-overload-mismatch",
    errorCode: 2769,
    title: "No overload matches this call",
    brokenCode: `// Array.from is overloaded — one form takes an iterable,
// another takes { length } + mapFn

const arr = Array.from({ length: 3 }, (_, i) => i * 2);
// Fine ^ but this:
const bad = Array.from(42); // TS2769 — 42 is not iterable or array-like`,
    diagnostics: [
      {
        code: 2769,
        message:
          "No overload matches this call. Overload 1 of 2, '(arrayLike: ArrayLike<unknown>): unknown[]', gave the following error: Argument of type 'number' is not assignable to parameter of type 'ArrayLike<unknown>'. Overload 2 of 2, '(iterable: Iterable<unknown> | ArrayLike<unknown>): unknown[]', gave the following error: Argument of type 'number' is not assignable to parameter of type 'Iterable<unknown> | ArrayLike<unknown>'.",
        line: 6,
      },
    ],
    fixedCode: `const arr = Array.from({ length: 3 }, (_, i) => i * 2); // [0, 2, 4]
// or:
const arr2 = Array.from([1, 2, 3]);       // from iterable
const arr3 = Array.from("hello");         // from string (iterable)`,
    lesson:
      "TS2769 means none of a function's overloads accept the types you provided. TypeScript lists every overload attempt and why each failed. Read from the bottom up — the last attempted overload is usually the most relevant one. The fix is to match one of the declared signatures.",
  },
];
