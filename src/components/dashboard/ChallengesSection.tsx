import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import challenge28day from "@/assets/challenge-28day.jpg";

const challenges = [
  { id: "28-day-ai", title: "2026 28-Day AI Challenge", duration: "28 days", level: "Beginner", image: challenge28day },
  { id: "junior-ai", title: "Junior AI Challenge", duration: "28 days", level: "Beginner", image: null },
  { id: "14-day-side-gigs", title: "14-Day AI Side Gigs Challenge", duration: "14 days", level: "Beginner", image: null },
];

export function ChallengesSection() {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-foreground">Challenges</h2>
        <Link to="/challenges" className="text-sm text-primary font-medium hover:underline flex items-center gap-1">
          View All <ArrowRight size={14} />
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {challenges.map((challenge) => (
          <Link
            key={challenge.title}
            to={`/challenge/${challenge.id}`}
            className="bg-card rounded-2xl border border-border overflow-hidden card-elevated cursor-pointer hover:border-primary/40 transition-all"
          >
            <div className="h-32 overflow-hidden relative">
              {challenge.image ? (
                <img src={challenge.image} alt={challenge.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 flex items-center justify-center text-4xl">
                  🏆
                </div>
              )}
            </div>
            <div className="p-4">
              <h4 className="font-semibold text-sm text-foreground">{challenge.title}</h4>
              <p className="text-xs text-muted-foreground mt-1">
                {challenge.duration} · {challenge.level}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
