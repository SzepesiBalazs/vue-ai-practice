<template>
  <div class="mx-auto max-w-3xl">
    <div class="mb-4">
      <h1 class="text-2xl font-bold text-gray-800">Gemini Chatbot</h1>
      <p class="mt-1 text-sm text-gray-500">
        Chat with Google's Gemini models — free of charge on the Standard tier.
        Get your free API key at
        <a
          href="https://aistudio.google.com/apikey"
          target="_blank"
          rel="noopener noreferrer"
          class="text-indigo-600 underline hover:text-indigo-800"
          >aistudio.google.com/apikey</a
        >. Your key is stored only in your browser's localStorage.
      </p>
    </div>

    <div
      class="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
      style="height: 70vh"
    >
      <ChatbotPanel />
    </div>
  </div>
</template>

<script lang="ts">
import ChatbotPanel from "@/components/ChatbotPanel.vue";

export default {
  components: { ChatbotPanel },
  setup() {
    return {};
  },
};
</script>
