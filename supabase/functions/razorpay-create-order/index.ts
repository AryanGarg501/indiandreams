import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const KEY_ID = Deno.env.get("RAZORPAY_KEY_ID") ?? "";
const KEY_SECRET = Deno.env.get("RAZORPAY_KEY_SECRET") ?? "";

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
    const email = String(body.email ?? "");
    const name = String(body.name ?? "").trim();
    const phone = String(body.phone ?? "");
    const plan = String(body.plan ?? "full");
    const amountPaise = Math.round(Number(body.amount ?? 199) * 100);

    if (!email.includes("@")) return json({ error: "invalid_email", message: "Please provide a valid email." }, 400);
    if (!name || name.length > 60) return json({ error: "invalid_name", message: "Please enter a valid name." }, 400);
    if (!/^\d{10}$/.test(phone)) return json({ error: "invalid_phone", message: "Enter a valid 10-digit mobile number." }, 400);
    if (!Number.isFinite(amountPaise) || amountPaise <= 0) return json({ error: "invalid_amount", message: "Invalid amount." }, 400);

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
        notes: { email, plan, name, phone },
      }),
    });

    const order = await res.json();
    if (!res.ok) {
      return json({
        error: "order_failed",
        message: order?.error?.description || "Could not start payment. Please try again.",
      }, 400);
    }

    return json({ keyId: KEY_ID, orderId: order.id, amount: order.amount, currency: order.currency });
  } catch (e) {
    return json({ error: "server_error", message: String(e) }, 500);
  }
});
