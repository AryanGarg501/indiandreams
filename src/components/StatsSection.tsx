import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const stats = [
  { value: 1612345, label: "Users learned new skills", display: "16,12,345+" },
  { value: 14314726, label: "Minutes of content consumed", display: "1,43,14,726+" },
  { value: 164887, label: "AI prompts written", display: "1,64,887+" },
];

const AnimatedNumber = ({ target, display }: { target: number; display: string }) => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`font-display text-4xl md:text-5xl font-bold text-gradient transition-all duration-700 ${inView ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
      {display}
    </div>
  );
};

const StatsSection = () => {
  return (
    <section className="py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-secondary-foreground mb-4">
            Indian Dreams in action
          </h2>
          <p className="text-secondary-foreground/70">
            See how Indian Dreams empowers learners: our success in numbers
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12 max-w-4xl mx-auto text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <AnimatedNumber target={s.value} display={s.display} />
              <p className="text-secondary-foreground/70 mt-2 text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
