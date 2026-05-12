const EXTRACT_SYSTEM = `You are a senior advertising strategist. Extract exactly 3 core "Selling Hooks" from the given product description and/or product images. Each hook should capture a unique, compelling angle that could drive ad performance. Return JSON only: { "hooks": [{ "id": 1, "hook": "short hook phrase", "angle": "brief explanation of the selling angle" }, { "id": 2, "hook": "...", "angle": "..." }, { "id": 3, "hook": "...", "angle": "..." }] }`;

const GENERATE_SYSTEM = `You are a multi-channel ad creative director. Given selling hooks, generate ad variants for 4 channels. Return JSON only:
{
  "variants": {
    "google": { "headline": "headline under 30 chars", "description": "description under 90 chars" },
    "instagram": { "caption": "punchy storytelling caption with emojis" },
    "tiktok": { "scenes": [{ "scene": 1, "visual": "visual description", "audio": "voiceover text" }, { "scene": 2, "visual": "...", "audio": "..." }, { "scene": 3, "visual": "...", "audio": "..." }] },
    "email": { "subject_lines": ["urgency line 1", "urgency line 2", "urgency line 3"] }
  }
}`;

const REFINE_SYSTEM = `You are a multi-channel ad creative director. The user wants to refine all ad variants to align with one specific selling hook. Regenerate all 4 channel variants laser-focused on the selected hook. Return JSON only with the same structure:
{
  "variants": {
    "google": { "headline": "under 30 chars", "description": "under 90 chars" },
    "instagram": { "caption": "punchy storytelling caption with emojis" },
    "tiktok": { "scenes": [{ "scene": 1, "visual": "...", "audio": "..." }, { "scene": 2, "visual": "...", "audio": "..." }, { "scene": 3, "visual": "...", "audio": "..." }] },
    "email": { "subject_lines": ["line 1", "line 2", "line 3"] }
  }
}`;

function parseJSON(text) {
  const cleaned = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
  try {
    return JSON.parse(cleaned);
  } catch {
    const match = cleaned.match(/\{[\s\S]*\}/);
    if (match) return JSON.parse(match[0]);
    throw new Error("AI returned invalid JSON. Try again or switch to Demo Mode.");
  }
}

// ── OpenAI ──

async function openaiChat(apiKey, messages, model = "gpt-4o-mini") {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({ model, messages, temperature: 0.7, response_format: { type: "json_object" } }),
  });
  if (!res.ok) throw new Error(`OpenAI error: ${res.status}`);
  const data = await res.json();
  const content = data.choices?.[0]?.message?.content;
  if (!content) throw new Error("OpenAI returned an empty response.");
  return parseJSON(content);
}

// ── Gemini ──

async function geminiChat(apiKey, systemPrompt, userContent, isVision = false) {
  const model = isVision ? "gemini-2.0-flash" : "gemini-2.0-flash";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const parts = [];
  if (typeof userContent === "string") {
    parts.push({ text: userContent });
  } else if (Array.isArray(userContent)) {
    for (const item of userContent) {
      if (item.type === "text") parts.push({ text: item.text });
      else if (item.type === "image_url") {
        const dataUrl = item.image_url.url;
        const match = dataUrl.match(/^data:(.*?);base64,(.*)$/);
        if (match) {
          parts.push({ inlineData: { mimeType: match[1], data: match[2] } });
        }
      }
    }
  }

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: systemPrompt }] },
      contents: [{ parts }],
      generationConfig: { temperature: 0.7, responseMimeType: "application/json" },
    }),
  });
  if (!res.ok) throw new Error(`Gemini error: ${res.status}`);
  const data = await res.json();
  const content = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!content) throw new Error("Gemini returned an empty or blocked response.");
  return parseJSON(content);
}

// ── Groq ──

async function groqChat(apiKey, messages, model = "llama-3.3-70b-versatile") {
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({ model, messages, temperature: 0.7, response_format: { type: "json_object" } }),
  });
  if (!res.ok) throw new Error(`Groq error: ${res.status}`);
  const data = await res.json();
  const content = data.choices?.[0]?.message?.content;
  if (!content) throw new Error("Groq returned an empty response.");
  return parseJSON(content);
}

// ── Provider interface ──

