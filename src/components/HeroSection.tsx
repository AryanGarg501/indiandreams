import { Button } from "@/components/ui/button";
import { ArrowRight, Users } from "lucide-react";
import { motion } from "framer-motion";
import heroImage from "@/assets/hero-image.jpg";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Decorative bg */}
      <div className="absolute inset-0 section-gradient" />
      <div className="absolute -left-32 top-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute -right-32 bottom-1/4 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 mb-6">
              <span className="text-xs font-semibold text-primary">AI</span>
              <span className="text-sm text-foreground font-medium">Indian Dreams →</span>
            </div>

            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              Become the{" "}
              <span className="text-gradient">Master of AI</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-lg mb-8">
              Learn AI skills to advance your career and stay competitive in India's rapidly growing tech landscape
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              <Button variant="hero" size="lg" className="gap-2">
                Start Now <ArrowRight size={18} />
              </Button>
              <Button variant="heroOutline" size="lg">
                Learn More
              </Button>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-9 h-9 rounded-full bg-hero-gradient border-2 border-card flex items-center justify-center"
                  >
                    <Users size={14} className="text-primary-foreground" />
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                More than <span className="font-semibold text-foreground">5,00,000+</span> people joined
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden glow">
              <img
                src={heroImage}
                alt="Indian student learning AI skills online"
                className="w-full h-auto rounded-2xl"
                loading="eager"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
