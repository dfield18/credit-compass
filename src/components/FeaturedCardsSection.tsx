import { Star, Gift, Plane, Shield, ArrowRight, Percent } from "lucide-react";
import { Button } from "@/components/ui/button";

const cards = [
  {
    name: "Chase Sapphire Preferred",
    category: "Travel Rewards",
    rating: 4.9,
    bonus: "60,000 Points",
    annualFee: "$95",
    highlight: "3X on dining & travel",
    color: "from-blue-600 to-blue-800",
    icon: Plane,
  },
  {
    name: "Citi Double Cash",
    category: "Cash Back",
    rating: 4.8,
    bonus: "2% Cash Back",
    annualFee: "$0",
    highlight: "No annual fee",
    color: "from-emerald-500 to-teal-600",
    icon: Gift,
  },
  {
    name: "Amex Gold Card",
    category: "Dining & Groceries",
    rating: 4.9,
    bonus: "60,000 Points",
    annualFee: "$250",
    highlight: "4X on restaurants",
    color: "from-amber-500 to-orange-600",
    icon: Star,
  },
  {
    name: "Capital One Venture X",
    category: "Premium Travel",
    rating: 4.8,
    bonus: "75,000 Miles",
    annualFee: "$395",
    highlight: "10X on hotels & cars",
    color: "from-purple-600 to-indigo-700",
    icon: Percent,
  },
];

const FeaturedCardsSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12 max-w-6xl mx-auto">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-2">
              Featured Credit Cards
            </h2>
            <p className="text-muted-foreground">
              Top picks based on rewards, benefits, and user ratings
            </p>
          </div>
          <Button variant="outline" className="rounded-full">
            View All Cards
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {cards.map((card, index) => (
            <div
              key={index}
              className="group bg-card rounded-2xl border border-border/50 overflow-hidden shadow-card hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Card Visual */}
              <div className={`relative h-48 bg-gradient-to-br ${card.color} p-6`}>
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-4 right-4 w-20 h-14 rounded-lg border-2 border-current opacity-30" />
                  <div className="absolute bottom-4 left-4 flex gap-1">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="w-8 h-2 rounded-full bg-current opacity-30" />
                    ))}
                  </div>
                </div>
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-primary-foreground/20 backdrop-blur-sm flex items-center justify-center">
                    <card.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                </div>
              </div>

              {/* Card Details */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-accent text-accent-foreground">
                    {card.category}
                  </span>
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="w-4 h-4 fill-gold text-gold" />
                    <span className="font-medium text-foreground">{card.rating}</span>
                  </div>
                </div>

                <h3 className="font-display text-xl font-bold text-foreground mb-4">
                  {card.name}
                </h3>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Sign-up Bonus</span>
                    <span className="font-semibold text-primary">{card.bonus}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Annual Fee</span>
                    <span className="font-semibold text-foreground">{card.annualFee}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Shield className="w-4 h-4 text-primary" />
                    <span className="text-foreground">{card.highlight}</span>
                  </div>
                </div>

                <Button variant="hero" className="w-full">
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCardsSection;
