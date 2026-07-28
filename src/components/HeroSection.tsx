import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-image.jpg";

const quizOptions = [
  { label: "I work for a company" },
  { label: "I work for myself" },
];

const HeroSection = () => {
  const [showQuiz, setShowQuiz] = useState(false);
  const navigate = useNavigate();

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Decorative bg elements */}
      <div className="absolute inset-0 section-gradient" />
      <div className="absolute -left-40 top-1/4 w-[500px] h-[500px] rounded-full bg-primary/8 blur-[100px] animate-pulse" />
      <div className="absolute -right-40 bottom-1/4 w-[500px] h-[500px] rounded-full bg-accent/12 blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
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
              className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 mb-8 shimmer"
            >
              <Sparkles size={14} className="text-primary" />
              <span className="text-sm text-foreground font-semibold">Indian Dreams — AI Learning Platform</span>
            </motion.div>

            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-8 tracking-tight">
              Become the{" "}
              <span className="text-gradient-vivid relative">
                Master of AI
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                  <path d="M2 8C50 3 120 2 298 8" stroke="hsl(22 100% 55%)" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
                </svg>
              </span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-lg mb-10 leading-relaxed">
              Learn AI skills to advance your career and stay competitive in India's rapidly growing tech landscape
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <Button variant="hero" size="lg" className="gap-2 text-base px-8 h-13 rounded-xl pulse-glow" onClick={() => setShowQuiz(!showQuiz)}>
                Start Now <ArrowRight size={18} />
              </Button>
              <Button variant="heroOutline" size="lg" className="text-base px-8 h-13 rounded-xl">
                Learn More
              </Button>
            </div>

            <AnimatePresence>
              {showQuiz && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden mb-10"
                >
                  <p className="text-sm font-semibold text-muted-foreground mb-4">How would you describe yourself?</p>
                  <div className="flex gap-4">
                    {quizOptions.map((option) => (
                      <button
                        key={option.label}
                        onClick={() => navigate("/offer", { state: { type: option.label === "I work for a company" ? "company" : "self" } })}
                        className="group relative flex-1 rounded-2xl border-2 border-border hover:border-primary overflow-hidden transition-all duration-300 bg-card cursor-pointer card-elevated p-4 flex items-center justify-between"
                      >
                        <span className="text-foreground font-semibold text-xs sm:text-sm">{option.label}</span>
                        <ChevronRight className="text-foreground group-hover:text-primary transition-colors" size={16} />
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex items-center gap-4">
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
                More than <span className="font-bold text-foreground">5,00,000+</span> people joined
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative float-animation"
          >
            <div className="relative rounded-3xl overflow-hidden glow">
              <img
                src={heroImage}
                alt="Indian student learning AI skills online"
                className="w-full h-auto rounded-3xl"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 via-transparent to-transparent rounded-3xl" />
            </div>
            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="absolute -bottom-4 -left-4 glass rounded-2xl p-4 border border-border shadow-xl"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-hero-gradient flex items-center justify-center">
                  <Sparkles size={18} className="text-primary-foreground" />
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
