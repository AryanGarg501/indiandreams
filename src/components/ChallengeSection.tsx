import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

const days = Array.from({ length: 28 }, (_, i) => i + 1);
const tags = ["AI Skills", "Business Growth", "Boost Productivity", "Save Time", "Advance Career"];

const ChallengeSection = () => {
  return (
    <section className="py-24 section-gradient">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Learn new AI every day in our <span className="text-gradient">28-day Challenge</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Don't let your goals overwhelm you. Learn AI skills tailored to your needs and everyday tasks.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-card rounded-2xl p-8 card-elevated">
            <h3 className="font-display text-lg font-semibold mb-6 flex items-center gap-2">
              <Sparkles size={20} className="text-primary" /> AI Mastery
            </h3>
            <div className="grid grid-cols-7 gap-2 mb-6">
              {days.map((d) => (
                <div
                  key={d}
                  className={`aspect-square rounded-lg flex items-center justify-center text-xs font-semibold transition-all ${
                    d <= 5 ? "bg-hero-gradient text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {d}
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 mb-6">
              {tags.map((tag) => (
                <span key={tag} className="text-xs font-medium bg-primary/10 text-primary px-3 py-1.5 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            <Button variant="hero" className="w-full">Join our Challenge</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChallengeSection;
