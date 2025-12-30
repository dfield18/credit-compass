import { Link } from "react-router-dom";

const footerLinks = {
  Categories: ["Online Shopping", "Airline Cards", "Business Cards", "Rotating Categories", "Build Credit", "Balance Transfer"],
  Resources: ["Credit Basics", "2-Card Combo", "Lounge Access", "How Credit Cards Make Money", "Minimum Spend Requirements"],
  Company: ["About Us", "Contact", "Privacy Policy", "Terms of Service"],
};

const guideRoutes: Record<string, string> = {
  "Credit Basics": "/guides/credit-basics",
  "2-Card Combo": "/guides/2-card-combo",
  "Lounge Access": "/guides/lounge-access",
  "How Credit Cards Make Money": "/guides/how-credit-cards-make-money",
  "Minimum Spend Requirements": "/guides/minimum-spend-requirements",
};

const aboutRoutes: Record<string, string> = {
  "About Us": "/about-us",
  "Privacy Policy": "/privacy-policy",
  "Terms of Service": "/terms-of-service",
};

const Footer = () => {
  return (
    <footer className="bg-foreground text-background/80">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <a href="/" className="flex items-center gap-1.5 md:gap-2 mb-3 md:mb-4">
                <div className="w-7 h-7 md:w-8 md:h-8 rounded-xl bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-serif font-bold text-base md:text-lg">Y</span>
                </div>
                <span className="font-serif text-lg md:text-xl font-medium text-background">
                  YourBestCard
                </span>
              </a>
              <p className="text-xs md:text-sm text-background/50 leading-relaxed">
                Making credit card decisions simple and transparent.
              </p>
            </div>

            {/* Links */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="font-medium text-background mb-3 md:mb-4 text-xs md:text-sm">
                  {category}
                </h4>
                <ul className="space-y-2 md:space-y-2.5">
                  {links.map((link) => {
                    // Check if this is a guide link that should use React Router
                    const isGuideLink = category === "Resources" && guideRoutes[link];
                    // Check if this is an About link that should use React Router
                    const isAboutLink = category === "Company" && aboutRoutes[link];
                    const isRoute = isGuideLink || isAboutLink;
                    const LinkComponent = isRoute ? Link : "a";
                    const linkProps = isRoute 
                      ? { 
                          to: isGuideLink 
                            ? guideRoutes[link] 
                            : (isAboutLink ? aboutRoutes[link] : "#")
                        }
                      : { href: "#" };
                    
                    return (
                      <li key={link}>
                        <LinkComponent
                          {...linkProps}
                          className="text-xs md:text-sm text-background/50 hover:text-primary transition-colors touch-manipulation"
                        >
                          {link}
                        </LinkComponent>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom */}
          <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-background/10 flex flex-col sm:flex-row items-center justify-between gap-3 md:gap-4">
            <p className="text-xs text-background/40 text-center sm:text-left">
              © 2026 YourBestCard. All rights reserved.
            </p>
            <p className="text-xs text-background/40 text-center sm:text-right max-w-lg px-2">
              YourBestCard may receive compensation from card issuers. Opinions are our own.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
