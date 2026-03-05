import { Link, useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import quizCompany from "@/assets/quiz-company.jpg";
import quizMyself from "@/assets/quiz-myself.jpg";

const options = [
  { label: "I work for a company", image: quizCompany },
  { label: "I work for myself", image: quizMyself },
];

const Quiz = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border py-4 px-4 flex items-center justify-center">
        <Link to="/" className="font-display text-2xl font-bold text-gradient">
          Indian Dreams
        </Link>
      </header>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-3xl md:text-4xl font-bold text-foreground text-center tracking-tight mb-4"
        >
          28-DAY AI CHALLENGE
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground text-lg text-center mb-10"
        >
          How would you describe yourself?
        </motion.p>

        <div className="flex flex-col sm:flex-row gap-6 w-full max-w-lg">
          {options.map((option, i) => (
            <motion.button
              key={option.label}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              onClick={() => navigate("/login")}
              className="group relative flex-1 rounded-xl border-2 border-border hover:border-primary overflow-hidden transition-all duration-300 bg-card cursor-pointer"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={option.image}
                  alt={option.label}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-hero-gradient p-4 flex items-center justify-between">
                <span className="text-primary-foreground font-semibold text-sm">
                  {option.label}
                </span>
                <ChevronRight className="text-primary-foreground" size={20} />
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="py-6 px-4 text-center space-y-2">
        <p className="text-xs text-muted-foreground">
          By proceeding, you agree with{" "}
          <a href="#" className="underline hover:text-foreground">Terms and Conditions</a>,{" "}
          <a href="#" className="underline hover:text-foreground">Privacy Policy</a>,{" "}
          <a href="#" className="underline hover:text-foreground">Subscription Terms</a>
        </p>
        <p className="text-xs text-muted-foreground">Indian Dreams Corp, India</p>
      </footer>
    </div>
  );
};

export default Quiz;
