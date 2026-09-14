import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, apikey, content-type, x-client-info, x-lovable-aig-run-id",
  "Access-Control-Expose-Headers": "X-Lovable-AIG-Run-ID",
};

const imageGuides: Record<string, string> = {
  "stable-diffusion": "Detailed generative artwork with deliberate composition, materials, lighting, and atmosphere.",
  midjourney: "Highly art-directed, expressive visual with refined composition and cinematic detail.",
  "dall-e": "Clear, imaginative visual that follows the prompt literally and maintains coherent objects.",
  "canva-ai": "Clean commercial design concept with strong hierarchy, usable negative space, and polished presentation.",
};

const styles: Record<string, string> = {
  realistic: "photorealistic, natural materials, physically plausible light",
  cinematic: "cinematic, dramatic composition, expressive lighting",
  illustration: "polished editorial illustration, intentional shapes and texture",
  minimal: "minimal, clean, strong visual hierarchy, restrained details",
};

const ratios: Record<string, string> = {
  square: "square 1:1 composition",
  landscape: "landscape 16:9 composition",
  portrait: "portrait 4:5 composition",
};

const readError = async (response: Response) => {
  const text = await response.text();
  try {
    const parsed = JSON.parse(text);
    return parsed.message || parsed.error?.message || parsed.error || text;
  } catch {
    return text || `AI request failed with status ${response.status}`;
  }
};

const wait = (milliseconds: number) => new Promise((resolve) => setTimeout(resolve, milliseconds));

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (request.method !== "POST") return Response.json({ error: "Method not allowed" }, { status: 405, headers: corsHeaders });

  try {
    const authorization = request.headers.get("Authorization");
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY");
    const apiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!authorization || !supabaseUrl || !supabaseAnonKey) {
      return Response.json({ error: "Please sign in to use this tool." }, { status: 401, headers: corsHeaders });
    }
    if (!apiKey) return Response.json({ error: "AI is not configured for this workspace." }, { status: 401, headers: corsHeaders });

    const authClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authorization } },
      auth: { persistSession: false },
    });
    const { data: { user }, error: authError } = await authClient.auth.getUser();
    if (authError || !user) return Response.json({ error: "Your session has expired. Please sign in again." }, { status: 401, headers: corsHeaders });

    const payload = await request.json();
    const guideId = typeof payload.guideId === "string" ? payload.guideId : "";
    const prompt = typeof payload.prompt === "string" ? payload.prompt.trim() : "";
    const guideDirection = imageGuides[guideId];
    const style = styles[payload.style] || styles.realistic;
    const ratio = ratios[payload.aspectRatio] || ratios.square;
    if (!guideDirection) return Response.json({ error: "This guide does not support image generation." }, { status: 400, headers: corsHeaders });
    if (prompt.length < 3 || prompt.length > 2000) return Response.json({ error: "Describe the image in 3 to 2,000 characters." }, { status: 400, headers: corsHeaders });

    const body = {
      model: "google/gemini-3-pro-image",
      messages: [
        { role: "system", content: `Create one original image. ${guideDirection} Do not add text unless the user explicitly asks for it.` },
        { role: "user", content: `${prompt}\n\nArt direction: ${style}. Format: ${ratio}.` },
      ],
      modalities: ["image", "text"],
    };

    let gatewayResponse: Response | null = null;
    for (let attempt = 0; attempt < 3; attempt += 1) {
      gatewayResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Lovable-API-Key": apiKey,
          "X-Lovable-AIG-SDK": "fetch",
          ...(request.headers.get("X-Lovable-AIG-Run-ID") ? { "X-Lovable-AIG-Run-ID": request.headers.get("X-Lovable-AIG-Run-ID") as string } : {}),
        },
        body: JSON.stringify(body),
      });
      if (gatewayResponse.ok || (gatewayResponse.status !== 429 && gatewayResponse.status < 500)) break;
      if (attempt < 2) {
        const retryAfter = Number(gatewayResponse.headers.get("Retry-After"));
        const delay = Number.isFinite(retryAfter) && retryAfter > 0 ? retryAfter * 1000 : (attempt + 1) * 1000 + Math.floor(Math.random() * 300);
        await gatewayResponse.body?.cancel();
        await wait(delay);
      }
    }

    if (!gatewayResponse || !gatewayResponse.ok) {
      const status = gatewayResponse?.status || 500;
      const message = gatewayResponse ? await readError(gatewayResponse) : "Image generation failed.";
      return Response.json({ error: message }, { status, headers: corsHeaders });
    }

    const result = await gatewayResponse.json();
    const imageUrl = result.choices?.[0]?.message?.images?.[0]?.image_url?.url;
    if (!imageUrl) return Response.json({ error: result.choices?.[0]?.message?.content || "The model did not return an image." }, { status: 502, headers: corsHeaders });

    const headers = new Headers(corsHeaders);
    const runId = gatewayResponse.headers.get("X-Lovable-AIG-Run-ID");
    if (runId) headers.set("X-Lovable-AIG-Run-ID", runId);
    return Response.json({ imageUrl, caption: result.choices?.[0]?.message?.content || "" }, { headers });
  } catch (error) {
    console.error("guide-image error", error);
    return Response.json({ error: error instanceof Error ? error.message : "Unable to generate an image." }, { status: 500, headers: corsHeaders });
  }
});