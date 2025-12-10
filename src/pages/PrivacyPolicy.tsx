import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-foreground mb-3 md:mb-4">
            Privacy Policy
          </h1>
          <p className="text-xs md:text-sm text-muted-foreground mb-6 md:mb-8">
            Last updated: December 2025
          </p>
          
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <p className="text-base sm:text-lg text-muted-foreground mb-6 md:mb-8">
              We value your privacy and want to be transparent about how we collect and use information on this site.
            </p>
            
            <h2 className="text-xl sm:text-2xl font-display font-semibold text-foreground mt-6 md:mt-8 mb-3 md:mb-4">
              Information We Collect
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4 md:mb-6">
              We collect information you provide directly—such as questions typed into our chatbot or form inputs—as well as basic technical data like IP addresses, device information, and usage analytics.
            </p>
            
            <h2 className="text-xl sm:text-2xl font-display font-semibold text-foreground mt-6 md:mt-8 mb-3 md:mb-4">
              How We Use Your Information
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-3 md:mb-4">
              We use this information to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground leading-relaxed mb-6 space-y-2 ml-4">
              <li>Provide credit-card recommendations</li>
              <li>Improve the accuracy and performance of our tools</li>
              <li>Monitor site functionality and prevent abuse</li>
            </ul>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4 md:mb-6">
              We do not sell personal information.
            </p>
            
            <h2 className="text-xl sm:text-2xl font-display font-semibold text-foreground mt-6 md:mt-8 mb-3 md:mb-4">
              AI Providers and Data Processing
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-3 md:mb-4">
              When you use the chatbot or other interactive features, your inputs may be processed by third-party AI services, including:
            </p>
            <ul className="list-disc list-inside text-muted-foreground leading-relaxed mb-4 space-y-2 ml-4">
              <li>OpenAI (for language model responses)</li>
              <li>Chatbase (for chatbot routing and analytics)</li>
              <li>Vercel (for hosting, logs, and performance monitoring)</li>
            </ul>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4 md:mb-6">
              These providers may temporarily store or process your inputs to generate responses or maintain service quality. Please refer to their individual privacy policies for details on how they handle data.
            </p>
            
            <h2 className="text-xl sm:text-2xl font-display font-semibold text-foreground mt-6 md:mt-8 mb-3 md:mb-4">
              Cookies & Analytics
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4 md:mb-6">
              We use standard analytics and cookies to understand site usage and improve user experience. You may disable cookies in your browser settings.
            </p>
            
            <h2 className="text-xl sm:text-2xl font-display font-semibold text-foreground mt-6 md:mt-8 mb-3 md:mb-4">
              Links to External Sites
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Our site may link to external credit-card issuers or affiliate partners. We are not responsible for their privacy practices.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;

