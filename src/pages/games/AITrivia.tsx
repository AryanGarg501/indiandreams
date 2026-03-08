import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: "What does 'GPT' stand for?",
    options: ["General Processing Tool", "Generative Pre-trained Transformer", "Global Pattern Technology", "Graphical Prompt Tokenizer"],
    correct: 1,
    explanation: "GPT stands for Generative Pre-trained Transformer, a type of large language model developed by OpenAI.",
  },
  {
    id: 2,
    question: "Which company created the Claude AI assistant?",
    options: ["OpenAI", "Google DeepMind", "Anthropic", "Meta AI"],
    correct: 2,
    explanation: "Claude was created by Anthropic, a company focused on AI safety research.",
  },
  {
    id: 3,
    question: "What is 'hallucination' in AI?",
    options: ["When AI creates images", "When AI generates false information confidently", "When AI stops responding", "When AI processes too slowly"],
    correct: 1,
    explanation: "AI hallucination occurs when a model generates plausible-sounding but factually incorrect or fabricated information.",
  },
  {
    id: 4,
    question: "Which AI model is known for generating images from text prompts?",
    options: ["BERT", "DALL·E", "LLaMA", "BLOOM"],
    correct: 1,
    explanation: "DALL·E, created by OpenAI, is a text-to-image generation model that creates images from natural language descriptions.",
  },
  {
    id: 5,
    question: "What is 'prompt engineering'?",
    options: ["Building AI hardware", "Designing AI user interfaces", "Crafting effective inputs to get desired AI outputs", "Training AI models from scratch"],
    correct: 2,
    explanation: "Prompt engineering is the practice of designing and refining inputs (prompts) to effectively communicate with AI models and get desired outputs.",
  },
  {
    id: 6,
    question: "What year was ChatGPT first released to the public?",
    options: ["2020", "2021", "2022", "2023"],
    correct: 2,
    explanation: "ChatGPT was released by OpenAI on November 30, 2022, and quickly became one of the fastest-growing consumer applications.",
  },
  {
    id: 7,
    question: "What does 'RAG' stand for in AI?",
    options: ["Rapid AI Generation", "Retrieval-Augmented Generation", "Random Access Gateway", "Recursive Algorithm Graph"],
    correct: 1,
    explanation: "RAG (Retrieval-Augmented Generation) combines a retrieval system with a generative model to provide more accurate, sourced responses.",
  },
  {
    id: 8,
    question: "Which of these is NOT a real AI model?",
    options: ["Gemini", "Mistral", "NeuralForge", "LLaMA"],
    correct: 2,
    explanation: "NeuralForge is not a real AI model. Gemini is by Google, Mistral by Mistral AI, and LLaMA by Meta.",
  },
  {
    id: 9,
    question: "What is 'fine-tuning' an AI model?",
    options: ["Making it run faster", "Training it further on specific data", "Reducing its size", "Adding a user interface"],
    correct: 1,
    explanation: "Fine-tuning involves additional training of a pre-trained model on a smaller, domain-specific dataset to improve performance on particular tasks.",
  },
  {
    id: 10,
    question: "What is the 'temperature' parameter in AI models?",
    options: ["Hardware heat management", "Controls randomness of outputs", "Training speed setting", "Memory allocation"],
    correct: 1,
    explanation: "Temperature controls the randomness of AI outputs. Lower values make responses more deterministic, higher values more creative and varied.",
  },
];

const AITrivia = () => {
  const navigate = useNavigate();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const q = questions[currentIdx];

  const handleSelect = useCallback((idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === q.correct) setScore((s) => s + 1);
  }, [selected, q]);

  const handleNext = () => {
    if (currentIdx + 1 >= questions.length) {
      setGameOver(true);
    } else {
      setCurrentIdx((i) => i + 1);
      setSelected(null);
    }
  };

  const restart = () => {
    setCurrentIdx(0);
    setSelected(null);
    setScore(0);
    setGameOver(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 h-14 flex items-center justify-between border-b border-border bg-card/80 backdrop-blur-sm px-4 md:px-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate("/mini-games")}>
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-lg font-bold text-foreground">🧠 AI Trivia</h1>
        </div>
        <span className="text-sm font-semibold text-muted-foreground">{currentIdx + 1}/{questions.length}</span>
      </header>

      <main className="max-w-2xl mx-auto p-4 md:p-8">
        {gameOver ? (
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-12">
            <div className="text-6xl mb-4">{score >= 8 ? "🏆" : score >= 5 ? "🎉" : "📚"}</div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Trivia Complete!</h2>
            <p className="text-lg text-muted-foreground mb-1">You scored <span className="text-primary font-bold">{score}/{questions.length}</span></p>
            <p className="text-sm text-muted-foreground mb-8">
              {score >= 8 ? "You're an AI expert!" : score >= 5 ? "Solid knowledge — keep learning!" : "There's so much more to discover!"}
            </p>
            <div className="flex gap-3 justify-center">
              <Button variant="hero" onClick={restart} className="rounded-xl gap-2"><RotateCcw size={16} /> Play Again</Button>
              <Button variant="outline" onClick={() => navigate("/mini-games")} className="rounded-xl">Back to Games</Button>
            </div>
          </motion.div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div key={q.id} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
              <h2 className="text-xl font-bold text-foreground mb-6">{q.question}</h2>
              <div className="space-y-3">
                {q.options.map((opt, idx) => {
                  let cls = "border-border hover:border-primary/40";
                  if (selected !== null) {
                    if (idx === q.correct) cls = "border-green-500 bg-green-500/5";
                    else if (idx === selected) cls = "border-destructive bg-destructive/5";
                    else cls = "border-border opacity-50";
                  }
                  return (
                    <div
                      key={idx}
                      onClick={() => handleSelect(idx)}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${cls}`}
                    >
                      <span className="text-sm text-foreground">{opt}</span>
                    </div>
                  );
                })}
              </div>

              {selected !== null && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
                  <div className="bg-muted/50 rounded-xl p-4 mb-4">
                    <p className="text-sm text-muted-foreground">{q.explanation}</p>
                  </div>
                  <Button variant="hero" onClick={handleNext} className="w-full rounded-xl">
                    {currentIdx + 1 >= questions.length ? "See Results" : "Next Question →"}
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

export default AITrivia;
