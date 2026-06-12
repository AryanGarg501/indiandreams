import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Lock, CheckCircle2, AlertCircle, Loader2, Smartphone, CreditCard, Landmark, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const PayU = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const email = params.get("email") || "";
  const plan = params.get("plan") || "full";
  const status = params.get("status");
  const reason = params.get("reason");

  const [firstname, setFirstname] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [method, setMethod] = useState<"UPI" | "CARD" | "NB" | "WALLET">("UPI");

  useEffect(() => {
    if (!email) navigate("/offer", { replace: true });
  }, [email, navigate]);

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstname.trim()) return toast.error("Enter your name");
    if (!/^\d{10}$/.test(phone)) return toast.error("Enter a valid 10-digit phone");

    setSubmitting(true);
    const { data, error } = await supabase.functions.invoke("payu-create-hash", {
      body: { amount: "199.00", email, firstname, phone, plan, method },
    });
    if (error || !data?.hash) {
      setSubmitting(false);
      toast.error("Could not start payment. Please try again.");
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
    form.submit();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="py-4 px-4 flex items-center justify-center border-b border-border/50">
        <Link to="/" className="font-display text-2xl font-bold text-gradient">
          Indian Dreams
        </Link>
      </header>

      <div className="flex-1 flex items-center justify-center px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          {/* Status banner */}
          {status === "failure" && (
            <div className="mb-6 rounded-xl border border-destructive/40 bg-destructive/10 p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-semibold text-foreground">Payment not completed</p>
                <p className="text-muted-foreground">{reason === "hash_mismatch" ? "Verification failed." : "Please try again."}</p>
              </div>
            </div>
          )}

          <div className="rounded-2xl border border-border bg-card shadow-lg p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="font-display text-2xl font-bold text-foreground">Secure Checkout</h1>
                <p className="text-sm text-muted-foreground mt-1">Powered by PayU</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Lock className="w-6 h-6 text-primary" />
              </div>
            </div>

            {/* Order summary */}
            <div className="rounded-xl bg-muted/50 p-4 mb-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Full Package — 14 Days</span>
                <span className="text-foreground font-medium">₹199.00</span>
              </div>
              <div className="border-t border-border my-3" />
              <div className="flex items-center justify-between">
                <span className="font-semibold text-foreground">Total</span>
                <span className="font-display text-2xl font-bold text-primary">₹199.00</span>
              </div>
            </div>

            <form onSubmit={handlePay} className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm">Payment Method</Label>
                <div className="grid grid-cols-4 gap-2">
                  {([
                    { id: "UPI", label: "UPI", Icon: Smartphone },
                    { id: "CARD", label: "Card", Icon: CreditCard },
                    { id: "NB", label: "Netbanking", Icon: Landmark },
                    { id: "WALLET", label: "Wallet", Icon: Wallet },
                  ] as const).map(({ id, label, Icon }) => {
                    const active = method === id;
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setMethod(id)}
                        className={`flex flex-col items-center justify-center gap-1 rounded-xl border p-3 text-xs font-medium transition-colors ${
                          active
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border bg-background text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        {label}
                      </button>
                    );
                  })}
                </div>
                {method === "UPI" && (
                  <p className="text-xs text-muted-foreground pt-1">
                    Pay using any UPI app — GPay, PhonePe, Paytm, BHIM.
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="firstname" className="text-sm">Full Name</Label>
                <Input
                  id="firstname"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  placeholder="As on your card / UPI"
                  className="h-12 bg-background"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm">Email</Label>
                <Input id="email" value={email} disabled className="h-12 bg-background" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm">Phone</Label>
                <Input
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                  placeholder="10-digit mobile"
                  inputMode="numeric"
                  className="h-12 bg-background"
                  required
                />
              </div>

              <Button
                type="submit"
                variant="hero"
                disabled={submitting}
                className="w-full h-14 text-base rounded-xl"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Redirecting to PayU…
                  </>
                ) : (
                  <>Pay ₹199 securely</>
                )}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                You'll be redirected to PayU to complete payment via UPI, Cards, Netbanking or Wallets.
              </p>
            </form>
          </div>

          <div className="flex flex-wrap justify-center gap-5 mt-6 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-primary" /> 256-bit SSL</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-primary" /> PCI DSS Compliant</span>
            <span className="flex items-center gap-1.5"><Lock className="w-3.5 h-3.5 text-primary" /> RBI Approved</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PayU;