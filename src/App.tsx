import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import OfferPage from "./pages/OfferPage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import Quiz from "./pages/Quiz";
import QuizSteps from "./pages/QuizSteps";
import Dashboard from "./pages/Dashboard";
import Challenges from "./pages/Challenges";
import Guides from "./pages/Guides";
import AITools from "./pages/AITools";
import GuidePathway from "./pages/GuidePathway";
import LessonView from "./pages/LessonView";
import CertificateView from "./pages/CertificateView";
import ChallengeView from "./pages/ChallengeView";
import MiniGames from "./pages/MiniGames";
import AISpotter from "./pages/games/AISpotter";
import PromptChallenge from "./pages/games/PromptChallenge";
import AITrivia from "./pages/games/AITrivia";
import SpeedClassifier from "./pages/games/SpeedClassifier";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/quiz-steps" element={<QuizSteps />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/challenges" element={<Challenges />} />
          <Route path="/challenge/:challengeId" element={<ChallengeView />} />
          <Route path="/guides" element={<Guides />} />
          <Route path="/ai-tools" element={<AITools />} />
          <Route path="/guide-pathway/:courseId" element={<GuidePathway />} />
          <Route path="/lesson/:courseId/:moduleId/:lessonId" element={<LessonView />} />
          <Route path="/certificate/:certificateId" element={<CertificateView />} />
          <Route path="/mini-games" element={<MiniGames />} />
          <Route path="/mini-games/ai-spotter" element={<AISpotter />} />
          <Route path="/mini-games/prompt-challenge" element={<PromptChallenge />} />
          <Route path="/mini-games/ai-trivia" element={<AITrivia />} />
          <Route path="/mini-games/speed-classifier" element={<SpeedClassifier />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
