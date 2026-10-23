import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, apikey, content-type, x-client-info, x-lovable-aig-run-id",
  "Access-Control-Expose-Headers": "X-Lovable-AIG-Run-ID",
};

const SITE_GUIDE = `You are "Dreamy", the friendly in-app assistant for Indian Dreams (indiandreams.app), an AI learning platform for Indian learners.
Facts you may rely on:
- Full Package costs Rs 149 (one-time, paid via Razorpay, UPI supported). Access lasts 14 days. No free trial.
- 12 courses with 119 lessons: Claude, Gemini, ChatGPT, Jasper AI, Stable Diffusion, Midjourney, DALL-E, Notion AI, Canva AI, Copy.ai, Perplexity, AI for Business. Lessons unlock in order.
- Finishing every lesson of a course issues a shareable, verifiable certificate (Certificates page in the dashboard).
- Other features: AI workspaces ("Try AI") on each guide, 14-day and 28-day challenges, mini-games, audio lessons, My Profile with progress.
Help learners navigate the site, choose a course, understand lessons, and learn AI tools and prompting. Keep answers short (under 150 words unless asked), friendly, and use Markdown. If you do not know something about the site (e.g. refunds, support contacts), say so honestly instead of guessing. Never claim to be an official service of any AI company.`;

type Message = { role: "user" | "assistant"; content: string };

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

const callGateway = async (body: unknown, apiKey: string, runId?: string) => {
  let lastResponse: Response | null = null;
  for (let attempt = 0; attempt < 3; attempt += 1) {
    const response = await fetch("https://ai.gateway.lovable.dev/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Lovable-API-Key": apiKey,
        "X-Lovable-AIG-SDK": "fetch",
        ...(runId ? { "X-Lovable-AIG-Run-ID": runId } : {}),
      },
      body: JSON.stringify(body),
    });
    if (response.ok || (response.status !== 429 && response.status < 500)) return response;
    lastResponse = response;
    if (attempt < 2) {
      const retryAfter = Number(response.headers.get("Retry-After"));
      const delay = Number.isFinite(retryAfter) && retryAfter > 0
        ? retryAfter * 1000
        : (attempt + 1) * 1000 + Math.floor(Math.random() * 300);
      await response.body?.cancel();
      await wait(delay);
    }
  }
  return lastResponse as Response;
};

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
    if (!apiKey) {
      return Response.json({ error: "AI is not configured for this workspace." }, { status: 401, headers: corsHeaders });
    }

    const authClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authorization } },
      auth: { persistSession: false },
    });
    const { data: { user }, error: authError } = await authClient.auth.getUser();
    if (authError || !user) {
      return Response.json({ error: "Your session has expired. Please sign in again." }, { status: 401, headers: corsHeaders });
    }

    const payload = await request.json();
    const messages = Array.isArray(payload.messages) ? payload.messages as Message[] : [];
    if (messages.length === 0 || messages.length > 20) return Response.json({ error: "This chat is too long. Please start a new conversation." }, { status: 400, headers: corsHeaders });
    if (messages.some((message) => !["user", "assistant"].includes(message.role) || typeof message.content !== "string" || message.content.length < 1 || message.content.length > 6000)) {
      return Response.json({ error: "One or more messages are invalid or too long." }, { status: 400, headers: corsHeaders });
    }

    const input = [
      {
        role: "developer",
        content: [{ type: "input_text", text: SITE_GUIDE }],
      },
      ...messages.map((message) => ({
        role: message.role,
        content: [{ type: message.role === "assistant" ? "output_text" : "input_text", text: message.content }],
      })),
    ];

    const gatewayResponse = await callGateway({
      model: "openai/gpt-6-astra",
      input,
      stream: true,
      store: false,
      reasoning: { effort: "low", summary: "auto" },
      include: ["reasoning.encrypted_content"],
    }, apiKey, request.headers.get("X-Lovable-AIG-Run-ID") || undefined);

    if (!gatewayResponse.ok) {
      const message = await readError(gatewayResponse);
      return Response.json({ error: message }, { status: gatewayResponse.status, headers: corsHeaders });
    }

    const headers = new Headers(corsHeaders);
    headers.set("Content-Type", "text/event-stream");
    headers.set("Cache-Control", "no-cache");
    const returnedRunId = gatewayResponse.headers.get("X-Lovable-AIG-Run-ID");
    if (returnedRunId) headers.set("X-Lovable-AIG-Run-ID", returnedRunId);
    return new Response(gatewayResponse.body, { headers });
  } catch (error) {
    console.error("site-assistant error", error);
    return Response.json({ error: error instanceof Error ? error.message : "Unable to generate a response." }, { status: 500, headers: corsHeaders });
  }
});