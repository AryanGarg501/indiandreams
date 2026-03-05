import { motion } from "framer-motion";
import { Briefcase, TrendingUp, Lightbulb, PenTool, Share2 } from "lucide-react";

const paths = [
  { icon: Briefcase, title: "AI-powered Business", desc: "Automate workflows, analyze data, and make smarter decisions" },
  { icon: TrendingUp, title: "AI Marketing", desc: "Increase sales with AI-driven tools for ads and social media" },
  { icon: Lightbulb, title: "AI Productivity", desc: "Simplify daily tasks with AI tools that save time" },
  { icon: PenTool, title: "AI Content Creation", desc: "Produce high-quality content for blogs and social media" },
  { icon: Share2, title: "AI Affiliate Marketing", desc: "Use AI to find products and automate promotions" },
];

const PathsSection = () => {
  return (
    <section id="paths" className="py-24 bg-card">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Choose your path</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Explore different paths where you could apply AI to grow in today's digital world
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {paths.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group relative overflow-hidden rounded-xl border border-border p-6 hover:border-primary/30 transition-all card-elevated cursor-pointer"
            >
              <div className="w-10 h-10 rounded-lg bg-hero-gradient flex items-center justify-center mb-4">
                <p.icon size={20} className="text-primary-foreground" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2">{p.title}</h3>
              <p className="text-sm text-muted-foreground">{p.desc}</p>
              <div className="absolute inset-0 bg-hero-gradient opacity-0 group-hover:opacity-5 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PathsSection;
