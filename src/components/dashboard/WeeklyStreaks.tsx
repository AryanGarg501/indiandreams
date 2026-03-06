import { CheckCircle2, Circle } from "lucide-react";

const weekDays = ["Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Mon"];

export function WeeklyStreaks() {
  return (
    <div className="bg-card rounded-2xl border border-border p-6 card-elevated">
      <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">
        Weekly Streaks
      </p>
      <h3 className="text-base font-bold text-foreground mb-5">
        Help you build learning habit
      </h3>
      <div className="flex items-center justify-between mb-4">
        {weekDays.map((day, i) => (
          <div key={day} className="flex flex-col items-center gap-2">
            {i === 0 ? (
              <CheckCircle2 size={28} className="text-green-500" />
            ) : i === 2 ? (
              <div className="w-7 h-7 rounded-full border-2 border-primary flex items-center justify-center">
                <Circle size={8} className="text-primary fill-primary" />
              </div>
            ) : (
              <Circle size={28} className="text-border" />
            )}
            <span className="text-xs text-muted-foreground font-medium">{day}</span>
          </div>
        ))}
      </div>
      <p className="text-sm text-muted-foreground">
        Finish <span className="font-semibold text-primary">1 lesson</span> to begin your streak
      </p>
    </div>
  );
}
