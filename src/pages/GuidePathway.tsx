import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, BookOpen, CheckCircle2, Lock, PlayCircle, ChevronRight } from "lucide-react";

const coursesData: Record<string, {
  title: string;
  emoji: string;
  description: string;
  totalLessons: number;
  totalHours: number;
  progress: number;
  modules: {
    title: string;
    lessons: { title: string; duration: string; completed: boolean; locked: boolean }[];
  }[];
}> = {
  claude: {
    title: "Claude",
    emoji: "🤖",
    description: "Master Claude AI — from fundamentals to advanced prompt engineering and real-world applications.",
    totalLessons: 10,
    totalHours: 5,
    progress: 20,
    modules: [
      {
        title: "Getting Started with Claude",
        lessons: [
          { title: "Introduction to Claude AI", duration: "8 min", completed: true, locked: false },
          { title: "Setting Up Your Workspace", duration: "12 min", completed: true, locked: false },
          { title: "Your First Conversation", duration: "15 min", completed: false, locked: false },
        ],
      },
      {
        title: "Prompt Engineering Basics",
        lessons: [
          { title: "Understanding Prompt Structure", duration: "20 min", completed: false, locked: false },
          { title: "Role-Based Prompting", duration: "18 min", completed: false, locked: true },
          { title: "Chain of Thought Techniques", duration: "22 min", completed: false, locked: true },
        ],
      },
      {
        title: "Advanced Techniques",
        lessons: [
          { title: "System Prompts Mastery", duration: "25 min", completed: false, locked: true },
          { title: "Multi-Turn Conversations", duration: "20 min", completed: false, locked: true },
          { title: "Claude for Content Creation", duration: "30 min", completed: false, locked: true },
          { title: "Building AI Workflows", duration: "35 min", completed: false, locked: true },
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
    progress: 35,
    modules: [
      {
        title: "Gemini Fundamentals",
        lessons: [
          { title: "What is Gemini?", duration: "10 min", completed: true, locked: false },
          { title: "Gemini vs Other AI Models", duration: "12 min", completed: true, locked: false },
          { title: "Multimodal Capabilities", duration: "18 min", completed: true, locked: false },
        ],
      },
      {
        title: "Working with Gemini",
        lessons: [
          { title: "Text Generation Mastery", duration: "20 min", completed: true, locked: false },
          { title: "Image Analysis with Gemini", duration: "22 min", completed: false, locked: false },
          { title: "Code Generation", duration: "25 min", completed: false, locked: true },
        ],
      },
      {
        title: "Gemini Pro Tips",
        lessons: [
          { title: "Google Workspace Integration", duration: "15 min", completed: false, locked: true },
          { title: "API Access & Automation", duration: "30 min", completed: false, locked: true },
          { title: "Building with Gemini API", duration: "28 min", completed: false, locked: true },
          { title: "Real-World Projects", duration: "35 min", completed: false, locked: true },
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
    progress: 50,
    modules: [
      {
        title: "ChatGPT Essentials",
        lessons: [
          { title: "Getting Started with ChatGPT", duration: "8 min", completed: true, locked: false },
          { title: "Understanding GPT Models", duration: "15 min", completed: true, locked: false },
          { title: "Effective Prompting", duration: "20 min", completed: true, locked: false },
        ],
      },
      {
        title: "Intermediate Skills",
        lessons: [
          { title: "Custom Instructions", duration: "18 min", completed: true, locked: false },
          { title: "Using GPT-4 Vision", duration: "22 min", completed: true, locked: false },
          { title: "Data Analysis with ChatGPT", duration: "25 min", completed: true, locked: false },
          { title: "Writing & Editing", duration: "20 min", completed: true, locked: false },
        ],
      },
      {
        title: "Advanced & Custom GPTs",
        lessons: [
          { title: "Building Custom GPTs", duration: "30 min", completed: false, locked: false },
          { title: "API Integration", duration: "28 min", completed: false, locked: false },
          { title: "Plugins & Extensions", duration: "22 min", completed: false, locked: true },
          { title: "ChatGPT for Business", duration: "25 min", completed: false, locked: true },
          { title: "Automation Workflows", duration: "30 min", completed: false, locked: true },
          { title: "Final Project", duration: "45 min", completed: false, locked: true },
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
    progress: 10,
    modules: [
      {
        title: "Jasper Basics",
        lessons: [
          { title: "Introduction to Jasper", duration: "10 min", completed: true, locked: false },
          { title: "Setting Up Brand Voice", duration: "15 min", completed: false, locked: false },
          { title: "Templates Overview", duration: "12 min", completed: false, locked: false },
        ],
      },
      {
        title: "Content Creation",
        lessons: [
          { title: "Blog Post Writing", duration: "25 min", completed: false, locked: true },
          { title: "Social Media Content", duration: "20 min", completed: false, locked: true },
          { title: "Ad Copy Generation", duration: "18 min", completed: false, locked: true },
          { title: "Email Marketing", duration: "22 min", completed: false, locked: true },
        ],
      },
      {
        title: "Advanced Jasper",
        lessons: [
          { title: "Jasper Chat & Commands", duration: "20 min", completed: false, locked: true },
          { title: "Team Collaboration", duration: "15 min", completed: false, locked: true },
          { title: "Campaign Workflows", duration: "30 min", completed: false, locked: true },
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
    progress: 0,
    modules: [
      {
        title: "AI Art Fundamentals",
        lessons: [
          { title: "What is Stable Diffusion?", duration: "10 min", completed: false, locked: false },
          { title: "Installation & Setup", duration: "20 min", completed: false, locked: false },
          { title: "Your First Image", duration: "15 min", completed: false, locked: false },
        ],
      },
      {
        title: "Prompt Crafting",
        lessons: [
          { title: "Positive & Negative Prompts", duration: "22 min", completed: false, locked: true },
          { title: "Style Keywords & Modifiers", duration: "18 min", completed: false, locked: true },
          { title: "Aspect Ratios & Resolution", duration: "15 min", completed: false, locked: true },
        ],
      },
      {
        title: "Advanced Generation",
        lessons: [
          { title: "ControlNet & img2img", duration: "30 min", completed: false, locked: true },
          { title: "LoRA & Model Fine-Tuning", duration: "35 min", completed: false, locked: true },
          { title: "Inpainting & Outpainting", duration: "25 min", completed: false, locked: true },
          { title: "Creative Portfolio Project", duration: "40 min", completed: false, locked: true },
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
  const completedLessons = course.modules.flatMap(m => m.lessons).filter(l => l.completed).length;

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
                    <span className="font-medium text-foreground">{completedLessons} of {course.totalLessons} completed</span>
                    <span className="font-semibold text-primary">{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                </div>
              </div>

              {/* Modules */}
              {course.modules.map((module, moduleIdx) => {
                const moduleCompleted = module.lessons.filter(l => l.completed).length;
                const moduleTotal = module.lessons.length;
                return (
                  <div key={moduleIdx} className="space-y-1">
                    <div className="flex items-center justify-between px-1 mb-3">
                      <h2 className="text-lg font-bold text-foreground">
                        Module {moduleIdx + 1}: {module.title}
                      </h2>
                      <span className="text-xs text-muted-foreground font-medium">
                        {moduleCompleted}/{moduleTotal}
                      </span>
                    </div>

                    <div className="bg-card rounded-2xl border border-border overflow-hidden divide-y divide-border">
                      {module.lessons.map((lesson, lessonIdx) => {
                        const isNext = !lesson.completed && !lesson.locked &&
                          (lessonIdx === 0 || module.lessons[lessonIdx - 1]?.completed);
                        return (
                          <button
                            key={lessonIdx}
                            disabled={lesson.locked}
                            className={`w-full flex items-center gap-3 px-4 py-3.5 text-left transition-colors group
                              ${lesson.locked ? "opacity-50 cursor-not-allowed" : "hover:bg-muted/50 cursor-pointer"}
                              ${isNext ? "bg-primary/5" : ""}
                            `}
                          >
                            <div className="shrink-0">
                              {lesson.completed ? (
                                <CheckCircle2 size={20} className="text-primary" />
                              ) : lesson.locked ? (
                                <Lock size={18} className="text-muted-foreground" />
                              ) : isNext ? (
                                <PlayCircle size={20} className="text-primary" />
                              ) : (
                                <div className="w-5 h-5 rounded-full border-2 border-border" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className={`text-sm font-medium ${lesson.completed ? "text-muted-foreground line-through" : "text-foreground"}`}>
                                {lesson.title}
                              </p>
                            </div>
                            <span className="text-xs text-muted-foreground shrink-0">{lesson.duration}</span>
                            {!lesson.locked && (
                              <ChevronRight size={16} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              {/* Continue Button */}
              {course.progress < 100 && (
                <div className="flex justify-center pt-2 pb-8">
                  <Button size="lg" className="rounded-xl px-8 font-semibold">
                    <PlayCircle size={18} />
                    Continue Learning
                  </Button>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default GuidePathway;
