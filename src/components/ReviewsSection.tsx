import { motion } from "framer-motion";
import { Star } from "lucide-react";

const reviews = [
  { name: "Priya Sharma", text: "Easy to follow, engaging courses made very user-friendly and enjoyable. The AI concepts were explained brilliantly!", rating: 5 },
  { name: "Rahul Verma", text: "I'm really impressed with this learning tool. It delivers clear, concise instructions and explains why each step matters.", rating: 5 },
  { name: "Anita Desai", text: "As a 45-year-old teacher, I found Indian Dreams perfect for understanding AI. My students benefit from what I've learned here.", rating: 5 },
  { name: "Vikram Singh", text: "The 28-day challenge transformed how I work. I now use AI daily to boost my productivity at my startup.", rating: 5 },
  { name: "Meera Patel", text: "Fantastic platform! The certificate I earned helped me land a better position at my company.", rating: 4 },
  { name: "Arjun Nair", text: "Indian Dreams made AI accessible. The step-by-step approach is perfect for beginners like me.", rating: 5 },
];

const ReviewsSection = () => {
  return (
    <section id="reviews" className="py-24 section-gradient">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            See how Indian Dreams <span className="text-gradient">changes lives</span>
          </h2>
          <div className="flex items-center justify-center gap-2 mt-4">
            <span className="font-display text-2xl font-bold">4.5</span>
            <div className="flex gap-0.5">
              {[1, 2, 3, 4].map((i) => (
                <Star key={i} size={18} className="fill-accent text-accent" />
              ))}
              <Star size={18} className="fill-accent/50 text-accent" />
            </div>
            <span className="text-sm text-muted-foreground">based on 95,000+ reviews</span>
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
              className="bg-card rounded-xl p-6 card-elevated"
            >
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: r.rating }).map((_, j) => (
                  <Star key={j} size={14} className="fill-accent text-accent" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground mb-4">{r.text}</p>
              <p className="font-semibold text-sm text-foreground">{r.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
