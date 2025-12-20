import { Shield, Zap, Users, Award } from "lucide-react";

const features = [
  {
    icon: Award,
    title: "AI-Assisted Matching",
    description: "Our AI suggests cards based on your habits, but it doesn't know your full financial picture—so treat results as a starting point.",
  },
  {
    icon: Zap,
    title: "Personalized, Not Personal",
    description: "We tailor suggestions based on the preferences you share without collecting sensitive financial data.",
  },
  {
    icon: Shield,
    title: "Unbiased Comparisons",
    description: "We show you all the details—the good and the not-so-good—so you can decide with confidence.",
  },
  {
    icon: Users,
    title: "Aggregated Reviews",
    description: "We distill user and expert insights so you can quickly see each card's pros and cons.",
  },
];

const StatsSection = () => {
  return (
    <section className="py-12 md:py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-8 md:mb-16">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-medium text-foreground mb-3 md:mb-4">
              Why trust CardWise?
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-lg mx-auto px-2">
              We use AI and real-world data to help you quickly compare credit cards—but we always encourage you to double-check the details before you apply.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="text-center group"
              >
                <div className="w-14 h-14 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-mint-light text-primary mx-auto mb-4 md:mb-5 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  <feature.icon className="w-6 h-6 md:w-6 md:h-6" />
                </div>
                <h3 className="font-display text-base md:text-lg font-medium text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm md:text-sm text-muted-foreground leading-relaxed px-2">
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
