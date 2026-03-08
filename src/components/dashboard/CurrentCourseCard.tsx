import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { coursesData } from "@/data/coursesData";

interface CourseProgress {
  courseId: string;
  title: string;
  emoji: string;
  completedLessons: number;
  totalLessons: number;
  percent: number;
}

export function CurrentCourseCard() {
  const navigate = useNavigate();
  const [course, setCourse] = useState<CourseProgress | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgress = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { setLoading(false); return; }

      const { data: progress } = await supabase
        .from("lesson_progress")
        .select("course_id, lesson_id")
        .eq("user_id", session.user.id);

      if (!progress || progress.length === 0) { setLoading(false); return; }

      // Group by course and find the one with most recent activity (most lessons)
      const byCourse: Record<string, Set<string>> = {};
      for (const p of progress) {
        if (!byCourse[p.course_id]) byCourse[p.course_id] = new Set();
        byCourse[p.course_id].add(p.lesson_id);
      }

      // Pick course with most progress (or first started)
      let best: CourseProgress | null = null;
      for (const [courseId, lessons] of Object.entries(byCourse)) {
        const courseData = coursesData[courseId];
        if (!courseData) continue;
        const total = courseData.totalLessons;
        const completed = lessons.size;
        const percent = Math.round((completed / total) * 100);
        if (!best || (percent < 100 && completed > (best.percent < 100 ? best.completedLessons : 0))) {
          best = { courseId, title: courseData.title, emoji: courseData.emoji, completedLessons: completed, totalLessons: total, percent };
        }
      }

      setCourse(best);
      setLoading(false);
    };
    fetchProgress();
  }, []);

  if (loading) {
    return (
      <div className="bg-card rounded-2xl border border-border p-6 card-elevated flex items-center justify-center min-h-[180px]">
        <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="bg-card rounded-2xl border border-border p-6 card-elevated">
        <div className="flex items-start gap-4 mb-5">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-2xl shrink-0">
            🎯
          </div>
          <div className="min-w-0">
            <h3 className="text-base font-bold text-foreground">No course started</h3>
            <p className="text-sm text-muted-foreground">Pick a guide to begin</p>
          </div>
        </div>
        <Progress value={0} className="h-2 mb-2" />
        <p className="text-xs text-muted-foreground mb-5">0 lessons completed · 0%</p>
        <div className="flex gap-3">
          <Button variant="hero" size="sm" className="flex-1 rounded-xl" onClick={() => navigate("/guides")}>
            Browse guides
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-2xl border border-border p-6 card-elevated">
      <div className="flex items-start gap-4 mb-5">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-2xl shrink-0">
          {course.emoji}
        </div>
        <div className="min-w-0">
          <h3 className="text-base font-bold text-foreground">{course.title}</h3>
          <p className="text-sm text-muted-foreground">
            {course.percent === 100 ? "Completed! 🎉" : "In progress"}
          </p>
        </div>
      </div>
      <Progress value={course.percent} className="h-2 mb-2" />
      <p className="text-xs text-muted-foreground mb-5">
        {course.completedLessons} of {course.totalLessons} lessons completed · {course.percent}%
      </p>
      <div className="flex gap-3">
        <Button variant="hero" size="sm" className="flex-1 rounded-xl" onClick={() => navigate(`/guide-pathway/${course.courseId}`)}>
          {course.percent === 100 ? "View course" : "Continue learning"}
        </Button>
      </div>
    </div>
  );
}
