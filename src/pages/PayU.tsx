import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Shield, Lock, CheckCircle2, AlertCircle, Loader2,
  Smartphone, CreditCard, Landmark, Wallet, ChevronRight, BadgeCheck, ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type Method = "UPI" | "CARD" | "NB" | "WALLET";

const METHOD_META: Record<Method, { label: string; sub: string; Icon: typeof Smartphone; brands: string[] }> = {
  UPI:    { label: "UPI",          sub: "GPay, PhonePe, Paytm, BHIM", Icon: Smartphone,  brands: ["GPay", "PhonePe", "Paytm", "BHIM"] },
  CARD:   { label: "Credit / Debit Card", sub: "Visa, Mastercard, RuPay, Amex", Icon: CreditCard, brands: ["VISA", "Mastercard", "RuPay", "AMEX"] },
  NB:     { label: "Netbanking",   sub: "All major Indian banks", Icon: Landmark,    brands: ["HDFC", "ICICI", "SBI", "Axis", "Kotak"] },
  WALLET: { label: "Wallet",       sub: "Mobikwik, Freecharge, Ola Money", Icon: Wallet, brands: ["Mobikwik", "Freecharge", "Ola Money"] },
};

function friendlyError(reason: string | null, message: string | null): { title: string; detail: string } {
  const r = (reason || "").toLowerCase();
  if (!reason) return { title: "Payment not completed", detail: "Please try again." };
  if (r === "hash_mismatch") return { title: "Verification failed", detail: "We couldn't verify the payment response. No money was deducted. Please retry." };
  if (r.includes("cancel") || r === "user_cancelled") return { title: "Payment cancelled", detail: "You cancelled the payment. You can try again whenever you're ready." };
  if (r.includes("e000") || r.includes("invalid")) return { title: "Invalid details", detail: message || "Some payment details were invalid. Please try a different method or check your inputs." };
  if (r.includes("e001") || r.includes("insufficient")) return { title: "Insufficient funds", detail: "Your account had insufficient balance. Try another card or UPI app." };
  if (r.includes("e002") || r.includes("declin") || r.includes("denied")) return { title: "Bank declined the payment", detail: message || "Your bank declined this transaction. Try a different card, UPI app or method." };
  if (r.includes("timeout") || r.includes("e003")) return { title: "Timed out", detail: "The payment took too long. Please try again." };
  if (r === "invalid_method") return { title: "Method unavailable", detail: "The selected payment method isn't available right now. Please choose another." };
  if (r === "gateway_unconfigured") return { title: "Gateway unavailable", detail: "Our payment gateway is temporarily unavailable. Please try again shortly." };
  if (r === "failure" || r === "failed") return { title: "Payment failed", detail: message || "The payment couldn't be completed. Please try again or use a different method." };
  return { title: "Payment not completed", detail: message || `Reason: ${reason}` };
}

