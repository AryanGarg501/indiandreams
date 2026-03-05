import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const quizData = [
  {
    question: "What is your age?",
    subtitle: "We will personalize your AI challenge based on your answers",
    options: ["18-24", "25-34", "35-44", "45+"],
  },
  {
    question: "What is your experience with AI?",
    subtitle: "This helps us tailor the difficulty level",
    options: ["Complete beginner", "Some experience", "Intermediate", "Advanced"],
  },
  {
    question: "What is your primary goal?",
    subtitle: "We'll focus your challenge around this",
    options: ["Learn AI basics", "Boost productivity", "Career growth", "Build AI projects"],
  },
  {
    question: "How much time can you dedicate daily?",
    subtitle: "We'll adjust the challenge intensity",
    options: ["15 minutes", "30 minutes", "1 hour", "2+ hours"],
  },
  {
    question: "Which area interests you the most?",
    subtitle: "Pick the one that excites you",
    options: ["Content creation", "Data analysis", "Automation", "Design & creativity"],
  },
];

const totalSteps = quizData.length;

const QuizSteps = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const current = quizData[currentStep];
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const handleSelect = (option: string) => {
    const newAnswers = [...answers];
    newAnswers[currentStep] = option;
    setAnswers(newAnswers);

    if (currentStep < totalSteps - 1) {
      setTimeout(() => setCurrentStep(currentStep + 1), 300);
    } else {
      setTimeout(() => navigate("/signup"), 300);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate("/quiz");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="py-4 px-4 flex items-center justify-between">
        <button onClick={handleBack} className="p-1 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft size={24} />
        </button>
        <Link to="/" className="font-display text-2xl font-bold text-gradient">
          Indian Dreams
        </Link>
        <span className="text-sm text-muted-foreground">
          {currentStep + 1} / {totalSteps}
        </span>
      </header>

      {/* Progress bar */}
      <div className="w-full h-1 bg-muted">
        <motion.div
          className="h-full bg-hero-gradient"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-lg flex flex-col items-center"
          >
            <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground text-center tracking-tight mb-2">
              {current.question}
            </h1>
            <p className="text-muted-foreground text-center mb-10">
              {current.subtitle}
            </p>

            <div className="flex flex-col gap-3 w-full">
              {current.options.map((option, i) => (
                <motion.button
                  key={option}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => handleSelect(option)}
                  className={`w-full py-5 px-6 rounded-xl text-center font-medium transition-all duration-200 border-2 ${
                    answers[currentStep] === option
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-transparent bg-muted/60 text-foreground hover:bg-muted hover:border-border"
                  }`}
                >
                  {option}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default QuizSteps;
