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
            <div className="space-y-4">
              {recommendations.map((card, index) => (
                <div 
                  key={card.name}
                  className="bg-card border border-border rounded-2xl overflow-hidden shadow-soft hover:shadow-card transition-all duration-300 animate-fade-up"
                  style={{ animationDelay: `${(index + 1) * 150}ms` }}
                >
                  <div className="p-6">
                    {/* Card Header */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className="relative">
                        <div className={`w-16 h-10 rounded-lg bg-gradient-to-br ${card.gradient} shadow-lg`} />
                        <div className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-mint text-white text-xs font-bold flex items-center justify-center shadow-md">
                          {card.rank}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-display font-semibold text-lg text-foreground">{card.name}</h3>
                            <p className="text-sm text-muted-foreground">{card.issuer}</p>
                          </div>
                          <div className="flex items-center gap-1 bg-mint/10 text-mint px-3 py-1 rounded-full">
                            <Star className="w-4 h-4 fill-current" />
                            <span className="text-sm font-semibold">{card.matchScore}% Match</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-4 p-4 bg-muted/50 rounded-xl">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Sign-up Bonus</p>
                        <p className="font-semibold text-foreground">{card.bonus}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Annual Fee</p>
                        <p className="font-semibold text-foreground">{card.annualFee}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">APR</p>
                        <p className="font-semibold text-foreground text-sm">{card.apr}</p>
                      </div>
                    </div>

                    {/* Why It's a Match */}
                    <div className="mb-4 p-4 bg-mint/5 border border-mint/10 rounded-xl">
                      <p className="text-sm text-foreground">
                        <span className="font-semibold text-mint">Why it's right for you:</span>{" "}
                        {card.whyMatch}
                      </p>
                    </div>

                    {/* Highlights */}
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {card.highlights.map((highlight) => (
                        <div key={highlight} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Check className="w-4 h-4 text-mint flex-shrink-0" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                      <Button className="flex-1 bg-mint hover:bg-mint/90 text-white">
                        Apply Now
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                      <Button variant="outline" className="flex-1">
                        Compare Details
                      </Button>
                    </div>
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
