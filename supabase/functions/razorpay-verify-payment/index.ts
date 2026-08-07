import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const KEY_SECRET = Deno.env.get("RAZORPAY_KEY_SECRET") ?? "";

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

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  try {
    if (!KEY_SECRET) return json({ error: "gateway_unconfigured", message: "Payment gateway is not configured." }, 500);

    const body = await req.json().catch(() => ({}));
    const orderId = String(body.razorpay_order_id ?? "");
    const paymentId = String(body.razorpay_payment_id ?? "");
    const signature = String(body.razorpay_signature ?? "");

    if (!orderId || !paymentId || !signature) {
      return json({ error: "invalid_payload", message: "Missing payment details." }, 400);
    }

    const expected = await hmacSha256Hex(KEY_SECRET, `${orderId}|${paymentId}`);
    if (expected !== signature) {
      return json({ verified: false, error: "signature_mismatch", message: "We couldn't verify this payment. No money was deducted twice — please contact support if charged." }, 400);
    }

    return json({ verified: true, paymentId, orderId });
  } catch (e) {
    return json({ error: "server_error", message: String(e) }, 500);
  }
});
