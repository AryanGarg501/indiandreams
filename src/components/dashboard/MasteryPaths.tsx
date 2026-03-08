import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { coursesData } from "@/data/coursesData";

const masteryPaths = [
  { title: "Claude", slug: "claude", lessons: 10, hours: 5, emoji: "🤖" },
  { title: "Gemini", slug: "gemini", lessons: 10, hours: 4, emoji: "💎" },
  { title: "ChatGPT", slug: "chatgpt", lessons: 13, hours: 6, emoji: "🧠" },
  { title: "Jasper AI", slug: "jasper-ai", lessons: 10, hours: 5, emoji: "✍️" },
  { title: "Stable Diffusion", slug: "stable-diffusion", lessons: 10, hours: 4, emoji: "🎨" },
];

export function MasteryPaths() {
  const [progressMap, setProgressMap] = useState<Record<string, number>>({});

  useEffect(() => {
    const fetchProgress = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { data: progress } = await supabase
        .from("lesson_progress")
        .select("course_id, lesson_id")
        .eq("user_id", session.user.id);

      if (!progress) return;

      const byCourse: Record<string, Set<string>> = {};
      for (const p of progress) {
        if (!byCourse[p.course_id]) byCourse[p.course_id] = new Set();
        byCourse[p.course_id].add(p.lesson_id);
      }

      const map: Record<string, number> = {};
      for (const [courseId, lessons] of Object.entries(byCourse)) {
        const course = coursesData[courseId];
        if (course) {
          map[courseId] = Math.round((lessons.size / course.totalLessons) * 100);
        }
      }
      setProgressMap(map);
    };
    fetchProgress();
  }, []);

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-foreground">Your Mastery path</h2>
        <Link to="/guides" className="text-sm text-primary font-medium hover:underline flex items-center gap-1">
          View All <ArrowRight size={14} />
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {masteryPaths.map((path) => (
          <Link
            to={`/guide-pathway/${path.slug}`}
            key={path.title}
            className="bg-card rounded-2xl border border-border p-4 card-elevated cursor-pointer block hover:border-primary/30 transition-colors"
          >
            <div className="w-full aspect-square rounded-xl bg-muted flex items-center justify-center text-3xl mb-3">
              {path.emoji}
            </div>
            <h4 className="font-semibold text-sm text-foreground">{path.title}</h4>
            <p className="text-xs text-muted-foreground mt-0.5">
              {path.lessons} lessons · {path.hours}h
            </p>
            <Progress value={progressMap[path.slug] || 0} className="h-1 mt-2.5" />
            <p className="text-xs text-muted-foreground mt-1">
              {progressMap[path.slug] || 0}% complete
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
