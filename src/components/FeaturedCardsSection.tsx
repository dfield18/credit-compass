import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const cards = [
  {
    name: "Chase Sapphire Preferred",
    issuer: "Chase",
    category: "Travel",
    rating: 4.9,
    bonus: "75,000 pts after $5,000 spend in first 3 mo",
    bonusValue: "$1,538 value",
    annualFee: "$95",
    apr: "21.49% - 28.49%",
    highlights: ["5× on Chase-portal travel", "3× on dining", "Flexible Ultimate Rewards transfers"],
    gradient: "from-blue-600 via-blue-700 to-indigo-800",
    featured: true,
  },
  {
    name: "Citi Double Cash",
    issuer: "Citi",
    category: "Cash Back",
    rating: 4.8,
    bonus: "Unlimited 2%",
    bonusValue: "$200/yr avg",
    annualFee: "$0",
    apr: "18.99% - 28.99%",
    highlights: ["1% when you buy, 1% when you pay", "Flat-rate on all purchases", "No annual fee"],
    gradient: "from-emerald-500 via-teal-600 to-cyan-700",
    featured: false,
  },
  {
    name: "Amex Gold Card",
    issuer: "American Express",
    category: "Dining",
    rating: 4.9,
    bonus: "60,000 points",
    bonusValue: "$600",
    annualFee: "$325",
    apr: "See terms",
    highlights: ["4X on restaurants", "4X on groceries", "$120 dining credit"],
    gradient: "from-amber-400 via-orange-500 to-rose-600",
    featured: false,
  },
  {
    name: "Capital One Venture X",
    issuer: "Capital One",
    category: "Premium Travel",
    rating: 4.8,
    bonus: "75,000 miles",
    bonusValue: "$750",
    annualFee: "$395",
    apr: "19.99% - 29.99%",
    highlights: ["10X on hotels", "5X on flights", "$300 travel credit"],
    gradient: "from-violet-600 via-purple-700 to-indigo-800",
    featured: false,
  },
];

