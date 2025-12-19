import { useState, FormEvent } from "react";
import { Search, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    if (query.trim()) {
      navigate(`/recommendations?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSearch(searchQuery);
  };

  const handleTagClick = (tag: string) => {
    handleSearch(tag);
  };

  return (
    <section className="relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 right-[10%] w-72 h-72 bg-mint-light rounded-full blur-3xl opacity-60" />
      <div className="absolute bottom-0 left-[5%] w-96 h-96 bg-coral-light rounded-full blur-3xl opacity-40" />
      
      <div className="container mx-auto px-4 pt-8 pb-16 md:pt-16 md:pb-24 lg:pt-24 lg:pb-32 relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-mint-light text-primary text-xs md:text-sm font-medium mb-6 md:mb-8">
            <Sparkles className="w-3 h-3 md:w-4 md:h-4" />
            <span>AI-powered recommendations</span>
          </div>
          
          {/* Headline */}
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-foreground leading-[1.1] tracking-tight mb-4 md:mb-6">
            Find the perfect
            <span className="block text-primary">credit card</span>
            for your lifestyle
          </h1>
          
          {/* Subheadline */}
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6 md:mb-10">
            Compare 350+ cards across rewards, cashback, and travel benefits. 
            <br />
            Get personalized recommendations in seconds.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-xl mx-auto px-2 md:px-0">
            <form onSubmit={handleSubmit} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative flex flex-col md:flex-row items-stretch md:items-center bg-card border border-border rounded-lg md:rounded-2xl shadow-card overflow-hidden">
                <div className="flex items-center flex-1 px-2 md:px-0">
                  <Search className="w-4 h-4 md:w-5 md:h-5 text-muted-foreground ml-1.5 md:ml-5 flex-shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="What are you looking for? e.g., travel rewards"
                    className="flex-1 px-3 md:px-4 py-2.5 md:py-4 bg-transparent text-sm md:text-base text-foreground placeholder:text-muted-foreground focus:outline-none min-w-0"
                  />
                </div>
                <Button type="submit" className="h-8 md:h-10 m-1 md:m-2 rounded-md md:rounded-xl text-sm md:text-base px-3 md:px-6 py-0 md:py-2.5 flex-shrink-0">
                  Search
                  <ArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-1 md:ml-2" />
                </Button>
              </div>
            </form>
            
            {/* Prompt text */}
            <p className="text-base sm:text-lg text-muted-foreground text-center mt-4 md:mt-6">
              Tell me where you are in life and I'll recommend your best card
            </p>
            
            {/* Quick links */}
            <div className="flex flex-col items-center justify-center gap-2 md:gap-3 mt-2 md:mt-3">
              <div className="flex flex-col items-start md:items-center justify-start md:justify-center gap-2 w-full max-w-4xl mx-auto">
                <div className="flex flex-wrap md:flex-nowrap items-center justify-start md:justify-center gap-2 w-full">
                  <button
                    onClick={() => handleTagClick("I make $200k a year and want to travel more")}
                    className="px-2.5 py-1 md:px-3 md:py-1.5 text-xs sm:text-sm font-medium text-secondary-foreground bg-secondary hover:bg-secondary/80 rounded-full transition-colors cursor-pointer whitespace-nowrap"
                  >
                    I make $200k a year and want to travel more
                  </button>
                  <button
                    onClick={() => handleTagClick("I'm a freelancer and need flexible rewards")}
                    className="px-2.5 py-1 md:px-3 md:py-1.5 text-xs sm:text-sm font-medium text-secondary-foreground bg-secondary hover:bg-secondary/80 rounded-full transition-colors cursor-pointer whitespace-nowrap"
                  >
                    I'm a freelancer and need flexible rewards
                  </button>
                </div>
                <div className="flex flex-wrap md:flex-nowrap items-center justify-center md:justify-center gap-2">
                  <button
                    onClick={() => handleTagClick("I'm almost retired and love dining out")}
                    className="px-2.5 py-1 md:px-3 md:py-1.5 text-xs sm:text-sm font-medium text-secondary-foreground bg-secondary hover:bg-secondary/80 rounded-full transition-colors cursor-pointer whitespace-nowrap"
                  >
                    I'm almost retired and love dining out
                  </button>
                  <button
                    onClick={() => handleTagClick("I'm a student and don't have great credit")}
                    className="px-2.5 py-1 md:px-3 md:py-1.5 text-xs sm:text-sm font-medium text-secondary-foreground bg-secondary hover:bg-secondary/80 rounded-full transition-colors cursor-pointer whitespace-nowrap"
                  >
                    I'm a student and don't have great credit
                  </button>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-3 md:mt-4 max-w-2xl mx-auto text-center">
                Some of the credit cards on this site are from partners who pay us when you click or apply. This helps keep the site running, but it doesn't influence our recommendations.
              </p>
            </div>
          </div>
        </div>
        
        {/* Trust indicators */}
        <div className="max-w-3xl mx-auto mt-8 md:mt-16 pt-8 md:pt-12 border-t border-border">
          <div className="grid grid-cols-3 gap-4 md:gap-8 text-center">
            <div>
              <div className="font-display text-2xl sm:text-3xl md:text-4xl font-medium text-foreground">350+</div>
              <div className="text-xs sm:text-sm text-muted-foreground mt-1">Cards Analyzed</div>
            </div>
            <div>
              <div className="font-display text-2xl sm:text-3xl md:text-4xl font-medium text-foreground">1,400+</div>
              <div className="text-xs sm:text-sm text-muted-foreground mt-1">Verified Data Sources</div>
            </div>
            <div>
              <div className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-foreground">AI-Powered</div>
              <div className="text-xs sm:text-sm text-muted-foreground mt-1">Smart Recommendations</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
