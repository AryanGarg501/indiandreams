export type GuideToolMode = "assistant" | "research" | "writing" | "productivity" | "business" | "image";

export interface GuideTool {
  id: string;
  title: string;
  mode: GuideToolMode;
  tagline: string;
  placeholder: string;
  presets: string[];
}

export const guideTools: Record<string, GuideTool> = {
  claude: {
    id: "claude",
    title: "Claude",
    mode: "assistant",
    tagline: "Think through complex ideas, improve writing, and solve problems.",
    placeholder: "Describe what you want to understand, write, or solve…",
    presets: ["Explain a difficult topic simply", "Improve my writing", "Compare two options"],
  },
  gemini: {
    id: "gemini",
    title: "Gemini",
    mode: "assistant",
    tagline: "Explore ideas and turn detailed questions into clear, useful answers.",
    placeholder: "Ask a question or describe a task…",
    presets: ["Create a learning plan", "Brainstorm ten ideas", "Analyze this topic"],
  },
  chatgpt: {
    id: "chatgpt",
    title: "ChatGPT",
    mode: "assistant",
    tagline: "Draft, brainstorm, explain, and refine through conversation.",
    placeholder: "What would you like help with?",
    presets: ["Draft a professional email", "Teach me step by step", "Plan my week"],
  },
  "jasper-ai": {
    id: "jasper-ai",
    title: "Jasper AI",
    mode: "writing",
    tagline: "Create polished marketing copy for a clear audience and goal.",
    placeholder: "Describe your product, audience, offer, and desired tone…",
    presets: ["Write a product description", "Create an Instagram caption", "Draft a landing page"],
  },
  "stable-diffusion": {
    id: "stable-diffusion",
    title: "Stable Diffusion",
    mode: "image",
    tagline: "Turn a detailed visual prompt into an original image.",
    placeholder: "Describe the subject, setting, lighting, mood, and details…",
    presets: ["Cinematic product photograph", "Detailed digital illustration", "Editorial poster artwork"],
  },
  midjourney: {
    id: "midjourney",
    title: "Midjourney",
    mode: "image",
    tagline: "Create expressive, art-directed visuals from your idea.",
    placeholder: "Describe your scene, composition, lighting, and art direction…",
    presets: ["Luxury campaign visual", "Surreal dreamscape", "Architectural concept art"],
  },
  "dall-e": {
    id: "dall-e",
    title: "DALL·E",
    mode: "image",
    tagline: "Generate clear, imaginative images from natural language.",
    placeholder: "Describe exactly what the image should show…",
    presets: ["Friendly editorial illustration", "Photorealistic scene", "Playful character design"],
  },
  "notion-ai": {
    id: "notion-ai",
    title: "Notion AI",
    mode: "productivity",
    tagline: "Transform rough information into organized, actionable documents.",
    placeholder: "Paste notes or describe the document you need…",
    presets: ["Summarize these notes", "Extract action items", "Create a project brief"],
  },
  "canva-ai": {
    id: "canva-ai",
    title: "Canva AI",
    mode: "image",
    tagline: "Generate ready-to-use visual concepts for social and presentation design.",
    placeholder: "Describe the design, audience, message, and visual style…",
    presets: ["Social media campaign", "Presentation cover", "Event poster concept"],
  },
  "copy-ai": {
    id: "copy-ai",
    title: "Copy.ai",
    mode: "writing",
    tagline: "Produce focused sales and marketing copy in seconds.",
    placeholder: "Describe what you are selling, who it is for, and the goal…",
    presets: ["Write a sales email", "Create five headlines", "Draft an ad campaign"],
  },
  perplexity: {
    id: "perplexity",
    title: "Perplexity AI",
    mode: "research",
    tagline: "Break down research questions into a clear, evidence-aware brief.",
    placeholder: "What would you like to research?",
    presets: ["Create a research brief", "Compare market trends", "Explain both sides of a topic"],
  },
  "ai-business": {
    id: "ai-business",
    title: "AI for Business",
    mode: "business",
    tagline: "Turn a business challenge into an actionable AI strategy.",
    placeholder: "Describe your business, team, challenge, and desired outcome…",
    presets: ["Find AI automation opportunities", "Build a 30-day adoption plan", "Design an AI workflow"],
  },
};

export const hasGuideTool = (id: string) => Boolean(guideTools[id]);