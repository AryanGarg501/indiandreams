import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote } from "lucide-react";
import { useReviews } from "@/hooks/useReviews";

const TestimonialsCarousel = () => {
  const [current, setCurrent] = useState(0);
  const { reviews } = useReviews(5);
  const testimonials = reviews.map((r) => `"${r.text}" — ${r.name}`);

  useEffect(() => {
    if (testimonials.length < 2) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  if (testimonials.length === 0) return null;

  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4 text-center max-w-3xl">
        <Quote size={40} className="mx-auto text-primary/30 mb-6" />
        <div className="relative h-32 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="font-display text-xl md:text-2xl italic text-foreground absolute"
            >
              {testimonials[current]}
            </motion.p>
          </AnimatePresence>
        </div>
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-3 h-3 rounded-full transition-all ${
                i === current ? "bg-primary w-8" : "bg-muted"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
