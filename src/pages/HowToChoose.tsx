import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const HowToChoose = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <Link to="/guides" className="inline-block mb-8">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Guides
            </Button>
          </Link>

          <h1 className="text-4xl font-display font-bold text-foreground mb-8">
            How to Choose a Credit Card
          </h1>
          
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <p className="text-lg text-muted-foreground mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            
            <h2 className="text-2xl font-display font-semibold text-foreground mt-8 mb-4">
              Assess Your Spending Habits
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            
            <h2 className="text-2xl font-display font-semibold text-foreground mt-8 mb-4">
              Compare Rewards and Benefits
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            </p>
            
            <h2 className="text-2xl font-display font-semibold text-foreground mt-8 mb-4">
              Consider Annual Fees
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.
            </p>
            
            <h2 className="text-2xl font-display font-semibold text-foreground mt-8 mb-4">
              Check Your Credit Score
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HowToChoose;

