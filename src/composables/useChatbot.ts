import { ref, watch } from "vue";

export type Role = "user" | "assistant";

export interface Message {
  role: Role;
  content: string;
}

const STORAGE_KEY = "gemini-api-key";
const MODELS = [
  "gemini-2.5-flash-lite",
  "gemini-2.5-flash",
  "gemini-2.5-pro",
] as const;
export type Model = (typeof MODELS)[number];

async function fetchCompletion(
  key: string,
  model: Model,
  messages: Message[],
): Promise<Response> {
  return fetch(
    "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model,
        stream: true,
        messages: messages.map((m) => ({ role: m.role, content: m.content })),
      }),
    },
  );
}

async function resolveErrorDetail(res: Response): Promise<string> {
  try {
    const body = await res.json();
    return (body?.error?.message as string | undefined) ?? `HTTP ${res.status}`;
  } catch {
    return `HTTP ${res.status}`;
  }
}

function applyDeltaLine(line: string, target: Message): void {
  const trimmed = line.trim();
  if (!trimmed.startsWith("data: ")) return;
  const payload = trimmed.slice(6);
  if (payload === "[DONE]") return;
  try {
    const parsed = JSON.parse(payload);
    const delta = parsed?.choices?.[0]?.delta?.content;
    if (typeof delta === "string") {
      target.content += delta;
    }
  } catch {
    // skip malformed SSE lines
  }
}

async function streamIntoMessage(
  res: Response,
  target: Message,
): Promise<void> {
  const reader = res.body?.getReader();
  if (!reader) return;
  const decoder = new TextDecoder();
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    for (const line of decoder.decode(value, { stream: true }).split("\n")) {
      applyDeltaLine(line, target);
    }
  }
}

export function useChatbot() {
  const apiKey = ref<string>(localStorage.getItem(STORAGE_KEY) ?? "");
  const selectedModel = ref<Model>("gemini-2.5-flash-lite");
  const messages = ref<Message[]>([]);
  const isLoading = ref(false);
  const error = ref("");

  watch(apiKey, (val) => {
    localStorage.setItem(STORAGE_KEY, val);
  });

  async function send(userText: string) {
    const trimmed = userText.trim();
    if (!trimmed || isLoading.value) return;
    if (!apiKey.value.trim()) {
      error.value = "Please enter your Google AI Studio API key above.";
      return;
    }

    error.value = "";
    messages.value.push({ role: "user", content: trimmed });
    isLoading.value = true;

    let res: Response;
    try {
      res = await fetchCompletion(
        apiKey.value.trim(),
        selectedModel.value,
        messages.value,
      );
    } catch (fetchErr: unknown) {
      error.value = `Network error — could not reach Google AI. ${(fetchErr as Error).message ?? ""}`;
      isLoading.value = false;
      return;
    }

    if (!res.ok) {
      error.value = `Gemini error: ${await resolveErrorDetail(res)}`;
      isLoading.value = false;
      return;
    }

    messages.value.push({ role: "assistant", content: "" });
    const assistantMsg = messages.value.at(-1) as Message;

    try {
      await streamIntoMessage(res, assistantMsg);
    } catch (streamErr: unknown) {
      error.value = `Stream interrupted: ${(streamErr as Error).message ?? "Response may be incomplete."}`;
    } finally {
      isLoading.value = false;
    }
  }

  function clearChat() {
    messages.value = [];
    error.value = "";
  }

  return {
    apiKey,
    selectedModel,
    models: MODELS,
    messages,
    isLoading,
    error,
    send,
    clearChat,
  };
}
