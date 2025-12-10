import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Reviews = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-foreground mb-4 md:mb-8">
          The Best Credit Card Review Sites: Who to Trust and Why
          </h1>
          
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <p className="text-base sm:text-lg text-muted-foreground mb-6 md:mb-8 leading-relaxed">
              Choosing the right credit card can feel overwhelming, especially when every site promises the "best" card for you. To make the process easier, we've pulled together a summary of the most trusted credit-card review websites on the internet—large publishers, independent experts, and niche sites that dig into specific reward strategies. Each site brings something unique: some offer deep data, others offer hands-on testing, and some specialize in maximizing travel points. Here's a look at the best places to research before you apply.
            </p>

            <ol className="space-y-6 md:space-y-8 list-none pl-0">
              <li className="space-y-2">
                <h2 className="text-xl sm:text-2xl font-display font-semibold text-foreground mb-2">
                  1. NerdWallet
                </h2>
                <p className="mb-2 font-medium text-foreground">
                  Best for: The Generalist
                </p>
                <p className="mb-2">
                  <a 
                    href="https://www.nerdwallet.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline font-medium"
                  >
                    https://www.nerdwallet.com
                  </a>
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  NerdWallet is the household name in this space for a reason. They have massive datasets and a clean, easy-to-use interface. Their strength isn't necessarily niche strategies, but rather accessibility. If you need a simple comparison tool to filter by credit score or annual fee—or if you just need "APR" explained in plain English—this is the best starting point.
                </p>
              </li>

              <li className="space-y-2">
                <h2 className="text-xl sm:text-2xl font-display font-semibold text-foreground mb-2">
                  2. The Points Guy (TPG)
                </h2>
                <p className="mb-2 font-medium text-foreground">
                  Best for: Travel Maximizers
                </p>
                <p className="mb-2">
                  <a 
                    href="https://www.thepointsguy.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline font-medium"
                  >
                    https://www.thepointsguy.com
                  </a>
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  If your goal is flying first class for pennies, TPG is the authority. They don't just review cards; they assign dollar values to points and miles, which is critical for doing the math on an annual fee. They are travel-heavy, so expect deep dives on airline transfer partners and lounge access rather than low-interest balance transfers.
                </p>
              </li>

              <li className="space-y-2">
                <h2 className="text-xl sm:text-2xl font-display font-semibold text-foreground mb-2">
                  3. Bankrate
                </h2>
                <p className="mb-2 font-medium text-foreground">
                  Best for: Just the Numbers
                </p>
                <p className="mb-2">
                  <a 
                    href="https://www.bankrate.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline font-medium"
                  >
                    https://www.bankrate.com
                  </a>
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Bankrate is the "old guard" of financial data. You go here when you want the nuts and bolts without the fluff. Their reviews are highly structured and focused on the math: interest rates, fees, and long-term costs. It's less about "lifestyle" and more about the raw financial terms.
                </p>
              </li>

              <li className="space-y-2">
                <h2 className="text-xl sm:text-2xl font-display font-semibold text-foreground mb-2">
                  4. Credit Karma
                </h2>
                <p className="mb-2 font-medium text-foreground">
                  Best for: Approval Odds
                </p>
                <p className="mb-2">
                  <a 
                    href="https://www.creditkarma.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline font-medium"
                  >
                    https://www.creditkarma.com
                  </a>
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Credit Karma operates differently than an editorial site. Because they have access to your credit profile, their value proposition is personalization. They are excellent for answering the question, "Will I actually get approved for this?" just don't expect the deep strategy guides you'll find on TPG or Doctor of Credit.
                </p>
              </li>

              <li className="space-y-2">
                <h2 className="text-xl sm:text-2xl font-display font-semibold text-foreground mb-2">
                  5. CNBC Select
                </h2>
                <p className="mb-2 font-medium text-foreground">
                  Best for: Mainstream Reliability
                </p>
                <p className="mb-2">
                  <a 
                    href="https://www.cnbc.com/select" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline font-medium"
                  >
                    https://www.cnbc.com/select
                  </a>
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  CNBC brings a rigorous, journalistic approach to their reviews. They are particularly good at "real world" testing—breaking down exactly how much value an average person (not a super-user) will get out of a card. It's straightforward, high-quality editorial content without the jargon.
                </p>
              </li>

              <li className="space-y-2">
                <h2 className="text-xl sm:text-2xl font-display font-semibold text-foreground mb-2">
                  6. Doctor of Credit
                </h2>
                <p className="mb-2 font-medium text-foreground">
                  Best for: The Hardcore Enthusiast
                </p>
                <p className="mb-2">
                  <a 
                    href="https://www.doctorofcredit.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline font-medium"
                  >
                    https://www.doctorofcredit.com
                  </a>
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  This is the anti-influencer site. It's not flashy, but it is the favorite among churners and serious points enthusiasts. They cover the things big sites usually miss: specific bank rules, hard-pull data points, and aggressive sign-up bonuses. If you want the unfiltered truth about a bank's policies, go here.
                </p>
              </li>

              <li className="space-y-2">
                <h2 className="text-xl sm:text-2xl font-display font-semibold text-foreground mb-2">
                  7. US News Best Credit Cards
                </h2>
                <p className="mb-2 font-medium text-foreground">
                  Best for: Rankings
                </p>
                <p className="mb-2">
                  <a 
                    href="https://creditcards.usnews.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline font-medium"
                  >
                    https://creditcards.usnews.com
                  </a>
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  US News takes the same approach to cards as they do to colleges: strict, methodology-based rankings. They are transparent about how they score fees vs. rewards. If you like seeing a numerical score and reading long-form guides on specific categories (like "Best Student Cards"), they are a solid resource.
                </p>
              </li>

              <li className="space-y-2">
                <h2 className="text-xl sm:text-2xl font-display font-semibold text-foreground mb-2">
                  8. Forbes Advisor
                </h2>
                <p className="mb-2 font-medium text-foreground">
                  Best for: Value Calculations
                </p>
                <p className="mb-2">
                  <a 
                    href="https://www.forbes.com/advisor/credit-cards" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline font-medium"
                  >
                    https://www.forbes.com/advisor/credit-cards
                  </a>
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Forbes Advisor is great for the analytical reader. Their reviews usually focus heavily on the "Year One" value of a card, doing the math on welcome bonuses minus the annual fee. It's a balanced, trustworthy source if you want to see the potential ROI of a card before you commit.
                </p>
              </li>
            </ol>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Reviews;

