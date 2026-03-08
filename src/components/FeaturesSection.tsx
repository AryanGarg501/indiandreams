import { motion } from "framer-motion";
import { Clock, Headphones, Smartphone, Zap } from "lucide-react";

const features = [
  {
    icon: Clock,
    title: "Quick and easy to follow",
    desc: "Learn AI in just 15 minutes a day—perfect for any age or experience level.",
    color: "from-primary/20 to-accent/10",
  },
  {
    icon: Headphones,
    title: "Multiple learning formats",
    desc: "Choose from audio lessons, step-by-step guides, and interactive courses.",
    color: "from-accent/20 to-primary/10",
  },
  {
    icon: Smartphone,
    title: "Accessible anytime, anywhere",
    desc: "Learn on the go with our platform available on any device.",
    color: "from-primary/15 to-accent/15",
  },
  {
    icon: Zap,
    title: "Practical and actionable",
    desc: "Gain hands-on experience with AI tools you can apply immediately.",
    color: "from-accent/15 to-primary/20",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-28 section-gradient relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[120px]" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-4 block">Why Choose Us</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-5">
            Why people love <span className="text-gradient-vivid">Indian Dreams</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            Thousands of users trust Indian Dreams to learn AI. Get the tools, skills, and confidence to grow in your career.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="group bg-card rounded-2xl p-7 card-elevated relative overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${f.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-hero-gradient flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <f.icon size={26} className="text-primary-foreground" />
                </div>
                <h3 className="font-display text-lg font-bold mb-3">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
