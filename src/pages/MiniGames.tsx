import { useNavigate } from "react-router-dom";
import { ArrowLeft, Eye, MessageSquare, Brain, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const games = [
  {
    slug: "ai-spotter",
    title: "AI Spotter",
    description: "Can you tell what's AI-generated? Look at two pieces of content and guess which one was made by AI.",
    emoji: "🔍",
    icon: Eye,
    color: "from-primary/20 to-accent/20",
    difficulty: "Easy",
  },
  {
    slug: "prompt-challenge",
    title: "Prompt Challenge",
    description: "You're given a target output — write the best prompt to recreate it. Sharpen your prompt engineering skills!",
    emoji: "✍️",
    icon: MessageSquare,
    color: "from-secondary/20 to-primary/20",
    difficulty: "Medium",
  },
  {
    slug: "ai-trivia",
    title: "AI Trivia",
    description: "Test your knowledge of AI tools, history, and concepts with rapid-fire multiple choice questions.",
    emoji: "🧠",
    icon: Brain,
    color: "from-accent/20 to-primary/20",
    difficulty: "Easy",
  },
  {
    slug: "speed-classifier",
    title: "Speed Classifier",
    description: "Race the clock! Quickly sort AI tools into their correct categories before time runs out.",
    emoji: "⚡",
    icon: Zap,
    color: "from-destructive/20 to-accent/20",
    difficulty: "Hard",
  },
];

const MiniGames = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 h-14 flex items-center border-b border-border bg-card/80 backdrop-blur-sm px-4 md:px-6">
        <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")} className="mr-3">
          <ArrowLeft size={20} />
        </Button>
        <h1 className="text-lg font-bold text-foreground">Mini Games</h1>
      </header>

      <main className="max-w-3xl mx-auto p-4 md:p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">Learn by Playing 🎮</h2>
          <p className="text-muted-foreground mt-2">Quick AI mini-games. Real knowledge. Pick a game and start playing!</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {games.map((game, i) => (
            <motion.div
              key={game.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.3 }}
              onClick={() => navigate(`/mini-games/${game.slug}`)}
              className="bg-card rounded-2xl border border-border p-6 cursor-pointer hover:border-primary/40 hover:shadow-lg transition-all group"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${game.color} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
                {game.emoji}
              </div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-lg font-bold text-foreground">{game.title}</h3>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                  game.difficulty === "Easy" ? "bg-green-500/10 text-green-600" :
                  game.difficulty === "Medium" ? "bg-accent/10 text-accent-foreground" :
                  "bg-destructive/10 text-destructive"
                }`}>
                  {game.difficulty}
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{game.description}</p>
              <Button variant="hero" size="sm" className="mt-4 rounded-xl w-full">
                Play now
              </Button>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default MiniGames;