export const PROVIDERS = {
  openai: {
    name: "OpenAI",
    label: "GPT-4o mini",
    keyPrefix: "sk-",
    keyPlaceholder: "sk-...",
    supportsVision: true,
    color: "#10a37f",
  },
  gemini: {
    name: "Google Gemini",
    label: "Gemini 2.0 Flash",
    keyPrefix: "AI",
    keyPlaceholder: "AIza...",
    supportsVision: true,
    color: "#4285f4",
  },
  groq: {
    name: "Groq",
    label: "Llama 3.3 70B",
    keyPrefix: "gsk_",
    keyPlaceholder: "gsk_...",
    supportsVision: false,
    color: "#f55036",
  },
  mock: {
    name: "Demo Mode",
    label: "Mock Data",
    keyPrefix: "",
    keyPlaceholder: "",
    supportsVision: false,
    color: "#8b5cf6",
  },
};

export async function callExtract(provider, apiKey, text, images = []) {
  const hasImages = images.length > 0;

  if (provider === "openai") {
    let content;
    if (hasImages) {
      content = [];
      if (text.trim()) content.push({ type: "text", text });
      for (const img of images) content.push({ type: "image_url", image_url: { url: img.url, detail: "low" } });
    } else {
      content = text;
    }
    return openaiChat(apiKey, [{ role: "system", content: EXTRACT_SYSTEM }, { role: "user", content }]);
  }

  if (provider === "gemini") {
    let content;
    if (hasImages) {
      content = [];
      if (text.trim()) content.push({ type: "text", text });
      for (const img of images) content.push({ type: "image_url", image_url: { url: img.url } });
    } else {
      content = text;
    }
    return geminiChat(apiKey, EXTRACT_SYSTEM, content, hasImages);
  }

  if (provider === "groq") {
    const userText = hasImages ? `${text}\n\n[Note: ${images.length} product image(s) were provided but this model doesn't support vision. Extracting hooks from text only.]` : text;
    return groqChat(apiKey, [{ role: "system", content: EXTRACT_SYSTEM }, { role: "user", content: userText }]);
  }

  return null;
}

export async function callGenerate(provider, apiKey, hooks) {
  const userContent = `Selling Hooks:\n${hooks.map((h) => `${h.id}. ${h.hook} — ${h.angle}`).join("\n")}`;

  if (provider === "openai") {
    return openaiChat(apiKey, [{ role: "system", content: GENERATE_SYSTEM }, { role: "user", content: userContent }]);
  }
  if (provider === "gemini") {
    return geminiChat(apiKey, GENERATE_SYSTEM, userContent);
  }
  if (provider === "groq") {
    return groqChat(apiKey, [{ role: "system", content: GENERATE_SYSTEM }, { role: "user", content: userContent }]);
  }
  return null;
}

const TRANSLATE_SYSTEM = `You are a professional ad translator. Translate the given multi-channel ad content into the target language while preserving the tone, emoji usage, and platform conventions. Keep the JSON structure exactly the same — only translate the text values. Return JSON only:
{
  "google": { "headline": "translated", "description": "translated" },
  "instagram": { "caption": "translated" },
  "tiktok": { "scenes": [{ "scene": 1, "visual": "translated", "audio": "translated" }, ...] },
  "email": { "subject_lines": ["translated 1", "translated 2", "translated 3"] }
}`;

const LANG_NAMES = { zh: "Simplified Chinese", ja: "Japanese", es: "Spanish", ko: "Korean" };

export async function callTranslate(provider, apiKey, variants, langCode) {
  const langName = LANG_NAMES[langCode] || langCode;
  const userContent = `Translate the following ad variants into ${langName}:\n\n${JSON.stringify(variants, null, 2)}`;

  if (provider === "openai") {
    return openaiChat(apiKey, [{ role: "system", content: TRANSLATE_SYSTEM }, { role: "user", content: userContent }]);
  }
  if (provider === "gemini") {
    return geminiChat(apiKey, TRANSLATE_SYSTEM, userContent);
  }
  if (provider === "groq") {
    return groqChat(apiKey, [{ role: "system", content: TRANSLATE_SYSTEM }, { role: "user", content: userContent }]);
  }
  return null;
}

export async function callRefine(provider, apiKey, hook) {
  const userContent = `Refine all ad variants to align with this hook:\n"${hook.hook}" — ${hook.angle}`;

  if (provider === "openai") {
    return openaiChat(apiKey, [{ role: "system", content: REFINE_SYSTEM }, { role: "user", content: userContent }]);
  }
  if (provider === "gemini") {
    return geminiChat(apiKey, REFINE_SYSTEM, userContent);
  }
  if (provider === "groq") {
    return groqChat(apiKey, [{ role: "system", content: REFINE_SYSTEM }, { role: "user", content: userContent }]);
  }
  return null;
}
