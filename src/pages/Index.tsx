import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import QuickStartSection from "@/components/QuickStartSection";
import FeaturedCardsSection from "@/components/FeaturedCardsSection";
import StatsSection from "@/components/StatsSection";
import TrustSection from "@/components/TrustSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="overflow-x-hidden pt-16 md:pt-20">
        <HeroSection />
        <div id="categories">
          <QuickStartSection />
        </div>
        <div id="top-cards">
          <FeaturedCardsSection />
        </div>
        <div id="how-it-works">
          <TrustSection />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
