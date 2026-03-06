import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Home,
  BookOpen,
  Trophy,
  Sparkles,
  User,
  LogOut,
  CheckCircle2,
  Circle,
  Play,
  ArrowRight,
  Flame,
} from "lucide-react";

const navItems = [
  { label: "Home", icon: Home, href: "/dashboard" },
  { label: "Guides", icon: BookOpen, href: "#" },
  { label: "Challenges", icon: Trophy, href: "#" },
  { label: "AI Tools", icon: Sparkles, href: "#" },
];

const masteryPaths = [
  { title: "Claude", lessons: 10, hours: 5, progress: 20, color: "bg-red-500" },
  { title: "Gemini", lessons: 10, hours: 4, progress: 35, color: "bg-blue-500" },
  { title: "ChatGPT", lessons: 13, hours: 6, progress: 50, color: "bg-green-500" },
  { title: "Jasper AI", lessons: 10, hours: 5, progress: 10, color: "bg-purple-500" },
  { title: "Stable Diffusion", lessons: 10, hours: 4, progress: 0, color: "bg-orange-500" },
];

const challenges = [
  { title: "2026 28-Day AI Challenge", duration: "28 days", level: "Beginner" },
  { title: "Junior AI Challenge", duration: "28 days", level: "Beginner" },
  { title: "14-Day AI Side Gigs Challenge", duration: "14 days", level: "Beginner" },
];

const weekDays = ["Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Mon"];

const Dashboard = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/login");
        return;
      }
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

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navbar */}
      <nav className="sticky top-0 z-50 bg-card border-b border-border">
        <div className="container mx-auto flex items-center justify-between h-14 px-4">
          <div className="flex items-center gap-8">
            <Link to="/dashboard" className="font-display text-xl font-bold text-gradient">
              Indian Dreams
            </Link>
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-colors"
                >
                  <item.icon size={16} />
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-accent/10 rounded-full">
              <Flame size={16} className="text-accent" />
              <span className="text-sm font-semibold text-foreground">0</span>
            </div>
            <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <User size={16} />
              <span className="hidden md:inline">Profile</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-destructive transition-colors"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-5xl space-y-8">
        {/* Top Row: Current Course + Streaks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Current Course Card */}
          <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-2xl">
                🎨
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">Midjourney</h3>
                <p className="text-sm text-primary">Viewpoint</p>
              </div>
            </div>
            <Progress value={33} className="h-2 mb-2" />
            <p className="text-xs text-muted-foreground mb-4">4/12 lessons completed · 33%</p>
            <div className="flex gap-3">
              <Button variant="outline" size="sm" className="flex-1">
                Other guides
              </Button>
              <Button variant="hero" size="sm" className="flex-1">
                Continue learning
              </Button>
            </div>
          </div>

          {/* Weekly Streaks */}
          <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
            <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">Weekly Streaks</p>
            <h3 className="text-lg font-bold text-foreground mb-4">Help you build learning habit</h3>
            <div className="flex items-center justify-between mb-3">
              {weekDays.map((day, i) => (
                <div key={day} className="flex flex-col items-center gap-1.5">
                  {i === 0 ? (
                    <CheckCircle2 size={28} className="text-green-500" />
                  ) : i === 2 ? (
                    <div className="w-7 h-7 rounded-full border-2 border-primary flex items-center justify-center">
                      <Circle size={10} className="text-primary" />
                    </div>
                  ) : (
                    <Circle size={28} className="text-border" />
                  )}
                  <span className="text-xs text-muted-foreground">{day}</span>
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              Finish <span className="font-semibold text-primary">1 lesson</span> to begin your streak
            </p>
          </div>
        </div>

        {/* Middle Row: Learn by Doing + Prompts Library */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-secondary rounded-xl p-6 flex items-center justify-between shadow-sm">
            <div>
              <h3 className="text-lg font-bold text-secondary-foreground">Learn by Doing</h3>
              <p className="text-sm text-secondary-foreground/70 mt-1">
                Quick AI mini games.
                <br />
                Real knowledge.
              </p>
              <Button size="sm" className="mt-3 bg-accent hover:bg-accent/90 text-accent-foreground rounded-full gap-1.5">
                <Play size={14} /> Play now
              </Button>
            </div>
            <div className="text-5xl">🎮</div>
          </div>

          <div className="bg-card rounded-xl border border-border p-6 flex items-center justify-between shadow-sm">
            <div>
              <h3 className="text-lg font-bold text-foreground">Prompts Library</h3>
              <p className="text-sm text-muted-foreground mt-1">
                The Complete AI Bundle
                <br />
                is now in the app!
              </p>
            </div>
            <Sparkles size={40} className="text-primary/40" />
          </div>
        </div>

        {/* Your Mastery Path */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-foreground">Your Mastery path</h2>
            <button className="text-sm text-primary font-medium hover:underline flex items-center gap-1">
              View All <ArrowRight size={14} />
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {masteryPaths.map((path) => (
              <div
                key={path.title}
                className="bg-card rounded-xl border border-border p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className={`w-full aspect-square rounded-lg ${path.color}/10 flex items-center justify-center text-3xl mb-3`}>
                  🤖
                </div>
                <h4 className="font-semibold text-sm text-foreground">{path.title}</h4>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {path.lessons} lessons · {path.hours} hours
                </p>
                <Progress value={path.progress} className="h-1 mt-2" />
              </div>
            ))}
          </div>
        </section>

        {/* Challenges */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-foreground">Challenges</h2>
            <button className="text-sm text-primary font-medium hover:underline flex items-center gap-1">
              View All <ArrowRight size={14} />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {challenges.map((challenge) => (
              <div
                key={challenge.title}
                className="bg-card rounded-xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="h-36 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 flex items-center justify-center text-4xl">
                  🏆
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-sm text-foreground">{challenge.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    {challenge.duration} · {challenge.level}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
