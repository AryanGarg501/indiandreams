import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const MERCHANT_KEY = Deno.env.get("PAYU_MERCHANT_KEY")!;
const MERCHANT_SALT = Deno.env.get("PAYU_MERCHANT_SALT")!;
const MODE = (Deno.env.get("PAYU_MODE") || "test").toLowerCase();
const ACTION_URL = MODE === "live" ? "https://secure.payu.in/_payment" : "https://test.payu.in/_payment";

async function sha512(input: string): Promise<string> {
  const buf = new TextEncoder().encode(input);
  const hash = await crypto.subtle.digest("SHA-512", buf);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const body = await req.json();
    const amount = String(body.amount ?? "199.00");
    const email = String(body.email ?? "");
    const firstname = String(body.firstname || "Learner");
    const phone = String(body.phone || "9999999999");
    const productinfo = String(body.productinfo || "Indian Dreams - Full Package");
    const plan = String(body.plan || "full");
    const method = String(body.method || "").toUpperCase(); // UPI | CARD | NB | WALLET | ""

    const ALLOWED_METHODS = ["", "UPI", "CARD", "NB", "WALLET"];
    if (!ALLOWED_METHODS.includes(method)) {
      return new Response(
        JSON.stringify({ error: "invalid_method", message: "Selected payment method is not supported." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }
    if (!firstname.trim() || firstname.length > 60) {
      return new Response(JSON.stringify({ error: "invalid_name", message: "Please enter a valid name." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!/^\d{10}$/.test(phone)) {
      return new Response(JSON.stringify({ error: "invalid_phone", message: "Enter a valid 10-digit phone number." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const amtNum = Number(amount);
    if (!Number.isFinite(amtNum) || amtNum <= 0) {
      return new Response(JSON.stringify({ error: "invalid_amount", message: "Invalid amount." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!MERCHANT_KEY || !MERCHANT_SALT) {
      return new Response(
        JSON.stringify({
          error: "gateway_unconfigured",
          message: "Payment gateway is not configured. Please try again later.",
        }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    if (!email || !email.includes("@")) {
      return new Response(JSON.stringify({ error: "Invalid email" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const txnid = `ID${Date.now()}${Math.floor(Math.random() * 100000)}`;
    // udf1 carries plan so we can route on callback
    const udf1 = plan;
    // PayU request-hash formula: key|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5||||||SALT
    // Only udf1 is used; udf2..udf5 + 5 trailing placeholders are empty => exactly 10 '|' between udf1 and SALT.
    const hashString = `${MERCHANT_KEY}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|${udf1}||||||||||${MERCHANT_SALT}`;
    const hash = await sha512(hashString);

    const origin = req.headers.get("origin") || new URL(req.url).origin;
    const callbackBase = `${Deno.env.get("SUPABASE_URL")}/functions/v1/payu-callback`;
    const surl = `${callbackBase}?redirect=${encodeURIComponent(origin)}`;
    const furl = surl;

    // Map UI method to PayU pg/bankcode
    let pg = "";
    let bankcode = "";
    if (method === "UPI") {
      pg = "UPI";
      bankcode = "UPI";
    } else if (method === "CARD") {
      pg = "CC";
    } else if (method === "NB") {
      pg = "NB";
    } else if (method === "WALLET") {
      pg = "WALLET";
    }

    return new Response(
      JSON.stringify({
        action: ACTION_URL,
        key: MERCHANT_KEY,
        txnid,
        amount,
        productinfo,
        firstname,
        email,
        phone,
        udf1,
        surl,
        furl,
        hash,
        pg,
        bankcode,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
