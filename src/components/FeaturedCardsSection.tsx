import { Star, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const cards = [
  {
    name: "Chase Sapphire Preferred",
    issuer: "Chase",
    category: "Travel",
    rating: 4.9,
    bonus: "60,000 points",
    bonusValue: "$750",
    annualFee: "$95",
    apr: "21.49% - 28.49%",
    highlights: ["3X on dining", "2X on travel", "No foreign fees"],
    gradient: "from-blue-600 via-blue-700 to-indigo-800",
    featured: true,
  },
  {
    name: "Citi Double Cash",
    issuer: "Citi",
    category: "Cash Back",
    rating: 4.8,
    bonus: "Unlimited 2%",
    bonusValue: "$200/yr avg",
    annualFee: "$0",
    apr: "18.99% - 28.99%",
    highlights: ["1% when you buy", "1% when you pay", "No categories"],
    gradient: "from-emerald-500 via-teal-600 to-cyan-700",
    featured: false,
  },
  {
    name: "Amex Gold Card",
    issuer: "American Express",
    category: "Dining",
    rating: 4.9,
    bonus: "60,000 points",
    bonusValue: "$600",
    annualFee: "$250",
    apr: "See terms",
    highlights: ["4X on restaurants", "4X on groceries", "$120 dining credit"],
    gradient: "from-amber-400 via-orange-500 to-rose-600",
    featured: false,
  },
  {
    name: "Capital One Venture X",
    issuer: "Capital One",
    category: "Premium Travel",
    rating: 4.8,
    bonus: "75,000 miles",
    bonusValue: "$750",
    annualFee: "$395",
    apr: "19.99% - 29.99%",
    highlights: ["10X on hotels", "5X on flights", "$300 travel credit"],
    gradient: "from-violet-600 via-purple-700 to-indigo-800",
    featured: false,
  },
];

const FeaturedCardsSection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="tag-accent mb-3">Editor's picks</span>
              <h2 className="font-display text-3xl sm:text-4xl font-medium text-foreground">
                Top rated cards
              </h2>
            </div>
            <Button variant="ghost" className="text-primary hover:text-primary/80">
              View all cards
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {/* Cards List */}
          <div className="space-y-4">
            {cards.map((card) => (
              <div
                key={card.name}
                className={`group relative bg-card rounded-2xl border overflow-hidden transition-all duration-300 hover:shadow-elevated hover:border-primary/20 ${
                  card.featured ? "border-primary/30 shadow-card" : "border-border"
                }`}
              >
                {card.featured && (
                  <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-bl-lg">
                    Best Overall
                  </div>
                )}
                
                <div className="flex flex-col lg:flex-row">
                  {/* Card Visual */}
                  <div className="lg:w-64 p-6 flex items-center justify-center bg-muted/30">
                    <div className={`w-44 h-28 rounded-xl bg-gradient-to-br ${card.gradient} shadow-lg transform group-hover:scale-105 group-hover:-rotate-2 transition-all duration-300 p-4 flex flex-col justify-between`}>
                      <div className="text-white/90 text-xs font-medium">{card.issuer}</div>
                      <div className="flex justify-between items-end">
                        <div className="flex gap-1">
                          {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="w-6 h-1 rounded-full bg-white/40" />
                          ))}
                        </div>
                        <div className="w-8 h-6 rounded bg-white/30" />
                      </div>
                    </div>
                  </div>

                  {/* Card Info */}
                  <div className="flex-1 p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="tag">{card.category}</span>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-accent text-accent" />
                            <span className="text-sm font-medium text-foreground">{card.rating}</span>
                          </div>
                        </div>
                        <h3 className="font-display text-xl font-medium text-foreground mb-3">
                          {card.name}
                        </h3>
                        
                        {/* Highlights */}
                        <div className="flex flex-wrap gap-x-4 gap-y-1">
                          {card.highlights.map((highlight) => (
                            <div key={highlight} className="flex items-center gap-1.5 text-sm text-muted-foreground">
                              <Check className="w-3.5 h-3.5 text-primary" />
                              {highlight}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="flex flex-wrap sm:flex-nowrap gap-6 sm:gap-8 text-sm">
                        <div>
                          <div className="text-muted-foreground mb-1">Welcome Bonus</div>
                          <div className="font-medium text-foreground">{card.bonus}</div>
                          <div className="text-xs text-primary">{card.bonusValue} value</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground mb-1">Annual Fee</div>
                          <div className="font-medium text-foreground">{card.annualFee}</div>
                        </div>
                        <div className="hidden sm:block">
                          <div className="text-muted-foreground mb-1">APR</div>
                          <div className="font-medium text-foreground">{card.apr}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="lg:w-48 p-6 flex items-center justify-center border-t lg:border-t-0 lg:border-l border-border bg-muted/20">
                    <Button className="w-full lg:w-auto rounded-xl">
                      Apply Now
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCardsSection;
