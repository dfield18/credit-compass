import { Search, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 right-[10%] w-72 h-72 bg-mint-light rounded-full blur-3xl opacity-60" />
      <div className="absolute bottom-0 left-[5%] w-96 h-96 bg-coral-light rounded-full blur-3xl opacity-40" />
      
      <div className="container mx-auto px-4 pt-16 pb-24 lg:pt-24 lg:pb-32 relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-mint-light text-primary text-sm font-medium mb-8 animate-fade-up">
            <Sparkles className="w-4 h-4" />
            <span>AI-powered recommendations</span>
          </div>
          
          {/* Headline */}
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium text-foreground leading-[1.1] tracking-tight mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Find the perfect
            <span className="block text-primary">credit card</span>
            for your lifestyle
          </h1>
          
          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Compare 500+ cards across rewards, cashback, and travel benefits. 
            Get personalized recommendations in seconds.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-xl mx-auto animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative flex items-center bg-card border border-border rounded-2xl shadow-card overflow-hidden">
                <Search className="w-5 h-5 text-muted-foreground ml-5" />
                <input
                  type="text"
                  placeholder="What are you looking for? e.g., travel rewards"
                  className="flex-1 px-4 py-4 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
                <Button className="m-2 rounded-xl">
                  Search
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
            
            {/* Quick links */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
              <span className="text-sm text-muted-foreground">Popular:</span>
              {["Cash Back", "Travel", "No Annual Fee", "0% APR"].map((tag) => (
                <button
                  key={tag}
                  className="px-3 py-1.5 text-sm font-medium text-secondary-foreground bg-secondary hover:bg-secondary/80 rounded-full transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Trust indicators */}
        <div className="max-w-3xl mx-auto mt-16 pt-12 border-t border-border animate-fade-up" style={{ animationDelay: "0.4s" }}>
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="font-display text-3xl sm:text-4xl font-medium text-foreground">300+</div>
              <div className="text-sm text-muted-foreground mt-1">Cards Analyzed</div>
            </div>
            <div>
              <div className="font-display text-3xl sm:text-4xl font-medium text-foreground">1,400+</div>
              <div className="text-sm text-muted-foreground mt-1">Verified Data Sources</div>
            </div>
            <div>
              <div className="font-display text-3xl sm:text-4xl font-medium text-foreground">AI-Powered</div>
              <div className="text-sm text-muted-foreground mt-1">Smart Recommendations</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
