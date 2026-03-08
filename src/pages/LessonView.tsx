import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { ArrowLeft, ArrowRight, CheckCircle2, ChevronDown, ChevronRight, Clock, Lock, PlayCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { coursesData } from "@/data/coursesData";
import ReactMarkdown from "react-markdown";
import { useToast } from "@/hooks/use-toast";

interface LessonProgress {
  course_id: string;
  module_id: string;
  lesson_id: string;
}

const LessonView = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { courseId, moduleId, lessonId } = useParams<{
    courseId: string;
    moduleId: string;
    lessonId: string;
  }>();
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({});
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  const [markingComplete, setMarkingComplete] = useState(false);

  // Fetch user and progress
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { navigate("/login"); return; }
      setUserName(session.user.user_metadata?.full_name || session.user.email || "Learner");
      setUserId(session.user.id);
      
      // Fetch progress for this course
      const { data: progressData } = await supabase
        .from("lesson_progress")
        .select("course_id, module_id, lesson_id")
        .eq("user_id", session.user.id)
        .eq("course_id", courseId || "");
      
      if (progressData) {
        const completed = new Set(progressData.map((p: LessonProgress) => `${p.module_id}-${p.lesson_id}`));
        setCompletedLessons(completed);
      }
      
      setLoading(false);
    };
    checkAuth();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) navigate("/login");
    });
    return () => subscription.unsubscribe();
  }, [navigate, courseId]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const course = coursesData[courseId || ""];

  // Build flat list
  const allLessons = course?.modules.flatMap((m) =>
    m.lessons.map((l) => ({ ...l, moduleId: m.id, moduleTitle: m.title }))
  ) || [];

  const currentIndex = allLessons.findIndex(
    (l) => l.moduleId === moduleId && l.id === lessonId
  );
  const currentLesson = allLessons[currentIndex];
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  // Check if a lesson is unlocked: first lesson OR previous lesson is completed
  const isUnlocked = useCallback((idx: number) => {
    if (idx === 0) return true;
    const prevLesson = allLessons[idx - 1];
    return completedLessons.has(`${prevLesson.moduleId}-${prevLesson.id}`);
  }, [allLessons, completedLessons]);

  const isCurrentCompleted = completedLessons.has(`${moduleId}-${lessonId}`);

  // Mark lesson complete
  const handleMarkComplete = async () => {
    if (!userId || !courseId || !moduleId || !lessonId || isCurrentCompleted) return;
    
    setMarkingComplete(true);
    
    const { error } = await supabase.from("lesson_progress").insert({
      user_id: userId,
      course_id: courseId,
      module_id: moduleId,
      lesson_id: lessonId,
    });

    if (error) {
      toast({ title: "Error", description: "Failed to save progress. Please try again.", variant: "destructive" });
      setMarkingComplete(false);
      return;
    }

    const newCompleted = new Set([...completedLessons, `${moduleId}-${lessonId}`]);
    setCompletedLessons(newCompleted);

    // Check if all lessons in this course are now completed
    const allDone = allLessons.every(
      (l) => newCompleted.has(`${l.moduleId}-${l.id}`)
    );

    if (allDone && course) {
      // Generate certificate
      const { data: certData, error: certError } = await supabase
        .from("certificates")
        .insert({
          user_id: userId,
          course_id: courseId,
          course_title: course.title,
          user_name: userName,
        })
        .select("id")
        .single();

      if (!certError && certData) {
        toast({
          title: "🎓 Course Completed!",
          description: "Your certificate is ready! Redirecting...",
        });
        setTimeout(() => {
          navigate(`/certificate/${certData.id}`);
        }, 1200);
      } else {
        toast({ title: "Course Completed! 🎉", description: "Congratulations on finishing all lessons!" });
      }
    } else if (nextLesson) {
      toast({ title: "Lesson completed! 🎉", description: "Moving to next lesson..." });
      setTimeout(() => {
        navigate(`/lesson/${courseId}/${nextLesson.moduleId}/${nextLesson.id}`);
      }, 800);
    } else {
      toast({ title: "Lesson completed! 🎉", description: "Great job!" });
    }
    
    setMarkingComplete(false);
  };

  // Expand current module by default
  useEffect(() => {
    if (moduleId) {
      setExpandedModules((prev) => ({ ...prev, [moduleId]: true }));
    }
  }, [moduleId]);

  const toggleModule = (mId: string) => {
    setExpandedModules((prev) => ({ ...prev, [mId]: !prev[mId] }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Course not found.</p>
      </div>
    );
  }

  const completedCount = completedLessons.size;
  const progress = Math.round((completedCount / allLessons.length) * 100);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <DashboardSidebar userName={userName} onLogout={handleLogout} />

        <div className="flex-1 flex min-w-0">
          {/* Lesson Sidebar */}
          <div className="border-r border-border bg-card flex-col transition-all duration-300 w-72 lg:w-80 hidden md:flex overflow-hidden">
            <div className="p-4 border-b border-border">
              <Link
                to={`/guide-pathway/${courseId}`}
                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mb-3"
              >
                <ArrowLeft size={14} />
                Back to {course.title}
              </Link>
              <h2 className="font-display text-sm font-bold text-foreground flex items-center gap-2">
                {course.emoji} {course.title}
              </h2>
              <div className="mt-2">
                <div className="flex items-center justify-between text-[11px] text-muted-foreground mb-1">
                  <span>{completedCount}/{allLessons.length} completed</span>
                  <span className="font-semibold text-primary">{progress}%</span>
                </div>
                <Progress value={progress} className="h-1" />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {course.modules.map((mod, modIdx) => {
                const modStartIdx = course.modules.slice(0, modIdx).reduce((acc, m) => acc + m.lessons.length, 0);
                
                return (
                  <div key={mod.id}>
                    <button
                      onClick={() => toggleModule(mod.id)}
                      className="w-full flex items-center justify-between px-4 py-3 text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors"
                    >
                      <span className="text-left">{mod.title}</span>
                      {expandedModules[mod.id] ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                    </button>
                    {expandedModules[mod.id] && (
                      <div className="pb-1">
                        {mod.lessons.map((lesson, lessonIdx) => {
                          const flatIdx = modStartIdx + lessonIdx;
                          const isCurrent = lesson.id === lessonId && mod.id === moduleId;
                          const unlocked = isUnlocked(flatIdx);
                          const isCompleted = completedLessons.has(`${mod.id}-${lesson.id}`);

                          return (
                            <Link
                              key={lesson.id}
                              to={unlocked ? `/lesson/${courseId}/${mod.id}/${lesson.id}` : "#"}
                              onClick={(e) => { if (!unlocked) e.preventDefault(); }}
                              className={`flex items-center gap-2.5 px-4 py-2 text-xs transition-colors ${
                                isCurrent
                                  ? "bg-primary/10 text-primary font-medium border-l-2 border-primary"
                                  : unlocked
                                  ? "text-foreground hover:bg-muted/30"
                                  : "text-muted-foreground/50 cursor-not-allowed"
                              }`}
                            >
                              <div className="shrink-0">
                                {isCompleted ? (
                                  <CheckCircle2 size={14} className="text-emerald-500" />
                                ) : isCurrent ? (
                                  <PlayCircle size={14} className="text-primary" />
                                ) : unlocked ? (
                                  <div className="w-3.5 h-3.5 rounded-full border-2 border-muted-foreground/30" />
                                ) : (
                                  <Lock size={12} />
                                )}
                              </div>
                              <span className="flex-1 truncate">{lesson.title}</span>
                              <span className="text-[10px] text-muted-foreground shrink-0">{lesson.duration}</span>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col min-w-0">
            <header className="sticky top-0 z-40 h-14 flex items-center justify-between border-b border-border bg-card/80 backdrop-blur-sm px-4 md:px-6">
              <div className="flex items-center gap-3">
                <SidebarTrigger className="md:hidden" />
                <Link
                  to={`/guide-pathway/${courseId}`}
                  className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors md:hidden"
                >
                  <ArrowLeft size={16} />
                </Link>
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-xs text-muted-foreground hidden sm:inline">{currentLesson?.moduleTitle} /</span>
                  <span className="text-sm font-semibold text-foreground truncate">{currentLesson?.title}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock size={13} />
                <span>{currentLesson?.duration}</span>
              </div>
            </header>

            <main className="flex-1 overflow-y-auto">
              <div className="max-w-3xl mx-auto p-6 md:p-8 lg:p-10">
                {currentLesson ? (
                  <article className="prose prose-sm dark:prose-invert max-w-none prose-headings:font-display prose-h2:text-2xl prose-h2:mt-0 prose-h3:text-lg prose-table:text-sm prose-pre:bg-muted prose-pre:text-foreground prose-code:text-primary prose-blockquote:border-primary/40 prose-blockquote:bg-primary/5 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-lg">
                    <ReactMarkdown>{currentLesson.content}</ReactMarkdown>
                  </article>
                ) : (
                  <p className="text-muted-foreground">Lesson not found.</p>
                )}
              </div>

              {/* Navigation */}
              <div className="border-t border-border bg-card/80 backdrop-blur-sm p-4 md:p-6">
                <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
                  {prevLesson ? (
                    <Link
                      to={`/lesson/${courseId}/${prevLesson.moduleId}/${prevLesson.id}`}
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <ArrowLeft size={16} />
                      <div className="text-left hidden sm:block">
                        <p className="text-[10px] text-muted-foreground">Previous</p>
                        <p className="font-medium truncate max-w-[200px]">{prevLesson.title}</p>
                      </div>
                    </Link>
                  ) : (
                    <div />
                  )}

                  {isCurrentCompleted ? (
                    <Button variant="outline" disabled className="shrink-0">
                      <CheckCircle2 size={16} className="text-emerald-500" />
                      Completed
                    </Button>
                  ) : (
                    <Button 
                      variant="hero" 
                      className="shrink-0" 
                      onClick={handleMarkComplete}
                      disabled={markingComplete}
                    >
                      {markingComplete ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : (
                        <CheckCircle2 size={16} />
                      )}
                      Mark Complete
                    </Button>
                  )}

                  {nextLesson ? (
                    <Link
                      to={`/lesson/${courseId}/${nextLesson.moduleId}/${nextLesson.id}`}
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <div className="text-right hidden sm:block">
                        <p className="text-[10px] text-muted-foreground">Next</p>
                        <p className="font-medium truncate max-w-[200px]">{nextLesson.title}</p>
                      </div>
                      <ArrowRight size={16} />
                    </Link>
                  ) : (
                    <div />
                  )}
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default LessonView;
