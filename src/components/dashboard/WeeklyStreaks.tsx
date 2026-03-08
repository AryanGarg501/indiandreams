import { useEffect, useState } from "react";
import { CheckCircle2, Circle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { startOfWeek, addDays, format, isToday } from "date-fns";

export function WeeklyStreaks() {
  const [streakDays, setStreakDays] = useState<Set<string>>(new Set());
  const [currentStreak, setCurrentStreak] = useState(0);

  useEffect(() => {
    const fetchStreaks = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 }); // Monday
      const weekEnd = addDays(weekStart, 7);

      const { data } = await supabase
        .from("lesson_progress")
        .select("completed_at")
        .eq("user_id", session.user.id)
        .gte("completed_at", weekStart.toISOString())
        .lt("completed_at", weekEnd.toISOString());

      if (data) {
        const days = new Set(data.map((r) => format(new Date(r.completed_at), "yyyy-MM-dd")));
        setStreakDays(days);
        setCurrentStreak(days.size);
      }
    };

    fetchStreaks();

    const channel = supabase
      .channel("streak-updates")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "lesson_progress" }, () => {
        fetchStreaks();
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = addDays(weekStart, i);
    return {
      label: format(date, "EEE"),
      dateKey: format(date, "yyyy-MM-dd"),
      isToday: isToday(date),
    };
  });

  return (
    <div className="bg-card rounded-2xl border border-border p-6 card-elevated">
      <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">
        Weekly Streaks
      </p>
      <h3 className="text-base font-bold text-foreground mb-5">
        Help you build learning habit
      </h3>
      <div className="flex items-center justify-between mb-4">
        {weekDays.map((day) => {
          const completed = streakDays.has(day.dateKey);
          return (
            <div key={day.dateKey} className="flex flex-col items-center gap-2">
              {completed ? (
                <CheckCircle2 size={28} className="text-green-500" />
              ) : day.isToday ? (
                <div className="w-7 h-7 rounded-full border-2 border-primary flex items-center justify-center">
                  <Circle size={8} className="text-primary fill-primary" />
                </div>
              ) : (
                <Circle size={28} className="text-border" />
              )}
              <span className="text-xs text-muted-foreground font-medium">{day.label}</span>
            </div>
          );
        })}
      </div>
      <p className="text-sm text-muted-foreground">
        {currentStreak > 0 ? (
          <>🔥 <span className="font-semibold text-primary">{currentStreak} day{currentStreak > 1 ? "s" : ""}</span> streak this week!</>
        ) : (
          <>Finish <span className="font-semibold text-primary">1 lesson</span> to begin your streak</>
        )}
      </p>
    </div>
  );
}
