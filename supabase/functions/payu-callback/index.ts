import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const MERCHANT_SALT = Deno.env.get("PAYU_MERCHANT_SALT")!;

async function sha512(input: string): Promise<string> {
  const buf = new TextEncoder().encode(input);
  const hash = await crypto.subtle.digest("SHA-512", buf);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const url = new URL(req.url);
  const redirectBase = url.searchParams.get("redirect") || "";

  let params: Record<string, string> = {};
  try {
    const form = await req.formData();
    for (const [k, v] of form.entries()) params[k] = String(v);
  } catch {
    // ignore
  }

  const {
    key = "",
    txnid = "",
    amount = "",
    productinfo = "",
    firstname = "",
    email = "",
    udf1 = "",
    udf2 = "",
    udf3 = "",
    udf4 = "",
    udf5 = "",
    status = "",
    hash: receivedHash = "",
    error: payuError = "",
    error_Message: payuErrorMessage = "",
    unmappedstatus = "",
    PG_TYPE = "",
    bank_ref_num = "",
    mode = "",
  } = params;

  // Reverse hash: salt|status|||||udf5|udf4|udf3|udf2|udf1|email|firstname|productinfo|amount|txnid|key
  const hashString = `${MERCHANT_SALT}|${status}|||||${udf5}|${udf4}|${udf3}|${udf2}|${udf1}|${email}|${firstname}|${productinfo}|${amount}|${txnid}|${key}`;
  const computed = await sha512(hashString);
  const verified = computed === receivedHash;

  const plan = udf1 || "full";
  let target: string;
  if (verified && status === "success") {
    target = `${redirectBase}/signup?email=${encodeURIComponent(email)}&plan=${encodeURIComponent(plan)}&paid=1&txnid=${encodeURIComponent(txnid)}`;
  } else {
    const reason = !verified
      ? "hash_mismatch"
      : (payuError || unmappedstatus || status || "failed");
    const message = payuErrorMessage || "";
    const qs = new URLSearchParams({
      status: "failure",
      reason,
      message,
      email,
      plan,
      mode: mode || PG_TYPE || "",
      txnid,
    });
    target = `${redirectBase}/payu?${qs.toString()}`;
  }

  return new Response(null, {
    status: 302,
    headers: { Location: target, ...corsHeaders },
  });
});