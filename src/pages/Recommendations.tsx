import { useMemo } from "react";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useSearchParams } from "react-router-dom";
import Chatbot from "@/components/Chatbot";

const Recommendations = () => {
  const [searchParams] = useSearchParams();
  
  // Initialize directly from search params to avoid flickering
  const initialQuestion = useMemo(() => {
    const query = searchParams.get("q");
    return query ? decodeURIComponent(query) : undefined;
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="icon" className="rounded-full">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-mint to-coral flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-display font-semibold text-foreground">CardWise AI</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 flex-1 flex flex-col">
        <Chatbot initialQuestion={initialQuestion} />
      </main>
    </div>
  );
};

export default Recommendations;
