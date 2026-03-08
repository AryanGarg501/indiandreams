import { ArrowLeft, CheckCircle2, Loader2, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import type { ChallengeDay } from "@/data/challengesData";

interface ChallengeDayContentProps {
  dayData: ChallengeDay;
  isCompleted: boolean;
  isUnlocked: boolean;
  markingComplete: boolean;
  onMarkComplete: () => void;
  onBack: () => void;
  challengeTitle: string;
}

export function ChallengeDayContent({
  dayData,
  isCompleted,
  markingComplete,
  onMarkComplete,
  onBack,
  challengeTitle,
}: ChallengeDayContentProps) {
  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft size={14} />
        Back to {challengeTitle}
      </button>

      <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
          <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">Day {dayData.day}</span>
          <span>{dayData.duration}</span>
        </div>

        {/* Task Card */}
        <div className="bg-accent/5 border border-accent/20 rounded-xl p-4 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Target size={14} className="text-accent" />
            <span className="text-xs font-semibold text-accent uppercase tracking-wider">Today's Task</span>
          </div>
          <p className="text-sm text-foreground">{dayData.task}</p>
        </div>

        {/* Lesson Content */}
        <article className="prose prose-sm dark:prose-invert max-w-none prose-headings:font-display prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-table:text-sm prose-pre:bg-muted prose-pre:text-foreground prose-code:text-primary prose-blockquote:border-primary/40 prose-blockquote:bg-primary/5 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-lg">
          <ReactMarkdown>{dayData.content}</ReactMarkdown>
        </article>
      </div>

      {/* Bottom Action */}
      <div className="flex justify-center pb-8">
        {isCompleted ? (
          <Button variant="outline" disabled className="gap-2">
            <CheckCircle2 size={16} className="text-emerald-500" />
            Day Completed
          </Button>
        ) : (
          <Button variant="hero" className="gap-2" onClick={onMarkComplete} disabled={markingComplete}>
            {markingComplete ? <Loader2 size={16} className="animate-spin" /> : <CheckCircle2 size={16} />}
            Complete Day {dayData.day}
          </Button>
        )}
      </div>
    </div>
  );
}
