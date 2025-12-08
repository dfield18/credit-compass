import { useState } from "react";
import { ArrowLeft, Sparkles, ThumbsUp, ThumbsDown, RotateCcw, BookOpen, TrendingUp, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const BasicQuestion = () => {
  const [feedback, setFeedback] = useState<string | null>(null);

  const userQuery = "What is APR?";

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4">
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

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        {/* User Query */}
        <div className="flex justify-end mb-6">
          <div className="max-w-md bg-mint/10 border border-mint/20 rounded-2xl rounded-br-md px-5 py-4">
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
          <div className="flex-1 space-y-5">
            {/* Main Answer */}
            <div className="bg-card border border-border rounded-2xl rounded-tl-md p-6 shadow-soft animate-fade-up">
              <h2 className="font-display font-semibold text-xl text-foreground mb-4">
                APR (Annual Percentage Rate)
              </h2>
              <p className="text-foreground leading-relaxed mb-4">
                <span className="font-semibold text-mint">APR</span> stands for Annual Percentage Rate. 
                It represents the yearly cost of borrowing money on your credit card, expressed as a percentage. 
                This includes not just the interest rate, but also any fees associated with the loan.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                For example, if your credit card has an APR of 20%, and you carry a $1,000 balance for a full year, 
                you'd pay approximately $200 in interest charges.
              </p>
            </div>

            {/* Key Points */}
            <div className="bg-card border border-border rounded-2xl p-6 shadow-soft animate-fade-up" style={{ animationDelay: "150ms" }}>
              <h3 className="font-display font-semibold text-lg text-foreground mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-mint" />
                Key Things to Know
              </h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-mint/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-mint font-semibold text-sm">1</span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Variable vs. Fixed APR</p>
                    <p className="text-sm text-muted-foreground">Most credit cards have variable APRs that can change based on market conditions.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-mint/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-mint font-semibold text-sm">2</span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Grace Period</p>
                    <p className="text-sm text-muted-foreground">If you pay your balance in full each month, you typically won't pay any interest.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-mint/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-mint font-semibold text-sm">3</span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Multiple APRs</p>
                    <p className="text-sm text-muted-foreground">Cards often have different APRs for purchases, balance transfers, and cash advances.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Tip */}
            <div className="bg-coral/5 border border-coral/20 rounded-2xl p-5 animate-fade-up" style={{ animationDelay: "300ms" }}>
              <div className="flex gap-3">
                <AlertCircle className="w-5 h-5 text-coral flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-foreground mb-1">Pro Tip</p>
                  <p className="text-sm text-muted-foreground">
                    A good APR for credit cards is typically below 15%. If you carry a balance regularly, 
                    prioritizing a lower APR over rewards can save you more money in the long run.
                  </p>
                </div>
              </div>
            </div>

            {/* Follow-up */}
            <div className="bg-card border border-border rounded-2xl p-6 shadow-soft animate-fade-up" style={{ animationDelay: "450ms" }}>
              <p className="text-foreground mb-4">
                Want to learn more about credit card terms, or shall I help you find cards with low APRs?
              </p>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" className="rounded-full">
                  What's the difference between APR and interest rate?
                </Button>
                <Button variant="outline" size="sm" className="rounded-full">
                  Find low APR cards for me
                </Button>
                <Button variant="outline" size="sm" className="rounded-full">
                  How is APR calculated?
                </Button>
              </div>
            </div>

            {/* Feedback */}
            <div className="flex items-center gap-4 pt-4 border-t border-border animate-fade-up" style={{ animationDelay: "600ms" }}>
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

export default BasicQuestion;