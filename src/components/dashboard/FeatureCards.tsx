import { Button } from "@/components/ui/button";
import { Play, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function FeatureCards() {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-secondary rounded-2xl p-6 flex items-center justify-between card-elevated">
        <div>
          <h3 className="text-lg font-bold text-secondary-foreground">Learn by Doing</h3>
          <p className="text-sm text-secondary-foreground/70 mt-1 leading-relaxed">
            Quick AI mini games.
            <br />
            Real knowledge.
          </p>
          <Button
            size="sm"
            className="mt-4 bg-accent hover:bg-accent/90 text-accent-foreground rounded-full gap-1.5 font-semibold"
            onClick={() => navigate("/mini-games")}
          >
            <Play size={14} /> Play now
          </Button>
        </div>
        <div className="text-5xl">🎮</div>
      </div>

      <div
        onClick={() => navigate("/ai-tools")}
        className="bg-card rounded-2xl border border-border p-6 flex items-center justify-between card-elevated cursor-pointer hover:border-primary/30 transition-colors"
      >
        <div>
          <h3 className="text-lg font-bold text-foreground">Prompts Library</h3>
          <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
            The Complete AI Bundle
            <br />
            is now in the app!
          </p>
        </div>
        <Sparkles size={40} className="text-primary/30" />
      </div>
    </div>
  );
}
