import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const reviews = [
  { name: "Priya Sharma", text: "Easy to follow, engaging courses made very user-friendly and enjoyable. The AI concepts were explained brilliantly!", rating: 5, role: "Marketing Manager" },
  { name: "Rahul Verma", text: "I'm really impressed with this learning tool. It delivers clear, concise instructions and explains why each step matters.", rating: 5, role: "Freelancer" },
  { name: "Anita Desai", text: "As a 45-year-old teacher, I found Indian Dreams perfect for understanding AI. My students benefit from what I've learned here.", rating: 5, role: "Teacher" },
  { name: "Vikram Singh", text: "The 28-day challenge transformed how I work. I now use AI daily to boost my productivity at my startup.", rating: 5, role: "Startup Founder" },
  { name: "Meera Patel", text: "Fantastic platform! The certificate I earned helped me land a better position at my company.", rating: 4, role: "Software Developer" },
  { name: "Arjun Nair", text: "Indian Dreams made AI accessible. The step-by-step approach is perfect for beginners like me.", rating: 5, role: "Student" },
];

const ReviewsSection = () => {
  return (
    <section id="reviews" className="py-28 section-gradient relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full bg-accent/8 blur-[120px]" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-4 block">Testimonials</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-5">
            See how Indian Dreams <span className="text-gradient-vivid">changes lives</span>
          </h2>
          <div className="flex items-center justify-center gap-3 mt-6">
            <span className="font-display text-3xl font-bold text-foreground">4.5</span>
            <div className="flex gap-0.5">
              {[1, 2, 3, 4].map((i) => (
                <Star key={i} size={20} className="fill-accent text-accent" />
              ))}
              <Star size={20} className="fill-accent/50 text-accent" />
            </div>
            <span className="text-sm text-muted-foreground font-medium">based on 95,000+ reviews</span>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {reviews.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group bg-card rounded-2xl p-7 card-elevated relative"
            >
              <Quote size={32} className="text-primary/10 absolute top-5 right-5" />
              <div className="flex gap-1 mb-4">
                {Array.from({ length: r.rating }).map((_, j) => (
                  <Star key={j} size={16} className="fill-accent text-accent" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{r.text}</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-hero-gradient flex items-center justify-center text-primary-foreground font-bold text-sm">
                  {r.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-sm text-foreground">{r.name}</p>
                  <p className="text-xs text-muted-foreground">{r.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
