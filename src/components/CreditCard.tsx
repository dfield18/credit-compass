import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CreditCardProps {
  name: string;
  brand: string;
  category: string;
  features: string[];
  welcomeBonus: string;
  annualFee: string;
  gradient: string;
  applyUrl?: string;
}

const CreditCard = ({
  name,
  brand,
  category,
  features,
  welcomeBonus,
  annualFee,
  gradient,
  applyUrl,
}: CreditCardProps) => {
  return (
    <div className="card-hover bg-card rounded-2xl border border-border overflow-hidden flex flex-col h-full w-full">
      {/* Gradient Header */}
      <div className={`h-32 bg-gradient-to-br ${gradient} p-6 flex flex-col justify-between relative`}>
        <div className="text-white/90 text-sm font-medium">{brand}</div>
        <div className="flex justify-between items-end">
          <div className="flex gap-1">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-6 h-1 rounded-full bg-white/40" />
            ))}
          </div>
          <div className="w-8 h-6 rounded bg-white/30" />
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 flex-1 flex flex-col">
        <div className="mb-3">
          <span className="tag text-xs">{category}</span>
        </div>
        <h3 className="font-serif text-lg font-medium text-foreground mb-4">
          {name}
        </h3>

        {/* Features List */}
        <ul className="space-y-2 mb-6 flex-1">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
              <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        {/* Welcome Bonus */}
        <div className="mb-4">
          <div className="tag-accent text-xs font-medium mb-1">Welcome Bonus</div>
          <div className="text-sm font-medium text-foreground">{welcomeBonus}</div>
        </div>

        {/* Annual Fee */}
        <div className="mb-6">
          <div className="text-xs text-muted-foreground mb-1">Annual Fee</div>
          <div className="text-base font-medium text-foreground">{annualFee}</div>
        </div>

        {/* Apply Button */}
        {applyUrl ? (
          <Button asChild className="w-full">
            <a href={applyUrl} target="_blank" rel="noopener noreferrer">
              Apply Now
            </a>
          </Button>
        ) : (
          <Button className="w-full">Apply Now</Button>
        )}
      </div>
    </div>
  );
};

export default CreditCard;

