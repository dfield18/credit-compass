import { Plane, Receipt, BadgeDollarSign, Crown, ArrowRight } from "lucide-react";

const questions = [
  {
    icon: Plane,
    title: "What's the best card for travel?",
    description: "Maximize points on flights and hotels",
    color: "from-blue-500/20 to-blue-600/10",
    iconColor: "text-blue-500",
  },
  {
    icon: Receipt,
    title: "How can I earn cash back on everyday purchases?",
    description: "Earn cashback on everyday purchases",
    color: "from-emerald-500/20 to-emerald-600/10",
    iconColor: "text-emerald-500",
  },
  {
    icon: BadgeDollarSign,
    title: "Show the best cards with no annual fee",
    description: "Get great rewards without yearly costs",
    color: "from-amber-500/20 to-amber-600/10",
    iconColor: "text-amber-500",
  },
  {
    icon: Crown,
    title: "Recommend luxury travel credit cards?",
    description: "Elite perks and lounge access",
    color: "from-purple-500/20 to-purple-600/10",
    iconColor: "text-purple-500",
  },
];

const QuickStartSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
            Popular Questions
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Quick Start Guide
          </h2>
          <p className="text-muted-foreground text-lg">
            Choose a question or ask your own
          </p>
        </div>

        {/* Question Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {questions.map((question, index) => (
            <button
              key={index}
              className="group relative bg-card rounded-2xl p-6 text-left shadow-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-border/50 overflow-hidden"
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${question.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              
              <div className="relative">
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${question.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <question.icon className={`w-6 h-6 ${question.iconColor}`} />
                </div>

                {/* Content */}
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-foreground/90 transition-colors">
                  {question.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {question.description}
                </p>

                {/* Arrow */}
                <div className="flex items-center text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span>Ask now</span>
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickStartSection;
