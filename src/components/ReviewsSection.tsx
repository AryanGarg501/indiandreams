import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useReviews } from "@/hooks/useReviews";
import { formatIndian } from "@/hooks/usePlatformStats";
import ReviewForm from "@/components/ReviewForm";

const ReviewsSection = () => {
  const { reviews, loading, average, reload } = useReviews();

  return (
    <section id="reviews" className="py-28 section-gradient relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full bg-accent/8 blur-[120px]" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-4 block">Testimonials</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-5">
            See how Indian Dreams <span className="text-gradient-vivid">changes lives</span>
          </h2>
          {average !== null && (
            <div className="flex items-center justify-center gap-3 mt-6">
              <span className="font-display text-3xl font-bold text-foreground">{average.toFixed(1)}</span>
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    size={20}
                    className={i <= Math.round(average) ? "fill-accent text-accent" : "text-accent/30"}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground font-medium">
                based on {formatIndian(reviews.length)} {reviews.length === 1 ? "review" : "reviews"}
              </span>
            </div>
          )}
          {!loading && reviews.length === 0 && (
            <p className="text-muted-foreground mt-6">
              No reviews yet — be the first learner to share your experience.
            </p>
          )}
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {reviews.map((r, i) => (
            <motion.div
              key={r.id}
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
                  {r.role && <p className="text-xs text-muted-foreground">{r.role}</p>}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <ReviewForm onSubmitted={reload} />
      </div>
    </section>
  );
};

export default ReviewsSection;
