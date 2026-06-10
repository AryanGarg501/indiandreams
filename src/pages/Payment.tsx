import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Lock, Check, CreditCard, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

declare global {
  interface Window { Razorpay: any }
}

const AMOUNT_PAISE = 19900; // ₹199

const loadRazorpay = () =>
  new Promise<boolean>((resolve) => {
    if (window.Razorpay) return resolve(true);
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });

const Payment = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const email = params.get("email") || "";
  const plan = params.get("plan") || "full";
  const [loading, setLoading] = useState(false);

  useEffect(() => { loadRazorpay(); }, []);

  const handlePay = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const ok = await loadRazorpay();
      if (!ok) throw new Error("Failed to load Razorpay");

      const { data, error } = await supabase.functions.invoke("razorpay-create-order", {
        body: { amount: AMOUNT_PAISE, currency: "INR", notes: { email, plan } },
      });
      if (error) throw error;
      if (!data?.orderId) throw new Error("Could not create order");

      const rzp = new window.Razorpay({
        key: data.keyId,
        amount: data.amount,
        currency: data.currency,
        order_id: data.orderId,
        name: "Indian Dreams",
        description: "Full Package — 14-Day AI Challenge",
        prefill: { email },
        theme: { color: "#F97316" },
        handler: async (resp: any) => {
          try {
            const { data: vData, error: vErr } = await supabase.functions.invoke(
              "razorpay-verify-payment",
              { body: resp }
            );
            if (vErr || !vData?.valid) throw new Error("Payment verification failed");
            toast.success("Payment successful!");
            const qs = new URLSearchParams({
              email,
              plan,
              paid: "1",
              pid: resp.razorpay_payment_id,
            }).toString();
            navigate(`/signup?${qs}`);
          } catch (e: any) {
            toast.error(e.message || "Verification failed");
          }
        },
        modal: { ondismiss: () => setLoading(false) },
      });
      rzp.on("payment.failed", (r: any) => {
        toast.error(r?.error?.description || "Payment failed");
        setLoading(false);
      });
      rzp.open();
    } catch (e: any) {
      toast.error(e.message || "Something went wrong");
      setLoading(false);
    }
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
          className="w-full max-w-lg rounded-2xl border border-border bg-card shadow-xl p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold text-foreground">Complete Payment</h1>
              <p className="text-sm text-muted-foreground">Secure checkout via Razorpay</p>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-background/50 p-5 mb-6">
            <div className="flex justify-between items-center mb-3">
              <span className="text-foreground font-medium">Full Package — 14 Days</span>
              <span className="font-display text-2xl font-extrabold text-foreground">₹199</span>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {["Full 14-day AI challenge", "All AI tools & guides", "Certificate of completion", "Lifetime updates"].map(f => (
                <li key={f} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" /> {f}
                </li>
              ))}
            </ul>
          </div>

          {email && (
            <p className="text-sm text-muted-foreground mb-4">
              Billing email: <span className="text-foreground font-medium">{email}</span>
            </p>
          )}

          <Button
            onClick={handlePay}
            disabled={loading}
            variant="hero"
            className="w-full h-14 rounded-xl text-lg"
          >
            {loading ? (
              <><Loader2 className="w-5 h-5 animate-spin" /> Processing…</>
            ) : (
              <>Pay ₹199 securely</>
            )}
          </Button>

          <div className="flex items-center justify-center gap-5 mt-6 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-primary" /> 256-bit SSL</span>
            <span className="flex items-center gap-1.5"><Lock className="w-3.5 h-3.5 text-primary" /> PCI DSS</span>
            <span>UPI · Cards · Netbanking</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Payment;