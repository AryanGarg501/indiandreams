import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Shield, Lock, CheckCircle2, AlertCircle, Loader2,
  Smartphone, CreditCard, Wallet, ChevronRight, BadgeCheck, ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type Method = "upi" | "card" | "wallet";

const METHOD_META: Record<Method, { label: string; sub: string; Icon: typeof Smartphone }> = {
  upi:        { label: "UPI", sub: "Any UPI app", Icon: Smartphone },
  card:       { label: "Credit / Debit Card", sub: "Visa, Mastercard, RuPay, Amex", Icon: CreditCard },
  wallet:     { label: "Wallet", sub: "Mobikwik, Freecharge, Ola Money", Icon: Wallet },
};

declare global {
  interface Window { Razorpay?: any }
}

function loadRazorpay(): Promise<boolean> {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });
}

const RazorpayPage = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const email = params.get("email") || "";
  const plan = params.get("plan") || "full";

  const [firstname, setFirstname] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [method, setMethod] = useState<Method>("upi");
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (!email) navigate("/offer", { replace: true });
  }, [email, navigate]);

  const readError = async (error: any, fallback: string) => {
    try {
      const ctx: any = error?.context;
      if (ctx && typeof ctx.json === "function") {
        const j = await ctx.json();
        if (j?.message) return j.message as string;
      }
    } catch { /* ignore */ }
    return fallback;
  };

  const fail = (msg: string) => {
    setSubmitting(false);
    setFormError(msg);
    toast.error(msg);
  };

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (!firstname.trim()) return fail("Please enter your full name.");
    if (!/^\d{10}$/.test(phone)) return fail("Enter a valid 10-digit mobile number.");

    setSubmitting(true);

    const sdkOk = await loadRazorpay();
    if (!sdkOk) return fail("Couldn't load the secure checkout. Check your connection and retry.");

    const { data, error } = await supabase.functions.invoke("razorpay-create-order", {
      body: { amount: 199, email, name: firstname, phone, plan },
    });
    if (error) return fail(await readError(error, "Could not start payment. Please try again."));
    if (!data?.orderId || !data?.keyId) return fail("Payment gateway returned an invalid response. Please retry.");

    const rzp = new window.Razorpay({
      key: data.keyId,
      order_id: data.orderId,
      amount: data.amount,
      currency: data.currency,
      name: "Indian Dreams",
      description: "Full Package — 14 Days",
      prefill: { name: firstname, email, contact: phone, method },
      notes: { plan },
      theme: { color: "#F97316" },
      config: {
        display: {
          blocks: {
            preferred: { name: METHOD_META[method].label, instruments: [{ method }] },
          },
          sequence: [`block.preferred`],
          preferences: { show_default_blocks: false },
        },
      },
      modal: {
        ondismiss: () => fail("Payment cancelled. You can try again whenever you're ready."),
      },
      handler: async (response: any) => {
        const { data: v, error: vErr } = await supabase.functions.invoke("razorpay-verify-payment", {
          body: response,
        });
        if (vErr || !v?.verified) {
          return fail(await readError(vErr, "We couldn't verify the payment. Please contact support if you were charged."));
        }

        // Auto-create the account and sign in — no email/password step needed.
        const { data: acc, error: accErr } = await supabase.functions.invoke("payment-auto-signup", {
          body: { ...response, email, name: firstname, plan },
        });

        if (accErr || !acc?.password) {
          const msg = await readError(accErr, "");
          toast.success("Payment successful!");
          if (msg) toast.info(msg);
          navigate(
            `/signup?email=${encodeURIComponent(email)}&plan=${encodeURIComponent(plan)}&paid=1&txnid=${encodeURIComponent(v.paymentId)}`,
            { replace: true },
          );
          return;
        }

        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: acc.email ?? email,
          password: acc.password,
        });
        if (signInError) {
          toast.success("Payment successful!");
          navigate(
            `/signup?email=${encodeURIComponent(email)}&plan=${encodeURIComponent(plan)}&paid=1&txnid=${encodeURIComponent(v.paymentId)}`,
            { replace: true },
          );
          return;
        }

        toast.success("Payment successful — you're signed in!");
        navigate("/dashboard", { replace: true });
      },
    });

    rzp.on("payment.failed", (resp: any) => {
      fail(resp?.error?.description || "The payment couldn't be completed. Please try again or use a different method.");
    });

    rzp.open();
  };

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
          <div className="space-y-5">
            <div>
              <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">Secure Checkout</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Choose how you'd like to pay. Payment is completed in Razorpay's secure window.
              </p>
            </div>

            <div className="grid md:grid-cols-[220px_1fr] rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
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

                <Button type="submit" variant="hero" disabled={submitting} className="w-full h-13 text-base rounded-xl">
                  {submitting ? (
                    <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Opening Razorpay…</>
                  ) : (
                    <>Pay ₹199 with {activeMeta.label}</>
                  )}
                </Button>

                <p className="text-[11px] text-center text-muted-foreground leading-relaxed">
                  By proceeding you agree to our Terms. Payment is processed securely by Razorpay.
                </p>
              </form>
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-primary" /> 256-bit SSL</span>
              <span className="flex items-center gap-1.5"><BadgeCheck className="w-3.5 h-3.5 text-primary" /> PCI DSS Compliant</span>
              <span className="flex items-center gap-1.5"><Lock className="w-3.5 h-3.5 text-primary" /> RBI Approved</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-primary" /> Powered by Razorpay</span>
            </div>
          </div>

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
                <div className="flex justify-between text-muted-foreground"><span>Subtotal</span><span>₹199.00</span></div>
                <div className="flex justify-between text-muted-foreground"><span>Taxes</span><span>Included</span></div>
              </div>
              <div className="flex justify-between items-baseline pt-3 border-t border-border">
                <span className="font-semibold text-foreground">Total</span>
                <span className="font-display text-2xl font-bold text-primary">₹199.00</span>
              </div>
            </div>

            <ul className="rounded-2xl border border-border bg-card/50 p-4 space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" /> Only for 14 days</li>
              <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" /> Course completion certificate</li>
              <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" /> 7-day refund if not satisfied</li>
            </ul>
          </aside>
        </motion.div>
      </div>
    </div>
  );
};

export default RazorpayPage;
