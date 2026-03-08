import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { Flame, BookOpen, Clock, Search } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { coursesData } from "@/data/coursesData";

const categories = ["All", "AI Assistants", "Image & Design", "Writing", "Productivity", "Business"];

const guidesData = [
  { title: "Claude", slug: "claude", lessons: 10, hours: 5, emoji: "🤖", category: "AI Assistants", description: "Master Anthropic's Claude for writing, analysis, and coding tasks." },
  { title: "Gemini", slug: "gemini", lessons: 10, hours: 4, emoji: "💎", category: "AI Assistants", description: "Learn Google's Gemini for multimodal AI tasks and research." },
  { title: "ChatGPT", slug: "chatgpt", lessons: 13, hours: 6, emoji: "🧠", category: "AI Assistants", description: "Unlock the full potential of OpenAI's ChatGPT for everyday work." },
  { title: "Jasper AI", slug: "jasper-ai", lessons: 10, hours: 5, emoji: "✍️", category: "Writing", description: "Create marketing copy, blog posts, and content at scale with Jasper." },
  { title: "Stable Diffusion", slug: "stable-diffusion", lessons: 10, hours: 4, emoji: "🎨", category: "Image & Design", description: "Generate stunning images and art using Stable Diffusion models." },
  { title: "Midjourney", slug: "midjourney", lessons: 12, hours: 5, emoji: "🖼️", category: "Image & Design", description: "Create professional-quality visuals with Midjourney prompts." },
  { title: "DALL·E", slug: "dall-e", lessons: 8, hours: 3, emoji: "🎭", category: "Image & Design", description: "Learn to generate and edit images with OpenAI's DALL·E." },
  { title: "Notion AI", slug: "notion-ai", lessons: 9, hours: 4, emoji: "📝", category: "Productivity", description: "Supercharge your notes, docs, and workflows with Notion AI." },
  { title: "Canva AI", slug: "canva-ai", lessons: 8, hours: 3, emoji: "🎯", category: "Image & Design", description: "Design graphics and presentations faster with Canva's AI tools." },
  { title: "Copy.ai", slug: "copy-ai", lessons: 7, hours: 3, emoji: "📋", category: "Writing", description: "Generate sales copy, emails, and social media content effortlessly." },
  { title: "Perplexity AI", slug: "perplexity", lessons: 8, hours: 3, emoji: "🔍", category: "AI Assistants", description: "Research smarter with AI-powered search and citation tools." },
  { title: "AI for Business", slug: "ai-business", lessons: 15, hours: 8, emoji: "💼", category: "Business", description: "Strategic guide to implementing AI across your business operations." },
];

const Guides = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [progressMap, setProgressMap] = useState<Record<string, number>>({});

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { navigate("/login"); return; }
      setUserName(session.user.user_metadata?.full_name || session.user.email || "Learner");

      // Fetch progress for all courses
      const { data } = await supabase
        .from("lesson_progress")
        .select("course_id, lesson_id")
        .eq("user_id", session.user.id);

      if (data) {
        const map: Record<string, number> = {};
        const grouped: Record<string, Set<string>> = {};
        data.forEach((r: { course_id: string; lesson_id: string }) => {
          if (!grouped[r.course_id]) grouped[r.course_id] = new Set();
          grouped[r.course_id].add(r.lesson_id);
        });
        for (const slug in grouped) {
          const course = coursesData[slug];
          const totalLessons = course ? course.totalLessons : (guidesData.find(g => g.slug === slug)?.lessons || 1);
          map[slug] = Math.round((grouped[slug].size / totalLessons) * 100);
        }
        setProgressMap(map);
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

  const filteredGuides = guidesData.filter((g) => {
    const matchesCategory = activeCategory === "All" || g.category === activeCategory;
    const matchesSearch = g.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
          <header className="sticky top-0 z-40 h-14 flex items-center justify-between border-b border-border bg-card/80 backdrop-blur-sm px-4 md:px-6">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="md:hidden" />
              <h1 className="text-lg font-bold text-foreground flex items-center gap-2">
                <BookOpen size={20} className="text-primary" /> Guides
              </h1>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-accent/10 rounded-full">
              <Flame size={16} className="text-accent" />
              <span className="text-sm font-semibold text-foreground">0</span>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
            <div className="max-w-5xl mx-auto space-y-6">
              {/* Search */}
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search guides..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 bg-card border-border"
                />
              </div>

              {/* Category Filters */}
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                      activeCategory === cat
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Guides Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {filteredGuides.map((guide) => (
                  <Link
                    key={guide.slug}
                    to={`/guide-pathway/${guide.slug}`}
                    className="bg-card rounded-2xl border border-border overflow-hidden card-elevated hover:border-primary/30 transition-colors block"
                  >
                    <div className="h-32 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 flex items-center justify-center text-5xl">
                      {guide.emoji}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-foreground">{guide.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{guide.description}</p>
                      <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
                        <span>{guide.lessons} lessons</span>
                        <span>·</span>
                        <span className="flex items-center gap-1"><Clock size={11} /> {guide.hours}h</span>
                      </div>
                      <div className="mt-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[11px] text-muted-foreground">Progress</span>
                          <span className="text-[11px] font-semibold text-primary">{guide.progress}%</span>
                        </div>
                        <Progress value={guide.progress} className="h-1" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {filteredGuides.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <BookOpen size={40} className="mx-auto mb-3 opacity-40" />
                  <p className="text-sm">No guides found matching your search.</p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Guides;
