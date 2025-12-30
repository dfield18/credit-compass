import { Bot, UserCheck, Scale, Star } from "lucide-react";

const trustPoints = [
  {
    icon: Bot,
    title: "AI-Assisted Matching",
    description: "Our AI suggests cards based on your habits, but it doesn't know your full financial picture—so treat results as a starting point.",
    color: "primary",
  },
  {
    icon: UserCheck,
    title: "Personalized, Not Personal",
    description: "We tailor suggestions based on the preferences you share without collecting sensitive financial data.",
    color: "coral",
  },
  {
    icon: Scale,
    title: "Unbiased Comparisons",
    description: "We show you all the details—the good and the not-so-good—so you can decide with confidence.",
    color: "gold",
  },
  {
    icon: Star,
    title: "Aggregated Reviews",
    description: "We distill user and expert insights so you can quickly see each card's pros and cons.",
    color: "primary",
  },
];

const TrustSection = () => {
  return (
    <section className="py-12 md:py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-8">
            {trustPoints.map((point, index) => {
              const colorClasses = {
                primary: 'bg-mint-light text-primary',
                coral: 'bg-coral-light text-coral',
                gold: 'bg-yellow-100 text-yellow-600',
              };
              return (
                <div
                  key={point.title}
                  className="text-center animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl ${colorClasses[point.color as keyof typeof colorClasses]} mx-auto mb-4 md:mb-5 flex items-center justify-center`}>
                    <point.icon className="w-7 h-7 md:w-8 md:h-8" />
                  </div>
                  <h3 className="font-serif text-base md:text-lg font-medium text-foreground mb-2">
                    {point.title}
                  </h3>
                  <p className="text-sm md:text-sm text-muted-foreground leading-relaxed">
                    {point.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;

