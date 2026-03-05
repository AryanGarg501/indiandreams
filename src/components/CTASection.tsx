import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Users } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-24 bg-secondary">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-secondary-foreground mb-4">
            Join 5,00,000+ learners across India
          </h2>
          <p className="text-secondary-foreground/70 mb-8">
            Advance your career with AI skills. Start your journey today.
          </p>
          <Button variant="hero" size="lg" className="gap-2">
            Start Now <ArrowRight size={18} />
          </Button>
          <div className="flex items-center justify-center gap-2 mt-6">
            <Users size={16} className="text-secondary-foreground/50" />
            <span className="text-sm text-secondary-foreground/60">More than 16,000+ reviews on Google</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
