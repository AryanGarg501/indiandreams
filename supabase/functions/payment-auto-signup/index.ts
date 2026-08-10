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

    // The order must exist, belong to this email, and not have been redeemed before.
    const { data: order, error: orderErr } = await admin
      .from("payment_orders")
      .select("id, email, plan, redeemed_at")
      .eq("order_id", orderId)
      .maybeSingle();

    if (orderErr) {
      console.error("payment_orders lookup failed:", orderErr.message);
      return json({ error: "server_error", message: "Could not complete account setup." }, 500);
    }
    if (!order) {
      return json({ error: "unknown_order", message: "We couldn't match this payment to an order." }, 400);
    }
    if (order.email !== email) {
      return json({ error: "email_mismatch", message: "This payment belongs to a different email address." }, 403);
    }
    if (order.redeemed_at) {
      return json({ error: "order_already_used", message: "This payment has already been used to create an account. Please sign in." }, 409);
    }

    // Claim the order atomically before creating the account.
    const { data: claimed, error: claimErr } = await admin
      .from("payment_orders")
      .update({ redeemed_at: new Date().toISOString() })
      .eq("id", order.id)
      .is("redeemed_at", null)
      .select("id")
      .maybeSingle();

    if (claimErr) {
      console.error("payment_orders claim failed:", claimErr.message);
      return json({ error: "server_error", message: "Could not complete account setup." }, 500);
    }
    if (!claimed) {
      return json({ error: "order_already_used", message: "This payment has already been used to create an account. Please sign in." }, 409);
    }

    const password = randomPassword();
    const { error } = await admin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { full_name: name || email.split("@")[0], plan: order.plan },
    });

    if (error) {
      // Release the claim so a legitimate retry is possible.
      await admin.from("payment_orders").update({ redeemed_at: null }).eq("id", order.id);
      const msg = String(error.message ?? "").toLowerCase();
      if (msg.includes("already") || msg.includes("registered") || msg.includes("exists")) {
        return json({ error: "user_exists", message: "An account already exists for this email. Please sign in." }, 409);
      }
      console.error("createUser failed:", error.message);
      return json({ error: "create_failed", message: "We couldn't create your account. Please contact support." }, 400);
    }

    return json({ ok: true, email, password });
  } catch (e) {
    console.error("payment-auto-signup error:", e);
    return json({ error: "server_error", message: "Something went wrong." }, 500);
  }
});
