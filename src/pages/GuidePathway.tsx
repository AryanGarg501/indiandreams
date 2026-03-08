import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, BookOpen, Lock, PlayCircle, ChevronRight, CheckCircle2 } from "lucide-react";
import { coursesData } from "@/data/coursesData";

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

  // Build flat list of all lessons
  const allLessons = course.modules.flatMap((m, mIdx) =>
    m.lessons.map((l, lIdx) => ({ ...l, moduleId: m.id, moduleIdx: mIdx, lessonIdx: lIdx }))
  );

  // For new users, only first lesson is unlocked
  const isUnlocked = (flatIdx: number) => flatIdx === 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  const completedCount = 0;
  const progress = Math.round((completedCount / course.totalLessons) * 100);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <DashboardSidebar userName={userName} onLogout={handleLogout} />

        <div className="flex-1 flex flex-col min-w-0">
          <header className="sticky top-0 z-40 h-14 flex items-center gap-3 border-b border-border bg-card/80 backdrop-blur-sm px-4 md:px-6">
            <SidebarTrigger className="md:hidden" />
            <Link to="/guides" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft size={16} />
              <span className="hidden sm:inline">Back to Guides</span>
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
                    <span className="font-medium text-foreground">{completedCount} of {course.totalLessons} completed</span>
                    <span className="font-semibold text-primary">{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              </div>

              {/* Modules */}
              {course.modules.map((module, moduleIdx) => {
                const moduleLessonsStart = course.modules
                  .slice(0, moduleIdx)
                  .reduce((acc, m) => acc + m.lessons.length, 0);

                return (
                  <div key={module.id} className="space-y-1">
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
                        const flatIdx = moduleLessonsStart + lessonIdx;
                        const unlocked = isUnlocked(flatIdx);
                        const isCompleted = false;

                        return (
                          <Link
                            key={lesson.id}
                            to={unlocked ? `/lesson/${courseId}/${module.id}/${lesson.id}` : "#"}
                            onClick={(e) => { if (!unlocked) e.preventDefault(); }}
                            className={`w-full flex items-center gap-3 px-4 py-3.5 text-left transition-colors group
                              ${!unlocked ? "opacity-50 cursor-not-allowed" : "hover:bg-muted/50 cursor-pointer"}
                              ${unlocked && !isCompleted ? "bg-primary/5" : ""}
                            `}
                          >
                            <div className="shrink-0">
                              {isCompleted ? (
                                <CheckCircle2 size={20} className="text-green-500" />
                              ) : unlocked ? (
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
                            {unlocked && (
                              <ChevronRight size={16} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              {/* Start Button */}
              <div className="flex justify-center pt-2 pb-8">
                <Link to={`/lesson/${courseId}/${course.modules[0].id}/${course.modules[0].lessons[0].id}`}>
                  <Button size="lg" className="rounded-xl px-8 font-semibold">
                    <PlayCircle size={18} />
                    Start Learning
                  </Button>
                </Link>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default GuidePathway;
