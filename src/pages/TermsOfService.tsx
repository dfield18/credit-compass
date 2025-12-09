import Header from "@/components/Header";
import Footer from "@/components/Footer";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-display font-bold text-foreground mb-4">
            Terms of Service
          </h1>
          <p className="text-sm text-muted-foreground mb-8">
            Last Updated: December 2025
          </p>
          
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <p className="text-lg text-muted-foreground mb-8">
              Welcome to our website (the "Site"). These Terms of Service ("Terms") govern your access to and use of the Site and any services, tools, content, or features made available through the Site (collectively, the "Services").
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              By accessing or using the Services, you agree to be bound by these Terms. If you do not agree, you must discontinue use of the Services immediately.
            </p>
            
            <h2 className="text-2xl font-display font-semibold text-foreground mt-8 mb-4">
              1. Purpose of the Services
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The Services provide general information and data-driven credit-card recommendations generated through proprietary models and third-party artificial intelligence ("AI") systems.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              The Services are provided for informational and educational purposes only and are not financial, legal, tax, or professional advice.
            </p>
            
            <h2 className="text-2xl font-display font-semibold text-foreground mt-8 mb-4">
              2. No Financial or Professional Advice
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              You acknowledge and agree that:
            </p>
            <ul className="list-disc list-inside text-muted-foreground leading-relaxed mb-4 space-y-2 ml-4">
              <li>The Services do not constitute financial advice or individualized recommendations.</li>
              <li>Any credit-card comparison, recommendation, or explanation is based on limited information and may not reflect your full financial profile.</li>
              <li>You are solely responsible for your financial decisions, and you should consult qualified professionals before taking action.</li>
              <li>We make no guarantees regarding card approval odds, eligibility, accuracy of issuer terms, or the financial suitability of any card.</li>
            </ul>
            
            <h2 className="text-2xl font-display font-semibold text-foreground mt-8 mb-4">
              3. Use of AI and Third-Party Services
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              To operate the Services, we may transmit user inputs, content, or usage data to third-party service providers, including but not limited to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground leading-relaxed mb-4 space-y-2 ml-4">
              <li>OpenAI (for language model responses)</li>
              <li>Chatbase (for chatbot functionality and analytics)</li>
              <li>Vercel (for hosting, logging, and performance monitoring)</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mb-6">
              These providers may process or temporarily store data as needed to deliver their functionality.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              You acknowledge that AI-generated content may contain inaccuracies, may not be up to date, and should be independently verified.
            </p>
            
            <h2 className="text-2xl font-display font-semibold text-foreground mt-8 mb-4">
              4. User Responsibilities
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              By using the Services, you agree that you will not:
            </p>
            <ul className="list-disc list-inside text-muted-foreground leading-relaxed mb-4 space-y-2 ml-4">
              <li>Use the Services for unlawful, abusive, or harmful purposes</li>
              <li>Attempt to scrape, copy, reverse-engineer, or misuse the Site or its data</li>
              <li>Interfere with or disrupt the integrity or performance of the Services</li>
              <li>Submit harmful, misleading, infringing, or inappropriate content through the chatbot or any input fields</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mb-6">
              We may suspend or terminate access to the Services for violation of these Terms.
            </p>
            
            <h2 className="text-2xl font-display font-semibold text-foreground mt-8 mb-4">
              5. Accuracy and Availability
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We make reasonable efforts to maintain accurate, current information. However:
            </p>
            <ul className="list-disc list-inside text-muted-foreground leading-relaxed mb-4 space-y-2 ml-4">
              <li>Credit-card issuer terms, rewards, and eligibility criteria change frequently</li>
              <li>AI-generated outputs may be incomplete or incorrect</li>
              <li>The Services may experience interruptions, delays, or errors</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mb-6">
              We do not guarantee the accuracy, reliability, or availability of the Services.
            </p>
            
            <h2 className="text-2xl font-display font-semibold text-foreground mt-8 mb-4">
              6. Affiliate Disclosure
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The Site may include outbound links to credit-card issuers, banks, financial institutions, or affiliate partners.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We may earn a commission when users click links or apply for products through certain partners.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              This compensation does not influence the content of our recommendations, but may affect how and where links appear.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Issuers' terms, eligibility criteria, and product details always govern and supersede any information provided on this Site.
            </p>
            
            <h2 className="text-2xl font-display font-semibold text-foreground mt-8 mb-4">
              7. Intellectual Property
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              All content on the Site—including text, design, graphics, branding, databases, tools, and proprietary algorithms—is owned by us or our licensors.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              You may not reproduce, distribute, create derivatives of, or exploit any part of the Services without prior written permission.
            </p>
            
            <h2 className="text-2xl font-display font-semibold text-foreground mt-8 mb-4">
              8. Third-Party Links
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The Site may contain links to third-party websites or services. We are not responsible for:
            </p>
            <ul className="list-disc list-inside text-muted-foreground leading-relaxed mb-4 space-y-2 ml-4">
              <li>The content, accuracy, or security of those external sites</li>
              <li>Your interactions with third-party companies or financial institutions</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Accessing third-party links is at your own risk.
            </p>
            
            <h2 className="text-2xl font-display font-semibold text-foreground mt-8 mb-4">
              9. Limitation of Liability
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              To the fullest extent permitted by law, we disclaim all liability for:
            </p>
            <ul className="list-disc list-inside text-muted-foreground leading-relaxed mb-4 space-y-2 ml-4">
              <li>Errors, inaccuracies, or omissions in the Services</li>
              <li>Any decisions you make based on information provided</li>
              <li>Losses, damages, or claims resulting from your use of the Services</li>
              <li>Any issues caused by third-party providers, including OpenAI, Chatbase, or Vercel</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mb-4">
              In no event shall we be liable for indirect, incidental, consequential, punitive, or special damages, even if advised of the possibility.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Your sole remedy for dissatisfaction with the Services is to discontinue use of the Site.
            </p>
            
            <h2 className="text-2xl font-display font-semibold text-foreground mt-8 mb-4">
              10. Indemnification
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              You agree to indemnify and hold us harmless from any claims, damages, liabilities, or expenses arising out of:
            </p>
            <ul className="list-disc list-inside text-muted-foreground leading-relaxed mb-4 space-y-2 ml-4">
              <li>Your use or misuse of the Services</li>
              <li>Your violation of these Terms</li>
              <li>Your interaction with third-party financial products or websites</li>
            </ul>
            
            <h2 className="text-2xl font-display font-semibold text-foreground mt-8 mb-4">
              11. Changes to the Services and Terms
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We may modify, update, or discontinue any part of the Services at any time without notice.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              We may update these Terms periodically. Continued use of the Services after changes are posted constitutes acceptance of the revised Terms.
            </p>
            
            <h2 className="text-2xl font-display font-semibold text-foreground mt-8 mb-4">
              12. Governing Law
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              These Terms shall be governed by and interpreted under the laws of the State of New York, without regard to conflict-of-law principles.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Any disputes shall be resolved exclusively in the state or federal courts located in New York.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfService;

