import type { JsProblem } from "@/types/js-explorer";

export const problems: JsProblem[] = [
  // ── Scope & Closures ─────────────────────────────────────────────────────
  {
    id: "closure-loop-var",
    title: "Closure + var in a loop",
    category: "scope-closures",
    difficulty: "intermediate",
    prompt:
      "What does this code print? Why? Fix it to print 0, 1, 2 using two different approaches.",
    starterCode: `for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}`,
    expectedOutput: [],
    explanation:
      "`var` is function-scoped, so all three callbacks share the same `i`. By the time the event loop fires them, the loop has finished and `i` is 3. Fix with `let` (block-scoped) or an IIFE that captures `i` per iteration.",
    solutionCode: `// Fix 1 — let (block-scoped, new binding per iteration)
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}

// Fix 2 — IIFE (captures i immediately)
for (var i = 0; i < 3; i++) {
  ((j) => setTimeout(() => console.log(j), 0))(i);
}`,
    tags: ["var", "let", "closure", "setTimeout", "loop"],
  },
  {
    id: "closure-counter",
    title: "Private counter with closure",
    category: "scope-closures",
    difficulty: "beginner",
    prompt:
      "Implement `makeCounter()` that returns an object with `increment`, `decrement`, and `value` methods. The internal count must not be directly accessible.",
    starterCode: `function makeCounter() {
  // your code here
}

const counter = makeCounter();
counter.increment();
counter.increment();
counter.decrement();
console.log(counter.value()); // 1`,
    expectedOutput: ["1"],
    explanation:
      "Closures let inner functions access variables from their enclosing scope even after the outer function has returned. The `count` variable lives in `makeCounter`'s scope and is only reachable through the returned methods.",
    solutionCode: `function makeCounter() {
  let count = 0;
  return {
    increment() { count++; },
    decrement() { count--; },
    value() { return count; },
  };
}

const counter = makeCounter();
counter.increment();
counter.increment();
counter.decrement();
console.log(counter.value()); // 1`,
    tags: ["closure", "encapsulation", "factory function"],
  },

  // ── this & Prototypes ────────────────────────────────────────────────────
  {
    id: "this-method-loss",
    title: "Lost this in a callback",
    category: "this-prototypes",
    difficulty: "intermediate",
    prompt:
      "Why does `greet` log `undefined` instead of the name? Fix it three ways: bind, arrow function, and arrow method.",
    starterCode: `const user = {
  name: "Alice",
  greet: function () {
    setTimeout(function () {
      console.log("Hello,", this.name);
    }, 0);
  },
};
user.greet();`,
    expectedOutput: [],
    explanation:
      "A regular function passed as a callback loses its original `this` — it defaults to `undefined` in strict mode or the global object. Arrow functions capture `this` lexically from their enclosing scope, solving the problem.",
    solutionCode: `const user = {
  name: "Alice",
  // Fix: arrow function captures lexical this
  greet: function () {
    setTimeout(() => {
      console.log("Hello,", this.name); // "Hello, Alice"
    }, 0);
  },
};
user.greet();`,
    tags: ["this", "bind", "arrow function", "callback"],
  },
  {
    id: "prototype-chain",
    title: "Prototype chain lookup",
    category: "this-prototypes",
    difficulty: "intermediate",
    prompt:
      "Predict the output. Then add a `speak` method to `Animal.prototype` so every animal can speak without duplicating the function.",
    starterCode: `function Animal(name) {
  this.name = name;
}

const dog = new Animal("Rex");
console.log(dog.hasOwnProperty("name")); // ?
console.log(dog.hasOwnProperty("toString")); // ?
console.log(dog instanceof Animal); // ?`,
    expectedOutput: ["true", "false", "true"],
    explanation:
      "`hasOwnProperty` returns true only for properties set directly on the instance. `toString` lives on `Object.prototype`, not on `dog` itself — it's found via the prototype chain. Methods added to `Constructor.prototype` are shared across all instances without copying.",
    solutionCode: `function Animal(name) {
  this.name = name;
}

const dog = new Animal("Rex");
console.log(dog.hasOwnProperty("name"));
console.log(dog.hasOwnProperty("toString"));
console.log(dog instanceof Animal);

// Bonus: shared method via prototype
Animal.prototype.speak = function () {
  console.log(this.name + " says hi");
};
// dog.speak(); // Rex says hi`,
    tags: ["prototype", "new", "instanceof", "hasOwnProperty"],
  },

  // ── Async / Promises ─────────────────────────────────────────────────────
  {
    id: "promise-chain-order",
    title: "Promise chain execution order",
    category: "async-promises",
    difficulty: "intermediate",
    prompt: "Predict the exact order of the console.log calls.",
    starterCode: `console.log("A");

Promise.resolve()
  .then(() => console.log("B"))
  .then(() => console.log("C"));

console.log("D");`,
    expectedOutput: [],
    explanation:
      "Synchronous code runs first (A, D). Promise `.then` callbacks are microtasks — they run after the current synchronous task completes but before any macrotasks (like setTimeout). Each `.then` schedules the next one, so B then C.",
    solutionCode: `console.log("A"); // 1st — synchronous

Promise.resolve()
  .then(() => console.log("B")) // 3rd — microtask, runs after sync
  .then(() => console.log("C")); // 4th — microtask, runs after B

console.log("D"); // 2nd — synchronous

// Output order: A → D → B → C`,
    tags: ["promise", "microtask", "event loop", "then"],
  },
  {
    id: "async-await-error",
    title: "Handling errors in async/await",
    category: "async-promises",
    difficulty: "beginner",
    prompt:
      "Rewrite the promise chain using async/await and add proper error handling.",
    starterCode: `function fetchUser(id) {
  return id > 0
    ? Promise.resolve({ id, name: "Alice" })
    : Promise.reject(new Error("Invalid ID"));
}

// Rewrite this using async/await:
fetchUser(-1)
  .then((user) => console.log(user.name))
  .catch((err) => console.log("Error:", err.message));`,
    expectedOutput: [],
    explanation:
      "`await` unwraps a resolved Promise. For rejected Promises, wrap `await` in a `try/catch`. This gives synchronous-looking control flow while remaining non-blocking.",
    solutionCode: `function fetchUser(id) {
  return id > 0
    ? Promise.resolve({ id, name: "Alice" })
    : Promise.reject(new Error("Invalid ID"));
}

async function run() {
  try {
    const user = await fetchUser(-1);
    console.log(user.name);
  } catch (err) {
    console.log("Error:", err.message);
  }
}
run();`,
    tags: ["async", "await", "try/catch", "promise", "error handling"],
  },

  // ── Event Loop ───────────────────────────────────────────────────────────
  {
    id: "event-loop-order",
    title: "Microtasks vs macrotasks",
    category: "event-loop",
    difficulty: "advanced",
    prompt: "Predict the exact output order and explain why.",
    starterCode: `setTimeout(() => console.log("timeout"), 0);
Promise.resolve().then(() => console.log("promise"));
queueMicrotask(() => console.log("microtask"));
console.log("sync");`,
    expectedOutput: [],
    explanation:
      "Synchronous code runs first. After the call stack empties, the microtask queue drains completely (Promise callbacks, queueMicrotask) before any macrotask (setTimeout callback) is picked up. Promise `.then` and `queueMicrotask` are both microtasks and run in registration order.",
    solutionCode: `setTimeout(() => console.log("timeout"), 0);    // macrotask — fires last
Promise.resolve().then(() => console.log("promise")); // microtask — 2nd
queueMicrotask(() => console.log("microtask"));        // microtask — 3rd
console.log("sync");                                   // synchronous — 1st

// Output order: sync → promise → microtask → timeout`,
    tags: ["event loop", "microtask", "macrotask", "setTimeout", "promise"],
  },

  // ── Destructuring & Spread ───────────────────────────────────────────────
  {
    id: "destructuring-defaults",
    title: "Destructuring with defaults and rename",
    category: "destructuring-spread",
    difficulty: "beginner",
    prompt:
      "Destructure `config` to get `host` (default `'localhost'`), `port` (default `3000`), and rename `secure` to `isHttps`.",
    starterCode: `const config = { port: 8080, secure: true };

// Your destructuring here:
// const { ... } = config;

console.log(host);    // localhost
console.log(port);    // 8080
console.log(isHttps); // true`,
    expectedOutput: ["localhost", "8080", "true"],
    solutionCode: `const config = { port: 8080, secure: true };
const { host = "localhost", port = 3000, secure: isHttps = false } = config;
console.log(host);
console.log(port);
console.log(isHttps);`,
    explanation:
      "Destructuring syntax: `{ key: newName = defaultValue }`. Defaults only apply when the value is `undefined`. The rename and default can be combined in one declaration.",
    tags: ["destructuring", "default values", "rename", "object"],
  },

  // ── Iterators & Generators ───────────────────────────────────────────────
  {
    id: "generator-range",
    title: "Range generator",
    category: "iterators-generators",
    difficulty: "intermediate",
    prompt:
      "Implement a `range(start, end, step)` generator that yields values lazily without building an array.",
    starterCode: `function* range(start, end, step = 1) {
  // your code here
}

for (const n of range(0, 10, 2)) {
  console.log(n); // 0 2 4 6 8
}`,
    expectedOutput: ["0", "2", "4", "6", "8"],
    explanation:
      "A generator function uses `yield` to pause execution and return a value on demand. The `for...of` loop calls `.next()` behind the scenes — no intermediate array is created, making this memory-efficient for large ranges.",
    solutionCode: `function* range(start, end, step = 1) {
  for (let i = start; i < end; i += step) {
    yield i;
  }
}

for (const n of range(0, 10, 2)) {
  console.log(n);
}`,
    tags: ["generator", "yield", "iterator", "for...of", "lazy evaluation"],
  },

  // ── Functional JS ────────────────────────────────────────────────────────
  {
    id: "functional-pipeline",
    title: "Compose a data pipeline",
    category: "functional",
    difficulty: "intermediate",
    prompt:
      "Using only `map`, `filter`, and `reduce`, compute the total price of in-stock items after a 10% discount. No loops allowed.",
    starterCode: `const inventory = [
  { name: "Widget", price: 25, inStock: true },
  { name: "Gadget", price: 80, inStock: false },
  { name: "Doohickey", price: 40, inStock: true },
  { name: "Thingamajig", price: 15, inStock: true },
];

// Your pipeline here
const total = 0;
console.log(total); // 72`,
    expectedOutput: ["72"],
    explanation:
      "Chain: filter out out-of-stock items → map to discounted prices → reduce to sum. Each step is a pure transformation — no mutation, no side effects. Reading it top-to-bottom describes what the code does, not how.",
    solutionCode: `const inventory = [
  { name: "Widget", price: 25, inStock: true },
  { name: "Gadget", price: 80, inStock: false },
  { name: "Doohickey", price: 40, inStock: true },
  { name: "Thingamajig", price: 15, inStock: true },
];

const total = inventory
  .filter((item) => item.inStock)
  .map((item) => item.price * 0.9)
  .reduce((sum, price) => sum + price, 0);
console.log(total);`,
    tags: [
      "map",
      "filter",
      "reduce",
      "functional",
      "pipeline",
      "pure function",
    ],
  },
];

export const categoryLabels: Record<string, string> = {
  "scope-closures": "Scope & Closures",
  "this-prototypes": "this & Prototypes",
  "async-promises": "Async / Promises",
  "event-loop": "Event Loop",
  "destructuring-spread": "Destructuring & Spread",
  "iterators-generators": "Iterators & Generators",
  functional: "Functional JS",
};
