import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

import { sendTemplateEmail } from "../_shared/transactional-email-templates/send-email.ts";

const KEY_ID = Deno.env.get("RAZORPAY_KEY_ID") ?? "";
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

    // Send payment confirmation email using trusted order details from Razorpay.
    try {
      const orderRes = await fetch(`https://api.razorpay.com/v1/orders/${encodeURIComponent(orderId)}`, {
        headers: { Authorization: `Basic ${btoa(`${KEY_ID}:${KEY_SECRET}`)}` },
      });
      const order = await orderRes.json();
      const email = String(order?.notes?.email ?? "");
      if (orderRes.ok && email) {
        const result = await sendTemplateEmail("payment-confirmation", email, {
          templateData: {
            name: order.notes?.name || undefined,
            planName: order.notes?.plan === "full" ? "Full Package" : String(order.notes?.plan ?? "Full Package"),
            amount: `₹${(Number(order.amount) / 100).toLocaleString("en-IN")}`,
            paymentId,
            orderId,
            paidOn: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Kolkata" }),
          },
          idempotencyKey: `payment-confirmation-${paymentId}`,
        });
        if (!result.sent) console.log("Payment email not sent:", result.reason);
      }
    } catch (mailErr) {
      console.error("Payment confirmation email failed:", mailErr);
    }

    return json({ verified: true, paymentId, orderId });
  } catch (e) {
    return json({ error: "server_error", message: String(e) }, 500);
  }
});
