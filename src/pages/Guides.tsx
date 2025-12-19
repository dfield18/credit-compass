import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const guides = [
  {
    title: "Credit Basics",
    description: "Learn how to build and maintain a strong credit score with practical strategies, from automating payments to mastering credit utilization.",
    href: "/guides/credit-basics",
  },
  {
    title: "2-Card Combo",
    description: "Maximize rewards without the headache. Learn how pairing two cards strategically can earn significantly more rewards with minimal effort.",
    href: "/guides/2-card-combo",
  },
  {
    title: "Lounge Access",
    description: "The ultimate guide to airport lounge access, covering major networks, access rules, and the best credit cards for lounge entry in 2025.",
    href: "/guides/lounge-access",
  },
  {
    title: "How Credit Cards Make Money",
    description: "Understand how banks generate revenue from credit cards through interchange fees, interest, and fees—and how to avoid being on the losing end.",
    href: "/guides/how-credit-cards-make-money",
  },
  {
    title: "Minimum Spend Requirements",
    description: "Learn smart strategies to meet credit card minimum spend requirements without overspending, including timing, pre-payment, and tax payment methods.",
    href: "/guides/minimum-spend-requirements",
  },
  {
    title: "Sapphire Reserve: Worth the Fee?",
    description: "Is the Chase Sapphire Reserve's $795 annual fee worth it? A deep dive into the math, credits, and whether this premium card makes sense for your travel habits.",
    href: "/guides/sapphire-reserve-worth-the-fee",
  },
];

const Guides = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-foreground mb-3 md:mb-4">
            Credit Card Guides
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground mb-8 md:mb-12">
            Comprehensive guides to help you understand credit cards, make informed decisions, and maximize your rewards.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {guides.map((guide) => (
              <Link key={guide.href} to={guide.href}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardHeader>
                    <CardTitle className="group-hover:text-primary transition-colors">
                      {guide.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4">
                      {guide.description}
                    </CardDescription>
                    <div className="flex items-center text-primary font-medium text-sm group-hover:gap-2 transition-all">
                      Read guide
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Guides;