const PayU = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const email = params.get("email") || "";
  const plan = params.get("plan") || "full";
  const status = params.get("status");
  const reason = params.get("reason");
  const message = params.get("message");

  const [firstname, setFirstname] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [method, setMethod] = useState<Method>("UPI");
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (!email) navigate("/offer", { replace: true });
  }, [email, navigate]);

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (!firstname.trim()) {
      setFormError("Please enter your full name.");
      toast.error("Please enter your full name.");
      return;
    }
    if (!/^\d{10}$/.test(phone)) {
      setFormError("Enter a valid 10-digit mobile number.");
      toast.error("Enter a valid 10-digit mobile number.");
      return;
    }

    setSubmitting(true);
    const { data, error } = await supabase.functions.invoke("payu-create-hash", {
      body: { amount: "199.00", email, firstname, phone, plan, method },
    });

    // supabase-js puts non-2xx bodies on error.context
    if (error) {
      setSubmitting(false);
      let serverMsg = "Could not start payment. Please try again.";
      try {
        const ctx: any = (error as any).context;
        if (ctx && typeof ctx.json === "function") {
          const j = await ctx.json();
          if (j?.message) serverMsg = j.message;
        }
      } catch {/* ignore */}
      setFormError(serverMsg);
      toast.error(serverMsg);
      return;
    }
    if (!data?.hash || !data?.action) {
      setSubmitting(false);
      const msg = "Payment gateway returned an invalid response. Please try a different method.";
      setFormError(msg);
      toast.error(msg);
      return;
    }

    // Build & submit hidden form to PayU
    const form = document.createElement("form");
    form.method = "POST";
    form.action = data.action;
    const fields: Record<string, string> = {
      key: data.key,
      txnid: data.txnid,
      amount: data.amount,
      productinfo: data.productinfo,
      firstname: data.firstname,
      email: data.email,
      phone: data.phone,
      udf1: data.udf1,
      surl: data.surl,
      furl: data.furl,
      hash: data.hash,
      service_provider: "payu_paisa",
    };
    if (data.pg) fields.pg = data.pg;
    if (data.bankcode) fields.bankcode = data.bankcode;
    Object.entries(fields).forEach(([k, v]) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = k;
      input.value = v;
      form.appendChild(input);
    });
    document.body.appendChild(form);
    try {
      form.submit();
    } catch {
      setSubmitting(false);
      const msg = "We couldn't redirect to PayU. Please disable popup blockers and retry.";
      setFormError(msg);
      toast.error(msg);
    }
  };

  const err = status === "failure" ? friendlyError(reason, message) : null;
  const activeMeta = METHOD_META[method];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/30 flex flex-col">
      <header className="py-4 px-4 flex items-center justify-between border-b border-border/50 bg-card/40 backdrop-blur">
        <Link to="/offer" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>
        <Link to="/" className="font-display text-xl font-bold text-gradient">Indian Dreams</Link>
        <div className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground">
          <Lock className="w-3.5 h-3.5 text-primary" /> Secure
        </div>
      </header>

      <div className="flex-1 px-4 py-8 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-5xl mx-auto grid md:grid-cols-[1fr_360px] gap-6"
        >
          {/* LEFT: gateway */}
          <div className="space-y-5">
            <div>
              <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">Secure Checkout</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Choose how you'd like to pay. You'll be redirected to PayU's secure page to finish.
              </p>
            </div>

            {err && (
              <div role="alert" className="rounded-xl border border-destructive/40 bg-destructive/10 p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-semibold text-foreground">{err.title}</p>
                  <p className="text-muted-foreground mt-0.5">{err.detail}</p>
                </div>
              </div>
            )}

            <div className="grid md:grid-cols-[220px_1fr] rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
              {/* method list */}
              <div className="bg-muted/40 border-b md:border-b-0 md:border-r border-border p-2 md:p-3 flex md:flex-col gap-1 overflow-x-auto">
                {(Object.keys(METHOD_META) as Method[]).map((id) => {
                  const m = METHOD_META[id];
                  const active = method === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => { setMethod(id); setFormError(null); }}
                      className={`flex items-center gap-3 w-full text-left rounded-lg px-3 py-2.5 text-sm transition-colors min-w-[150px] ${
                        active
                          ? "bg-primary/10 text-primary border border-primary/30"
                          : "text-muted-foreground hover:text-foreground hover:bg-background border border-transparent"
                      }`}
                      aria-pressed={active}
                    >
                      <m.Icon className="w-5 h-5 shrink-0" />
                      <span className="font-medium">{m.label}</span>
                      <ChevronRight className={`w-4 h-4 ml-auto hidden md:block ${active ? "opacity-100" : "opacity-30"}`} />
                    </button>
                  );
                })}
              </div>

              {/* method details + form */}
              <form onSubmit={handlePay} className="p-5 md:p-6 space-y-5">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <activeMeta.Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{activeMeta.label}</p>
                    <p className="text-xs text-muted-foreground">{activeMeta.sub}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {activeMeta.brands.map((b) => (
                    <span key={b} className="text-[11px] font-medium px-2 py-1 rounded-md bg-muted text-muted-foreground border border-border">
                      {b}
                    </span>
                  ))}
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="firstname" className="text-xs font-medium">Full Name</Label>
                    <Input
                      id="firstname"
                      value={firstname}
                      onChange={(e) => setFirstname(e.target.value)}
                      placeholder="As on your card / UPI"
                      className="h-11 bg-background"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="phone" className="text-xs font-medium">Mobile Number</Label>
                    <Input
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                      placeholder="10-digit mobile"
                      inputMode="numeric"
                      className="h-11 bg-background"
                      required
                    />
                  </div>
                  <div className="sm:col-span-2 space-y-1.5">
                    <Label htmlFor="email" className="text-xs font-medium">Email</Label>
                    <Input id="email" value={email} disabled className="h-11 bg-background" />
                  </div>
                </div>

                {formError && (
                  <div role="alert" className="rounded-lg border border-destructive/40 bg-destructive/10 text-destructive text-sm px-3 py-2 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{formError}</span>
                  </div>
                )}

                <Button
                  type="submit"
                  variant="hero"
                  disabled={submitting}
                  className="w-full h-13 text-base rounded-xl"
                >
                  {submitting ? (
                    <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Redirecting to PayU…</>
                  ) : (
                    <>Pay ₹199 with {activeMeta.label}</>
                  )}
                </Button>

                <p className="text-[11px] text-center text-muted-foreground leading-relaxed">
                  By proceeding you agree to our Terms. You'll complete payment on PayU's secure page.
                </p>
              </form>
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-primary" /> 256-bit SSL</span>
              <span className="flex items-center gap-1.5"><BadgeCheck className="w-3.5 h-3.5 text-primary" /> PCI DSS Compliant</span>
              <span className="flex items-center gap-1.5"><Lock className="w-3.5 h-3.5 text-primary" /> RBI Approved</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-primary" /> Powered by PayU</span>
            </div>
          </div>

          {/* RIGHT: order summary */}
          <aside className="md:sticky md:top-6 self-start space-y-4">
            <div className="rounded-2xl border border-border bg-card shadow-sm p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Order Summary</p>
              <div className="flex items-start gap-3 pb-4 border-b border-border">
                <div className="w-12 h-12 rounded-lg bg-hero-gradient flex items-center justify-center text-primary-foreground font-bold">ID</div>
                <div className="flex-1">
                  <p className="font-semibold text-foreground text-sm">Full Package — 14 Days</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Indian Dreams · AI Learning</p>
                </div>
              </div>
              <div className="space-y-2 py-4 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span><span>₹199.00</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Taxes</span><span>Included</span>
                </div>
              </div>
              <div className="flex justify-between items-baseline pt-3 border-t border-border">
                <span className="font-semibold text-foreground">Total</span>
                <span className="font-display text-2xl font-bold text-primary">₹199.00</span>
              </div>
            </div>

            <ul className="rounded-2xl border border-border bg-card/50 p-4 space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" /> Lifetime access to all 14 days</li>
              <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" /> Course completion certificate</li>
              <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" /> 7-day refund if not satisfied</li>
            </ul>
          </aside>
        </motion.div>
      </div>
    </div>
  );
};

export default PayU;