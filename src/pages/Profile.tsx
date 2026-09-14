import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Award, BookCheck, CalendarDays, CheckCircle2, Clock3, Mail, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { supabase } from "@/integrations/supabase/client";

interface ProfileDetails {
  fullName: string;
  email: string;
  avatarUrl: string | null;
  createdAt: string;
  lastSignInAt: string | null;
  emailConfirmed: boolean;
  completedLessons: number;
  certificates: number;
}

const formatDate = (value: string | null) => {
  if (!value) return "Not available";
  return format(new Date(value), "d MMMM yyyy");
};

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<ProfileDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/login");
        return;
      }

      const [profileResult, lessonResult, certificateResult] = await Promise.all([
        supabase
          .from("profiles")
          .select("full_name, avatar_url, created_at")
          .eq("user_id", session.user.id)
          .maybeSingle(),
        supabase
          .from("lesson_progress")
          .select("id", { count: "exact", head: true })
          .eq("user_id", session.user.id),
        supabase
          .from("certificates")
          .select("id", { count: "exact", head: true })
          .eq("user_id", session.user.id),
      ]);

      const fullName = profileResult.data?.full_name
        || session.user.user_metadata?.full_name
        || session.user.email
        || "Learner";

      setProfile({
        fullName,
        email: session.user.email || "Not available",
        avatarUrl: profileResult.data?.avatar_url || session.user.user_metadata?.avatar_url || null,
        createdAt: profileResult.data?.created_at || session.user.created_at,
        lastSignInAt: session.user.last_sign_in_at || null,
        emailConfirmed: Boolean(session.user.email_confirmed_at),
        completedLessons: lessonResult.count ?? 0,
        certificates: certificateResult.count ?? 0,
      });
      setLoading(false);
    };

    loadProfile();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) navigate("/login");
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  if (loading || !profile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  const initials = profile.fullName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "L";

  const details = [
    { label: "Full name", value: profile.fullName, icon: User },
    { label: "Email address", value: profile.email, icon: Mail },
    { label: "Member since", value: formatDate(profile.createdAt), icon: CalendarDays },
    { label: "Last sign in", value: formatDate(profile.lastSignInAt), icon: Clock3 },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <DashboardSidebar userName={profile.fullName} onLogout={handleLogout} />

        <div className="flex-1 flex flex-col min-w-0">
          <header className="sticky top-0 z-40 h-14 flex items-center border-b border-border bg-card/80 backdrop-blur-sm px-4 md:px-6">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="md:hidden" />
              <h1 className="text-lg font-bold text-foreground">My Profile</h1>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto space-y-5">
              <section className="flex flex-col sm:flex-row sm:items-center gap-5 border-b border-border pb-6">
                {profile.avatarUrl ? (
                  <img
                    src={profile.avatarUrl}
                    alt={`${profile.fullName}'s profile`}
                    className="h-20 w-20 rounded-full object-cover ring-4 ring-primary/10"
                  />
                ) : (
                  <div className="h-20 w-20 rounded-full bg-primary/10 text-primary flex items-center justify-center text-2xl font-display font-bold ring-4 ring-primary/5">
                    {initials}
                  </div>
                )}
                <div className="min-w-0">
                  <h2 className="font-display text-2xl font-bold text-foreground break-words">{profile.fullName}</h2>
                  <p className="mt-1 text-sm text-muted-foreground break-all">{profile.email}</p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-primary">
                    <CheckCircle2 size={14} /> {profile.emailConfirmed ? "Email confirmed" : "Email not confirmed"}
                  </span>
                </div>
              </section>

              <section aria-labelledby="learning-summary-title">
                <h2 id="learning-summary-title" className="font-display text-lg font-bold text-foreground mb-3">Learning summary</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-card border border-border rounded-lg p-5 flex items-center gap-4">
                    <div className="h-11 w-11 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <BookCheck size={22} />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{profile.completedLessons}</p>
                      <p className="text-sm text-muted-foreground">Lessons completed</p>
                    </div>
                  </div>
                  <div className="bg-card border border-border rounded-lg p-5 flex items-center gap-4">
                    <div className="h-11 w-11 rounded-lg bg-accent/15 text-accent-foreground flex items-center justify-center shrink-0">
                      <Award size={22} />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{profile.certificates}</p>
                      <p className="text-sm text-muted-foreground">Certificates earned</p>
                    </div>
                  </div>
                </div>
              </section>

              <section aria-labelledby="account-details-title">
                <h2 id="account-details-title" className="font-display text-lg font-bold text-foreground mb-3">Account details</h2>
                <div className="bg-card border border-border rounded-lg divide-y divide-border">
                  {details.map((detail) => (
                    <div key={detail.label} className="grid grid-cols-[auto_1fr] sm:grid-cols-[auto_10rem_1fr] items-center gap-x-3 gap-y-1 px-4 py-4 sm:px-5">
                      <detail.icon size={18} className="text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{detail.label}</span>
                      <span className="col-start-2 sm:col-start-3 text-sm font-medium text-foreground break-all">{detail.value}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Profile;