import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Users, Sparkles } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-28 bg-secondary relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary to-primary/15" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[150px]" />
      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="w-16 h-16 rounded-2xl bg-hero-gradient flex items-center justify-center mx-auto mb-8 shadow-xl"
          >
            <Sparkles size={28} className="text-primary-foreground" />
          </motion.div>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-secondary-foreground mb-6 leading-tight">
            Join 5,00,000+ learners across India
          </h2>
          <p className="text-secondary-foreground/70 mb-10 text-lg">
            Advance your career with AI skills. Start your journey today.
          </p>
          <Button variant="hero" size="lg" className="gap-2 text-base px-10 h-14 rounded-xl shimmer">
            Start Now <ArrowRight size={18} />
          </Button>
          <div className="flex items-center justify-center gap-3 mt-8">
            <Users size={18} className="text-secondary-foreground/50" />
            <span className="text-sm text-secondary-foreground/60 font-medium">More than 16,000+ reviews on Google</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
