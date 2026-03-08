import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { Flame, Trophy, Clock, Users, Lock, CheckCircle2, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { challengesData, type ChallengeData } from "@/data/challengesData";
import challengeHero from "@/assets/challenge-hero.jpg";
import challenge28day from "@/assets/challenge-28day.jpg";
import challengeJunior from "@/assets/challenge-junior-ai.jpg";

import challengeSideGigs from "@/assets/challenge-side-gigs.jpg";

const challengeImages: Record<string, string> = {
  "28-day-ai": challenge28day,
  "junior-ai": challengeJunior,
  "14-day-side-gigs": challengeSideGigs,
};

const Challenges = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);
  const [progressMap, setProgressMap] = useState<Record<string, number>>({});

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { navigate("/login"); return; }
      setUserName(session.user.user_metadata?.full_name || session.user.email || "Learner");

      // Fetch progress for all challenges
      const { data } = await supabase
        .from("lesson_progress")
        .select("course_id, lesson_id")
        .eq("user_id", session.user.id)
        .eq("module_id", "challenge");

      if (data) {
        const map: Record<string, Set<string>> = {};
        data.forEach((r) => {
          if (!map[r.course_id]) map[r.course_id] = new Set();
          map[r.course_id].add(r.lesson_id);
        });
        const counts: Record<string, number> = {};
        Object.entries(map).forEach(([k, v]) => { counts[k] = v.size; });
        setProgressMap(counts);
      }
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

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  const challengesList = Object.values(challengesData);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <DashboardSidebar userName={userName} onLogout={handleLogout} />

        <div className="flex-1 flex flex-col min-w-0">
          <header className="sticky top-0 z-40 h-14 flex items-center justify-between border-b border-border bg-card/80 backdrop-blur-sm px-4 md:px-6">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="md:hidden" />
              <h1 className="text-lg font-bold text-foreground flex items-center gap-2">
                <Trophy size={20} className="text-primary" /> Challenges
              </h1>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-accent/10 rounded-full">
              <Flame size={16} className="text-accent" />
              <span className="text-sm font-semibold text-foreground">0</span>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
            <div className="max-w-5xl mx-auto space-y-6">
              <div className="relative rounded-2xl overflow-hidden border border-border">
                <img src={challengeHero} alt="AI Challenge" className="w-full h-48 md:h-56 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
                    Push your limits with daily challenges
                  </h2>
                  <p className="text-muted-foreground max-w-lg">
                    Build real AI skills one day at a time. Complete daily tasks, earn streaks, and level up your expertise.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {challengesList.map((challenge) => (
                  <ChallengeCard
                    key={challenge.id}
                    challenge={challenge}
                    completedDays={progressMap[challenge.id] || 0}
                  />
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

interface ChallengeCardProps {
  challenge: ChallengeData;
  completedDays: number;
}

function ChallengeCard({ challenge, completedDays }: ChallengeCardProps) {
  const totalDays = challenge.days.length;
  const progress = Math.round((completedDays / totalDays) * 100);
  const days = Array.from({ length: totalDays }, (_, i) => i + 1);

  return (
    <div className="bg-card rounded-2xl border border-border overflow-hidden card-elevated">
      <div className="relative h-40 md:h-48 overflow-hidden">
        <img src={challengeImages[challenge.id] || challenge28day} alt={challenge.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
        <div className="absolute bottom-3 left-5 right-5">
          <h3 className="font-display text-lg font-bold text-foreground drop-shadow-sm">{challenge.title}</h3>
          <p className="text-sm text-muted-foreground mt-0.5 line-clamp-1">{challenge.description}</p>
        </div>
      </div>
      <div className="p-5 md:p-6">

        <div className="flex flex-wrap items-center gap-3 mb-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><Clock size={13} /> {challenge.duration}</span>
          <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">{challenge.level}</span>
          <span className="flex items-center gap-1"><Users size={13} /> {challenge.participants} joined</span>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {challenge.tags.map((tag) => (
            <span key={tag} className="text-[11px] font-medium bg-muted text-muted-foreground px-2.5 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-muted-foreground">Day {completedDays} / {totalDays}</span>
            <span className="text-xs font-semibold text-primary">{progress}%</span>
          </div>
          <Progress value={progress} className="h-1.5 mb-3" />
          <div className="grid gap-1.5 grid-cols-7">
            {days.map((d) => {
              const isCompleted = d <= completedDays;
              const isNext = d === completedDays + 1;

              return (
                <div
                  key={d}
                  className={`aspect-square rounded-lg flex items-center justify-center text-[10px] font-semibold transition-all ${
                    isCompleted
                      ? "bg-primary text-primary-foreground"
                      : isNext
                      ? "bg-primary/20 text-primary ring-1 ring-primary/40"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 size={12} />
                  ) : isNext ? (
                    <Play size={10} />
                  ) : (
                    <Lock size={9} className="opacity-40" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <Link to={`/challenge/${challenge.id}`}>
          <Button variant="hero" className="w-full">
            {completedDays > 0 ? "Continue Challenge" : "Start Challenge"}
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Challenges;
