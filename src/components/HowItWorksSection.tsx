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
    <section id="how-it-works" className="py-24 section-gradient">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            How <span className="text-gradient">Indian Dreams</span> works
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Learn at your own pace and discover how AI tools can help you grow
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-hero-gradient flex items-center justify-center mx-auto mb-6 shadow-lg">
                <s.icon size={28} className="text-primary-foreground" />
              </div>
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">{s.step}</span>
              <h3 className="font-display text-xl font-semibold mt-2 mb-3">{s.title}</h3>
              <p className="text-sm text-muted-foreground">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
