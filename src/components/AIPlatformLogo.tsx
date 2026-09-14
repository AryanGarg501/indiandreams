import claudeLogo from "@/assets/ai-logos/claude-color.svg";
import geminiLogo from "@/assets/ai-logos/gemini-color.svg";
import openaiLogo from "@/assets/ai-logos/openai.svg";
import jasperLogo from "@/assets/ai-logos/jasper.png";
import stabilityLogo from "@/assets/ai-logos/stability-color.svg";
import midjourneyLogo from "@/assets/ai-logos/midjourney.svg";
import dalleLogo from "@/assets/ai-logos/dalle-color.svg";
import notionLogo from "@/assets/ai-logos/notion.svg";
import canvaLogo from "@/assets/ai-logos/canva.png";
import copyAiLogo from "@/assets/ai-logos/copyai.png";
import perplexityLogo from "@/assets/ai-logos/perplexity-color.svg";
import githubCopilotLogo from "@/assets/ai-logos/githubcopilot.svg";
import cursorLogo from "@/assets/ai-logos/cursor.svg";
import replitLogo from "@/assets/ai-logos/replit-color.svg";
import elevenLabsLogo from "@/assets/ai-logos/elevenlabs.svg";
import murfLogo from "@/assets/ai-logos/murf.png";
import whisperLogo from "@/assets/ai-logos/whisper.png";
import runwayLogo from "@/assets/ai-logos/runway.svg";
import pikaLogo from "@/assets/ai-logos/pika.svg";
import synthesiaLogo from "@/assets/ai-logos/synthesia.png";
import fireflyLogo from "@/assets/ai-logos/adobefirefly-color.svg";
import tabnineLogo from "@/assets/ai-logos/tabnine.png";
import sunoLogo from "@/assets/ai-logos/suno.svg";
import heygenLogo from "@/assets/ai-logos/heygen.png";

const logos: Record<string, string> = {
  claude: claudeLogo,
  gemini: geminiLogo,
  chatgpt: openaiLogo,
  openai: openaiLogo,
  "jasper-ai": jasperLogo,
  jasper: jasperLogo,
  "stable-diffusion": stabilityLogo,
  midjourney: midjourneyLogo,
  "dall-e": dalleLogo,
  dalle: dalleLogo,
  "notion-ai": notionLogo,
  notion: notionLogo,
  "canva-ai": canvaLogo,
  canva: canvaLogo,
  "copy-ai": copyAiLogo,
  copyai: copyAiLogo,
  perplexity: perplexityLogo,
  "perplexity-ai": perplexityLogo,
  "github-copilot": githubCopilotLogo,
  cursor: cursorLogo,
  "replit-ai": replitLogo,
  replit: replitLogo,
  elevenlabs: elevenLabsLogo,
  "murf-ai": murfLogo,
  murf: murfLogo,
  whisper: whisperLogo,
  runway: runwayLogo,
  pika: pikaLogo,
  synthesia: synthesiaLogo,
  firefly: fireflyLogo,
  tabnine: tabnineLogo,
  suno: sunoLogo,
  heygen: heygenLogo,
};

const normalize = (value: string) =>
  value.toLowerCase().replace(/·/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

interface AIPlatformLogoProps {
  platform: string;
  className?: string;
}

export function AIPlatformLogo({ platform, className = "h-12 w-12" }: AIPlatformLogoProps) {
  const src = logos[normalize(platform)];
  if (!src) return null;

  return <img src={src} alt={`${platform} logo`} className={`${className} object-contain`} loading="lazy" />;
}

export function hasAIPlatformLogo(platform: string) {
  return Boolean(logos[normalize(platform)]);
}