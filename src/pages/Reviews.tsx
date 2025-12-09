import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Reviews = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-display font-bold text-foreground mb-8">
            Top Credit Card Review Websites: A Guide to the Best Sources Online
          </h1>
          
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <p className="text-lg text-muted-foreground mb-8">
              Choosing the right credit card can feel overwhelming, especially when every site promises the "best" card for you. To make the process easier, we've pulled together a summary of the most trusted credit-card review websites on the internet—large publishers, independent experts, and niche sites that dig into specific reward strategies. Each site brings something unique: some offer deep data, others offer hands-on testing, and some specialize in maximizing travel points. Here's a look at the best places to research before you apply.
            </p>

            <ol className="space-y-8 list-none pl-0">
              <li className="space-y-2">
                <h2 className="text-2xl font-display font-semibold text-foreground mb-2">
                  1. NerdWallet
                </h2>
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
                  NerdWallet is one of the biggest names in personal finance, and for good reason. Their credit-card reviews are comprehensive, updated frequently, and backed by large datasets and proprietary scoring models. NerdWallet's standout feature is its easy-to-use comparison tools, letting you filter cards by rewards, credit score, annual fee, and more. They also excel at beginner-friendly explanations, making complex topics like point valuations or balance transfers accessible.
                </p>
              </li>

              <li className="space-y-2">
                <h2 className="text-2xl font-display font-semibold text-foreground mb-2">
                  2. The Points Guy (TPG)
                </h2>
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
                  The Points Guy is the go-to site for anyone who wants to maximize travel rewards. Their credit-card reviews include detailed valuations of points and miles, ranking systems, and expert recommendations tailored to travel goals. TPG often gets early access to new card launches, updates bonus valuations regularly, and publishes travel-focused strategy guides that go far deeper than most mainstream finance sites.
                </p>
              </li>

              <li className="space-y-2">
                <h2 className="text-2xl font-display font-semibold text-foreground mb-2">
                  3. Bankrate
                </h2>
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
                  Bankrate is a long-established financial publisher known for its data accuracy and thorough research. Their credit-card reviews are highly structured and include transparent comparisons of rates, fees, interest costs, and introductory offers. Bankrate is especially useful if you're interested in the financial nuts and bolts—APRs, balance transfer details, or long-term cost considerations.
                </p>
              </li>

              <li className="space-y-2">
                <h2 className="text-2xl font-display font-semibold text-foreground mb-2">
                  4. Credit Karma
                </h2>
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
                  Credit Karma provides personalized card recommendations based on your credit profile, which makes it different from purely editorial review sites. Its breakdowns are simple, visual, and driven by the user's likelihood of approval. While not as deep on points and travel strategies, it's excellent for understanding which cards you might realistically qualify for.
                </p>
              </li>

              <li className="space-y-2">
                <h2 className="text-2xl font-display font-semibold text-foreground mb-2">
                  5. CNBC Select
                </h2>
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
                  CNBC Select blends editorial rigor with clear, concise comparisons. Their reviews often include real spend-profile testing, showing how much value a typical user might get from a card. They also conduct hands-on evaluations of perks like travel credits, lounge access, and purchase protections. If you want trusted mainstream editorial standards plus straightforward breakdowns, CNBC Select is a strong resource.
                </p>
              </li>

              <li className="space-y-2">
                <h2 className="text-2xl font-display font-semibold text-foreground mb-2">
                  6. Doctor of Credit
                </h2>
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
                  A favorite among points and miles enthusiasts, Doctor of Credit covers deals, niche cards, application rules, and bank policies that most large sites overlook. Their reviews aren't flashy, but they're exceptionally detailed and often include information you won't find anywhere else—like approval data points and hard-to-spot bonus opportunities.
                </p>
              </li>

              <li className="space-y-2">
                <h2 className="text-2xl font-display font-semibold text-foreground mb-2">
                  7. US News Best Credit Cards
                </h2>
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
                  US News offers a research-heavy approach, assigning numerical ratings based on fees, rewards, flexibility, and customer satisfaction. Their methodology is fully transparent, and they produce longform guides comparing categories like cash-back cards, student cards, or balance transfer offers.
                </p>
              </li>

              <li className="space-y-2">
                <h2 className="text-2xl font-display font-semibold text-foreground mb-2">
                  8. Forbes Advisor
                </h2>
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
                  Forbes Advisor provides expert-written card reviews and well-structured rankings with a focus on value calculations. Their coverage is balanced and especially good for readers who want a highly analytical look at welcome bonuses, rewards categories, and estimated yearly value.
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

