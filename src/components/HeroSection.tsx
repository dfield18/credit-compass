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
      {/* Decorative elements - reduced on mobile */}
      <div className="absolute top-20 right-[10%] w-72 h-72 bg-mint-light rounded-full blur-3xl opacity-60 hidden md:block" />
      <div className="absolute bottom-0 left-[5%] w-96 h-96 bg-coral-light rounded-full blur-3xl opacity-40 hidden md:block" />
      
      <div className="container mx-auto px-4 pt-6 pb-10 md:pt-16 md:pb-20 lg:pt-24 lg:pb-28 relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-mint-light text-primary text-xs md:text-sm font-medium mb-5 md:mb-8">
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
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6 md:mb-10 px-2">
            Compare 350+ cards across rewards, cashback, and travel benefits. 
            <span className="hidden md:inline"><br /></span>
            <span className="md:hidden"> </span>
            Get personalized recommendations in seconds.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-xl md:max-w-[37.8rem] mx-auto px-2 md:px-0">
            {/* Mobile: Separate search bar and questions */}
            <div className="md:hidden">
              <form onSubmit={handleSubmit} className="relative group">
                <div className="relative flex flex-col gap-2 bg-card border border-border rounded-xl shadow-card overflow-hidden">
                  <div className="flex items-center flex-1 px-4 py-3">
                    <Search className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="What are you looking for?"
                      className="flex-1 px-3 py-2 bg-transparent text-base text-foreground placeholder:text-muted-foreground focus:outline-none min-w-0"
                    />
                  </div>
                  <Button type="submit" className="h-11 mx-2 mb-2 rounded-lg text-base px-6 py-2.5">
                    Search
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </form>
              
              {/* Prompt text */}
              <p className="text-sm sm:text-base text-muted-foreground text-center mt-4 px-2">
                Tell me where you are in life and I'll recommend your best card
              </p>
              
              {/* Quick links - Mobile: 2 per row */}
              <div className="flex flex-col items-center justify-center gap-3 mt-4">
                <div className="grid grid-cols-2 items-stretch justify-center gap-3 w-full max-w-4xl mx-auto px-2">
                  <button
                    onClick={() => handleTagClick("I earn $200k and want to travel more")}
                    className="px-4 py-2.5 text-sm font-medium text-secondary-foreground bg-secondary border border-border/30 shadow-sm hover:bg-secondary/80 active:bg-secondary/70 active:scale-[0.98] rounded-xl transition-all cursor-pointer text-center leading-tight min-h-[44px] touch-manipulation"
                  >
                    I earn $200k and want to travel more
                  </button>
                  <button
                    onClick={() => handleTagClick("I'm a freelancer and need flexible rewards")}
                    className="px-4 py-2.5 text-sm font-medium text-secondary-foreground bg-secondary border border-border/30 shadow-sm hover:bg-secondary/80 active:bg-secondary/70 active:scale-[0.98] rounded-xl transition-all cursor-pointer text-center leading-tight min-h-[44px] touch-manipulation"
                  >
                    I'm a freelancer and need flexible rewards
                  </button>
                  <button
                    onClick={() => handleTagClick("I'm almost retired and love dining out")}
                    className="px-4 py-2.5 text-sm font-medium text-secondary-foreground bg-secondary border border-border/30 shadow-sm hover:bg-secondary/80 active:bg-secondary/70 active:scale-[0.98] rounded-xl transition-all cursor-pointer text-center leading-tight min-h-[44px] touch-manipulation"
                  >
                    I'm almost retired and love dining out
                  </button>
                  <button
                    onClick={() => handleTagClick("I'm a student and don't have great credit")}
                    className="px-4 py-2.5 text-sm font-medium text-secondary-foreground bg-secondary border border-border/30 shadow-sm hover:bg-secondary/80 active:bg-secondary/70 active:scale-[0.98] rounded-xl transition-all cursor-pointer text-center leading-tight min-h-[44px] touch-manipulation"
                  >
                    I'm a student and don't have great credit
                  </button>
                </div>
                <p className="text-xs text-muted-foreground mt-2 max-w-2xl mx-auto text-center px-4">
                  Some of the credit cards on this site are from partners who pay us when you click or apply. This helps keep the site running, but it doesn't influence our recommendations.
                </p>
              </div>
            </div>

            {/* Desktop: Search bar with embedded questions */}
            <div className="hidden md:block">
              <form onSubmit={handleSubmit} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative bg-card border border-border rounded-2xl shadow-card overflow-hidden">
                  {/* Search input */}
                  <div className="flex flex-row items-center bg-card border-b border-border">
                    <div className="flex items-center flex-1 px-5">
                      <Search className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="What are you looking for? e.g., travel rewards"
                        className="flex-1 px-4 py-4 bg-transparent text-base text-foreground placeholder:text-muted-foreground focus:outline-none min-w-0"
                      />
                    </div>
                    <Button type="submit" className="h-10 m-2 rounded-xl text-base px-6 py-2.5 flex-shrink-0">
                      Search
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                  
                  {/* Embedded suggested questions */}
                  <div className="p-4">
                    <p className="text-sm text-muted-foreground text-center mb-4">
                      Tell me where you are in life and I'll recommend your best card
                    </p>
                    <div className="grid grid-cols-2 items-stretch justify-center gap-3">
                      <button
                        onClick={() => handleTagClick("I earn $200k and want to travel more")}
                        className="px-4 py-2.5 text-xs font-medium text-secondary-foreground bg-secondary border border-border/30 shadow-sm hover:bg-secondary/80 active:bg-secondary/70 active:scale-[0.98] rounded-xl transition-all cursor-pointer text-center leading-tight min-h-[44px] touch-manipulation"
                      >
                        I earn $200k and want to travel more
                      </button>
                      <button
                        onClick={() => handleTagClick("I'm a freelancer and need flexible rewards")}
                        className="px-4 py-2.5 text-xs font-medium text-secondary-foreground bg-secondary border border-border/30 shadow-sm hover:bg-secondary/80 active:bg-secondary/70 active:scale-[0.98] rounded-xl transition-all cursor-pointer text-center leading-tight min-h-[44px] touch-manipulation"
                      >
                        I'm a freelancer and need flexible rewards
                      </button>
                      <button
                        onClick={() => handleTagClick("I'm almost retired and love dining out")}
                        className="px-4 py-2.5 text-xs font-medium text-secondary-foreground bg-secondary border border-border/30 shadow-sm hover:bg-secondary/80 active:bg-secondary/70 active:scale-[0.98] rounded-xl transition-all cursor-pointer text-center leading-tight min-h-[44px] touch-manipulation"
                      >
                        I'm almost retired and love dining out
                      </button>
                      <button
                        onClick={() => handleTagClick("I'm a student and don't have great credit")}
                        className="px-4 py-2.5 text-xs font-medium text-secondary-foreground bg-secondary border border-border/30 shadow-sm hover:bg-secondary/80 active:bg-secondary/70 active:scale-[0.98] rounded-xl transition-all cursor-pointer text-center leading-tight min-h-[44px] touch-manipulation"
                      >
                        I'm a student and don't have great credit
                      </button>
                    </div>
                  </div>
                </div>
              </form>
              <p className="text-xs text-muted-foreground mt-4 max-w-2xl mx-auto text-center">
                Some of the credit cards on this site are from partners who pay us when you click or apply. This helps keep the site running, but it doesn't influence our recommendations.
              </p>
            </div>
          </div>
        </div>
        
        {/* Trust indicators */}
        <div className="max-w-3xl mx-auto mt-8 md:mt-16 pt-6 md:pt-12 border-t border-border">
          <div className="grid grid-cols-3 gap-3 md:gap-8 text-center">
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
