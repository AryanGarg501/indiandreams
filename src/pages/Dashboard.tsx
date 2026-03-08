import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { CurrentCourseCard } from "@/components/dashboard/CurrentCourseCard";
import { WeeklyStreaks } from "@/components/dashboard/WeeklyStreaks";
import { FeatureCards } from "@/components/dashboard/FeatureCards";
import { MasteryPaths } from "@/components/dashboard/MasteryPaths";
import { ChallengesSection } from "@/components/dashboard/ChallengesSection";
import { Flame } from "lucide-react";
import { startOfWeek, addDays, format } from "date-fns";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);
  const [streakCount, setStreakCount] = useState(0);

  const fetchStreak = async (userId: string) => {
    const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
    const weekEnd = addDays(weekStart, 7);
    const { data } = await supabase
      .from("lesson_progress")
      .select("completed_at")
      .eq("user_id", userId)
      .gte("completed_at", weekStart.toISOString())
      .lt("completed_at", weekEnd.toISOString());
    if (data) {
      const uniqueDays = new Set(data.map((r) => format(new Date(r.completed_at), "yyyy-MM-dd")));
      setStreakCount(uniqueDays.size);
    }
  };

  useEffect(() => {
    let userId = "";
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/login");
        return;
      }
      userId = session.user.id;
      setUserName(session.user.user_metadata?.full_name || session.user.email || "Learner");
      setLoading(false);
      fetchStreak(userId);
    };
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) navigate("/login");
    });

    const channel = supabase
      .channel("header-streak")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "lesson_progress" }, () => {
        if (userId) fetchStreak(userId);
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
      supabase.removeChannel(channel);
    };
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

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
          {/* Top bar */}
          <header className="sticky top-0 z-40 h-14 flex items-center justify-between border-b border-border bg-card/80 backdrop-blur-sm px-4 md:px-6">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="md:hidden" />
              <h1 className="text-lg font-bold text-foreground">
                Welcome back! 👋
              </h1>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-accent/10 rounded-full">
              <Flame size={16} className={streakCount > 0 ? "text-accent" : "text-muted-foreground"} />
              <span className="text-sm font-semibold text-foreground">{streakCount}</span>
            </div>
          </header>

          {/* Main content */}
          <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
            <div className="max-w-5xl mx-auto space-y-6">
              {/* Top Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CurrentCourseCard />
                <WeeklyStreaks />
              </div>

              {/* Feature Cards */}
              <FeatureCards />

              {/* Mastery Paths */}
              <MasteryPaths />

              {/* Challenges */}
              <ChallengesSection />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