const FeaturedCardsSection = () => {
  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="mb-6 md:mb-10">
            <span className="tag-accent mb-2 md:mb-3 text-xs md:text-sm">Editor's picks</span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-medium text-foreground">
              Top rated cards
            </h2>
          </div>

          {/* Cards List */}
          <div className="space-y-4 md:space-y-5">
            {cards.map((card) => (
              <div
                key={card.name}
                className={`group relative bg-card rounded-xl md:rounded-2xl border overflow-hidden transition-all duration-300 hover:shadow-elevated hover:border-primary/20 ${
                  card.featured ? "border-primary/30 shadow-card" : "border-border"
                }`}
              >
                {card.featured && (
                  <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-medium px-2.5 py-1 md:px-3 md:py-1.5 rounded-bl-lg z-10">
                    Best Overall
                  </div>
                )}
                
                {/* Mobile: Stacked layout */}
                <div className="flex flex-col md:flex-row lg:flex-row">
                  {/* Card Visual - Mobile: Centered, Desktop: Side */}
                  <div className="w-full md:w-auto lg:w-64 p-5 md:p-7 flex items-center justify-center bg-muted/30 flex-shrink-0 md:border-r md:border-border">
                    <div className={`w-full max-w-[240px] h-36 md:w-44 md:h-28 rounded-xl md:rounded-xl bg-gradient-to-br ${card.gradient} shadow-lg transform group-hover:scale-105 group-hover:-rotate-2 transition-all duration-300 p-4 md:p-4 flex flex-col justify-between`}>
                      <div className="text-white/90 text-xs md:text-xs font-medium">{card.issuer}</div>
                      <div className="flex justify-between items-end">
                        <div className="flex gap-1 md:gap-1">
                          {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="w-6 h-1 md:w-6 md:h-1 rounded-full bg-white/40" />
                          ))}
                        </div>
                        <div className="w-8 h-6 md:w-8 md:h-6 rounded bg-white/30" />
                      </div>
                    </div>
                  </div>

                  {/* Card Info and CTA Container */}
                  <div className="flex-1 flex flex-col lg:flex-row">
                    {/* Card Info */}
                    <div className="flex-1 p-5 md:p-7">
                      <div className="flex flex-col h-full">
                        <div className="flex items-center gap-2 mb-2 md:mb-1.5">
                          <span className="tag text-sm md:text-sm">{card.category}</span>
                        </div>
                        <h3 className="font-display text-xl md:text-2xl font-medium text-foreground mb-3 md:mb-3.5">
                          {card.name}
                        </h3>
                        
                        {/* Highlights - Mobile: Stacked, Desktop: Row */}
                        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 lg:gap-6 mb-4 md:mb-5">
                          {card.highlights.map((highlight) => (
                            <div key={highlight} className="flex items-start md:items-center gap-2 text-sm md:text-sm text-muted-foreground">
                              <Check className="w-4 h-4 md:w-4 md:h-4 text-primary flex-shrink-0 mt-0.5 md:mt-0" />
                              <span className="break-words">{highlight}</span>
                            </div>
                          ))}
                        </div>

                        {/* Stats */}
                        <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 md:gap-8 text-sm mt-auto">
                          <div>
                            <div className="text-muted-foreground mb-1 md:mb-1 text-xs md:text-xs uppercase tracking-wide">Welcome Bonus</div>
                            <div className="font-medium text-foreground mb-0.5 leading-tight text-sm md:text-base">{card.bonus}</div>
                            <div className="text-xs md:text-xs text-primary font-medium">{card.bonusValue}</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground mb-1 md:mb-1 text-xs md:text-xs uppercase tracking-wide">Annual Fee</div>
                            <div className="font-medium text-foreground mb-0.5 leading-tight text-sm md:text-base">{card.annualFee}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="w-full lg:w-48 p-4 md:p-5 flex items-center justify-center border-t md:border-t-0 lg:border-l border-border bg-muted/20 flex-shrink-0">
                    {(() => {
                      const cardUrls: Record<string, string> = {
                        "Chase Sapphire Preferred": "https://creditcards.chase.com/rewards-credit-cards/sapphire/preferred",
                        "Citi Double Cash": "https://www.citi.com/credit-cards/citi-double-cash-credit-card",
                        "Amex Gold Card": "https://www.americanexpress.com/us/credit-cards/card/gold-card/",
                        "Capital One Venture X": "https://www.capitalone.com/credit-cards/venture-x/?external_id=WWW_ADG-127427517283_ZZZ_ONL-SE_ZZZZZ_T_SEM2_STL-_c_Zg__kenshoo_clickid__672050000821_695580&target_id=aud-374367914346:kwd-1245077318586&oC=0bQ0noocw8&gad_source=1&gad_campaignid=10936576704&gbraid=0AAAAAD--QXATVpCF0Aonrja_UHU3sei8f&gclid=Cj0KCQiArt_JBhCTARIsADQZayl3JEOw2b45SKFATL7460XvaRmKCnR4sRdnOgdHq370qEGnnKXyjwIaAketEALw_wcB"
                      };
                      const url = cardUrls[card.name];
                      return url ? (
                        <Button asChild className="w-full lg:w-auto rounded-lg md:rounded-xl px-6 md:px-6 py-3 md:py-2.5 text-base md:text-base min-h-[44px] md:min-h-0 touch-manipulation">
                          <a href={url} target="_blank" rel="noopener noreferrer">
                            Apply Now
                          </a>
                        </Button>
                      ) : (
                        <Button className="w-full lg:w-auto rounded-lg md:rounded-xl px-6 md:px-6 py-3 md:py-2.5 text-base md:text-base min-h-[44px] md:min-h-0 touch-manipulation">
                          Apply Now
                        </Button>
                      );
                    })()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCardsSection;
