import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { challengesData } from "@/data/challengesData";
import { ChallengeHeader } from "@/components/challenge/ChallengeHeader";
import { ChallengeDayGrid } from "@/components/challenge/ChallengeDayGrid";
import { ChallengeDayContent } from "@/components/challenge/ChallengeDayContent";

const ChallengeView = () => {
  const navigate = useNavigate();
  const { challengeId } = useParams<{ challengeId: string }>();
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [completedDays, setCompletedDays] = useState<Set<number>>(new Set());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [markingComplete, setMarkingComplete] = useState(false);

  const challenge = challengesData[challengeId || ""];

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { navigate("/login"); return; }
      setUserName(session.user.user_metadata?.full_name || session.user.email || "Learner");
      setUserId(session.user.id);

      // Fetch completed days for this challenge
      const { data } = await supabase
        .from("lesson_progress")
        .select("lesson_id")
        .eq("user_id", session.user.id)
        .eq("course_id", challengeId || "");

      if (data) {
        const days = new Set(data.map((r) => parseInt(r.lesson_id.replace("day-", ""))));
        setCompletedDays(days);
      }
      setLoading(false);
    };
    checkAuth();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) navigate("/login");
    });
    return () => subscription.unsubscribe();
  }, [navigate, challengeId]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const isDayUnlocked = useCallback((day: number) => {
    if (day === 1) return true;
    return completedDays.has(day - 1);
  }, [completedDays]);

  const handleMarkComplete = async (day: number) => {
    if (!userId || !challengeId || completedDays.has(day)) return;
    setMarkingComplete(true);

    const { error } = await supabase.from("lesson_progress").insert({
      user_id: userId,
      course_id: challengeId,
      module_id: "challenge",
      lesson_id: `day-${day}`,
    });

    if (!error) {
      const newCompleted = new Set([...completedDays, day]);
      setCompletedDays(newCompleted);

      // Check if all days completed
      if (challenge && newCompleted.size === challenge.days.length) {
        const { data: certId } = await supabase
          .rpc("issue_certificate", {
            _course_id: challengeId,
            _course_title: challenge.title,
            _user_name: userName,
            _expected_lessons: challenge.days.length,
          });

        if (certId) {
          setTimeout(() => navigate(`/certificate/${certId}`), 1200);
        }
      } else {
        // Jump to next day
        const nextDay = day + 1;
        if (challenge && nextDay <= challenge.days.length) {
          setTimeout(() => setSelectedDay(nextDay), 600);
        }
      }
    }
    setMarkingComplete(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!challenge) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Challenge not found.</p>
      </div>
    );
  }

  const progress = Math.round((completedDays.size / challenge.days.length) * 100);
  const currentDayData = selectedDay ? challenge.days.find((d) => d.day === selectedDay) : null;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <DashboardSidebar userName={userName} onLogout={handleLogout} />

        <div className="flex-1 flex flex-col min-w-0">
          <header className="sticky top-0 z-40 h-14 flex items-center justify-between border-b border-border bg-card/80 backdrop-blur-sm px-4 md:px-6">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="md:hidden" />
              <Link to="/challenges" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                ← Challenges
              </Link>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
            <div className="max-w-5xl mx-auto space-y-6">
              {!selectedDay ? (
                <>
                  <ChallengeHeader challenge={challenge} progress={progress} completedCount={completedDays.size} />
                  <ChallengeDayGrid
                    days={challenge.days}
                    completedDays={completedDays}
                    isDayUnlocked={isDayUnlocked}
                    onSelectDay={setSelectedDay}
                  />
                </>
              ) : currentDayData ? (
                <ChallengeDayContent
                  dayData={currentDayData}
                  isCompleted={completedDays.has(selectedDay)}
                  isUnlocked={isDayUnlocked(selectedDay)}
                  markingComplete={markingComplete}
                  onMarkComplete={() => handleMarkComplete(selectedDay)}
                  onBack={() => setSelectedDay(null)}
                  challengeTitle={challenge.title}
                />
              ) : null}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default ChallengeView;
