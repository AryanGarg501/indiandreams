import { motion } from "framer-motion";
import { Clock, Headphones, Smartphone, Zap } from "lucide-react";

const features = [
  {
    icon: Clock,
    title: "Quick and easy to follow",
    desc: "Learn AI in just 15 minutes a day—perfect for any age or experience level.",
  },
  {
    icon: Headphones,
    title: "Multiple learning formats",
    desc: "Choose from audio lessons, step-by-step guides, and interactive courses.",
  },
  {
    icon: Smartphone,
    title: "Accessible anytime, anywhere",
    desc: "Learn on the go with our platform available on any device.",
  },
  {
    icon: Zap,
    title: "Practical and actionable",
    desc: "Gain hands-on experience with AI tools you can apply immediately.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-24 section-gradient">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Why people love <span className="text-gradient">Indian Dreams</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Thousands of users trust Indian Dreams to learn AI. Get the tools, skills, and confidence to grow in your career.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-xl p-6 card-elevated"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <f.icon size={24} className="text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
