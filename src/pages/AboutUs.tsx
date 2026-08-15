import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Target, Rocket, Users, Award, Sparkles, Lightbulb } from "lucide-react";

const AboutUs = () => {
  const values = [
    {
      icon: Lightbulb,
      title: "Practical AI Skills",
      description: "We focus on real-world AI tools and workflows that help you work smarter, not harder."
    },
    {
      icon: Users,
      title: "Built for India",
      description: "Content, examples, and pricing designed specifically for Indian learners and professionals."
    },
    {
      icon: Award,
      title: "Recognized Credentials",
      description: "Earn verified certificates that showcase your AI mastery to employers and clients."
    },
    {
      icon: Rocket,
      title: "Career Acceleration",
      description: "From beginners to job-ready pros, our guided paths help you grow fast."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden pt-32 pb-20 px-4">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-100/40 via-transparent to-transparent" />
          <div className="container mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold tracking-wide uppercase mb-6 border border-emerald-100">
                <Sparkles className="w-3.5 h-3.5" />
                Our Story
              </span>
              <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                Empowering India with <span className="text-emerald-600">AI Skills</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Indian Dreams is on a mission to make artificial intelligence accessible,
                practical, and career-focused for every Indian learner. We believe AI is not
                just the future — it is the present opportunity.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission */}
        <section className="py-20 px-4 bg-emerald-900/5 border-y border-emerald-900/5">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="w-14 h-14 rounded-2xl bg-emerald-600 flex items-center justify-center mb-6 shadow-lg shadow-emerald-600/20">
                  <Target className="w-7 h-7 text-white" />
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Our Mission
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We are building India's most trusted AI learning platform — one where anyone,
                  from students to working professionals, can learn high-demand AI skills without
                  expensive degrees or confusing jargon.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Through guided courses, hands-on challenges, and verified certificates, we help
                  learners turn curiosity into confidence and confidence into career growth.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-2 gap-4"
              >
                {[
                  { label: "Learners", value: "10,000+" },
                  { label: "Lessons Completed", value: "50,000+" },
                  { label: "Certificates Issued", value: "2,000+" },
                  { label: "Rating", value: "4.8/5" }
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-background rounded-2xl p-6 border border-emerald-900/5 shadow-sm text-center"
                  >
                    <div className="font-display text-2xl md:text-3xl font-bold text-emerald-700 mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-24 px-4">
          <div className="container mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                What We Stand For
              </h2>
              <p className="text-muted-foreground">
                Our values shape every course, challenge, and certificate we create.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-background rounded-2xl p-6 border border-emerald-900/5 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center mb-4">
                    <value.icon className="w-5 h-5 text-emerald-600" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-foreground mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 bg-emerald-900 text-emerald-50">
          <div className="container mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Ready to start your AI journey?
            </h2>
            <p className="text-emerald-100/80 max-w-xl mx-auto mb-8">
              Join thousands of Indians learning AI the practical way. One payment, lifetime access.
            </p>
            <a
              href="/offer"
              className="inline-flex items-center justify-center rounded-full bg-white text-emerald-900 px-8 py-3.5 font-semibold hover:bg-emerald-50 transition-colors"
            >
              Get Started for ₹199
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUs;
