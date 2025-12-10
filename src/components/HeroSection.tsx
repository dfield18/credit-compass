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
      
      <div className="container mx-auto px-4 pt-16 pb-24 lg:pt-24 lg:pb-32 relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-mint-light text-primary text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4" />
            <span>AI-powered recommendations</span>
          </div>
          
          {/* Headline */}
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium text-foreground leading-[1.1] tracking-tight mb-6">
            Find the perfect
            <span className="block text-primary">credit card</span>
            for your lifestyle
          </h1>
          
          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Compare 350+ cards across rewards, cashback, and travel benefits. 
            Get personalized recommendations in seconds.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-xl mx-auto">
            <form onSubmit={handleSubmit} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative flex items-center bg-card border border-border rounded-2xl shadow-card overflow-hidden">
                <Search className="w-5 h-5 text-muted-foreground ml-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="What are you looking for? e.g., travel rewards"
                  className="flex-1 px-4 py-4 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
                <Button type="submit" className="m-2 rounded-xl">
                  Search
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </form>
            
            {/* Quick links */}
            <div className="flex flex-col items-center justify-center gap-3 mt-6">
              <div className="flex flex-wrap items-center justify-center gap-2">
                <span className="text-sm text-muted-foreground">Popular:</span>
                {["Cash Back", "Travel", "No Annual Fee", "0% APR"].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleTagClick(tag)}
                    className="px-3 py-1.5 text-sm font-medium text-secondary-foreground bg-secondary hover:bg-secondary/80 rounded-full transition-colors cursor-pointer"
                  >
                    {tag}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2 w-full max-w-4xl mx-auto">
                <div className="flex items-center gap-2 -ml-[48px]">
                  <span className="text-sm text-muted-foreground">Very Specific:</span>
                  <button
                    onClick={() => handleTagClick("I'm 40 and make $200k a year and want to travel more")}
                    className="px-3 py-1.5 text-sm font-medium text-secondary-foreground bg-secondary hover:bg-secondary/80 rounded-full transition-colors cursor-pointer"
                  >
                    I'm 40 and make $200k a year and want to travel more
                  </button>
                </div>
                <div className="flex items-center gap-2 ml-[20px]">
                  <button
                    onClick={() => handleTagClick("I'm almost retired and love dining out")}
                    className="px-3 py-1.5 text-sm font-medium text-secondary-foreground bg-secondary hover:bg-secondary/80 rounded-full transition-colors cursor-pointer whitespace-nowrap"
                  >
                    I'm almost retired and love dining out
                  </button>
                  <button
                    onClick={() => handleTagClick("I'm a student and don't have great credit")}
                    className="px-3 py-1.5 text-sm font-medium text-secondary-foreground bg-secondary hover:bg-secondary/80 rounded-full transition-colors cursor-pointer whitespace-nowrap"
                  >
                    I'm a student and don't have great credit
                  </button>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-4 max-w-2xl mx-auto text-center">
                Some of the credit cards on this site are from partners who pay us when you click or apply. This helps keep the site running, but it doesn't influence our recommendations.
              </p>
            </div>
          </div>
        </div>
        
        {/* Trust indicators */}
        <div className="max-w-3xl mx-auto mt-16 pt-12 border-t border-border">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="font-display text-3xl sm:text-4xl font-medium text-foreground">350+</div>
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
