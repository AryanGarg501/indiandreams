import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { Users, BookOpenCheck, Award } from "lucide-react";
import { usePlatformStats, formatIndian } from "@/hooks/usePlatformStats";

const AnimatedNumber = ({ display, icon: Icon }: { display: string; icon: React.ElementType }) => {
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
    <div ref={ref} className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
        <Icon size={28} className="text-primary" />
      </div>
      <div className="font-display text-4xl md:text-5xl font-bold text-gradient-vivid mb-2">
        {display}
      </div>
    </div>
  );
};

const StatsSection = () => {
  const { stats, loading } = usePlatformStats();

  const items = [
    { label: "Learners on Indian Dreams", value: stats?.learners ?? 0, icon: Users },
    { label: "Lessons completed", value: stats?.lessons_completed ?? 0, icon: BookOpenCheck },
    { label: "Certificates issued", value: stats?.certificates_issued ?? 0, icon: Award },
  ];

  return (
    <section className="py-28 bg-secondary relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary to-primary/10" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-4 block">Our Impact</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-secondary-foreground mb-5">
            Indian Dreams in action
          </h2>
          <p className="text-secondary-foreground/70 text-lg">
            See how Indian Dreams empowers learners: our success in numbers
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12 max-w-4xl mx-auto text-center">
          {items.map((s) => (
            <div key={s.label}>
              <AnimatedNumber display={loading ? "—" : formatIndian(s.value)} icon={s.icon} />
              <p className="text-secondary-foreground/70 mt-2">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
