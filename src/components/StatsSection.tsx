import { useEffect, useState, useRef } from "react";
import { CreditCard, Database, Cpu } from "lucide-react";

const stats = [
  {
    icon: CreditCard,
    value: 300,
    suffix: "+",
    label: "Cards Analyzed",
    description: "Comprehensive card database",
  },
  {
    icon: Database,
    value: 1400,
    suffix: "+",
    label: "Verified Data Sources",
    description: "Real-time data accuracy",
  },
  {
    icon: Cpu,
    value: 0,
    suffix: "",
    label: "AI-Powered",
    description: "Smart Recommendations",
    isText: true,
    displayText: "AI-Powered",
  },
];

const AnimatedNumber = ({ value, suffix, isText, displayText }: { value: number; suffix: string; isText?: boolean; displayText?: string }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || isText) return;

    const duration = 2000;
    const steps = 60;
    const stepValue = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += stepValue;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, value, isText]);

  if (isText) {
    return <span ref={ref} className="text-gradient-primary">{displayText}</span>;
  }

  return (
    <span ref={ref} className="text-gradient-primary">
      {count.toLocaleString()}{suffix}
    </span>
  );
};

const StatsSection = () => {
  return (
    <section className="py-16 bg-muted/50 border-y border-border/50">
      <div className="container mx-auto px-4">
        {/* Disclaimer */}
        <p className="text-center text-sm text-muted-foreground max-w-3xl mx-auto mb-12">
          Some of the credit cards on this site are from partners who pay us when you click or apply. 
          This helps keep the site running, but it doesn't influence our recommendations.
        </p>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-accent mb-4 group-hover:scale-110 transition-transform duration-300">
                <stat.icon className="w-7 h-7 text-primary" />
              </div>
              <div className="font-display text-4xl sm:text-5xl font-bold mb-2">
                <AnimatedNumber 
                  value={stat.value} 
                  suffix={stat.suffix} 
                  isText={stat.isText} 
                  displayText={stat.displayText}
                />
              </div>
              <div className="text-foreground font-medium mb-1">{stat.label}</div>
              <div className="text-sm text-muted-foreground">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
