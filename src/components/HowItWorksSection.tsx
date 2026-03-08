import { motion } from "framer-motion";
import { ClipboardList, BookOpen, Target } from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    step: "Step 1",
    title: "Get your personal learning plan",
    desc: "Define your unique goals and needs. A personalized learning plan is created to help you focus on the most relevant skills.",
  },
  {
    icon: BookOpen,
    step: "Step 2",
    title: "Learn the skills you need",
    desc: "Easy-to-follow lessons guide you through practical, hands-on learning. Master AI tools that fit your goals.",
  },
  {
    icon: Target,
    step: "Step 3",
    title: "Master AI for your goals",
    desc: "Dive deeper into applying AI to achieve your personal and professional objectives.",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-28 section-gradient relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-accent/5 blur-[120px]" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-4 block">How It Works</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-5">
            How <span className="text-gradient-vivid">Indian Dreams</span> works
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            Learn at your own pace and discover how AI tools can help you grow
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-[52px] left-[16%] right-[16%] h-[2px] bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20" />
          
          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="text-center relative"
            >
              <div className="w-[104px] h-[104px] rounded-3xl bg-hero-gradient flex items-center justify-center mx-auto mb-8 shadow-xl relative z-10 group-hover:scale-105 transition-transform">
                <s.icon size={40} className="text-primary-foreground" />
              </div>
              <span className="inline-block text-xs font-bold text-primary uppercase tracking-[0.15em] bg-primary/10 px-3 py-1 rounded-full mb-3">{s.step}</span>
              <h3 className="font-display text-xl font-bold mt-2 mb-4">{s.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
