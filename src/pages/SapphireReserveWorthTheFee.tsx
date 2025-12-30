import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

// Helper function to parse text with *text* (url) patterns and convert to links
const parseTextWithLinks = (text: string) => {
  const parts: (string | JSX.Element)[] = [];
  let lastIndex = 0;
  
  // Pattern: *text* (url)
  const regex = /\*([^*]+)\*\s*\(([^)]+)\)/g;
  let match;
  
  while ((match = regex.exec(text)) !== null) {
    // Add text before the match
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    
    // Add the link
    const linkText = match[1];
    const url = match[2];
    parts.push(
      <a
        key={match.index}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary hover:underline"
      >
        {linkText}
      </a>
    );
    
    lastIndex = regex.lastIndex;
  }
  
  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }
  
  return parts.length > 0 ? parts : text;
};

const SapphireReserveWorthTheFee = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 pt-20 pb-8 md:pt-24 md:pb-16">
        <div className="max-w-4xl mx-auto">
          <Link to="/guides" className="inline-block mb-6 md:mb-8">
            <Button variant="ghost" size="sm" className="gap-2 text-xs md:text-sm">
              <ArrowLeft className="w-3 h-3 md:w-4 md:h-4" />
              Back to Guides
            </Button>
          </Link>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-foreground mb-6 md:mb-8">
            Sapphire Reserve: Worth the Fee?
          </h1>
          
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <p className="text-base sm:text-lg text-muted-foreground mb-4 md:mb-6">
              The Chase Sapphire Reserve has long been the "it" card for frequent flyers, but with its annual fee creeping up to $795, the conversation has changed. It's no longer a card you just get and forget; it's one you have to actively manage to make the math work.
            </p>
            
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4 md:mb-6">
              Whether the new price tag is justifiable depends entirely on how much of a "power traveler" you actually are.
            </p>
            
            <h2 className="text-xl sm:text-2xl font-display font-semibold text-foreground mt-6 md:mt-8 mb-3 md:mb-4">
              The New Math: Credits vs. Complexity
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-3 md:mb-4">
              Back when the fee was $550, the math was simple: a $300 travel credit (which is still the easiest credit to use in the industry) brought your "effective" cost down to $250.
            </p>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4 md:mb-6">
              With the recent hike, Chase has layered on more perks to compensate, but they come with strings attached. You now have to navigate:
            </p>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-3 md:mb-4">
              <strong>Segmented Hotel Credits:</strong> These often require booking through the {parseTextWithLinks("*Chase Travel Portal* (https://chase.com/personal/travel)")} and staying at high-end properties.
            </p>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4 md:mb-6">
              <strong>Partner Overlap:</strong> Credits for services like DoorDash or Instacart are great if you use them, but they're "junk value" if you're only spending to "break even."
            </p>
            
            <h2 className="text-xl sm:text-2xl font-display font-semibold text-foreground mt-6 md:mt-8 mb-3 md:mb-4">
              Where the Value Still Hits
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-3 md:mb-4">
              If you live in a city with a {parseTextWithLinks("*Chase Sapphire Lounge by The Club* (https://chase.com/personal/credit-cards/sapphire-lounges)")} (like Boston, LaGuardia, or Hong Kong), the card might still be a bargain. These lounges are currently outclassing standard Priority Pass options and even some Centurion Lounges.
            </p>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-3 md:mb-4">
              The card remains a powerhouse if:
            </p>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-3 md:mb-4">
              <strong>The 1.5x Redemption Rate:</strong> Your points are worth 50% more when redeemed for travel through Chase. For big spenders, this "pay with points" flexibility is a massive safety net.
            </p>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-3 md:mb-4">
              <strong>Transfer Partners:</strong> You frequently move points to {parseTextWithLinks("*World of Hyatt* (https://world.hyatt.com)")} or United, where the 1:1 transfer ratio often yields much higher than 1.5 cents per point.
            </p>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4 md:mb-6">
              <strong>The $300 Credit:</strong> It still applies to almost anything—taxis, trains, parking, and flights—making it the most user-friendly credit on the market.
            </p>
            
            <h2 className="text-xl sm:text-2xl font-display font-semibold text-foreground mt-6 md:mt-8 mb-3 md:mb-4">
              Is the "Portal Life" For You?
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-3 md:mb-4">
              Chase is clearly nudging users toward their own booking ecosystem. You earn 10x points on hotels and car rentals, but only if you book through them.
            </p>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4 md:mb-6">
              <strong>The Reality Check:</strong> Booking through a portal means you might not earn hotel elite nights or points with brands like Marriott or Hilton. If you're a loyalist to a specific hotel chain, the Sapphire Reserve's "ecosystem" might actually work against you.
            </p>
            
            <h2 className="text-xl sm:text-2xl font-display font-semibold text-foreground mt-6 md:mt-8 mb-3 md:mb-4">
              Better Alternatives?
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-3 md:mb-4">
              If the $795 fee makes your stomach churn, you aren't alone. Many are looking at:
            </p>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-3 md:mb-4">
              The {parseTextWithLinks("*Chase Sapphire Preferred* (https://creditcards.chase.com/rewards-credit-cards/sapphire/preferred)")}: At $95, you still get the 1:1 transfer partners and a 25% redemption boost, which is the "sweet spot" for 90% of travelers.
            </p>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4 md:mb-6">
              The {parseTextWithLinks("*Capital One Venture X* (https://capitalone.com/credit-cards/venture-x)")}: Known for a much lower fee and a simpler $300 portal credit that's easier to offset.
            </p>
            
            <h2 className="text-xl sm:text-2xl font-display font-semibold text-foreground mt-6 md:mt-8 mb-3 md:mb-4">
              The Bottom Line
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              The Sapphire Reserve has evolved from a "must-have" into a niche tool for the high-frequency traveler. If you spend $10k+ a year on travel and dining and value high-end lounge access, the fee is a business expense. If you're a "two vacations a year" person, you're likely subsidizing the perks of the people in the lounge next to you.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SapphireReserveWorthTheFee;

