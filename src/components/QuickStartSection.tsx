import { CreditCard, Plane, Percent, Gift, Shield, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    icon: Gift,
    title: "Cash Back",
    description: "Earn money on everyday purchases",
    count: 87,
    color: "bg-mint-light text-primary",
  },
  {
    icon: Plane,
    title: "Travel Rewards",
    description: "Miles, points & travel perks",
    count: 64,
    color: "bg-coral-light text-coral",
  },
  {
    icon: Percent,
    title: "0% APR",
    description: "No interest financing options",
    count: 45,
    color: "bg-secondary text-slate",
  },
  {
    icon: Shield,
    title: "No Annual Fee",
    description: "Great cards that cost nothing",
    count: 112,
    color: "bg-mint-light text-primary",
  },
  {
    icon: TrendingUp,
    title: "Build Credit",
    description: "Cards for building credit history",
    count: 38,
    color: "bg-coral-light text-coral",
  },
  {
    icon: CreditCard,
    title: "Balance Transfer",
    description: "Move debt to lower rates",
    count: 29,
    color: "bg-secondary text-slate",
  },
];

const QuickStartSection = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryTitle: string) => {
    navigate(`/recommendations?q=${encodeURIComponent(categoryTitle)}`);
  };

  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-medium text-foreground mb-4">
              Browse by category
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Not sure where to start? Explore cards by what matters most to you.
            </p>
          </div>

          {/* Categories Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category, index) => (
              <button
                key={category.title}
                onClick={() => handleCategoryClick(category.title)}
                className="group flex items-start gap-4 p-5 bg-background rounded-2xl border border-border hover:border-primary/30 hover:shadow-card transition-all duration-300 text-left w-full"
              >
                <div className={`w-12 h-12 rounded-xl ${category.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                  <category.icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                      {category.title}
                    </h3>
                    <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
                      {category.count}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {category.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickStartSection;
