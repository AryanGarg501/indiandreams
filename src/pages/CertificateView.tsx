import { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Award, Share2, Check } from "lucide-react";
import { coursesData } from "@/data/coursesData";
import { format } from "date-fns";
import { motion } from "framer-motion";

// Confetti particle component
const Confetti = ({ active }: { active: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = [
      "hsl(24, 95%, 53%)",  // saffron/orange
      "hsl(262, 80%, 50%)", // indigo/purple
      "hsl(45, 100%, 51%)", // gold
      "hsl(142, 71%, 45%)", // green
      "hsl(350, 80%, 55%)", // red
      "hsl(200, 80%, 55%)", // blue
      "hsl(330, 80%, 60%)", // pink
    ];

    interface Particle {
      x: number; y: number; w: number; h: number;
      color: string; vx: number; vy: number;
      rotation: number; rotationSpeed: number;
      opacity: number; decay: number;
    }

    const particles: Particle[] = [];
    const count = 150;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: canvas.width / 2 + (Math.random() - 0.5) * 200,
        y: canvas.height * 0.3,
        w: Math.random() * 8 + 4,
        h: Math.random() * 4 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 16,
        vy: Math.random() * -14 - 4,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 12,
        opacity: 1,
        decay: 0.003 + Math.random() * 0.004,
      });
    }

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;

      for (const p of particles) {
        if (p.opacity <= 0) continue;
        alive = true;
        p.x += p.vx;
        p.vy += 0.25;
        p.y += p.vy;
        p.vx *= 0.99;
        p.rotation += p.rotationSpeed;
        p.opacity -= p.decay;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      }

      if (alive) animId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animId);
  }, [active]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-50 pointer-events-none print:hidden"
    />
  );
};

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
  const [showConfetti, setShowConfetti] = useState(false);
  const [copied, setCopied] = useState(false);
  const certificateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchCertificate = async () => {
      if (!certificateId) { setLoading(false); return; }

      const { data, error } = await supabase
        .rpc("get_public_certificate", { _id: certificateId })
        .maybeSingle();

      if (error || !data) {
        setCertificate(null);
        setLoading(false);
        return;
      }

      setCertificate(data as Certificate);
      setLoading(false);
      
      // Show confetti on first load
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 4000);
    };
    fetchCertificate();
  }, [certificateId, navigate]);

  const handleDownload = () => {
    window.print();
  };

  const shareUrl = `${window.location.origin}/certificate/${certificateId}`;

  const handleShare = async () => {
    const shareData = {
      title: "Certificate of Completion",
      text: certificate
        ? `${certificate.user_name} completed "${certificate.course_title}" at Indian Dreams Academy.`
        : "View my certificate",
      url: shareUrl,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        // user cancelled or unsupported — fall back to copy
      }
    }
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy your certificate link", shareUrl);
    }
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
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 px-4 text-center">
        <p className="text-muted-foreground">This certificate link is invalid or no longer available.</p>
        <Button variant="outline" size="sm" onClick={() => navigate("/")}>Go to homepage</Button>
      </div>
    );
  }

  const course = coursesData[certificate.course_id];
  const completedDate = format(new Date(certificate.completed_at), "MMMM d, yyyy");

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,hsl(var(--secondary)/0.08),transparent_60%),radial-gradient(ellipse_at_bottom,hsl(var(--primary)/0.06),transparent_60%)] bg-background">
      {/* Confetti */}
      <Confetti active={showConfetti} />
      
      {/* Header */}
      <header className="print:hidden sticky top-0 z-40 h-14 flex items-center justify-between border-b border-border bg-card/80 backdrop-blur-sm px-4 md:px-6">
        <Link to={`/guide-pathway/${certificate.course_id}`} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft size={16} />
          <span>Back to Course</span>
        </Link>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleShare} className="gap-2">
            {copied ? <Check size={14} /> : <Share2 size={14} />}
            {copied ? "Link copied" : "Share"}
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownload} className="gap-2">
            <Download size={14} />
            Download PDF
          </Button>
        </div>
      </header>

      {/* Certificate */}
      <div className="flex items-center justify-center p-4 md:p-8 lg:p-12 print:p-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          ref={certificateRef}
          className="w-full max-w-4xl aspect-[1.414/1] relative print:max-w-none"
        >
          {/* Outer glow */}
          <div className="absolute -inset-1 bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20 rounded-2xl blur-xl print:hidden" />

          {/* Main card */}
          <div className="relative h-full w-full bg-card rounded-2xl shadow-2xl overflow-hidden print:shadow-none print:rounded-none">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
            
            {/* Top gradient bar */}
            <div className="h-2 bg-gradient-to-r from-secondary via-primary to-accent" />

            {/* Inner content */}
            <div className="relative h-[calc(100%-0.5rem)] p-6 md:p-10 lg:p-14 flex flex-col">
              {/* Decorative inner border */}
              <div className="absolute inset-4 md:inset-8 border border-primary/10 rounded-xl pointer-events-none" />
              <div className="absolute inset-[18px] md:inset-[34px] border border-primary/5 rounded-lg pointer-events-none" />
              
              {/* Corner ornaments */}
              {[
                "top-6 left-6 md:top-10 md:left-10 border-t-2 border-l-2 rounded-tl-xl",
                "top-6 right-6 md:top-10 md:right-10 border-t-2 border-r-2 rounded-tr-xl",
                "bottom-6 left-6 md:bottom-10 md:left-10 border-b-2 border-l-2 rounded-bl-xl",
                "bottom-6 right-6 md:bottom-10 md:right-10 border-b-2 border-r-2 rounded-br-xl",
              ].map((pos, i) => (
                <div key={i} className={`absolute w-8 h-8 md:w-12 md:h-12 border-primary/25 ${pos}`} />
              ))}

              {/* Content */}
              <div className="flex-1 flex flex-col items-center justify-center text-center relative z-10">
                {/* Logo / Badge */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                >
                  <div className="relative mb-5 md:mb-7">
                    {/* Ring */}
                    <div className="absolute -inset-3 rounded-full border-2 border-dashed border-primary/20 animate-[spin_20s_linear_infinite]" />
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-hero-gradient flex items-center justify-center shadow-lg shadow-primary/20">
                      <Award className="w-8 h-8 md:w-10 md:h-10 text-primary-foreground drop-shadow" />
                    </div>
                  </div>
                </motion.div>

                {/* Brand */}
                <p className="text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase text-primary/60 mb-3 md:mb-4">
                  Indian Dreams Academy
                </p>

                {/* Title */}
                <h1 className="font-display text-base md:text-lg lg:text-xl text-muted-foreground tracking-[0.2em] uppercase font-semibold mb-3">
                  Certificate of Completion
                </h1>

                {/* Ornamental divider */}
                <div className="flex items-center gap-3 mb-5 md:mb-7">
                  <div className="w-12 md:w-20 h-px bg-gradient-to-r from-transparent to-primary/30" />
                  <div className="w-2 h-2 rotate-45 bg-primary/40" />
                  <div className="w-12 md:w-20 h-px bg-gradient-to-l from-transparent to-primary/30" />
                </div>

                {/* Recipient intro */}
                <p className="text-xs md:text-sm text-muted-foreground mb-1.5">This is proudly presented to</p>

                {/* Name */}
                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold mb-1.5"
                  style={{
                    background: "linear-gradient(135deg, hsl(var(--secondary)) 0%, hsl(var(--primary)) 50%, hsl(var(--accent)) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {certificate.user_name}
                </motion.h2>

                {/* Underline */}
                <div className="w-48 md:w-64 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent mb-5 md:mb-6" />

                {/* Course info */}
                <p className="text-xs md:text-sm text-muted-foreground mb-2.5">for successfully completing the course</p>

                <div className="flex items-center gap-3 bg-gradient-to-r from-primary/5 via-accent/5 to-secondary/5 px-5 py-2.5 rounded-xl border border-primary/10 mb-6 md:mb-8">
                  <span className="text-2xl md:text-3xl">{course?.emoji || "📜"}</span>
                  <h3 className="font-display text-xl md:text-2xl lg:text-3xl font-bold text-foreground">
                    {certificate.course_title}
                  </h3>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-5 md:gap-8">
                  {[
                    { label: "Completed", value: completedDate },
                    { label: "Lessons", value: String(course?.totalLessons || "—") },
                    { label: "Hours", value: String(course?.totalHours || "—") },
                  ].map((stat, i) => (
                    <div key={stat.label} className="flex items-center gap-5 md:gap-8">
                      {i > 0 && <div className="w-px h-8 bg-border -ml-5 md:-ml-8" />}
                      <div className="text-center">
                        <p className="text-[9px] md:text-[10px] uppercase tracking-widest text-muted-foreground/70 mb-0.5">{stat.label}</p>
                        <p className="text-xs md:text-sm font-semibold text-foreground">{stat.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-end justify-between relative z-10 mt-6 md:mt-8">
                <div className="text-center">
                  <div className="w-28 md:w-36 border-t border-muted-foreground/20 mb-1.5" />
                  <p className="text-[10px] md:text-xs font-medium text-muted-foreground">Indian Dreams</p>
                  <p className="text-[8px] text-muted-foreground/50">Learning Platform</p>
                </div>
                <div className="text-center flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full border border-primary/20 flex items-center justify-center mb-1">
                    <div className="w-4 h-4 rounded-full bg-hero-gradient opacity-60" />
                  </div>
                  <p className="text-[8px] text-muted-foreground/40 font-mono">
                    {certificate.id.slice(0, 8).toUpperCase()}
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  {/* Verified stamp */}
                  <motion.div
                    initial={{ opacity: 0, scale: 1.6, rotate: -25 }}
                    animate={{ opacity: 1, scale: 1, rotate: -12 }}
                    transition={{ delay: 0.9, type: "spring", stiffness: 180, damping: 12 }}
                    className="relative w-24 h-24 md:w-28 md:h-28"
                  >
                    <svg viewBox="0 0 120 120" className="w-full h-full">
                      <defs>
                        <path id="stamp-arc-top" d="M 60 60 m -42 0 a 42 42 0 1 1 84 0" fill="none" />
                        <path id="stamp-arc-bottom" d="M 60 60 m 36 0 a 36 36 0 1 1 -72 0" fill="none" />
                      </defs>
                      <circle cx="60" cy="60" r="55" fill="none" stroke="hsl(var(--primary))" strokeOpacity="0.55" strokeWidth="2.5" />
                      <circle cx="60" cy="60" r="48" fill="none" stroke="hsl(var(--primary))" strokeOpacity="0.35" strokeWidth="1" strokeDasharray="3 3" />
                      <text fill="hsl(var(--primary))" fillOpacity="0.75" fontSize="11" fontWeight="700" letterSpacing="2.6">
                        <textPath href="#stamp-arc-top" startOffset="50%" textAnchor="middle">
                          INDIAN DREAMS
                        </textPath>
                      </text>
                      <text fill="hsl(var(--primary))" fillOpacity="0.6" fontSize="8" fontWeight="700" letterSpacing="2">
                        <textPath href="#stamp-arc-bottom" startOffset="50%" textAnchor="middle">
                          COURSE COMPLETED
                        </textPath>
                      </text>
                      <path d="M42 60 l12 12 l24 -26" fill="none" stroke="hsl(var(--primary))" strokeOpacity="0.8" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                      <text x="60" y="86" textAnchor="middle" fill="hsl(var(--primary))" fillOpacity="0.8" fontSize="12" fontWeight="800" letterSpacing="1.5">VERIFIED</text>
                    </svg>
                  </motion.div>
                  <p className="text-[8px] text-muted-foreground/50 mt-0.5">Certificate of Achievement</p>
                </div>
              </div>
            </div>

            {/* Bottom gradient bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-secondary via-primary to-accent" />
          </div>
        </motion.div>
      </div>

      {/* Print styles */}
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
