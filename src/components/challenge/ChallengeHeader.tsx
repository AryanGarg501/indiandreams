import { Progress } from "@/components/ui/progress";
import { Clock, Users } from "lucide-react";
import type { ChallengeData } from "@/data/challengesData";

interface ChallengeHeaderProps {
  challenge: ChallengeData;
  progress: number;
  completedCount: number;
}

export function ChallengeHeader({ challenge, progress, completedCount }: ChallengeHeaderProps) {
  return (
    <div className="bg-gradient-to-br from-primary/15 via-accent/10 to-secondary/15 rounded-2xl p-6 md:p-8 border border-border">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-16 h-16 rounded-xl bg-card/80 flex items-center justify-center text-4xl shrink-0">
          {challenge.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">{challenge.title}</h1>
          <p className="text-muted-foreground mt-1">{challenge.description}</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1"><Clock size={13} /> {challenge.duration}</span>
        <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">{challenge.level}</span>
        <span className="flex items-center gap-1"><Users size={13} /> {challenge.participants} joined</span>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-5">
        {challenge.tags.map((tag) => (
          <span key={tag} className="text-[11px] font-medium bg-card/60 text-muted-foreground px-2.5 py-1 rounded-full">
            {tag}
          </span>
        ))}
      </div>

      <div>
        <div className="flex items-center justify-between mb-1.5 text-sm">
          <span className="text-muted-foreground">Day {completedCount} / {challenge.days.length}</span>
          <span className="font-semibold text-primary">{progress}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>
    </div>
  );
}
