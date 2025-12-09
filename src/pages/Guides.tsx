import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const guides = [
  {
    title: "Credit Card Basics",
    description: "Learn the fundamentals of credit cards, including how they work, key terms, and what to know before applying for your first card.",
    href: "/guides/credit-card-basics",
  },
  {
    title: "How to Choose a Credit Card",
    description: "A comprehensive guide to selecting the right credit card for your needs, covering rewards, fees, credit scores, and more.",
    href: "/guides/how-to-choose",
  },
  {
    title: "Rewards Guide",
    description: "Master the art of maximizing credit card rewards, from cash back strategies to travel points and miles optimization.",
    href: "/guides/rewards-guide",
  },
];

const Guides = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-display font-bold text-foreground mb-4">
            Credit Card Guides
          </h1>
          <p className="text-lg text-muted-foreground mb-12">
            Comprehensive guides to help you understand credit cards, make informed decisions, and maximize your rewards.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

