<template>
  <aside
    v-if="open"
    class="fixed right-0 top-0 h-full w-96 border-l border-gray-200 bg-white shadow-xl flex flex-col z-50"
  >
    <!-- Header -->
    <div
      class="flex items-center justify-between border-b border-gray-200 px-4 py-3"
    >
      <h2 class="text-sm font-semibold text-gray-800">🤝 Pair Programmer</h2>
      <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600">
        ✕
      </button>
    </div>

    <!-- Mode tabs -->
    <div class="flex border-b border-gray-200">
      <button
        v-for="m in modes"
        :key="m.id"
        class="flex-1 py-2 text-sm font-medium transition-colors"
        :class="
          mode === m.id
            ? 'border-b-2 border-indigo-600 text-indigo-600'
            : 'text-gray-500 hover:text-gray-700'
        "
        @click="mode = m.id"
      >
        {{ m.label }}
      </button>
    </div>

    <!-- Ask mode -->
    <div
      v-if="mode === 'ask'"
      class="flex flex-col gap-3 overflow-y-auto p-4 flex-1"
    >
      <div
        v-for="field in askFields"
        :key="field.key"
        class="flex flex-col gap-1"
      >
        <label
          :for="'ask-' + field.key"
          class="text-xs font-medium text-gray-600"
          >{{ field.label }}</label
        >
        <textarea
          :id="'ask-' + field.key"
          v-model="askForm[field.key]"
          :placeholder="field.placeholder"
          rows="2"
          class="rounded-md border border-gray-300 p-2 text-sm focus:border-indigo-400 focus:outline-none resize-none"
        />
      </div>
    </div>

    <!-- Explain mode -->
    <div
      v-if="mode === 'explain'"
      class="flex flex-col gap-3 overflow-y-auto p-4 flex-1"
    >
      <div class="flex flex-col gap-1">
        <label for="explain-lang" class="text-xs font-medium text-gray-600"
          >Language</label
        >
        <select
          id="explain-lang"
          v-model="explainLang"
          class="rounded-md border border-gray-300 p-2 text-sm"
        >
          <option value="ts">TypeScript</option>
          <option value="js">JavaScript</option>
          <option value="vue">Vue</option>
          <option value="css">CSS</option>
          <option value="python">Python</option>
        </select>
      </div>
      <div class="flex flex-col gap-1">
        <label for="explain-code" class="text-xs font-medium text-gray-600"
          >Code snippet</label
        >
        <textarea
          id="explain-code"
          v-model="explainCode"
          placeholder="Paste the code you want explained…"
          rows="8"
          class="rounded-md border border-gray-300 bg-gray-900 p-3 font-mono text-xs text-green-400 focus:border-indigo-400 focus:outline-none resize-none"
          spellcheck="false"
        />
      </div>
    </div>

    <!-- Generated prompt -->
    <div class="border-t border-gray-200 p-4 space-y-2">
      <p class="text-xs font-medium text-gray-500 uppercase tracking-wide">
        Generated Prompt
      </p>
      <pre
        class="max-h-40 overflow-y-auto rounded-md bg-gray-50 p-3 text-xs text-gray-700 whitespace-pre-wrap break-words"
        >{{ generatedPrompt }}</pre
      >
      <button
        class="w-full rounded-md bg-indigo-600 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
        @click="copyPrompt"
      >
        {{ copied ? "✓ Copied!" : "📋 Copy Prompt" }}
      </button>
    </div>
  </aside>
</template>

<script lang="ts">
import { ref, computed, reactive } from "vue";

const ASK_FIELDS = [
  {
    key: "context",
    label: "Context — what are you building?",
    placeholder: "I am building a Vue 3 dashboard with Pinia…",
  },
  {
    key: "problem",
    label: "Problem",
    placeholder: "Describe what is going wrong or what you need…",
  },
  {
    key: "expected",
    label: "Expected behavior",
    placeholder: "What you expected to happen…",
  },
  {
    key: "tried",
    label: "What have you tried?",
    placeholder: "What you already tried and why it didn't work…",
  },
  {
    key: "question",
    label: "Specific question",
    placeholder: "The exact thing you need help with…",
  },
] as const;

type AskKey = (typeof ASK_FIELDS)[number]["key"];

export default {
  props: {
    open: { type: Boolean, default: false },
  },
  emits: ["close"],
  setup() {
    const mode = ref<"ask" | "explain">("ask");
    const modes = [
      { id: "ask" as const, label: "Ask a Question" },
      { id: "explain" as const, label: "Explain Code" },
    ];

    const askForm = reactive<Record<AskKey, string>>({
      context: "",
      problem: "",
      expected: "",
      tried: "",
      question: "",
    });
    const askFields = ASK_FIELDS;

    const explainCode = ref("");
    const explainLang = ref("ts");

    const generatedPrompt = computed(() => {
      if (mode.value === "ask") {
        const parts: string[] = [];
        if (askForm.context) parts.push(`Context: ${askForm.context}`);
        if (askForm.problem) parts.push(`Problem: ${askForm.problem}`);
        if (askForm.expected) parts.push(`Expected: ${askForm.expected}`);
        if (askForm.tried) parts.push(`Tried: ${askForm.tried}`);
        if (askForm.question) parts.push(`Question: ${askForm.question}`);
        return parts.length
          ? parts.join("\n\n")
          : "Fill in the fields above to generate a prompt.";
      }

      if (!explainCode.value.trim())
        return "Paste a code snippet above to generate an explanation prompt.";

      return `Please explain the following code:\n\n\`\`\`${explainLang.value}\n${explainCode.value.trim()}\n\`\`\`\n\nCover:\n1. What this code does (high-level summary)\n2. How it works step by step\n3. Why each key decision was made (patterns, tradeoffs)\n4. Edge cases or potential issues to watch out for\n5. How I could improve or extend it`;
    });

    const copied = ref(false);
    async function copyPrompt() {
      await navigator.clipboard.writeText(generatedPrompt.value);
      copied.value = true;
      setTimeout(() => (copied.value = false), 2000);
    }

    return {
      mode,
      modes,
      askForm,
      askFields,
      explainCode,
      explainLang,
      generatedPrompt,
      copied,
      copyPrompt,
    };
  },
};
</script>
