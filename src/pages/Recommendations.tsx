import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Chatbot from "@/components/Chatbot";

const Recommendations = () => {
  const [searchParams] = useSearchParams();
  
  // Initialize directly from search params to avoid flickering
  const initialQuestion = useMemo(() => {
    const query = searchParams.get("q");
    if (!query) return undefined;
    
    try {
      // Decode the query parameter, handling potential encoding issues
      return decodeURIComponent(query);
    } catch (error) {
      // If decoding fails, try using the raw query
      console.error('Error decoding query parameter:', error);
      return query;
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 flex-1 flex flex-col">
        <Chatbot initialQuestion={initialQuestion} />
      </main>
    </div>
  );
};

export default Recommendations;
