import { Search, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <section className="relative min-h-[90vh] flex items-center bg-hero overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse-soft delay-500" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-primary/5 to-transparent rounded-full" />
      </div>

      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(hsl(0 0% 100% / 0.1) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100% / 0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="container mx-auto px-4 relative z-10 pt-24">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-glass-dark border border-primary/20 mb-8 animate-fade-up">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary-foreground/90">
              AI-Powered Recommendations
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 animate-fade-up delay-100">
            Find Your{" "}
            <span className="text-gradient-primary">Perfect</span>
            <br />
            Credit Card
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-primary-foreground/70 max-w-2xl mx-auto mb-10 animate-fade-up delay-200">
            Get personalized credit card recommendations powered by AI. 
            Compare 300+ cards and find the one that fits your lifestyle.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8 animate-fade-up delay-300">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 to-primary/30 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
              <div className="relative flex items-center bg-card rounded-xl shadow-xl overflow-hidden">
                <div className="flex-1 flex items-center px-5 py-4">
                  <Search className="w-5 h-5 text-muted-foreground mr-3 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Ask about credit cards, rewards, travel perks..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none text-base"
                  />
                </div>
                <div className="pr-2">
                  <Button variant="hero" size="lg" className="rounded-lg">
                    <Search className="w-4 h-4 mr-2" />
                    Search
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-6 mt-4 text-sm text-primary-foreground/50">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                Enter to send
              </span>
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-primary" />
                Instant AI recommendations
              </span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center justify-center gap-3 animate-fade-up delay-400">
            <Button variant="glass" size="sm" className="rounded-full">
              Best Travel Cards
              <ArrowRight className="w-3 h-3 ml-1" />
            </Button>
            <Button variant="glass" size="sm" className="rounded-full">
              Cash Back Cards
              <ArrowRight className="w-3 h-3 ml-1" />
            </Button>
            <Button variant="glass" size="sm" className="rounded-full">
              No Annual Fee
              <ArrowRight className="w-3 h-3 ml-1" />
            </Button>
          </div>
        </div>
      </div>

      {/* Floating Cards Decoration */}
      <div className="absolute bottom-10 left-10 w-48 h-32 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl rotate-[-15deg] blur-sm opacity-50 animate-float hidden lg:block" />
      <div className="absolute top-32 right-16 w-40 h-28 bg-gradient-to-br from-gold/20 to-gold/5 rounded-2xl rotate-[12deg] blur-sm opacity-50 animate-float-delayed hidden lg:block" />
    </section>
  );
};

export default HeroSection;
