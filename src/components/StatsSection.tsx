import { Database, FileText, Scale } from "lucide-react";

const stats = [
  {
    icon: Database,
    number: "350+",
    label: "Cards Analyzed",
    color: "primary",
  },
  {
    icon: FileText,
    number: "1,400+",
    label: "Verified Data Sources",
    color: "coral",
  },
  {
    icon: Scale,
    number: "100%",
    label: "Unbiased Reviews",
    color: "gold",
  },
];

const StatsSection = () => {
  return (
    <section className="py-12 md:py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {stats.map((stat, index) => {
              const colorClasses = {
                primary: 'bg-mint-light text-primary',
                coral: 'bg-coral-light text-coral',
                gold: 'bg-yellow-100 text-yellow-600',
              };
              return (
                <div
                  key={stat.label}
                  className="text-center animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl ${colorClasses[stat.color as keyof typeof colorClasses]} mx-auto mb-4 md:mb-6 flex items-center justify-center`}>
                    <stat.icon className="w-8 h-8 md:w-10 md:h-10" />
                  </div>
                  <div className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-foreground mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm md:text-base text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
