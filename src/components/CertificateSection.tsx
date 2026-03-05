import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import certificateImg from "@/assets/certificate.jpg";

const CertificateSection = () => {
  return (
    <section className="py-24 bg-card">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
              Earn a certificate that proves your <span className="text-gradient">AI skills</span>
            </h2>
            <p className="text-muted-foreground mb-4">
              Complete your AI course and receive a certificate to highlight your expertise. It's proof of the valuable skills you've gained to tackle challenges and advance your career.
            </p>
            <Button variant="hero" size="lg" className="gap-2 mt-4">
              Get Certificate Today <ArrowRight size={18} />
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <img
              src={certificateImg}
              alt="Indian Dreams AI course completion certificate"
              className="w-full rounded-xl shadow-xl"
              loading="lazy"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CertificateSection;
