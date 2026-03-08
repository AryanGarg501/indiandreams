import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, RotateCcw, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { motion, AnimatePresence } from "framer-motion";

interface Challenge {
  id: number;
  targetOutput: string;
  category: string;
  idealPrompt: string;
  keywords: string[];
  tips: string;
}

const challenges: Challenge[] = [
  {
    id: 1,
    category: "Email Writing",
    targetOutput: "Subject: Quick sync on Project Atlas?\n\nHi team,\n\nJust wanted to flag that we're behind on the design deliverables for Sprint 4. Can we do a 15-min standup tomorrow at 10am to realign? I'll prep a quick status doc.\n\nThanks,\nAlex",
    idealPrompt: "Write a brief, casual work email asking the team for a quick sync meeting about project delays",
    keywords: ["email", "meeting", "brief", "casual", "team", "project", "sync", "short"],
    tips: "Focus on tone (casual, professional), format (email), and purpose (meeting request about delays).",
  },
  {
    id: 2,
    category: "Creative Writing",
    targetOutput: "The lighthouse keeper hadn't seen a ship in forty years. So when the radio crackled to life at 3 AM with a child's voice asking for directions home, he did what anyone would do — he lied and said help was coming.",
    idealPrompt: "Write a dark, atmospheric micro-fiction story about a lonely lighthouse keeper receiving a mysterious radio transmission",
    keywords: ["story", "lighthouse", "dark", "short", "mysterious", "fiction", "atmospheric", "radio"],
    tips: "Mention the genre (dark/atmospheric), format (micro-fiction/short story), setting (lighthouse), and the key plot element.",
  },
  {
    id: 3,
    category: "Code Generation",
    targetOutput: "function debounce(fn, delay) {\n  let timer;\n  return (...args) => {\n    clearTimeout(timer);\n    timer = setTimeout(() => fn(...args), delay);\n  };\n}",
    idealPrompt: "Write a simple JavaScript debounce utility function that delays execution",
    keywords: ["javascript", "debounce", "function", "utility", "delay", "simple", "code"],
    tips: "Specify the language, the pattern name (debounce), and that you want a clean, simple implementation.",
  },
  {
    id: 4,
    category: "Data Analysis",
    targetOutput: "Key Findings:\n• Revenue grew 23% YoY, driven primarily by the enterprise segment (+41%)\n• Customer churn decreased from 8.2% to 5.1% after the onboarding redesign\n• Top risk: 67% of revenue concentrated in 3 accounts\n\nRecommendation: Diversify client base while doubling down on enterprise growth.",
    idealPrompt: "Summarize business metrics into key findings with a recommendation, in bullet-point format",
    keywords: ["summary", "business", "metrics", "findings", "bullet", "recommendation", "analysis", "key"],
    tips: "Ask for a structured format (bullet points), include that you want findings AND a recommendation.",
  },
];

function scorePrompt(input: string, challenge: Challenge): number {
  const lower = input.toLowerCase();
  const matched = challenge.keywords.filter((kw) => lower.includes(kw));
  const keywordScore = Math.min((matched.length / challenge.keywords.length) * 70, 70);
  const lengthScore = input.length > 15 && input.length < 300 ? 15 : 5;
  const specificityBonus = input.split(" ").length >= 6 ? 15 : input.split(" ").length >= 3 ? 10 : 0;
  return Math.min(Math.round(keywordScore + lengthScore + specificityBonus), 100);
}

const PromptChallenge = () => {
  const navigate = useNavigate();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [input, setInput] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const challenge = challenges[currentIdx];

  const handleSubmit = () => {
    if (!input.trim() || submitted) return;
    const s = scorePrompt(input, challenge);
    setScore(s);
    setTotalScore((t) => t + s);
    setSubmitted(true);
  };

  const handleNext = () => {
    if (currentIdx + 1 >= challenges.length) {
      setGameOver(true);
    } else {
      setCurrentIdx((i) => i + 1);
      setInput("");
      setSubmitted(false);
      setScore(0);
    }
  };

  const restart = () => {
    setCurrentIdx(0);
    setInput("");
    setSubmitted(false);
    setScore(0);
    setTotalScore(0);
    setGameOver(false);
  };

  const avgScore = Math.round(totalScore / challenges.length);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 h-14 flex items-center justify-between border-b border-border bg-card/80 backdrop-blur-sm px-4 md:px-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate("/mini-games")}>
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-lg font-bold text-foreground">✍️ Prompt Challenge</h1>
        </div>
        <span className="text-sm font-semibold text-muted-foreground">{currentIdx + 1}/{challenges.length}</span>
      </header>

      <main className="max-w-2xl mx-auto p-4 md:p-8">
        {gameOver ? (
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-12">
            <div className="text-6xl mb-4">{avgScore >= 70 ? "🏆" : avgScore >= 40 ? "💪" : "📝"}</div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Challenge Complete!</h2>
            <p className="text-lg text-muted-foreground mb-1">Average score: <span className="text-primary font-bold">{avgScore}/100</span></p>
            <p className="text-sm text-muted-foreground mb-8">
              {avgScore >= 70 ? "Excellent prompt engineer!" : avgScore >= 40 ? "Getting there — practice makes perfect!" : "Keep practicing your prompt skills!"}
            </p>
            <div className="flex gap-3 justify-center">
              <Button variant="hero" onClick={restart} className="rounded-xl gap-2"><RotateCcw size={16} /> Play Again</Button>
              <Button variant="outline" onClick={() => navigate("/mini-games")} className="rounded-xl">Back to Games</Button>
            </div>
          </motion.div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div key={challenge.id} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
              <span className="text-xs font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-full">{challenge.category}</span>
              <h2 className="text-xl font-bold text-foreground mt-3 mb-2">Recreate this output</h2>
              <p className="text-sm text-muted-foreground mb-4">Write a prompt that would produce something like the text below:</p>

              <div className="bg-muted/50 border border-border rounded-xl p-4 mb-6">
                <pre className="text-sm text-foreground whitespace-pre-wrap font-mono leading-relaxed">{challenge.targetOutput}</pre>
              </div>

              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Write your prompt here..."
                className="min-h-[100px] rounded-xl resize-none mb-3"
                disabled={submitted}
              />

              {!submitted ? (
                <Button variant="hero" onClick={handleSubmit} disabled={!input.trim()} className="w-full rounded-xl gap-2">
                  <Send size={16} /> Submit Prompt
                </Button>
              ) : (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <div className={`rounded-xl p-4 mb-4 border-2 ${score >= 70 ? "border-green-500 bg-green-500/5" : score >= 40 ? "border-accent bg-accent/5" : "border-destructive/50 bg-destructive/5"}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-foreground">Score: {score}/100</span>
                      <span className="text-2xl">{score >= 70 ? "🎯" : score >= 40 ? "👍" : "💡"}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2"><strong>Ideal prompt:</strong> "{challenge.idealPrompt}"</p>
                    <p className="text-sm text-muted-foreground"><strong>Tip:</strong> {challenge.tips}</p>
                  </div>
                  <Button variant="hero" onClick={handleNext} className="w-full rounded-xl">
                    {currentIdx + 1 >= challenges.length ? "See Results" : "Next Challenge →"}
                  </Button>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </main>
    </div>
  );
};

export default PromptChallenge;
