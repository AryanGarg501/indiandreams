import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export function CurrentCourseCard() {
  return (
    <div className="bg-card rounded-2xl border border-border p-6 card-elevated">
      <div className="flex items-start gap-4 mb-5">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-2xl shrink-0">
          🎨
        </div>
        <div className="min-w-0">
          <h3 className="text-base font-bold text-foreground">Midjourney</h3>
          <p className="text-sm text-primary font-medium">Viewpoint</p>
        </div>
      </div>
      <Progress value={33} className="h-2 mb-2" />
      <p className="text-xs text-muted-foreground mb-5">4/12 lessons completed · 33%</p>
      <div className="flex gap-3">
        <Button variant="outline" size="sm" className="flex-1 rounded-xl">
          Other guides
        </Button>
        <Button variant="hero" size="sm" className="flex-1 rounded-xl">
          Continue learning
        </Button>
      </div>
    </div>
  );
}
