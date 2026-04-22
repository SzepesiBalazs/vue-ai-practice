<template>
  <div class="flex flex-col h-full">
    <!-- API key + model row -->
    <div class="flex flex-col gap-2 border-b border-gray-200 bg-white p-4">
      <div class="flex items-center gap-2">
        <label for="api-key" class="text-xs font-medium text-gray-600 shrink-0"
          >API Key</label
        >
        <input
          id="api-key"
          v-model="apiKey"
          type="password"
          placeholder="AIza..."
          autocomplete="off"
          class="flex-1 rounded-md border border-gray-300 px-2 py-1 text-xs focus:border-indigo-400 focus:outline-none"
        />
      </div>
      <div class="flex items-center gap-2">
        <label
          for="model-select"
          class="text-xs font-medium text-gray-600 shrink-0"
          >Model</label
        >
        <select
          id="model-select"
          v-model="selectedModel"
          class="flex-1 rounded-md border border-gray-300 px-2 py-1 text-xs focus:border-indigo-400 focus:outline-none"
        >
          <option v-for="m in models" :key="m" :value="m">{{ m }}</option>
        </select>
        <button
          @click="clearChat"
          class="rounded-md border border-gray-300 px-2 py-1 text-xs text-gray-500 hover:bg-gray-100 transition-colors"
        >
          Clear
        </button>
      </div>
    </div>

    <!-- Error banner -->
    <div
      v-if="error"
      class="flex items-center gap-2 bg-red-50 border-b border-red-200 px-4 py-2 text-xs text-red-700"
    >
      <span>⚠ {{ error }}</span>
      <button
        @click="error = ''"
        class="ml-auto text-red-400 hover:text-red-600"
      >
        ✕
      </button>
    </div>

    <!-- Message list -->
    <div ref="messageList" class="flex-1 overflow-y-auto p-4 space-y-3">
      <div
        v-if="messages.length === 0"
        class="flex h-full items-center justify-center text-sm text-gray-400"
      >
        Start a conversation below.
      </div>

      <div
        v-for="(msg, i) in messages"
        :key="i"
        class="flex"
        :class="msg.role === 'user' ? 'justify-end' : 'justify-start'"
      >
        <div
          class="max-w-[80%] rounded-2xl px-4 py-2 text-sm whitespace-pre-wrap break-words"
          :class="
            msg.role === 'user'
              ? 'bg-indigo-600 text-white rounded-br-sm'
              : 'bg-gray-100 text-gray-800 rounded-bl-sm'
          "
        >
          {{ msg.content }}
        </div>
      </div>

      <!-- Typing indicator -->
      <div v-if="isLoading" class="flex justify-start">
        <div
          class="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-gray-100 px-4 py-3"
        >
          <span
            class="h-2 w-2 animate-bounce rounded-full bg-gray-400"
            style="animation-delay: 0ms"
          ></span>
          <span
            class="h-2 w-2 animate-bounce rounded-full bg-gray-400"
            style="animation-delay: 150ms"
          ></span>
          <span
            class="h-2 w-2 animate-bounce rounded-full bg-gray-400"
            style="animation-delay: 300ms"
          ></span>
        </div>
      </div>
    </div>

    <!-- Input area -->
    <div class="border-t border-gray-200 bg-white p-4">
      <div class="flex gap-2">
        <textarea
          v-model="inputText"
          @keydown.enter.exact.prevent="submit"
          placeholder="Type a message… (Enter to send)"
          rows="2"
          class="flex-1 resize-none rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-indigo-400 focus:outline-none"
        />
        <button
          @click="submit"
          :disabled="isLoading || !inputText.trim()"
          class="self-end rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Send
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, watch, nextTick } from "vue";
import { useChatbot } from "@/composables/useChatbot";

export default {
  setup() {
    const {
      apiKey,
      selectedModel,
      models,
      messages,
      isLoading,
      error,
      send,
      clearChat,
    } = useChatbot();

    const inputText = ref("");
    const messageList = ref<HTMLElement | null>(null);

    async function submit() {
      const text = inputText.value.trim();
      if (!text || isLoading.value) return;
      inputText.value = "";
      await send(text);
    }

    watch(
      () => messages.value.length,
      async () => {
        await nextTick();
        if (messageList.value) {
          messageList.value.scrollTop = messageList.value.scrollHeight;
        }
      },
    );

    return {
      apiKey,
      selectedModel,
      models,
      messages,
      isLoading,
      error,
      inputText,
      messageList,
      submit,
      clearChat,
    };
  },
};
</script>
