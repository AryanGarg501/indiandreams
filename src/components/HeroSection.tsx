import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Sparkles, ShieldCheck, Award, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-image.jpg";
import { usePlatformStats, formatIndian } from "@/hooks/usePlatformStats";


const HeroSection = () => {
  const navigate = useNavigate();
  const { stats } = usePlatformStats();

  return (
    <section id="home" className="heritage-hero relative min-h-[94vh] flex items-center pt-24 pb-16 overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImage} alt="" className="heritage-hero__image h-full w-full object-cover" aria-hidden="true" />
        <div className="absolute inset-0 bg-hero-cinematic" />
        <div className="heritage-hero__pattern" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3 border-y border-accent/40 px-5 py-2 mb-8"
            >
              <Sparkles size={14} className="text-accent" />
              <span className="text-xs md:text-sm text-primary-foreground/80 font-bold tracking-[0.16em] uppercase">Indian Dreams — AI Learning Platform</span>
            </motion.div>

            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-semibold leading-[0.98] mb-8 text-primary-foreground">
              Become the <span className="block italic font-medium text-accent">Master of AI</span>
            </h1>

            <p className="text-base md:text-xl text-primary-foreground/75 max-w-2xl mx-auto mb-10 leading-relaxed">
              Learn AI skills to advance your career and stay competitive in India's rapidly growing tech landscape
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Button variant="gold" size="lg" className="gap-2 text-base px-9 h-13 rounded-sm" onClick={() => navigate("/offer")}>
                Start Now <ArrowRight size={18} />
              </Button>
              <Button variant="heroOutline" size="lg" className="text-base px-9 h-13 rounded-sm border-primary-foreground/35 bg-primary-foreground/5 text-primary-foreground hover:border-accent hover:bg-primary-foreground/10 hover:text-primary-foreground" onClick={() => navigate("/login")}>
                Login
              </Button>
            </div>

            {stats && stats.learners > 0 && (
              <div className="flex items-center justify-center gap-4 mb-10">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-primary/70 border-2 border-primary-foreground/25 flex items-center justify-center shadow-md"
                    >
                      <Users size={14} className="text-primary-foreground" />
                    </div>
                  ))}
                </div>
                <p className="text-sm text-primary-foreground/70">
                  <span className="font-bold text-primary-foreground">{formatIndian(stats.learners)}</span> learners joined
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-px border border-primary-foreground/15 bg-primary-foreground/15 max-w-3xl mx-auto">
              {[
                { icon: Zap, title: "14-Day Track", sub: "Daily bite-sized lessons" },
                { icon: Award, title: "Certificate", sub: "Verified on completion" },
                { icon: ShieldCheck, title: "One-Time ₹149", sub: "No subscriptions" },
              ].map(({ icon: Icon, title, sub }) => (
                <div key={title} className="bg-secondary/65 backdrop-blur-md p-4 text-left">
                  <div className="w-9 h-9 rounded-sm bg-accent/15 flex items-center justify-center mb-3">
                    <Icon size={16} className="text-accent" />
                  </div>
                  <p className="text-sm font-bold text-primary-foreground">{title}</p>
                  <p className="text-xs text-primary-foreground/60 mt-0.5">{sub}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
