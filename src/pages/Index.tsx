import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import QuickStartSection from "@/components/QuickStartSection";
import FeaturedCardsSection from "@/components/FeaturedCardsSection";
import StatsSection from "@/components/StatsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <QuickStartSection />
        <FeaturedCardsSection />
        <StatsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
