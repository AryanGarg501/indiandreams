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
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Decorative bg elements */}
      <div className="absolute inset-0 section-gradient grain-overlay" />
      <div className="absolute -left-40 top-1/4 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[110px] animate-pulse" />
      <div className="absolute -right-40 bottom-1/4 w-[520px] h-[520px] rounded-full bg-accent/20 blur-[110px] animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-20 left-1/2 w-[300px] h-[300px] rounded-full bg-primary/5 blur-[80px]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-2 mb-8 shimmer"
            >
              <Sparkles size={14} className="text-accent" />
              <span className="text-xs md:text-sm text-foreground font-bold tracking-wide uppercase">Indian Dreams — AI Learning Platform</span>
            </motion.div>

            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] mb-8 tracking-tight">
              Become the{" "}
              <span className="text-gradient-vivid relative">
                Master of AI
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                  <path d="M2 8C50 3 120 2 298 8" stroke="hsl(var(--accent))" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
                </svg>
              </span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-lg mb-10 leading-relaxed">
              Learn AI skills to advance your career and stay competitive in India's rapidly growing tech landscape
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <Button variant="hero" size="lg" className="gap-2 text-base px-8 h-13 rounded-xl pulse-glow" onClick={() => navigate("/offer")}>
                Start Now <ArrowRight size={18} />
              </Button>
              <Button variant="heroOutline" size="lg" className="text-base px-8 h-13 rounded-xl" onClick={() => navigate("/login")}>
                Login
              </Button>
            </div>

            {stats && stats.learners > 0 && (
              <div className="flex items-center gap-4 mb-10">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-hero-gradient border-2 border-card flex items-center justify-center shadow-md"
                    >
                      <Users size={14} className="text-primary-foreground" />
                    </div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  <span className="font-bold text-foreground">{formatIndian(stats.learners)}</span> learners joined
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { icon: Zap, title: "14-Day Track", sub: "Daily bite-sized lessons" },
                { icon: Award, title: "Certificate", sub: "Verified on completion" },
                { icon: ShieldCheck, title: "One-Time ₹199", sub: "No subscriptions" },
              ].map(({ icon: Icon, title, sub }) => (
                <div key={title} className="rounded-2xl border border-border bg-card/70 backdrop-blur p-4 card-elevated">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                    <Icon size={16} className="text-primary" />
                  </div>
                  <p className="text-sm font-bold text-foreground">{title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative float-animation"
          >
            <div className="relative rounded-[2rem] overflow-hidden glow ring-1 ring-border">
              <img
                src={heroImage}
                alt="Indian student learning AI skills online"
                className="w-full h-auto rounded-[2rem]"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/40 via-transparent to-transparent rounded-[2rem]" />
            </div>
            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="absolute -bottom-5 -left-5 glass rounded-2xl p-4 border border-border shadow-xl"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gold-gradient flex items-center justify-center">
                  <Sparkles size={18} className="text-accent-foreground" />
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground">28-Day Challenge</p>
                  <p className="text-xs text-muted-foreground">Start your AI journey</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
