import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { createClient } from "npm:@supabase/supabase-js@2";

const KEY_SECRET = Deno.env.get("RAZORPAY_KEY_SECRET") ?? "";
const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

async function hmacSha256Hex(secret: string, data: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(data));
  return Array.from(new Uint8Array(sig)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

function randomPassword(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(24));
  return "Id" + btoa(String.fromCharCode(...bytes)).replace(/[^a-zA-Z0-9]/g, "").slice(0, 20) + "9!";
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  try {
    if (!KEY_SECRET || !SERVICE_ROLE) {
      return json({ error: "unconfigured", message: "Account setup is not configured." }, 500);
    }

    const body = await req.json().catch(() => ({}));
    const email = String(body.email ?? "").trim().toLowerCase();
    const name = String(body.name ?? "").trim();
    const orderId = String(body.razorpay_order_id ?? "");
    const paymentId = String(body.razorpay_payment_id ?? "");
    const signature = String(body.razorpay_signature ?? "");

    if (!email || !orderId || !paymentId || !signature) {
      return json({ error: "invalid_payload", message: "Missing payment or account details." }, 400);
    }

    const expected = await hmacSha256Hex(KEY_SECRET, `${orderId}|${paymentId}`);
    if (expected !== signature) {
      return json({ error: "signature_mismatch", message: "We couldn't verify this payment." }, 400);
    }

    const admin = createClient(SUPABASE_URL, SERVICE_ROLE, { auth: { persistSession: false } });

    const password = randomPassword();
    const { error } = await admin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { full_name: name || email.split("@")[0], plan: String(body.plan ?? "full") },
    });

    if (error) {
      const msg = String(error.message ?? "").toLowerCase();
      if (msg.includes("already") || msg.includes("registered") || msg.includes("exists")) {
        return json({ error: "user_exists", message: "An account already exists for this email. Please sign in." }, 409);
      }
      return json({ error: "create_failed", message: error.message }, 400);
    }

    return json({ ok: true, email, password });
  } catch (e) {
    return json({ error: "server_error", message: String(e) }, 500);
  }
});
