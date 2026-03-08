import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Award, Share2 } from "lucide-react";
import { coursesData } from "@/data/coursesData";
import { format } from "date-fns";

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

      if (error || !data) {
        navigate("/guides");
        return;
      }

      setCertificate(data);
      setLoading(false);
    };
    fetchCertificate();
  }, [certificateId, navigate]);

  const handleDownload = async () => {
    // Use browser print to PDF functionality
    window.print();
  };

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
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Header - hidden when printing */}
      <header className="print:hidden sticky top-0 z-40 h-14 flex items-center justify-between border-b border-border bg-card/80 backdrop-blur-sm px-4 md:px-6">
        <Link to="/guides" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft size={16} />
          <span>Back to Guides</span>
        </Link>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleDownload}>
            <Download size={14} />
            Download PDF
          </Button>
        </div>
      </header>

      {/* Certificate */}
      <div className="flex items-center justify-center p-4 md:p-8 lg:p-12">
        <div
          ref={certificateRef}
          className="w-full max-w-4xl aspect-[1.414/1] bg-card rounded-xl border-4 border-primary/20 shadow-2xl overflow-hidden print:shadow-none print:border-2 print:rounded-none print:max-w-none"
        >
          {/* Certificate Inner */}
          <div className="relative h-full w-full p-8 md:p-12 lg:p-16 flex flex-col">
            {/* Decorative border */}
            <div className="absolute inset-4 md:inset-6 border-2 border-primary/10 rounded-lg pointer-events-none" />
            
            {/* Corner decorations */}
            <div className="absolute top-8 left-8 w-12 h-12 border-t-4 border-l-4 border-primary/30 rounded-tl-lg" />
            <div className="absolute top-8 right-8 w-12 h-12 border-t-4 border-r-4 border-primary/30 rounded-tr-lg" />
            <div className="absolute bottom-8 left-8 w-12 h-12 border-b-4 border-l-4 border-primary/30 rounded-bl-lg" />
            <div className="absolute bottom-8 right-8 w-12 h-12 border-b-4 border-r-4 border-primary/30 rounded-br-lg" />

            {/* Content */}
            <div className="flex-1 flex flex-col items-center justify-center text-center relative z-10">
              {/* Badge */}
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-hero-gradient flex items-center justify-center mb-4 md:mb-6 shadow-lg">
                <Award className="w-8 h-8 md:w-10 md:h-10 text-primary-foreground" />
              </div>

              {/* Title */}
              <h1 className="font-display text-lg md:text-xl text-muted-foreground tracking-[0.3em] uppercase mb-2">
                Certificate of Completion
              </h1>

              {/* Divider */}
              <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-primary/40 to-transparent mb-6 md:mb-8" />

              {/* Recipient */}
              <p className="text-sm text-muted-foreground mb-2">This is to certify that</p>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 md:mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {certificate.user_name}
              </h2>

              {/* Course */}
              <p className="text-sm text-muted-foreground mb-2">has successfully completed the course</p>
              <div className="flex items-center gap-3 mb-6 md:mb-8">
                <span className="text-3xl md:text-4xl">{course?.emoji || "📜"}</span>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                  {certificate.course_title}
                </h3>
              </div>

              {/* Details */}
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="text-center">
                  <p className="text-xs uppercase tracking-wide mb-1">Completed on</p>
                  <p className="font-semibold text-foreground">{completedDate}</p>
                </div>
                <div className="w-px h-8 bg-border" />
                <div className="text-center">
                  <p className="text-xs uppercase tracking-wide mb-1">Lessons</p>
                  <p className="font-semibold text-foreground">{course?.totalLessons || "—"}</p>
                </div>
                <div className="w-px h-8 bg-border" />
                <div className="text-center">
                  <p className="text-xs uppercase tracking-wide mb-1">Hours</p>
                  <p className="font-semibold text-foreground">{course?.totalHours || "—"}</p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-end justify-between mt-8">
              <div className="text-center">
                <div className="w-32 border-t border-muted-foreground/30 mb-2" />
                <p className="text-xs text-muted-foreground">Indian Dreams</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] text-muted-foreground/60 font-mono">
                  ID: {certificate.id.slice(0, 8).toUpperCase()}
                </p>
              </div>
              <div className="text-center">
                <div className="w-32 border-t border-muted-foreground/30 mb-2" />
                <p className="text-xs text-muted-foreground">Verified</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Print styles */}
      <style>{`
        @media print {
          body { background: white !important; }
          .print\\:hidden { display: none !important; }
          .print\\:shadow-none { box-shadow: none !important; }
          .print\\:border-2 { border-width: 2px !important; }
          .print\\:rounded-none { border-radius: 0 !important; }
          .print\\:max-w-none { max-width: none !important; }
        }
      `}</style>
    </div>
  );
};

export default CertificateView;
