import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const CreditBasics = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-4xl mx-auto">
          <Link to="/guides" className="inline-block mb-6 md:mb-8">
            <Button variant="ghost" size="sm" className="gap-2 text-xs md:text-sm">
              <ArrowLeft className="w-3 h-3 md:w-4 md:h-4" />
              Back to Guides
            </Button>
          </Link>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-foreground mb-6 md:mb-8">
            Credit Basics
          </h1>
          
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <h2 className="text-xl sm:text-2xl font-display font-semibold text-foreground mt-6 md:mt-8 mb-3 md:mb-4">
              The Trust Meter
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4 md:mb-6">
              Start with the not-so-fun truth: your credit score is essentially a "trust meter" that tells lenders how likely you are to pay them back. It isn't a measure of your worth, just a measure of your predictability. The good news is that you don't need to be a financial wizard to hack it; you just need to act boring and reliable.
            </p>
            
            <h2 className="text-2xl font-display font-semibold text-foreground mt-8 mb-4">
              Automate Your Reliability
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-3 md:mb-4">
              The single biggest lever you can pull is your payment history, which accounts for roughly 35% of your <a href="https://www.myfico.com/credit-education/whats-in-your-credit-score" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">FICO score</a>. Because even one slip-up can damage your report for seven years, relying on your memory is a bad strategy.
            </p>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-3 md:mb-4">
              <strong>The Fix:</strong> Set every single account to auto-pay the minimum amount. You can always pay more manually later, but this ensures you never accidentally miss a due date.
            </p>
            
            <h2 className="text-2xl font-display font-semibold text-foreground mt-8 mb-4">
              Master the "Utilization" Hack
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-3 md:mb-4">
              Once your payments are automated, focus on your credit utilization—the amount of credit you're using compared to your limits. While the standard advice is to keep this under 30%, you'll see the best results if you keep it below <a href="https://www.consumerfinance.gov/ask-cfpb/what-is-a-credit-utilization-rate-en-1385/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">10%</a>.
            </p>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-3 md:mb-4">
              <strong>The Secret:</strong> Most issuers report the statement balance, so paying before it closes often results in a lower reported balance.
            </p>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4 md:mb-6">
              <strong>The Myth:</strong> Despite what you might hear, carrying a balance does not help your score. Paying interest is just lighting money on fire.
            </p>
            
            <h2 className="text-2xl font-display font-semibold text-foreground mt-8 mb-4">
              The "Sock Drawer" Method
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-3 md:mb-4">
              It might be tempting to clean house and close that old credit card you never use, but doing so immediately reduces your total available credit—which drives up your utilization ratio. And down the road, when a closed account eventually falls off your report years later, it may slightly reduce your average account age.
            </p>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-3 md:mb-4">
              <strong>The Strategy:</strong> If the card has no annual fee, keep it open. Throw it in a <a href="https://www.equifax.com/personal/education/credit-cards/closing-credit-card-impact-credit-score/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">sock drawer</a> and use it occasionally (every 6–12 months) to reduce the risk of issuer closure. This preserves your total credit limit and anchors the "age" of your credit file, making you look more stable to lenders.
            </p>
            
            <h2 className="text-2xl font-display font-semibold text-foreground mt-8 mb-4">
              Don't Look Desperate
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4 md:mb-6">
              Every time you apply for a new card, you trigger a "hard inquiry." One is fine, but a flurry of them makes you look desperate for cash. A common rule of thumb is to space applications by a few months, unless you're following a specific issuer strategy.
            </p>
            
            <h2 className="text-2xl font-display font-semibold text-foreground mt-8 mb-4">
              Check the Facts
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              If you do all this and your score still isn't moving, the system might be wrong. Errors are more common than you think. Grab your <a href="https://www.annualcreditreport.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">free reports</a> and check for accounts you don't recognize. Disputing errors can be one of the fastest legitimate ways to improve your score, though results aren't always immediate.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CreditBasics;

