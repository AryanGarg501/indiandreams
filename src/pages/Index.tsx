import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import FeaturesSection from "@/components/FeaturesSection";
import PathsSection from "@/components/PathsSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import StatsSection from "@/components/StatsSection";
import CertificateSection from "@/components/CertificateSection";
import ReviewsSection from "@/components/ReviewsSection";
import ChallengeSection from "@/components/ChallengeSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <TestimonialsCarousel />
      <FeaturesSection />
      <PathsSection />
      <HowItWorksSection />
      <StatsSection />
      <CertificateSection />
      <ReviewsSection />
      <ChallengeSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
