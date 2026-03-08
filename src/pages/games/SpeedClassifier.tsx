import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, RotateCcw, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";

interface Tool {
  name: string;
  category: "Text" | "Image" | "Code" | "Audio" | "Video";
}

const allTools: Tool[] = [
  { name: "ChatGPT", category: "Text" },
  { name: "Claude", category: "Text" },
  { name: "Gemini", category: "Text" },
  { name: "DALL·E", category: "Image" },
  { name: "Midjourney", category: "Image" },
  { name: "Stable Diffusion", category: "Image" },
  { name: "GitHub Copilot", category: "Code" },
  { name: "Cursor", category: "Code" },
  { name: "Replit AI", category: "Code" },
  { name: "ElevenLabs", category: "Audio" },
  { name: "Murf AI", category: "Audio" },
  { name: "Whisper", category: "Audio" },
  { name: "Runway", category: "Video" },
  { name: "Pika", category: "Video" },
  { name: "Synthesia", category: "Video" },
  { name: "Jasper AI", category: "Text" },
  { name: "Firefly", category: "Image" },
  { name: "Tabnine", category: "Code" },
  { name: "Suno", category: "Audio" },
  { name: "HeyGen", category: "Video" },
];

const categories: Tool["category"][] = ["Text", "Image", "Code", "Audio", "Video"];
const categoryEmoji: Record<string, string> = { Text: "💬", Image: "🎨", Code: "💻", Audio: "🎵", Video: "🎬" };

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const GAME_TIME = 45;

const SpeedClassifier = () => {
  const navigate = useNavigate();
  const [tools, setTools] = useState<Tool[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_TIME);
  const [gameOver, setGameOver] = useState(false);
  const [started, setStarted] = useState(false);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval>>();

  const startGame = () => {
    setTools(shuffle(allTools));
    setCurrentIdx(0);
    setScore(0);
    setWrong(0);
    setTimeLeft(GAME_TIME);
    setGameOver(false);
    setStarted(true);
    setFeedback(null);
  };

  useEffect(() => {
    if (!started || gameOver) return;
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          setGameOver(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [started, gameOver]);

  const handleClassify = useCallback((category: Tool["category"]) => {
    if (gameOver || currentIdx >= tools.length) return;
    const isCorrect = tools[currentIdx].category === category;
    if (isCorrect) {
      setScore((s) => s + 1);
      setFeedback("correct");
    } else {
      setWrong((w) => w + 1);
      setFeedback("wrong");
    }
    setTimeout(() => {
      setFeedback(null);
      if (currentIdx + 1 >= tools.length) {
        setGameOver(true);
        clearInterval(timerRef.current);
      } else {
        setCurrentIdx((i) => i + 1);
      }
    }, 300);
  }, [gameOver, currentIdx, tools]);

  const tool = tools[currentIdx];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 h-14 flex items-center justify-between border-b border-border bg-card/80 backdrop-blur-sm px-4 md:px-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate("/mini-games")}>
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-lg font-bold text-foreground">⚡ Speed Classifier</h1>
        </div>
        {started && !gameOver && (
          <div className="flex items-center gap-2">
            <Timer size={16} className={timeLeft <= 10 ? "text-destructive" : "text-muted-foreground"} />
            <span className={`text-sm font-bold ${timeLeft <= 10 ? "text-destructive" : "text-foreground"}`}>{timeLeft}s</span>
          </div>
        )}
      </header>

      <main className="max-w-lg mx-auto p-4 md:p-8">
        {!started ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-12">
            <div className="text-6xl mb-4">⚡</div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Speed Classifier</h2>
            <p className="text-muted-foreground mb-2">Classify AI tools into their category as fast as you can!</p>
            <p className="text-sm text-muted-foreground mb-8">You have {GAME_TIME} seconds. Ready?</p>
            <Button variant="hero" onClick={startGame} className="rounded-xl text-lg px-8 py-3">Start!</Button>
          </motion.div>
        ) : gameOver ? (
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-12">
            <div className="text-6xl mb-4">{score >= 15 ? "🏆" : score >= 10 ? "🔥" : "⚡"}</div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Time's Up!</h2>
            <div className="flex justify-center gap-6 mb-4">
              <div>
                <p className="text-3xl font-bold text-green-600">{score}</p>
                <p className="text-xs text-muted-foreground">Correct</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-destructive">{wrong}</p>
                <p className="text-xs text-muted-foreground">Wrong</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-8">
              {score >= 15 ? "Lightning fast! You really know your AI tools." : score >= 10 ? "Quick thinker! Keep improving." : "Keep practicing to get faster!"}
            </p>
            <div className="flex gap-3 justify-center">
              <Button variant="hero" onClick={startGame} className="rounded-xl gap-2"><RotateCcw size={16} /> Play Again</Button>
              <Button variant="outline" onClick={() => navigate("/mini-games")} className="rounded-xl">Back to Games</Button>
            </div>
          </motion.div>
        ) : tool ? (
          <div>
            <Progress value={(timeLeft / GAME_TIME) * 100} className="h-1.5 mb-6" />
            <div className="text-center mb-2">
              <span className="text-xs text-muted-foreground">Score: {score} correct · {wrong} wrong</span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentIdx}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className={`text-center py-8 px-4 rounded-2xl border-2 mb-6 transition-colors ${
                  feedback === "correct" ? "border-green-500 bg-green-500/10" :
                  feedback === "wrong" ? "border-destructive bg-destructive/10" :
                  "border-border bg-card"
                }`}
              >
                <h2 className="text-3xl font-bold text-foreground">{tool.name}</h2>
                <p className="text-sm text-muted-foreground mt-1">What type of AI tool is this?</p>
              </motion.div>
            </AnimatePresence>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleClassify(cat)}
                  className="p-4 rounded-xl border-2 border-border bg-card hover:border-primary/40 hover:bg-primary/5 active:scale-95 transition-all text-center"
                >
                  <span className="text-2xl block mb-1">{categoryEmoji[cat]}</span>
                  <span className="text-sm font-semibold text-foreground">{cat}</span>
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </main>
    </div>
  );
};

export default SpeedClassifier;
