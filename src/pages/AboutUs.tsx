import Header from "@/components/Header";
import Footer from "@/components/Footer";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-display font-bold text-foreground mb-8">
            About Us
          </h1>
          
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <p className="text-lg text-muted-foreground mb-8">
              We're redefining how people choose credit cards. After years in analytics and AI product development, we saw a gap: tons of information, no clarity. So we built a platform that turns messy reward structures, fees, and fine print into simple, data-driven recommendations.
            </p>
            
            <h2 className="text-2xl font-display font-semibold text-foreground mt-8 mb-4">
              Our Mission
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Help users find the right card—fast—using transparent data, modern AI, and personalized insights. No hype. No generic lists. Just clear, structured guidance based on your spending habits.
            </p>
            
            <h2 className="text-2xl font-display font-semibold text-foreground mt-8 mb-4">
              Our Team
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Led by David Field, an analytics professional focused on machine learning, product insights, and user-friendly AI tools. Our system blends a curated credit-card database with automated research pipelines and LLM-powered analysis to stay accurate and up to date.
            </p>
            
            <h2 className="text-2xl font-display font-semibold text-foreground mt-8 mb-4">
              Our Values
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Clarity, transparency, and trust. We explain how recommendations work, surface the tradeoffs, and never pretend to know your full financial picture. Our goal is to make credit decisions simple, intuitive, and truly useful.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUs;

