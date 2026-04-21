import type { PhpProblem, ConceptCategory } from "@/types/php-explorer";

export const categoryLabels: Record<ConceptCategory, string> = {
  "type-juggling": "Type Juggling",
  arrays: "Arrays",
  closures: "Closures",
  oop: "OOP",
  "php8-features": "PHP 8+ Features",
  strings: "Strings",
  "error-handling": "Error Handling",
  patterns: "Patterns",
};

export const problems: PhpProblem[] = [
  // ── Type Juggling ────────────────────────────────────────────────────────
  {
    id: "loose-comparison-trap",
    title: "Loose comparison trap",
    category: "type-juggling",
    difficulty: "intermediate",
    prompt:
      "Predict the output of each comparison. Then rewrite using strict equality.",
    starterCode: `<?php
var_dump(0 == "a");       // ?
var_dump(0 == "");        // ?
var_dump("1" == "01");    // ?
var_dump(100 == "1e2");   // ?
var_dump("" == false);    // ?
var_dump("0" == false);   // ?`,
    expectedOutput: [
      "bool(true)",
      "bool(true)",
      "bool(true)",
      "bool(true)",
      "bool(true)",
      "bool(true)",
    ],
    explanation:
      'PHP\'s `==` coerces both sides to a common type before comparing. A non-numeric string compared to `0` casts the string to `0`. "1e2" is parsed as the float `100`. Use `===` to compare value AND type — no coercion happens.',
    solutionCode: `<?php
// With strict comparison ===
var_dump(0 === "a");    // false — int vs string
var_dump(0 === "");     // false — int vs string
var_dump("1" === "01"); // false — different strings
var_dump(100 === "1e2");// false — int vs string
var_dump("" === false); // false — string vs bool
var_dump("0" === false);// false — string vs bool`,
    tags: ["==", "===", "type coercion", "comparison", "strict_types"],
  },

  {
    id: "strict-types-declaration",
    title: "strict_types and type enforcement",
    category: "type-juggling",
    difficulty: "beginner",
    prompt:
      "What changes when `declare(strict_types=1)` is added? Predict the output with and without it.",
    starterCode: `<?php
// Without strict_types — PHP coerces "3" to int 3
function add(int $a, int $b): int {
    return $a + $b;
}

echo add(2, "3"); // ?`,
    expectedOutput: ["5"],
    explanation:
      'Without `declare(strict_types=1)`, PHP silently coerces "3" to `int 3` — no error. With `declare(strict_types=1)` at the top of the file, passing a string where an `int` is declared throws a `TypeError`. Strict types only apply to the file declaring them, not to called functions in other files.',
    solutionCode: `<?php
declare(strict_types=1);

function add(int $a, int $b): int {
    return $a + $b;
}

// echo add(2, "3"); // TypeError: must be of type int, string given

// Correct:
echo add(2, 3); // 5`,
    tags: ["strict_types", "type hints", "TypeError", "declare"],
  },

  // ── Arrays ───────────────────────────────────────────────────────────────
  {
    id: "array-functions-pipeline",
    title: "Array functions pipeline",
    category: "arrays",
    difficulty: "intermediate",
    prompt:
      "Using only `array_filter`, `array_map`, and `array_reduce`, compute the total price of in-stock items with a 10% discount. No loops.",
    starterCode: `<?php
$inventory = [
    ['name' => 'Widget',      'price' => 25, 'inStock' => true],
    ['name' => 'Gadget',      'price' => 80, 'inStock' => false],
    ['name' => 'Doohickey',   'price' => 40, 'inStock' => true],
    ['name' => 'Thingamajig', 'price' => 15, 'inStock' => true],
];

// Your pipeline here
$total = 0;
echo $total; // 72`,
    expectedOutput: ["72"],
    explanation:
      "Chain: `array_filter` removes out-of-stock items → `array_map` applies the 10% discount → `array_reduce` sums the prices. Note that `array_filter` preserves original keys; `array_values` can re-index if needed. Each function is a pure transformation without mutation.",
    solutionCode: `<?php
$inventory = [
    ['name' => 'Widget',      'price' => 25, 'inStock' => true],
    ['name' => 'Gadget',      'price' => 80, 'inStock' => false],
    ['name' => 'Doohickey',   'price' => 40, 'inStock' => true],
    ['name' => 'Thingamajig', 'price' => 15, 'inStock' => true],
];

$total = array_reduce(
    array_map(
        fn($item) => $item['price'] * 0.9,
        array_filter($inventory, fn($item) => $item['inStock'])
    ),
    fn($carry, $price) => $carry + $price,
    0
);

echo $total; // 72`,
    tags: [
      "array_filter",
      "array_map",
      "array_reduce",
      "functional",
      "pipeline",
    ],
  },

  {
    id: "array-reference-trap",
    title: "Array reference in foreach",
    category: "arrays",
    difficulty: "intermediate",
    prompt: "Predict what is printed after both foreach loops.",
    starterCode: `<?php
$nums = [1, 2, 3, 4];

foreach ($nums as &$val) {
    $val *= 2;
}

foreach ($nums as $val) {
    echo $val . "\n";
}`,
    expectedOutput: ["2", "4", "6", "6"],
    explanation:
      "After the first loop, `$val` is still a reference to the last element of `$nums`. The second loop assigns to `$val` on each iteration — which overwrites `$nums[3]`. The last value printed twice as `6`. Always `unset($val)` after a reference foreach to break the reference.",
    solutionCode: `<?php
$nums = [1, 2, 3, 4];

foreach ($nums as &$val) {
    $val *= 2;
}
unset($val); // Break the reference — always do this!

foreach ($nums as $val) {
    echo $val . "\n"; // 2, 4, 6, 8
}`,
    tags: ["foreach", "reference", "&", "unset", "gotcha"],
  },

  // ── Closures ─────────────────────────────────────────────────────────────
  {
    id: "closure-use-by-value",
    title: "Closure use by value vs reference",
    category: "closures",
    difficulty: "intermediate",
    prompt: "Predict the output of both closures. What is the difference?",
    starterCode: `<?php
$count = 0;

$byValue = function () use ($count) {
    $count++;
    echo $count . "\n";
};

$byRef = function () use (&$count) {
    $count++;
    echo $count . "\n";
};

$byValue();
$byValue();
echo $count . "\n"; // ?

$byRef();
$byRef();
echo $count . "\n"; // ?`,
    expectedOutput: ["1", "1", "0", "1", "2", "2"],
    explanation:
      "`use ($count)` captures a copy of `$count` at closure creation time. The closure has its own copy — the outer variable is unchanged. `use (&$count)` captures a reference — mutations inside the closure affect the outer variable. Use by reference for accumulators or shared state.",
    solutionCode: `<?php
$count = 0;

// By value: captures a copy — outer $count unchanged
$byValue = function () use ($count) {
    $count++;           // modifies the copy
    echo $count . "\n"; // 1 (always 1 — starts from 0 each call)
};

// By reference: captures a reference — outer $count changes
$byRef = function () use (&$count) {
    $count++;           // modifies the original
    echo $count . "\n";
};

$byValue(); // 1
$byValue(); // 1
echo $count . "\n"; // 0 — unchanged

$byRef(); // 1
$byRef(); // 2
echo $count . "\n"; // 2 — modified`,
    tags: ["closure", "use", "by reference", "&", "scope"],
  },

  {
    id: "arrow-function-capture",
    title: "Arrow functions auto-capture",
    category: "closures",
    difficulty: "beginner",
    prompt:
      "Rewrite the closure using PHP 8 arrow function syntax. What does the arrow function capture automatically?",
    starterCode: `<?php
$multiplier = 3;

$multiply = function (int $n) use ($multiplier): int {
    return $n * $multiplier;
};

echo $multiply(5); // 15`,
    expectedOutput: ["15"],
    explanation:
      "Arrow functions (`fn()`) automatically capture variables from the outer scope by value — no `use` keyword needed. They are single-expression and implicitly return the result. They cannot modify outer variables (no reference capture) and cannot span multiple lines.",
    solutionCode: `<?php
$multiplier = 3;

// Arrow function: auto-captures $multiplier by value
$multiply = fn(int $n): int => $n * $multiplier;

echo $multiply(5); // 15

// Equivalent to:
// function (int $n) use ($multiplier): int { return $n * $multiplier; }`,
    tags: ["arrow function", "fn", "capture", "closures", "PHP 7.4"],
  },

  // ── OOP ──────────────────────────────────────────────────────────────────
  {
    id: "trait-conflict-resolution",
    title: "Trait method conflict resolution",
    category: "oop",
    difficulty: "advanced",
    prompt:
      "Two traits both define `greet()`. Predict the error and fix it using `insteadof` and `as`.",
    starterCode: `<?php
trait Hello {
    public function greet(): string {
        return "Hello!";
    }
}

trait Hi {
    public function greet(): string {
        return "Hi!";
    }
}

class Greeter {
    use Hello, Hi;
}

echo (new Greeter())->greet();`,
    expectedOutput: [],
    explanation:
      "When two traits define the same method, PHP throws a fatal error unless you resolve the conflict. Use `insteadof` to specify which trait's method wins, and `as` to alias the losing method under a new name so both remain accessible.",
    solutionCode: `<?php
trait Hello {
    public function greet(): string { return "Hello!"; }
}

trait Hi {
    public function greet(): string { return "Hi!"; }
}

class Greeter {
    use Hello, Hi {
        Hello::greet insteadof Hi;   // Hello wins
        Hi::greet as greetHi;        // Hi is aliased
    }
}

$g = new Greeter();
echo $g->greet();   // Hello!
echo $g->greetHi(); // Hi!`,
    tags: ["trait", "insteadof", "as", "conflict", "mixin"],
  },

  {
    id: "constructor-promotion",
    title: "Constructor property promotion",
    category: "oop",
    difficulty: "beginner",
    prompt:
      "Rewrite the verbose class using PHP 8 constructor property promotion to reduce boilerplate.",
    starterCode: `<?php
class User {
    public int $id;
    public string $name;
    private string $email;

    public function __construct(int $id, string $name, string $email) {
        $this->id    = $id;
        $this->name  = $name;
        $this->email = $email;
    }

    public function getEmail(): string {
        return $this->email;
    }
}

$u = new User(1, 'Alice', 'alice@example.com');
echo $u->name;       // Alice
echo $u->getEmail(); // alice@example.com`,
    expectedOutput: ["Alice", "alice@example.com"],
    explanation:
      "Constructor property promotion (PHP 8.0+) combines property declaration, constructor parameter, and assignment into one. Add a visibility modifier (`public`, `protected`, `private`) to a constructor parameter and PHP handles the rest automatically.",
    solutionCode: `<?php
class User {
    public function __construct(
        public int $id,
        public string $name,
        private string $email,
    ) {}

    public function getEmail(): string {
        return $this->email;
    }
}

$u = new User(1, 'Alice', 'alice@example.com');
echo $u->name;       // Alice
echo $u->getEmail(); // alice@example.com`,
    tags: ["constructor promotion", "PHP 8", "OOP", "boilerplate"],
  },

  {
    id: "interface-vs-abstract",
    title: "Interface vs Abstract class",
    category: "oop",
    difficulty: "intermediate",
    prompt:
      "Design a shape hierarchy. Which requires `interface` and which requires `abstract class`? Implement `Circle` and `Rectangle`.",
    starterCode: `<?php
// Define: Colorable interface (has color, can describe it)
// Define: Shape abstract class (has area() and perimeter())

// class Circle extends Shape implements Colorable { ... }
// class Rectangle extends Shape implements Colorable { ... }

$c = new Circle(5.0, 'red');
echo $c->area();      // 78.54
echo $c->color;       // red`,
    expectedOutput: [],
    explanation:
      "Use an **interface** for a capability contract with no shared state (`Colorable` — any class can be colorable). Use an **abstract class** when you want to share implementation code and enforce a contract (`Shape` — all shapes have area/perimeter logic that may share helpers). A class can implement many interfaces but extend only one abstract class.",
    solutionCode: `<?php
interface Colorable {
    public function describe(): string;
}

abstract class Shape {
    abstract public function area(): float;
    abstract public function perimeter(): float;
}

class Circle extends Shape implements Colorable {
    public function __construct(
        private float $radius,
        public string $color,
    ) {}

    public function area(): float {
        return round(M_PI * $this->radius ** 2, 2);
    }

    public function perimeter(): float {
        return round(2 * M_PI * $this->radius, 2);
    }

    public function describe(): string {
        return "A {$this->color} circle";
    }
}

class Rectangle extends Shape implements Colorable {
    public function __construct(
        private float $width,
        private float $height,
        public string $color,
    ) {}

    public function area(): float { return $this->width * $this->height; }
    public function perimeter(): float { return 2 * ($this->width + $this->height); }
    public function describe(): string { return "A {$this->color} rectangle"; }
}

$c = new Circle(5.0, 'red');
echo $c->area();    // 78.54
echo $c->color;     // red`,
    tags: [
      "interface",
      "abstract",
      "OOP",
      "extends",
      "implements",
      "polymorphism",
    ],
  },

  // ── PHP 8+ Features ──────────────────────────────────────────────────────
  {
    id: "match-expression",
    title: "match vs switch",
    category: "php8-features",
    difficulty: "beginner",
    prompt:
      "Rewrite the switch statement using a `match` expression. What are the key differences?",
    starterCode: `<?php
$status = 2;

switch ($status) {
    case 1:
        $label = 'Active';
        break;
    case 2:
    case 3:
        $label = 'Pending';
        break;
    case 0:
        $label = 'Inactive';
        break;
    default:
        $label = 'Unknown';
}

echo $label; // Pending`,
    expectedOutput: ["Pending"],
    explanation:
      "`match` uses strict (`===`) comparison, returns a value directly, throws `UnhandledMatchError` for unmatched values (no silent fallthrough), and supports comma-separated conditions per arm. It cannot be used when you need fallthrough or side effects per case.",
    solutionCode: `<?php
$status = 2;

$label = match($status) {
    1       => 'Active',
    2, 3    => 'Pending',   // comma = OR condition
    0       => 'Inactive',
    default => 'Unknown',
};

echo $label; // Pending

// Key differences vs switch:
// 1. Strict === comparison (no type coercion)
// 2. Returns a value — assign directly
// 3. No break needed — no fallthrough
// 4. UnhandledMatchError if no arm matches and no default`,
    tags: ["match", "switch", "PHP 8", "strict comparison"],
  },

  {
    id: "nullsafe-operator",
    title: "Nullsafe operator ?->",
    category: "php8-features",
    difficulty: "beginner",
    prompt:
      "Rewrite the nested null-checks using the PHP 8 nullsafe operator `?->`.",
    starterCode: `<?php
class Address {
    public function __construct(public ?string $city = null) {}
}

class User {
    public function __construct(public ?Address $address = null) {}
}

function getCity(?User $user): ?string {
    if ($user === null) return null;
    if ($user->address === null) return null;
    return $user->address->city;
}

$user = new User(new Address('Paris'));
echo getCity($user);  // Paris

$none = null;
echo getCity($none);  // (nothing — null)`,
    expectedOutput: ["Paris"],
    explanation:
      "The nullsafe operator `?->` short-circuits the chain and returns `null` if the left-hand side is `null`, without throwing an error. It eliminates cascading null checks and works with method calls and property access. It cannot be used on the left-hand side of an assignment.",
    solutionCode: `<?php
class Address {
    public function __construct(public ?string $city = null) {}
}

class User {
    public function __construct(public ?Address $address = null) {}
}

function getCity(?User $user): ?string {
    return $user?->address?->city; // returns null at first null in chain
}

$user = new User(new Address('Paris'));
echo getCity($user); // Paris

$none = null;
var_dump(getCity($none)); // NULL`,
    tags: ["nullsafe", "?->", "PHP 8", "null", "chaining"],
  },

  {
    id: "named-arguments",
    title: "Named arguments",
    category: "php8-features",
    difficulty: "beginner",
    prompt:
      "Use named arguments to call `array_slice` and `htmlspecialchars` without memorizing argument order.",
    starterCode: `<?php
$letters = ['a', 'b', 'c', 'd', 'e'];

// Positional — which argument is which?
$slice = array_slice($letters, 1, 3, true);

echo implode(',', $slice); // b,c,d`,
    expectedOutput: ["b,c,d"],
    explanation:
      "Named arguments (PHP 8.0+) let you pass arguments by name in any order, skipping optional parameters without using placeholder values. They work with built-in and user-defined functions and improve readability for functions with many optional parameters.",
    solutionCode: `<?php
$letters = ['a', 'b', 'c', 'd', 'e'];

// Named arguments — self-documenting
$slice = array_slice(
    array: $letters,
    offset: 1,
    length: 3,
    preserve_keys: true,
);

echo implode(',', $slice); // b,c,d

// Also useful for skipping optional params:
$escaped = htmlspecialchars(
    string: '<b>Hello</b>',
    encoding: 'UTF-8',
    // double_encode: true  — skip middle optional
);
echo $escaped; // &lt;b&gt;Hello&lt;/b&gt;`,
    tags: ["named arguments", "PHP 8", "readability"],
  },

  {
    id: "enums",
    title: "Backed enums",
    category: "php8-features",
    difficulty: "intermediate",
    prompt:
      "Model HTTP status codes using a backed enum. Implement a `label()` method and safe creation from an int.",
    starterCode: `<?php
// Define Status enum backed by int
// Values: Ok=200, NotFound=404, ServerError=500

// $status = Status::Ok;
// echo $status->label();  // OK
// echo $status->value;    // 200

// Safe creation from int:
// $s = Status::tryFrom(404);  // Status::NotFound
// $bad = Status::tryFrom(999); // null`,
    expectedOutput: [],
    explanation:
      "Backed enums (PHP 8.1+) associate each case with a scalar value (`int` or `string`). Use `from()` when the value must exist (throws `ValueError` otherwise) and `tryFrom()` for safe nullable creation. Enums can implement interfaces and have methods, but cannot have mutable state.",
    solutionCode: `<?php
enum Status: int {
    case Ok          = 200;
    case NotFound    = 404;
    case ServerError = 500;

    public function label(): string {
        return match($this) {
            Status::Ok          => 'OK',
            Status::NotFound    => 'Not Found',
            Status::ServerError => 'Internal Server Error',
        };
    }
}

$status = Status::Ok;
echo $status->label();  // OK
echo $status->value;    // 200

$s   = Status::tryFrom(404);  // Status::NotFound
$bad = Status::tryFrom(999);  // null

var_dump($s?->label()); // string(9) "Not Found"
var_dump($bad);         // NULL`,
    tags: ["enum", "backed enum", "PHP 8.1", "tryFrom", "match"],
  },

  // ── Strings ──────────────────────────────────────────────────────────────
  {
    id: "string-interpolation",
    title: "String interpolation and heredoc",
    category: "strings",
    difficulty: "beginner",
    prompt:
      "Predict the output of each string literal type. When should you prefer each?",
    starterCode: `<?php
$name = "World";
$price = 9.99;

echo "Hello, $name!\n";
echo 'Hello, $name!\n';
echo "Price: \${price}\n";

$html = <<<EOT
<p>Hello, {$name}!</p>
<p>Price: $price</p>
EOT;

echo $html;`,
    expectedOutput: [],
    explanation:
      "Double-quoted strings (`\"`) interpolate variables and process escape sequences. Single-quoted strings (`'`) are literal — no interpolation, `\\n` is two characters. Heredoc (`<<<EOT`) behaves like double-quoted strings but allows multi-line content without escaping quotes. Nowdoc (`<<<'EOT'`) is the single-quoted equivalent — no interpolation.",
    solutionCode: `<?php
$name  = "World";
$price = 9.99;

echo "Hello, $name!\n";          // Hello, World!  (interpolated + newline)
echo 'Hello, $name!\n';          // Hello, $name!\n  (literal — no interpolation)
echo "Price: ${price}\n";        // Price: ${price}  (backslash-dollar escapes $)

// Nowdoc — no interpolation, useful for code samples
$raw = <<<'EOT'
Hello, $name — no interpolation here.
EOT;
echo $raw;

// Heredoc — interpolated multi-line
$html = <<<EOT
<p>Hello, {$name}!</p>
<p>Price: $price</p>
EOT;
echo $html;`,
    tags: ["string", "heredoc", "nowdoc", "interpolation", "single-quote"],
  },

  // ── Error Handling ───────────────────────────────────────────────────────
  {
    id: "exception-hierarchy",
    title: "Custom exception hierarchy",
    category: "error-handling",
    difficulty: "intermediate",
    prompt:
      "Design a custom exception hierarchy for a payment system. Catch specific vs general exceptions in the right order.",
    starterCode: `<?php
// Define: PaymentException (base)
//         InsufficientFundsException extends PaymentException
//         CardDeclinedException extends PaymentException

function charge(float $amount, float $balance): void {
    if ($balance < $amount) {
        throw new InsufficientFundsException("Need $amount, have $balance");
    }
}

try {
    charge(100.0, 50.0);
} catch (/* specific */ $e) {
    echo "Funds: " . $e->getMessage();
} catch (/* general */ $e) {
    echo "Payment failed: " . $e->getMessage();
}`,
    expectedOutput: [],
    explanation:
      "Catch blocks are evaluated top-to-bottom — more specific exceptions must come before more general ones. Catching `PaymentException` before `InsufficientFundsException` would absorb all payment errors, making the specific catch unreachable. PHP 8.0+ union catches (`catch (A|B $e)`) let you handle multiple exception types in one block without hierarchy.",
    solutionCode: `<?php
class PaymentException extends RuntimeException {}
class InsufficientFundsException extends PaymentException {}
class CardDeclinedException extends PaymentException {}

function charge(float $amount, float $balance): void {
    if ($balance < $amount) {
        throw new InsufficientFundsException(
            "Need $$amount, have $$balance"
        );
    }
}

try {
    charge(100.0, 50.0);
} catch (InsufficientFundsException $e) {
    // Most specific — caught first
    echo "Funds: " . $e->getMessage();
} catch (PaymentException $e) {
    // General payment error
    echo "Payment failed: " . $e->getMessage();
} catch (\\Throwable $e) {
    // Catch-all for unexpected errors
    echo "Unexpected: " . $e->getMessage();
} finally {
    echo "\nTransaction complete."; // always runs
}`,
    tags: [
      "exception",
      "hierarchy",
      "try/catch",
      "finally",
      "RuntimeException",
    ],
  },

  // ── Patterns ─────────────────────────────────────────────────────────────
  {
    id: "fluent-builder",
    title: "Fluent builder pattern",
    category: "patterns",
    difficulty: "intermediate",
    prompt:
      "Implement a `QueryBuilder` with a fluent interface. Each method should return `$this` to allow chaining.",
    starterCode: `<?php
// $sql = (new QueryBuilder())
//     ->select('id', 'name')
//     ->from('users')
//     ->where('active = 1')
//     ->orderBy('name')
//     ->limit(10)
//     ->build();
//
// echo $sql;
// SELECT id, name FROM users WHERE active = 1 ORDER BY name LIMIT 10`,
    expectedOutput: [],
    explanation:
      "The fluent interface pattern returns `$this` from each mutating method, enabling a readable method chain. Each method accumulates state. `build()` is the terminal method that assembles and returns the final result without returning `$this`. This is not a replacement for a parameterized query — always use prepared statements with real databases to prevent SQL injection.",
    solutionCode: `<?php
class QueryBuilder {
    private array $columns  = ['*'];
    private string $table   = '';
    private array $wheres   = [];
    private ?string $order  = null;
    private ?int $limitVal  = null;

    public function select(string ...$columns): static {
        $this->columns = $columns;
        return $this;
    }

    public function from(string $table): static {
        $this->table = $table;
        return $this;
    }

    public function where(string $condition): static {
        $this->wheres[] = $condition;
        return $this;
    }

    public function orderBy(string $column): static {
        $this->order = $column;
        return $this;
    }

    public function limit(int $n): static {
        $this->limitVal = $n;
        return $this;
    }

    public function build(): string {
        $sql = 'SELECT ' . implode(', ', $this->columns)
             . ' FROM ' . $this->table;

        if ($this->wheres) {
            $sql .= ' WHERE ' . implode(' AND ', $this->wheres);
        }
        if ($this->order !== null) {
            $sql .= ' ORDER BY ' . $this->order;
        }
        if ($this->limitVal !== null) {
            $sql .= ' LIMIT ' . $this->limitVal;
        }
        return $sql;
    }
}

$sql = (new QueryBuilder())
    ->select('id', 'name')
    ->from('users')
    ->where('active = 1')
    ->orderBy('name')
    ->limit(10)
    ->build();

echo $sql;
// SELECT id, name FROM users WHERE active = 1 ORDER BY name LIMIT 10`,
    tags: [
      "fluent interface",
      "builder",
      "method chaining",
      "pattern",
      "static return",
    ],
  },
];
