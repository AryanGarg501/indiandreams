import { CheckCircle2, Lock, Play, Clock } from "lucide-react";
import { motion } from "framer-motion";
import type { ChallengeDay } from "@/data/challengesData";

interface ChallengeDayGridProps {
  days: ChallengeDay[];
  completedDays: Set<number>;
  isDayUnlocked: (day: number) => boolean;
  onSelectDay: (day: number) => void;
}

export function ChallengeDayGrid({ days, completedDays, isDayUnlocked, onSelectDay }: ChallengeDayGridProps) {
  return (
    <div className="space-y-3">
      <h2 className="text-lg font-bold text-foreground">Daily Challenges</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {days.map((day, i) => {
          const completed = completedDays.has(day.day);
          const unlocked = isDayUnlocked(day.day);
          const isNext = unlocked && !completed;

          return (
            <motion.button
              key={day.day}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.02 }}
              onClick={() => unlocked && onSelectDay(day.day)}
              disabled={!unlocked}
              className={`text-left rounded-xl border p-4 transition-all ${
                completed
                  ? "bg-primary/5 border-primary/30 hover:border-primary/50"
                  : isNext
                  ? "bg-card border-primary/40 ring-1 ring-primary/20 hover:ring-primary/40 cursor-pointer"
                  : unlocked
                  ? "bg-card border-border hover:border-primary/30 cursor-pointer"
                  : "bg-muted/30 border-border/50 opacity-60 cursor-not-allowed"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                    completed
                      ? "bg-primary text-primary-foreground"
                      : isNext
                      ? "bg-primary/20 text-primary"
                      : "bg-muted text-muted-foreground"
                  }`}>
                    {completed ? (
                      <CheckCircle2 size={14} />
                    ) : isNext ? (
                      <Play size={12} />
                    ) : unlocked ? (
                      day.day
                    ) : (
                      <Lock size={11} />
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground font-medium">Day {day.day}</span>
                </div>
                <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                  <Clock size={10} /> {day.duration}
                </span>
              </div>
              <h3 className="text-sm font-semibold text-foreground truncate">{day.title}</h3>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{day.description}</p>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
