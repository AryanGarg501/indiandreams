import { ArrowRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";

const masteryPaths = [
  { title: "Claude", lessons: 10, hours: 5, progress: 20, emoji: "🤖" },
  { title: "Gemini", lessons: 10, hours: 4, progress: 35, emoji: "💎" },
  { title: "ChatGPT", lessons: 13, hours: 6, progress: 50, emoji: "🧠" },
  { title: "Jasper AI", lessons: 10, hours: 5, progress: 10, emoji: "✍️" },
  { title: "Stable Diffusion", lessons: 10, hours: 4, progress: 0, emoji: "🎨" },
];

export function MasteryPaths() {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-foreground">Your Mastery path</h2>
        <button className="text-sm text-primary font-medium hover:underline flex items-center gap-1">
          View All <ArrowRight size={14} />
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {masteryPaths.map((path) => (
          <div
            key={path.title}
            className="bg-card rounded-2xl border border-border p-4 card-elevated cursor-pointer"
          >
            <div className="w-full aspect-square rounded-xl bg-muted flex items-center justify-center text-3xl mb-3">
              {path.emoji}
            </div>
            <h4 className="font-semibold text-sm text-foreground">{path.title}</h4>
            <p className="text-xs text-muted-foreground mt-0.5">
              {path.lessons} lessons · {path.hours}h
            </p>
            <Progress value={path.progress} className="h-1 mt-2.5" />
          </div>
        ))}
      </div>
    </section>
  );
}
