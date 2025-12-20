import { CreditCard, Plane, Percent, Gift, Shield, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    icon: Gift,
    title: "Online Shopping",
    description: "Boosted rewards for e-commerce & subscriptions",
    count: 87,
    color: "bg-mint-light text-primary",
  },
  {
    icon: Plane,
    title: "Airline Cards",
    description: "Free bags, priority boarding & airline-specific rewards",
    count: 64,
    color: "bg-coral-light text-coral",
  },
  {
    icon: Percent,
    title: "Business Cards",
    description: "Rewards for advertising, travel, supplies & growth",
    count: 45,
    color: "bg-secondary text-slate",
  },
  {
    icon: Shield,
    title: "Rotating Categories",
    description: "Quarterly bonus categories for flexible earners",
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
    <section className="pt-6 pb-12 md:pt-10 md:pb-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-6 md:mb-12">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-medium text-foreground mb-3 md:mb-4">
              Browse by category
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-lg mx-auto px-2">
              Not sure where to start? Explore cards by what matters most to you.
            </p>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-4">
            {categories.map((category, index) => (
              <button
                key={category.title}
                onClick={() => handleCategoryClick(category.title)}
                className="group flex items-center md:items-start gap-4 md:gap-4 p-5 md:p-5 bg-background rounded-xl md:rounded-2xl border border-border hover:border-primary/30 hover:shadow-card transition-all duration-300 text-left w-full touch-manipulation md:min-h-0"
              >
                <div className={`w-12 h-12 md:w-12 md:h-12 rounded-xl md:rounded-xl ${category.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                  <category.icon className="w-5 h-5 md:w-5 md:h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-bold md:font-medium text-base md:text-base text-foreground group-hover:text-primary transition-colors">
                      {category.title}
                    </h3>
                  </div>
                  <p className="hidden md:block text-sm md:text-sm text-muted-foreground mt-1.5">
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
