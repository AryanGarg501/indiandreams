import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, BookOpen, Lock, PlayCircle, ChevronRight } from "lucide-react";

const coursesData: Record<string, {
  title: string;
  emoji: string;
  description: string;
  totalLessons: number;
  totalHours: number;
  modules: {
    title: string;
    lessons: { title: string; duration: string }[];
  }[];
}> = {
  claude: {
    title: "Claude",
    emoji: "🤖",
    description: "Master Claude AI — from fundamentals to advanced prompt engineering and real-world applications.",
    totalLessons: 10,
    totalHours: 5,
    modules: [
      {
        title: "Getting Started with Claude",
        lessons: [
          { title: "Introduction to Claude AI", duration: "8 min" },
          { title: "Setting Up Your Workspace", duration: "12 min" },
          { title: "Your First Conversation", duration: "15 min" },
        ],
      },
      {
        title: "Prompt Engineering Basics",
        lessons: [
          { title: "Understanding Prompt Structure", duration: "20 min" },
          { title: "Role-Based Prompting", duration: "18 min" },
          { title: "Chain of Thought Techniques", duration: "22 min" },
        ],
      },
      {
        title: "Advanced Techniques",
        lessons: [
          { title: "System Prompts Mastery", duration: "25 min" },
          { title: "Multi-Turn Conversations", duration: "20 min" },
          { title: "Claude for Content Creation", duration: "30 min" },
          { title: "Building AI Workflows", duration: "35 min" },
        ],
      },
    ],
  },
  gemini: {
    title: "Gemini",
    emoji: "💎",
    description: "Unlock the power of Google's Gemini AI — multimodal capabilities, integrations, and advanced use cases.",
    totalLessons: 10,
    totalHours: 4,
    modules: [
      {
        title: "Gemini Fundamentals",
        lessons: [
          { title: "What is Gemini?", duration: "10 min" },
          { title: "Gemini vs Other AI Models", duration: "12 min" },
          { title: "Multimodal Capabilities", duration: "18 min" },
        ],
      },
      {
        title: "Working with Gemini",
        lessons: [
          { title: "Text Generation Mastery", duration: "20 min" },
          { title: "Image Analysis with Gemini", duration: "22 min" },
          { title: "Code Generation", duration: "25 min" },
        ],
      },
      {
        title: "Gemini Pro Tips",
        lessons: [
          { title: "Google Workspace Integration", duration: "15 min" },
          { title: "API Access & Automation", duration: "30 min" },
          { title: "Building with Gemini API", duration: "28 min" },
          { title: "Real-World Projects", duration: "35 min" },
        ],
      },
    ],
  },
  chatgpt: {
    title: "ChatGPT",
    emoji: "🧠",
    description: "Become a ChatGPT power user — from basics to GPTs, plugins, and professional workflows.",
    totalLessons: 13,
    totalHours: 6,
    modules: [
      {
        title: "ChatGPT Essentials",
        lessons: [
          { title: "Getting Started with ChatGPT", duration: "8 min" },
          { title: "Understanding GPT Models", duration: "15 min" },
          { title: "Effective Prompting", duration: "20 min" },
        ],
      },
      {
        title: "Intermediate Skills",
        lessons: [
          { title: "Custom Instructions", duration: "18 min" },
          { title: "Using GPT-4 Vision", duration: "22 min" },
          { title: "Data Analysis with ChatGPT", duration: "25 min" },
          { title: "Writing & Editing", duration: "20 min" },
        ],
      },
      {
        title: "Advanced & Custom GPTs",
        lessons: [
          { title: "Building Custom GPTs", duration: "30 min" },
          { title: "API Integration", duration: "28 min" },
          { title: "Plugins & Extensions", duration: "22 min" },
          { title: "ChatGPT for Business", duration: "25 min" },
          { title: "Automation Workflows", duration: "30 min" },
          { title: "Final Project", duration: "45 min" },
        ],
      },
    ],
  },
  "jasper-ai": {
    title: "Jasper AI",
    emoji: "✍️",
    description: "Learn Jasper AI for content marketing — copywriting, brand voice, and campaign management.",
    totalLessons: 10,
    totalHours: 5,
    modules: [
      {
        title: "Jasper Basics",
        lessons: [
          { title: "Introduction to Jasper", duration: "10 min" },
          { title: "Setting Up Brand Voice", duration: "15 min" },
          { title: "Templates Overview", duration: "12 min" },
        ],
      },
      {
        title: "Content Creation",
        lessons: [
          { title: "Blog Post Writing", duration: "25 min" },
          { title: "Social Media Content", duration: "20 min" },
          { title: "Ad Copy Generation", duration: "18 min" },
          { title: "Email Marketing", duration: "22 min" },
        ],
      },
      {
        title: "Advanced Jasper",
        lessons: [
          { title: "Jasper Chat & Commands", duration: "20 min" },
          { title: "Team Collaboration", duration: "15 min" },
          { title: "Campaign Workflows", duration: "30 min" },
        ],
      },
    ],
  },
  "stable-diffusion": {
    title: "Stable Diffusion",
    emoji: "🎨",
    description: "Create stunning AI art with Stable Diffusion — prompting, models, and creative workflows.",
    totalLessons: 10,
    totalHours: 4,
    modules: [
      {
        title: "AI Art Fundamentals",
        lessons: [
          { title: "What is Stable Diffusion?", duration: "10 min" },
          { title: "Installation & Setup", duration: "20 min" },
          { title: "Your First Image", duration: "15 min" },
        ],
      },
      {
        title: "Prompt Crafting",
        lessons: [
          { title: "Positive & Negative Prompts", duration: "22 min" },
          { title: "Style Keywords & Modifiers", duration: "18 min" },
          { title: "Aspect Ratios & Resolution", duration: "15 min" },
        ],
      },
      {
        title: "Advanced Generation",
        lessons: [
          { title: "ControlNet & img2img", duration: "30 min" },
          { title: "LoRA & Model Fine-Tuning", duration: "35 min" },
          { title: "Inpainting & Outpainting", duration: "25 min" },
          { title: "Creative Portfolio Project", duration: "40 min" },
        ],
      },
    ],
  },
};

