import CreditCard from "./CreditCard";

const cards = [
  {
    name: "Chase Sapphire Preferred",
    brand: "Chase",
    category: "Travel",
    features: ["5× on Chase-portal travel", "3× on dining", "Flexible Ultimate Rewards transfers"],
    welcomeBonus: "75,000 pts after $5,000 spend",
    annualFee: "$95",
    gradient: "from-blue-600 via-blue-700 to-indigo-800",
    applyUrl: "https://creditcards.chase.com/rewards-credit-cards/sapphire/preferred",
  },
  {
    name: "Citi Double Cash",
    brand: "Citi",
    category: "Cash Back",
    features: ["1% when you buy, 1% when you pay", "Flat-rate on all purchases", "No annual fee"],
    welcomeBonus: "Unlimited 2%",
    annualFee: "$0",
    gradient: "from-emerald-500 via-teal-600 to-cyan-700",
    applyUrl: "https://www.citi.com/credit-cards/citi-double-cash-credit-card",
  },
  {
    name: "Amex Gold Card",
    brand: "American Express",
    category: "Dining",
    features: ["4X on restaurants", "4X on groceries", "$120 dining credit"],
    welcomeBonus: "60,000 points",
    annualFee: "$325",
    gradient: "from-amber-400 via-orange-500 to-rose-600",
    applyUrl: "https://www.americanexpress.com/us/credit-cards/card/gold-card/",
  },
  {
    name: "Capital One Venture X",
    brand: "Capital One",
    category: "Premium Travel",
    features: ["10X on hotels", "5X on flights", "$300 travel credit"],
    welcomeBonus: "75,000 miles",
    annualFee: "$395",
    gradient: "from-violet-600 via-purple-700 to-indigo-800",
    applyUrl: "https://www.capitalone.com/credit-cards/venture-x/",
  },
];

const FeaturedCardsSection = () => {
  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="mb-6 md:mb-10">
            <span className="text-xs md:text-sm uppercase tracking-wider text-coral font-medium mb-2 block">
              Top Cards
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-medium text-foreground">
              Top rated cards
            </h2>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 auto-rows-fr">
            {cards.map((card, index) => (
              <div
                key={card.name}
                className="animate-fade-in h-full w-full flex"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CreditCard
                  name={card.name}
                  brand={card.brand}
                  category={card.category}
                  features={card.features}
                  welcomeBonus={card.welcomeBonus}
                  annualFee={card.annualFee}
                  gradient={card.gradient}
                  applyUrl={card.applyUrl}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCardsSection;
