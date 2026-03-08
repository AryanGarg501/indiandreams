import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    q: "What is Indian Dreams?",
    a: "Indian Dreams is an online educational platform that helps users learn AI tools and digital skills to advance their careers. It offers courses on in-demand skills, modern professions, and applying AI at work.",
  },
  {
    q: "How do I get started?",
    a: "Simply sign up on our platform, take a quick quiz to personalize your learning path, and start your first lesson in minutes. No prior AI experience needed.",
  },
  {
    q: "What courses are available?",
    a: "We offer courses on AI-powered business, AI marketing, AI productivity, content creation, affiliate marketing, and more — all tailored for the Indian professional landscape.",
  },
  {
    q: "Is there a certificate?",
    a: "Yes! Complete your AI course and receive a certificate to highlight your expertise and advance your career.",
  },
  {
    q: "Can I cancel my subscription?",
    a: "Yes, you can cancel your subscription anytime through your account settings. For specific cancellation or refund details, review our terms and conditions.",
  },
];

const FAQSection = () => {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-28 bg-card relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full bg-primary/3 blur-[120px]" />
      <div className="container mx-auto px-4 max-w-3xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <HelpCircle size={28} className="text-primary" />
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-5">Frequently asked questions</h2>
          <p className="text-muted-foreground text-lg">Find answers to common questions about Indian Dreams</p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                open === i ? "border-primary/30 shadow-lg bg-card" : "border-border bg-card hover:border-primary/20"
              }`}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left font-bold text-foreground transition-colors"
              >
                <span className="pr-4">{faq.q}</span>
                <ChevronDown
                  size={20}
                  className={`text-muted-foreground transition-transform duration-300 flex-shrink-0 ${open === i ? "rotate-180 text-primary" : ""}`}
                />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-6 text-muted-foreground leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