const GuidePathway = () => {
  const navigate = useNavigate();
  const { courseId } = useParams<{ courseId: string }>();
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { navigate("/login"); return; }
      setUserName(session.user.user_metadata?.full_name || session.user.email || "Learner");
      setLoading(false);
    };
    checkAuth();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) navigate("/login");
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const course = coursesData[courseId || ""] || coursesData.claude;

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <DashboardSidebar userName={userName} onLogout={handleLogout} />

        <div className="flex-1 flex flex-col min-w-0">
          <header className="sticky top-0 z-40 h-14 flex items-center gap-3 border-b border-border bg-card/80 backdrop-blur-sm px-4 md:px-6">
            <SidebarTrigger className="md:hidden" />
            <Link to="/dashboard" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft size={16} />
              <span className="hidden sm:inline">Back to Dashboard</span>
            </Link>
          </header>

          <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
            <div className="max-w-3xl mx-auto space-y-6">
              {/* Course Header */}
              <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center text-4xl shrink-0">
                    {course.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h1 className="text-2xl font-bold text-foreground">{course.title}</h1>
                    <p className="text-muted-foreground mt-1 text-sm leading-relaxed">{course.description}</p>
                    <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><BookOpen size={14} /> {course.totalLessons} lessons</span>
                      <span className="flex items-center gap-1"><Clock size={14} /> {course.totalHours} hours</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="font-medium text-foreground">0 of {course.totalLessons} completed</span>
                    <span className="font-semibold text-primary">0%</span>
                  </div>
                  <Progress value={0} className="h-2" />
                </div>
              </div>

              {/* Modules */}
              {course.modules.map((module, moduleIdx) => (
                <div key={moduleIdx} className="space-y-1">
                  <div className="flex items-center justify-between px-1 mb-3">
                    <h2 className="text-lg font-bold text-foreground">
                      Module {moduleIdx + 1}: {module.title}
                    </h2>
                    <span className="text-xs text-muted-foreground font-medium">
                      0/{module.lessons.length}
                    </span>
                  </div>

                  <div className="bg-card rounded-2xl border border-border overflow-hidden divide-y divide-border">
                    {module.lessons.map((lesson, lessonIdx) => {
                      // Only first lesson of first module is unlocked for new users
                      const isFirstLesson = moduleIdx === 0 && lessonIdx === 0;
                      const isLocked = !isFirstLesson;
                      return (
                        <button
                          key={lessonIdx}
                          disabled={isLocked}
                          className={`w-full flex items-center gap-3 px-4 py-3.5 text-left transition-colors group
                            ${isLocked ? "opacity-50 cursor-not-allowed" : "hover:bg-muted/50 cursor-pointer bg-primary/5"}
                          `}
                        >
                          <div className="shrink-0">
                            {isFirstLesson ? (
                              <PlayCircle size={20} className="text-primary" />
                            ) : (
                              <Lock size={18} className="text-muted-foreground" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground">
                              {lesson.title}
                            </p>
                          </div>
                          <span className="text-xs text-muted-foreground shrink-0">{lesson.duration}</span>
                          {!isLocked && (
                            <ChevronRight size={16} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              {/* Start Button */}
              <div className="flex justify-center pt-2 pb-8">
                <Button size="lg" className="rounded-xl px-8 font-semibold">
                  <PlayCircle size={18} />
                  Start Learning
                </Button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default GuidePathway;
