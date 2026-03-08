import { motion } from "framer-motion";
import { Briefcase, TrendingUp, Lightbulb, PenTool, Share2 } from "lucide-react";

const paths = [
  { icon: Briefcase, title: "AI-powered Business", desc: "Automate workflows, analyze data, and make smarter decisions", emoji: "💼" },
  { icon: TrendingUp, title: "AI Marketing", desc: "Increase sales with AI-driven tools for ads and social media", emoji: "📈" },
  { icon: Lightbulb, title: "AI Productivity", desc: "Simplify daily tasks with AI tools that save time", emoji: "⚡" },
  { icon: PenTool, title: "AI Content Creation", desc: "Produce high-quality content for blogs and social media", emoji: "✍️" },
  { icon: Share2, title: "AI Affiliate Marketing", desc: "Use AI to find products and automate promotions", emoji: "🔗" },
];

const PathsSection = () => {
  return (
    <section id="paths" className="py-28 bg-card relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/3 blur-[150px]" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-4 block">Learning Paths</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-5">Choose your path</h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
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
              className="group relative overflow-hidden rounded-2xl border border-border p-7 hover:border-primary/40 transition-all card-elevated cursor-pointer"
            >
              <div className="absolute inset-0 bg-hero-gradient opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-hero-gradient flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                    <p.icon size={22} className="text-primary-foreground" />
                  </div>
                  <span className="text-2xl">{p.emoji}</span>
                </div>
                <h3 className="font-display text-lg font-bold mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PathsSection;
