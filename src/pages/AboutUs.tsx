import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import {
  Sparkles,
  Users,
  Lightbulb,
  Target,
  Rocket,
  Brain,
  Zap,
  Palette,
  GraduationCap,
  Briefcase,
  Telescope,
  HeartHandshake,
  RefreshCw,
  Compass,
  Globe,
  ShieldCheck,
  BookOpen,
  ArrowRight
} from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: "easeOut" }
};

const AboutUs = () => {
  const principles = [
    {
      title: "Accessibility",
      description: "AI should be available to everyone, regardless of their technical background."
    },
    {
      title: "Simplicity",
      description: "Powerful technology should not require unnecessary complexity. We aim to create experiences that are intuitive and easy to use."
    },
    {
      title: "Innovation",
      description: "AI is evolving rapidly. We continuously explore new ideas, technologies, and possibilities to create better experiences for our users."
    }
  ];

  const areas = [
    { icon: Brain, title: "Artificial Intelligence", description: "We explore modern AI technologies and their practical applications across different industries and use cases." },
    { icon: Zap, title: "AI-Powered Productivity", description: "AI can help users reduce repetitive work, organize information, generate ideas, and accomplish tasks more efficiently." },
    { icon: Palette, title: "Creative AI", description: "From content creation to brainstorming and idea generation, AI can become a powerful creative partner." },
    { icon: GraduationCap, title: "AI for Learning", description: "We believe AI can transform education by helping students understand concepts, explore subjects, practice skills, and learn at their own pace." },
    { icon: Briefcase, title: "Business & Entrepreneurship", description: "AI can help businesses analyze information, automate processes, improve productivity, and discover new opportunities." },
    { icon: Telescope, title: "Future Technologies", description: "We continuously explore emerging technologies to understand how they can shape the future and create new possibilities for users." }
  ];

  const audiences = [
    { icon: BookOpen, title: "Students", description: "Discover AI, improve learning, explore new technologies, and develop skills for the future." },
    { icon: Palette, title: "Creators", description: "Turn ideas into content, concepts, designs, and creative experiences with the help of AI." },
    { icon: Briefcase, title: "Professionals", description: "Use AI to improve productivity, research, communication, and everyday workflows." },
    { icon: Rocket, title: "Entrepreneurs", description: "Explore new ideas, build solutions faster, and use AI to support business growth." },
    { icon: Globe, title: "Businesses", description: "Discover ways AI can improve efficiency, automation, customer experiences, and decision-making." },
    { icon: HeartHandshake, title: "AI Enthusiasts", description: "Experiment with new technologies and stay connected with the rapidly evolving world of Artificial Intelligence." }
  ];

  const values = [
    { icon: Lightbulb, title: "Innovation", description: "We constantly explore new ideas and technologies." },
    { icon: Target, title: "Simplicity", description: "Technology should be powerful without being unnecessarily complicated." },
    { icon: Palette, title: "Creativity", description: "We believe creativity is one of the most powerful applications of AI." },
    { icon: Users, title: "Accessibility", description: "AI should be available to people from different backgrounds and levels of technical expertise." },
    { icon: ShieldCheck, title: "Trust", description: "We aim to build technology and experiences that users can rely on." },
    { icon: RefreshCw, title: "Continuous Learning", description: "AI is constantly evolving, and so are we. We believe in continuously learning, experimenting, and improving." }
  ];

  const approachSteps = [
    { step: "01", title: "Understand", description: "We start by understanding real-world problems and opportunities." },
    { step: "02", title: "Explore", description: "We explore how AI can provide a meaningful solution." },
    { step: "03", title: "Build", description: "We build experiences around those possibilities." },
    { step: "04", title: "Improve", description: "And we continuously improve them based on technology, research, and user needs." }
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
                About Us
              </span>
              <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-8 leading-tight">
                Welcome to <span className="text-emerald-600">Indian Dreams</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Indian Dreams is an AI-powered platform built to bring the possibilities of Artificial Intelligence closer to everyone.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Intro */}
        <section className="py-16 px-4 bg-emerald-900/5 border-y border-emerald-900/5">
          <div className="container mx-auto max-w-4xl">
            <motion.div {...fadeUp} className="prose prose-lg max-w-none text-muted-foreground">
              <p className="leading-relaxed">
                We live in a world where technology is changing the way we learn, work, communicate, create, and solve problems. Artificial Intelligence is at the center of this transformation, and we believe its benefits should be accessible not only to technology experts and large organizations, but to students, creators, professionals, entrepreneurs, businesses, and everyday users.
              </p>
              <p className="leading-relaxed mt-4">
                Indian Dreams is created with this vision in mind — to make AI simple, useful, accessible, and inspiring. Our goal is to help people discover what AI can do and use it to transform ideas into meaningful outcomes.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Who We Are */}
        <section className="py-24 px-4">
          <div className="container mx-auto max-w-4xl">
            <motion.div {...fadeUp} className="text-center mb-12">
              <div className="w-14 h-14 rounded-2xl bg-emerald-600 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-600/20">
                <Users className="w-7 h-7 text-white" />
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                Who We Are
              </h2>
            </motion.div>
            <motion.div {...fadeUp} className="space-y-4 text-muted-foreground leading-relaxed text-center">
              <p>
                Indian Dreams is a technology platform focused on exploring and delivering AI-powered experiences and solutions.
              </p>
              <p>
                We bring together innovation, creativity, and technology to create tools and experiences that can help users work smarter and accomplish more.
              </p>
              <p>
                Whether you are looking for ways to improve productivity, explore creative possibilities, learn about AI, automate tasks, or discover new ways of working, Indian Dreams aims to make that journey easier.
              </p>
              <p className="font-semibold text-foreground">
                We believe technology should work for people, not make things more complicated for them.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Why Indian Dreams */}
        <section className="py-24 px-4 bg-emerald-900 text-emerald-50">
          <div className="container mx-auto max-w-4xl">
            <motion.div {...fadeUp} className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
                Why Indian Dreams?
              </h2>
            </motion.div>
            <motion.div {...fadeUp} className="space-y-6 text-emerald-100/90 leading-relaxed text-center">
              <p>
                The name Indian Dreams represents our belief that great ideas and ambitions can come from anywhere.
              </p>
              <p>
                India has millions of talented students, creators, developers, entrepreneurs, professionals, and innovators with ideas that can make a difference. We want to be part of that journey.
              </p>
              <p className="text-xl font-display font-semibold text-white">
                Our platform is built around a simple idea: Give people the right technology, and they can turn their imagination into innovation.
              </p>
              <p>
                AI gives us an incredible opportunity to make this possible at a much larger scale. Indian Dreams aims to become a platform where people can discover AI, experiment with it, learn from it, and use it to create something meaningful.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Our Vision */}
        <section className="py-24 px-4">
          <div className="container mx-auto max-w-4xl">
            <motion.div {...fadeUp} className="text-center mb-12">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center mx-auto mb-6">
                <Compass className="w-7 h-7 text-emerald-700" />
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Our Vision
              </h2>
              <p className="text-xl text-emerald-700 font-display font-semibold">
                Building an AI-powered future for everyone
              </p>
            </motion.div>
            <motion.div {...fadeUp} className="space-y-4 text-muted-foreground leading-relaxed text-center">
              <p>
                Our vision is to create a future where Artificial Intelligence is not complicated, intimidating, or limited to a small group of experts.
              </p>
              <p>
                Instead, AI should become an accessible tool that helps people learn faster, work smarter, create more, solve problems, automate repetitive tasks, explore new ideas, build innovative products, grow their businesses, and unlock their creative potential.
              </p>
              <p>
                We envision Indian Dreams as a growing ecosystem where technology and human creativity come together.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Our Mission */}
        <section className="py-24 px-4 bg-emerald-900/5 border-y border-emerald-900/5">
          <div className="container mx-auto max-w-5xl">
            <motion.div {...fadeUp} className="text-center mb-16">
              <div className="w-14 h-14 rounded-2xl bg-emerald-600 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-600/20">
                <Rocket className="w-7 h-7 text-white" />
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Our Mission
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our mission is to democratize access to useful AI technology. We continuously explore emerging AI technologies and transform them into practical experiences that users can understand and use.
              </p>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-6">
              {principles.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-background rounded-2xl p-8 border border-emerald-900/5 shadow-sm text-center"
                >
                  <div className="font-display text-4xl font-bold text-emerald-200 mb-4">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* What We Do */}
        <section className="py-24 px-4">
          <div className="container mx-auto max-w-6xl">
            <motion.div {...fadeUp} className="text-center mb-16">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                What We Do
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Indian Dreams focuses on using AI to create solutions that can make everyday digital experiences more intelligent and productive.
              </p>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {areas.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="bg-background rounded-2xl p-6 border border-emerald-900/5 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center mb-4">
                    <item.icon className="w-5 h-5 text-emerald-600" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* AI That Works With You */}
        <section className="py-24 px-4 bg-emerald-900 text-emerald-50">
          <div className="container mx-auto max-w-4xl">
            <motion.div {...fadeUp} className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
                AI That Works With You
              </h2>
              <p className="text-emerald-100/90 leading-relaxed">
                We don't believe AI should replace human creativity. We believe AI should amplify it.
              </p>
            </motion.div>
            <motion.div {...fadeUp} className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-emerald-800/40 rounded-2xl p-6 border border-emerald-700/30">
                <h3 className="font-display text-xl font-bold text-white mb-3">Human + AI</h3>
                <p className="text-emerald-100/80 text-sm leading-relaxed">
                  The best results happen when human imagination, experience, judgment, and creativity work together with the speed and capabilities of AI.
                </p>
              </div>
              <div className="bg-emerald-800/40 rounded-2xl p-6 border border-emerald-700/30">
                <h3 className="font-display text-xl font-bold text-white mb-3">Creativity First</h3>
                <p className="text-emerald-100/80 text-sm leading-relaxed">
                  AI can help generate possibilities. Humans decide which possibilities matter. AI can accelerate execution. Humans provide creativity and purpose.
                </p>
              </div>
            </motion.div>
            <motion.div {...fadeUp} className="text-center">
              <p className="text-xl font-display font-semibold text-white">
                Together, they can create something much more powerful.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Who We Serve */}
        <section className="py-24 px-4">
          <div className="container mx-auto max-w-6xl">
            <motion.div {...fadeUp} className="text-center mb-16">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Who We Serve
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Indian Dreams is designed for anyone who wants to explore the potential of AI.
              </p>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {audiences.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="bg-background rounded-2xl p-6 border border-emerald-900/5 shadow-sm"
                >
                  <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center mb-4">
                    <item.icon className="w-5 h-5 text-emerald-600" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-24 px-4 bg-emerald-900/5 border-y border-emerald-900/5">
          <div className="container mx-auto max-w-6xl">
            <motion.div {...fadeUp} className="text-center mb-16">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Our Core Values
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                These values shape everything we build and every decision we make.
              </p>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {values.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="bg-background rounded-2xl p-6 border border-emerald-900/5 shadow-sm"
                >
                  <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center mb-4">
                    <item.icon className="w-5 h-5 text-emerald-600" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Approach */}
        <section className="py-24 px-4">
          <div className="container mx-auto max-w-5xl">
            <motion.div {...fadeUp} className="text-center mb-16">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Our Approach
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                At Indian Dreams, we follow a simple philosophy that keeps us flexible in a rapidly changing AI landscape.
              </p>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {approachSteps.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="bg-background rounded-2xl p-6 border border-emerald-900/5 shadow-sm h-full">
                    <div className="font-display text-4xl font-bold text-emerald-200 mb-4">
                      {item.step}
                    </div>
                    <h3 className="font-display text-xl font-bold text-foreground mb-3">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  {index < approachSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                      <ArrowRight className="w-6 h-6 text-emerald-300" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* The Future */}
        <section className="py-24 px-4 bg-emerald-900 text-emerald-50">
          <div className="container mx-auto max-w-4xl">
            <motion.div {...fadeUp} className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
                The Future of Indian Dreams
              </h2>
            </motion.div>
            <motion.div {...fadeUp} className="space-y-6 text-emerald-100/90 leading-relaxed text-center">
              <p>
                Artificial Intelligence is still in the early stages of its transformation. New models, technologies, applications, and possibilities are emerging every day. We see this as an opportunity.
              </p>
              <p>
                Indian Dreams aims to grow alongside this technological revolution by continuously exploring new AI capabilities and creating experiences that can make them useful for real people.
              </p>
              <p>
                Our long-term goal is to build an ecosystem where users can come to learn, create, experiment, innovate, and build with AI. We want to help create a generation that doesn't simply consume technology — but uses technology to create the future.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Our Promise */}
        <section className="py-24 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <motion.div {...fadeUp}>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-8">
                Our Promise
              </h2>
              <div className="space-y-3 text-muted-foreground leading-relaxed mb-10">
                <p>We will continue to explore.</p>
                <p>We will continue to innovate.</p>
                <p>We will continue to learn.</p>
                <p>And most importantly, we will continue to look for better ways to turn technology into something meaningful for people.</p>
              </div>
              <div className="bg-emerald-50 rounded-2xl p-8 border border-emerald-100">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Because we believe every great innovation starts with an idea. And every great idea starts with a dream.
                </p>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-emerald-800 mb-2">
                  Indian Dreams
                </h3>
                <p className="font-display text-lg text-emerald-600 font-semibold">
                  Dream. Create. Innovate.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 px-4 bg-emerald-900 text-emerald-50">
          <div className="container mx-auto text-center">
            <motion.div {...fadeUp}>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                The future is intelligent. Let's build it together.
              </h2>
              <p className="text-emerald-100/80 max-w-xl mx-auto mb-8">
                Join Indian Dreams today and start turning your ideas into innovation.
              </p>
              <a
                href="/offer"
                className="inline-flex items-center justify-center rounded-full bg-white text-emerald-900 px-8 py-3.5 font-semibold hover:bg-emerald-50 transition-colors"
              >
                Get Started for₹199
              </a>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUs;
