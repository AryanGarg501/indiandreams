import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, Shield, Check, Star, Zap, Clock, Gift, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const OfferPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<"email" | "plans">("email");
  const [email, setEmail] = useState("");
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setStep("plans");
  };

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    navigate(`/payu?email=${encodeURIComponent(email)}&plan=${planId}`);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="py-4 px-4 flex items-center justify-center border-b border-border/50">
        <Link to="/" className="font-display text-2xl font-bold text-gradient">
          Indian Dreams
        </Link>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <AnimatePresence mode="wait">
          {step === "email" ? (
            <motion.div
              key="email"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-md flex flex-col items-center"
            >
              {/* Gift icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6"
              >
                <Gift className="w-10 h-10 text-primary" />
              </motion.div>

              <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground text-center mb-2">
                Enter your email to get your{" "}
                <span className="text-primary">Personal AI Challenge!</span>
              </h1>

              <form onSubmit={handleEmailSubmit} className="w-full mt-8 space-y-4">
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-14 pl-12 text-base border-border bg-card rounded-xl"
                    required
                  />
                </div>

                <div className="flex items-start gap-2 text-xs text-muted-foreground">
                  <Lock className="w-4 h-4 mt-0.5 shrink-0" />
                  <p>
                    We respect your privacy and are committed to protecting your personal data. Your data will be processed in accordance with our{" "}
                    <Link to="/" className="text-primary hover:underline">Privacy Policy</Link>.
                  </p>
                </div>

                {/* Bonus banner */}
                <div className="bg-accent/10 border border-accent/30 rounded-xl p-3 flex items-center gap-3">
                  <span className="text-2xl">🎁</span>
                  <p className="text-sm font-medium text-foreground">
                    Make sure your email is valid — don't miss your <span className="text-primary font-bold">BONUS!</span>
                  </p>
                </div>

                <Button
                  type="submit"
                  variant="hero"
                  className="w-full h-14 text-lg rounded-xl uppercase tracking-wider"
                >
                  Continue
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="plans"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-4xl"
            >
              {/* Heading */}
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.1 }}
                  className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4"
                >
                  <Zap className="w-4 h-4" />
                  Special Launch Offer
                </motion.div>
                <h1 className="font-display text-2xl md:text-4xl font-bold text-foreground mb-2">
                  Choose Your <span className="text-primary">AI Mastery Plan</span>
                </h1>
                <p className="text-muted-foreground max-w-lg mx-auto">
                  Unlock your personalized 14-day AI challenge and start building real skills today
                </p>
              </div>

              {/* Single Plan */}
              <div className="flex justify-center">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="relative rounded-2xl border-2 border-primary/60 bg-card shadow-lg p-8 w-full max-w-md cursor-pointer hover:shadow-xl transition-all"
                  onClick={() => handleSelectPlan("full")}
                >
                  {/* Badge */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-hero-gradient text-primary-foreground text-xs font-bold px-4 py-1.5 rounded-full flex items-center gap-1.5 whitespace-nowrap">
                      <Star className="w-3.5 h-3.5" /> LIMITED OFFER
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-bold text-foreground mb-1 mt-2 text-center">Full Package — 14 Days</h3>
                  <p className="text-sm text-muted-foreground mb-5 text-center">Complete AI mastery challenge</p>
                  <div className="flex items-baseline justify-center gap-1 mb-1">
                    <span className="font-display text-5xl font-extrabold text-foreground">₹199</span>
                    <span className="text-muted-foreground text-sm">/one-time</span>
                  </div>
                  <p className="text-xs text-muted-foreground line-through mb-6 text-center">₹1,999</p>
                  <ul className="space-y-3 mb-8">
                    {[
                      "Full 14-day AI challenge",
                      "All AI tools & guides",
                      "Certificate of completion",
                      "Priority support",
                      "Bonus: Side gigs challenge",
                      "Community access",
                      "Lifetime updates",
                    ].map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-foreground">
                        <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button variant="hero" className="w-full h-14 rounded-xl font-semibold text-lg">
                    Get Full Access
                  </Button>
                </motion.div>
              </div>

              {/* Trust badges */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-muted-foreground"
              >
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary" />
                  Secure Payment
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  Instant Access
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-primary" />
                  4.9/5 Rating
                </div>
              </motion.div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default OfferPage;
