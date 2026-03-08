import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Award, Sparkles } from "lucide-react";
import { coursesData } from "@/data/coursesData";
import { format } from "date-fns";
import { motion } from "framer-motion";

interface Certificate {
  id: string;
  user_name: string;
  course_title: string;
  course_id: string;
  completed_at: string;
}

const CertificateView = () => {
  const navigate = useNavigate();
  const { certificateId } = useParams<{ certificateId: string }>();
  const [loading, setLoading] = useState(true);
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const certificateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchCertificate = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { navigate("/login"); return; }
      const { data, error } = await supabase
        .from("certificates")
        .select("*")
        .eq("id", certificateId)
        .single();
      if (error || !data) { navigate("/guides"); return; }
      setCertificate(data);
      setLoading(false);
    };
    fetchCertificate();
  }, [certificateId, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!certificate) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Certificate not found.</p>
      </div>
    );
  }

  const course = coursesData[certificate.course_id];
  const completedDate = format(new Date(certificate.completed_at), "MMMM d, yyyy");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="print:hidden sticky top-0 z-40 h-14 flex items-center justify-between border-b border-border bg-card/80 backdrop-blur-sm px-4 md:px-6">
        <Link to={`/guide-pathway/${certificate.course_id}`} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft size={16} />
          <span>Back to Course</span>
        </Link>
        <Button variant="outline" size="sm" onClick={() => window.print()} className="gap-2">
          <Download size={14} />
          Download PDF
        </Button>
      </header>

      {/* Certificate */}
      <div className="flex items-center justify-center p-4 md:p-8 lg:p-12 print:p-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          ref={certificateRef}
          className="w-full max-w-4xl aspect-[1.414/1] relative print:max-w-none"
        >
          {/* Ambient glow */}
          <div className="absolute -inset-4 rounded-3xl blur-3xl opacity-40 print:hidden"
            style={{ background: "linear-gradient(135deg, hsl(var(--primary) / 0.3), hsl(var(--accent) / 0.3), hsl(var(--secondary) / 0.3))" }}
          />

          {/* Main card */}
          <div
            className="relative h-full w-full rounded-3xl overflow-hidden shadow-2xl print:shadow-none print:rounded-none"
            style={{
              background: "linear-gradient(160deg, hsl(245 70% 12%) 0%, hsl(240 40% 8%) 40%, hsl(22 50% 10%) 100%)",
            }}
          >
            {/* Mesh gradient overlays */}
            <div className="absolute inset-0">
              <div className="absolute top-0 right-0 w-[70%] h-[70%] rounded-full blur-[120px] opacity-30"
                style={{ background: "radial-gradient(circle, hsl(var(--primary)), transparent 70%)" }}
              />
              <div className="absolute bottom-0 left-0 w-[60%] h-[60%] rounded-full blur-[100px] opacity-20"
                style={{ background: "radial-gradient(circle, hsl(var(--accent)), transparent 70%)" }}
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50%] h-[50%] rounded-full blur-[80px] opacity-15"
                style={{ background: "radial-gradient(circle, hsl(var(--secondary) / 0.5), transparent 70%)" }}
              />
            </div>

            {/* Geometric shapes */}
            <div className="absolute inset-0 overflow-hidden print:hidden">
              <div className="absolute top-8 right-12 w-24 h-24 border border-white/[0.06] rounded-2xl rotate-12" />
              <div className="absolute bottom-12 left-8 w-16 h-16 border border-white/[0.04] rounded-full" />
              <div className="absolute top-1/3 left-10 w-2 h-2 bg-primary/30 rounded-full" />
              <div className="absolute bottom-1/4 right-16 w-1.5 h-1.5 bg-accent/40 rounded-full" />
              <div className="absolute top-1/4 right-1/3 w-1 h-1 bg-white/20 rounded-full" />
            </div>

            {/* Top edge accent */}
            <div className="h-1 bg-gradient-to-r from-primary via-accent to-primary" />

            {/* Content */}
            <div className="relative h-[calc(100%-0.25rem)] p-6 md:p-10 lg:p-14 flex flex-col z-10">

              {/* Header row */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <span className="text-xs font-extrabold text-white">ID</span>
                  </div>
                  <span className="text-[11px] md:text-xs font-bold tracking-wider text-white/40 uppercase">Indian Dreams</span>
                </div>
                <span className="text-[9px] md:text-[10px] font-mono text-white/20 tracking-wider">
                  #{certificate.id.slice(0, 8).toUpperCase()}
                </span>
              </div>

              {/* Main body */}
              <div className="flex-1 flex flex-col items-center justify-center text-center">

                {/* Badge */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 150, damping: 15 }}
                  className="relative mb-5 md:mb-6"
                >
                  <div className="absolute -inset-4 rounded-full opacity-50"
                    style={{ background: "conic-gradient(from 0deg, hsl(var(--primary) / 0.3), hsl(var(--accent) / 0.3), hsl(var(--primary) / 0.3))" }}
                  />
                  <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))" }}
                  >
                    <Award className="w-8 h-8 md:w-10 md:h-10 text-white drop-shadow-lg" />
                  </div>
                </motion.div>

                {/* Title */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Sparkles size={12} className="text-accent/60" />
                    <p className="text-[10px] md:text-xs font-bold tracking-[0.35em] uppercase text-white/30">
                      Certificate of Completion
                    </p>
                    <Sparkles size={12} className="text-accent/60" />
                  </div>
                </motion.div>

                {/* Divider */}
                <div className="flex items-center gap-2 my-4 md:my-5">
                  <div className="w-16 md:w-24 h-px bg-gradient-to-r from-transparent to-white/10" />
                  <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-primary to-accent" />
                  <div className="w-16 md:w-24 h-px bg-gradient-to-l from-transparent to-white/10" />
                </div>

                {/* Presented to */}
                <p className="text-xs md:text-sm text-white/40 mb-2 font-medium tracking-wide">Presented to</p>

                {/* Name */}
                <motion.h2
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="font-display text-3xl md:text-5xl lg:text-6xl font-extrabold mb-2 tracking-tight"
                  style={{
                    background: "linear-gradient(135deg, #fff 0%, hsl(var(--accent)) 50%, hsl(var(--primary)) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    filter: "drop-shadow(0 2px 10px hsl(var(--primary) / 0.3))",
                  }}
                >
                  {certificate.user_name}
                </motion.h2>

                {/* Underline */}
                <div className="w-40 md:w-56 h-px mb-5 md:mb-6"
                  style={{ background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.4), hsl(var(--accent) / 0.4), transparent)" }}
                />

                {/* Course */}
                <p className="text-[11px] md:text-xs text-white/35 mb-3 tracking-wide">for completing the course</p>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex items-center gap-3 px-5 py-3 rounded-2xl mb-6 md:mb-8 border border-white/[0.06]"
                  style={{ background: "linear-gradient(135deg, hsl(var(--primary) / 0.08), hsl(var(--accent) / 0.06))" }}
                >
                  <span className="text-2xl md:text-3xl">{course?.emoji || "📜"}</span>
                  <h3 className="font-display text-lg md:text-2xl lg:text-3xl font-bold text-white/90">
                    {certificate.course_title}
                  </h3>
                </motion.div>

                {/* Stats row */}
                <div className="flex items-center gap-6 md:gap-10">
                  {[
                    { label: "Date", value: completedDate },
                    { label: "Lessons", value: String(course?.totalLessons || "—") },
                    { label: "Hours", value: String(course?.totalHours || "—") },
                  ].map((stat, i) => (
                    <div key={stat.label} className="flex items-center gap-6 md:gap-10">
                      {i > 0 && <div className="w-px h-7 bg-white/[0.06] -ml-6 md:-ml-10" />}
                      <div className="text-center">
                        <p className="text-[8px] md:text-[9px] uppercase tracking-[0.2em] text-white/25 mb-0.5">{stat.label}</p>
                        <p className="text-[11px] md:text-sm font-semibold text-white/70">{stat.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-end justify-between pt-4 md:pt-6">
                <div className="text-center">
                  <div className="w-24 md:w-32 border-t border-white/10 mb-1.5" />
                  <p className="text-[10px] font-medium text-white/30">Indian Dreams</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-primary/40 to-accent/40 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white/40" />
                  </div>
                </div>
                <div className="text-center">
                  <div className="w-24 md:w-32 border-t border-white/10 mb-1.5" />
                  <p className="text-[10px] font-medium text-white/30">Verified</p>
                </div>
              </div>
            </div>

            {/* Bottom edge accent */}
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent via-primary to-accent" />
          </div>
        </motion.div>
      </div>

      <style>{`
        @media print {
          body { background: white !important; }
          .print\\:hidden { display: none !important; }
          .print\\:shadow-none { box-shadow: none !important; }
          .print\\:rounded-none { border-radius: 0 !important; }
          .print\\:max-w-none { max-width: none !important; }
          .print\\:p-0 { padding: 0 !important; }
        }
      `}</style>
    </div>
  );
};

export default CertificateView;
