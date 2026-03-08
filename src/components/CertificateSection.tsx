import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Award } from "lucide-react";
import certificateImg from "@/assets/certificate.jpg";

const CertificateSection = () => {
  return (
    <section className="py-28 bg-card relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-accent/5 blur-[120px]" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
              <Award size={16} className="text-primary" />
              <span className="text-xs font-bold text-primary uppercase tracking-wider">Certification</span>
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-6 leading-tight">
              Earn a certificate that proves your <span className="text-gradient-vivid">AI skills</span>
            </h2>
            <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
              Complete your AI course and receive a certificate to highlight your expertise. It's proof of the valuable skills you've gained to tackle challenges and advance your career.
            </p>
            <Button variant="hero" size="lg" className="gap-2 rounded-xl h-13 text-base px-8">
              Get Certificate Today <ArrowRight size={18} />
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="rounded-3xl overflow-hidden shadow-2xl glow-accent">
              <img
                src={certificateImg}
                alt="Indian Dreams AI course completion certificate"
                className="w-full rounded-3xl"
                loading="lazy"
              />
            </div>
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-hero-gradient rounded-2xl flex items-center justify-center shadow-xl rotate-12">
              <Award size={36} className="text-primary-foreground -rotate-12" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CertificateSection;
