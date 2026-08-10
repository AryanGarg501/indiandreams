import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { createClient } from "npm:@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  try {
    if (!SERVICE_ROLE) return json({ error: "unconfigured" }, 500);

    const body = await req.json().catch(() => ({}));
    const id = String(body.id ?? "").trim();
    if (!UUID_RE.test(id)) return json({ error: "invalid_id", message: "Invalid certificate id." }, 400);

    const admin = createClient(SUPABASE_URL, SERVICE_ROLE, { auth: { persistSession: false } });
    const { data, error } = await admin
      .from("certificates")
      .select("id, user_name, course_id, course_title, completed_at")
      .eq("id", id)
      .maybeSingle();

    if (error) {
      console.error("public-certificate lookup failed:", error.message);
      return json({ error: "lookup_failed", message: "Could not load this certificate." }, 500);
    }
    if (!data) return json({ error: "not_found", message: "Certificate not found." }, 404);

    return json({ certificate: data });
  } catch (e) {
    console.error("public-certificate error:", e);
    return json({ error: "server_error", message: "Something went wrong." }, 500);
  }
});
