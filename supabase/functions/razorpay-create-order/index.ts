import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { createClient } from "npm:@supabase/supabase-js@2";

const KEY_ID = Deno.env.get("RAZORPAY_KEY_ID") ?? "";
const KEY_SECRET = Deno.env.get("RAZORPAY_KEY_SECRET") ?? "";
const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

// Server-side price table — client-supplied amounts are ignored.
const PLAN_PRICES: Record<string, number> = { full: 149 };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  try {
    if (!KEY_ID || !KEY_SECRET) {
      return json({ error: "gateway_unconfigured", message: "Payment gateway is not configured. Please try again later." }, 500);
    }

    const body = await req.json().catch(() => ({}));
    const email = String(body.email ?? "").trim().toLowerCase();
    const name = String(body.name ?? "").trim();
    const plan = String(body.plan ?? "full");

    if (!EMAIL_RE.test(email) || email.length > 254) {
      return json({ error: "invalid_email", message: "Please provide a valid email." }, 400);
    }
    if (!name || name.length > 60) return json({ error: "invalid_name", message: "Please enter a valid name." }, 400);

    const price = PLAN_PRICES[plan];
    if (!price) return json({ error: "invalid_plan", message: "Unknown plan selected." }, 400);
    const amountPaise = Math.round(price * 100);

    const res = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        Authorization: `Basic ${btoa(`${KEY_ID}:${KEY_SECRET}`)}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: amountPaise,
        currency: "INR",
        receipt: `ID${Date.now()}`,
        notes: { email, plan, name },
      }),
    });

    const order = await res.json();
    if (!res.ok) {
      console.error(`Razorpay order creation failed [${res.status}]:`, JSON.stringify(order));
      return json({
        error: "order_failed",
        message: order?.error?.description || "Could not start payment. Please try again.",
      }, 400);
    }

    // Bind the order to this email/plan/amount so signup can't be replayed for other emails.
    if (SERVICE_ROLE) {
      const admin = createClient(SUPABASE_URL, SERVICE_ROLE, { auth: { persistSession: false } });
      const { error: insErr } = await admin
        .from("payment_orders")
        .insert({ order_id: order.id, email, plan, amount_paise: amountPaise });
      if (insErr) {
        console.error("Failed to record payment order:", insErr.message);
        return json({ error: "order_record_failed", message: "Could not start payment. Please try again." }, 500);
      }
    }

    return json({ keyId: KEY_ID, orderId: order.id, amount: order.amount, currency: order.currency });
  } catch (e) {
    console.error("razorpay-create-order error:", e);
    return json({ error: "server_error", message: "Something went wrong. Please try again." }, 500);
  }
});
