import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles, Trophy, Flame } from "lucide-react";

const days = Array.from({ length: 28 }, (_, i) => i + 1);
const tags = ["AI Skills", "Business Growth", "Boost Productivity", "Save Time", "Advance Career"];

const ChallengeSection = () => {
  return (
    <section className="py-28 section-gradient relative overflow-hidden">
      <div className="absolute -right-20 top-1/3 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[120px]" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-4 block">Daily Challenge</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-5">
            Learn new AI every day in our <span className="text-gradient-vivid">28-day Challenge</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            Don't let your goals overwhelm you. Learn AI skills tailored to your needs and everyday tasks.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card rounded-3xl p-8 md:p-10 card-elevated border border-border relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-hero-gradient opacity-5 rounded-full blur-2xl" />
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-hero-gradient flex items-center justify-center">
                <Sparkles size={20} className="text-primary-foreground" />
              </div>
              <h3 className="font-display text-xl font-bold">AI Mastery</h3>
              <div className="ml-auto flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-full">
                <Flame size={14} className="text-primary" />
                <span className="text-xs font-bold text-primary">28 Days</span>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-2.5 mb-8">
              {days.map((d) => (
                <div
                  key={d}
                  className={`aspect-square rounded-xl flex items-center justify-center text-xs font-bold transition-all ${
                    d <= 5 
                      ? "bg-hero-gradient text-primary-foreground shadow-md" 
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {d <= 5 ? "✓" : d}
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 mb-8">
              {tags.map((tag) => (
                <span key={tag} className="text-xs font-semibold bg-primary/10 text-primary px-4 py-2 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            <Button variant="hero" className="w-full h-13 text-base rounded-xl gap-2 shimmer">
              <Trophy size={18} /> Join our Challenge
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ChallengeSection;
