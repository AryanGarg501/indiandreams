import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { Award, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

interface CertificateRow {
  id: string;
  course_id: string;
  course_title: string;
  user_name: string;
  completed_at: string;
}

const Certificates = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);
  const [certificates, setCertificates] = useState<CertificateRow[]>([]);

  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { navigate("/login"); return; }
      setUserName(session.user.user_metadata?.full_name || session.user.email || "Learner");

      const { data } = await supabase
        .from("certificates")
        .select("id, course_id, course_title, user_name, completed_at")
        .eq("user_id", session.user.id)
        .order("completed_at", { ascending: false });

      setCertificates(data ?? []);
      setLoading(false);
    };
    init();
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
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <DashboardSidebar userName={userName} onLogout={handleLogout} />

        <div className="flex-1 flex flex-col min-w-0">
          <header className="sticky top-0 z-40 h-14 flex items-center justify-between border-b border-border bg-card/80 backdrop-blur-sm px-4 md:px-6">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="md:hidden" />
              <h1 className="text-lg font-bold text-foreground flex items-center gap-2">
                <Award size={20} className="text-primary" /> My Certificates
              </h1>
            </div>
            <span className="text-sm text-muted-foreground">{certificates.length} earned</span>
          </header>

          <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
            <div className="max-w-5xl mx-auto space-y-6">
              {certificates.length === 0 ? (
                <div className="text-center py-16 bg-card rounded-2xl border border-border">
                  <Award size={44} className="mx-auto mb-4 text-muted-foreground opacity-40" />
                  <h2 className="font-display text-xl font-bold text-foreground">No certificates yet</h2>
                  <p className="text-sm text-muted-foreground mt-2 max-w-sm mx-auto">
                    Complete all lessons in a guide to unlock your verified certificate of achievement.
                  </p>
                  <Button asChild className="mt-5">
                    <Link to="/guides">Browse guides <ArrowRight size={16} className="ml-1" /></Link>
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {certificates.map((cert) => (
                    <Link
                      key={cert.id}
                      to={`/certificate/${cert.id}`}
                      className="bg-card rounded-2xl border border-border overflow-hidden card-elevated hover:border-primary/30 transition-colors block"
                    >
                      <div className="h-28 bg-gradient-to-br from-primary/15 via-accent/15 to-secondary/10 flex items-center justify-center">
                        <Award size={38} className="text-primary" />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-foreground line-clamp-2">{cert.course_title}</h3>
                        <p className="text-xs text-muted-foreground mt-1">
                          Awarded to {cert.user_name}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {format(new Date(cert.completed_at), "d MMM yyyy")}
                        </p>
                        <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary">
                          View certificate <ArrowRight size={13} />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Certificates;
