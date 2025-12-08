import { Shield, Zap, Users, Award } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "AI-Powered Matching",
    description: "Our algorithms analyze your spending patterns to find cards that maximize your rewards.",
  },
  {
    icon: Shield,
    title: "Unbiased Comparisons",
    description: "We show you all the details—the good and the not-so-good—so you can decide with confidence.",
  },
  {
    icon: Users,
    title: "Real User Reviews",
    description: "See what actual cardholders say about their experience with each card.",
  },
  {
    icon: Award,
    title: "Expert Analysis",
    description: "Our team of financial experts reviews and rates every card we feature.",
  },
];

const StatsSection = () => {
  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl sm:text-4xl font-medium text-foreground mb-4">
              Why trust CardWise?
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              We've helped millions of people find the right credit card for their needs.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="text-center group"
              >
                <div className="w-14 h-14 rounded-2xl bg-mint-light text-primary mx-auto mb-5 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="font-display text-lg font-medium text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
