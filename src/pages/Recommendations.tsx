import { useState } from "react";
import { ArrowLeft, Sparkles, Star, Check, ChevronRight, ThumbsUp, ThumbsDown, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Recommendations = () => {
  const [feedback, setFeedback] = useState<string | null>(null);

  const userQuery = "What's the best travel credit card with no annual fee for someone who flies 2-3 times a year?";

  const recommendations = [
    {
      rank: 1,
      name: "Chase Sapphire Preferred®",
      issuer: "Chase",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop",
      matchScore: 94,
      bonus: "60,000 Points",
      annualFee: "$95",
      apr: "21.49% - 28.49%",
      highlights: [
        "3x points on dining & travel",
        "No foreign transaction fees",
        "Trip cancellation insurance",
        "Points transfer to 14+ airlines"
      ],
      whyMatch: "Perfect for occasional travelers. The $95 fee is easily offset by the travel credits and point multipliers on your 2-3 annual trips.",
      gradient: "from-blue-600 to-indigo-700"
    },
    {
      rank: 2,
      name: "Capital One VentureOne",
      issuer: "Capital One",
      image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=250&fit=crop",
      matchScore: 89,
      bonus: "20,000 Miles",
      annualFee: "$0",
      apr: "19.99% - 29.99%",
      highlights: [
        "1.25x miles on every purchase",
        "No foreign transaction fees",
        "No annual fee ever",
        "Miles don't expire"
      ],
      whyMatch: "True no-annual-fee option. While rewards are lower, you'll never worry about offsetting a fee with your travel frequency.",
      gradient: "from-emerald-500 to-teal-600"
    },
    {
      rank: 3,
      name: "Discover it® Miles",
      issuer: "Discover",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=250&fit=crop",
      matchScore: 85,
      bonus: "Unlimited Match",
      annualFee: "$0",
      apr: "18.24% - 28.24%",
      highlights: [
        "1.5x miles on all purchases",
        "First year miles matched",
        "No foreign transaction fees",
        "Free FICO score"
      ],
      whyMatch: "The first-year match effectively doubles your rewards, making it great for building up travel funds before your trips.",
      gradient: "from-orange-500 to-rose-500"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="icon" className="rounded-full">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-mint to-coral flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-display font-semibold text-foreground">CardWise AI</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* User Query */}
        <div className="flex justify-end mb-6">
          <div className="max-w-lg bg-mint/10 border border-mint/20 rounded-2xl rounded-br-md px-5 py-4">
            <p className="text-foreground">{userQuery}</p>
          </div>
        </div>

        {/* AI Response */}
        <div className="flex gap-4 mb-8">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-mint to-coral flex items-center justify-center shadow-soft">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
          </div>
          <div className="flex-1 space-y-6">
            {/* Intro Message */}
            <div className="bg-card border border-border rounded-2xl rounded-tl-md p-6 shadow-soft animate-fade-up">
              <p className="text-foreground leading-relaxed">
                Great question! For <span className="font-semibold text-mint">occasional travelers (2-3 flights/year)</span>, 
                I've analyzed 847 travel cards and found 3 that match your needs perfectly. Here's what I recommend, 
                ranked by how well they fit your travel style:
              </p>
            </div>

            {/* Recommendations */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recommendations.map((card, index) => (
                <div 
                  key={card.name}
                  className="bg-card border border-border rounded-2xl overflow-hidden shadow-soft hover:shadow-card transition-all duration-300 animate-fade-up flex flex-col"
                  style={{ animationDelay: `${(index + 1) * 150}ms` }}
                >
                  <div className="p-5 flex flex-col flex-1">
                    {/* Card Header */}
                    <div className="flex items-start gap-3 mb-4">
                      <div className="relative">
                        <div className={`w-14 h-9 rounded-lg bg-gradient-to-br ${card.gradient} shadow-lg`} />
                        <div className="absolute -top-2 -left-2 w-5 h-5 rounded-full bg-mint text-white text-xs font-bold flex items-center justify-center shadow-md">
                          {card.rank}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-display font-semibold text-base text-foreground leading-tight">{card.name}</h3>
                        <p className="text-xs text-muted-foreground">{card.issuer}</p>
                      </div>
                    </div>

                    {/* Match Score */}
                    <div className="flex items-center gap-1 bg-mint/10 text-mint px-3 py-1.5 rounded-full w-fit mb-4">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span className="text-sm font-semibold">{card.matchScore}% Match</span>
                    </div>

                    {/* Quick Stats */}
                    <div className="space-y-2 mb-4 p-3 bg-muted/50 rounded-xl">
                      <div className="flex justify-between">
                        <p className="text-xs text-muted-foreground">Bonus</p>
                        <p className="text-xs font-semibold text-foreground">{card.bonus}</p>
                      </div>
                      <div className="flex justify-between">
                        <p className="text-xs text-muted-foreground">Annual Fee</p>
                        <p className="text-xs font-semibold text-foreground">{card.annualFee}</p>
                      </div>
                      <div className="flex justify-between">
                        <p className="text-xs text-muted-foreground">APR</p>
                        <p className="text-xs font-semibold text-foreground">{card.apr}</p>
                      </div>
                    </div>

                    {/* Highlights */}
                    <div className="space-y-1.5 mb-4 flex-1">
                      {card.highlights.slice(0, 3).map((highlight) => (
                        <div key={highlight} className="flex items-start gap-2 text-xs text-muted-foreground">
                          <Check className="w-3.5 h-3.5 text-mint flex-shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>

                    {/* Actions */}
                    <Button className="w-full bg-mint hover:bg-mint/90 text-white mt-auto">
                      Apply Now
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Follow-up */}
            <div className="bg-card border border-border rounded-2xl p-6 shadow-soft animate-fade-up" style={{ animationDelay: "600ms" }}>
              <p className="text-foreground mb-4">
                Want me to dive deeper into any of these cards, or would you like recommendations based on different criteria?
              </p>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" className="rounded-full">
                  Compare all three cards
                </Button>
                <Button variant="outline" size="sm" className="rounded-full">
                  Show me cards with higher rewards
                </Button>
                <Button variant="outline" size="sm" className="rounded-full">
                  What about business travel cards?
                </Button>
              </div>
            </div>

            {/* Feedback */}
            <div className="flex items-center gap-4 pt-4 border-t border-border animate-fade-up" style={{ animationDelay: "750ms" }}>
              <span className="text-sm text-muted-foreground">Was this helpful?</span>
              <div className="flex items-center gap-2">
                <Button 
                  variant={feedback === "up" ? "default" : "ghost"} 
                  size="icon" 
                  className={`rounded-full w-8 h-8 ${feedback === "up" ? "bg-mint text-white" : ""}`}
                  onClick={() => setFeedback("up")}
                >
                  <ThumbsUp className="w-4 h-4" />
                </Button>
                <Button 
                  variant={feedback === "down" ? "default" : "ghost"} 
                  size="icon" 
                  className={`rounded-full w-8 h-8 ${feedback === "down" ? "bg-coral text-white" : ""}`}
                  onClick={() => setFeedback("down")}
                >
                  <ThumbsDown className="w-4 h-4" />
                </Button>
              </div>
              <Button variant="ghost" size="sm" className="ml-auto text-muted-foreground">
                <RotateCcw className="w-4 h-4 mr-2" />
                Regenerate
              </Button>
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="sticky bottom-0 bg-background/80 backdrop-blur-xl pt-4 pb-6 border-t border-border -mx-4 px-4 sm:-mx-6 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Ask a follow-up question..."
                className="w-full px-5 py-4 pr-24 rounded-2xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-mint/50 focus:border-mint shadow-soft"
              />
              <Button className="absolute right-2 top-1/2 -translate-y-1/2 bg-mint hover:bg-mint/90 text-white rounded-xl">
                <Sparkles className="w-4 h-4 mr-2" />
                Ask
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Recommendations;
