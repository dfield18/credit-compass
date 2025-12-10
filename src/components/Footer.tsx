import { Link } from "react-router-dom";

const footerLinks = {
  Guides: ["Credit Basics", "2-Card Combo", "Lounge Access", "How Credit Cards Make Money", "Minimum Spend Requirements"],
  Resources: ["Reviews"],
  About: ["About Us", "Contact", "Privacy Policy", "Terms of Service"],
};

const guideRoutes: Record<string, string> = {
  "Credit Basics": "/guides/credit-basics",
  "2-Card Combo": "/guides/2-card-combo",
  "Lounge Access": "/guides/lounge-access",
  "How Credit Cards Make Money": "/guides/how-credit-cards-make-money",
  "Minimum Spend Requirements": "/guides/minimum-spend-requirements",
};

const resourcesRoutes: Record<string, string> = {
  "Reviews": "/reviews",
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
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <a href="/" className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-display font-bold text-lg">C</span>
                </div>
                <span className="font-display text-xl font-medium text-background">
                  CardWise
                </span>
              </a>
              <p className="text-sm text-background/50 leading-relaxed">
                Making credit card decisions simple and transparent.
              </p>
            </div>

            {/* Links */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="font-medium text-background mb-4 text-sm">
                  {category}
                </h4>
                <ul className="space-y-2.5">
                  {links.map((link) => {
                    // Check if this is a guide link that should use React Router
                    const isGuideLink = category === "Guides" && guideRoutes[link];
                    // Check if this is a Resources link that should use React Router
                    const isResourcesLink = category === "Resources" && resourcesRoutes[link];
                    // Check if this is an About link that should use React Router
                    const isAboutLink = category === "About" && aboutRoutes[link];
                    const isRoute = isGuideLink || isResourcesLink || isAboutLink;
                    const LinkComponent = isRoute ? Link : "a";
                    const linkProps = isRoute 
                      ? { 
                          to: isGuideLink 
                            ? guideRoutes[link] 
                            : (isResourcesLink 
                              ? resourcesRoutes[link] 
                              : (isAboutLink ? aboutRoutes[link] : "#"))
                        }
                      : { href: "#" };
                    
                    return (
                      <li key={link}>
                        <LinkComponent
                          {...linkProps}
                          className="text-sm text-background/50 hover:text-background transition-colors"
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
          <div className="mt-12 pt-8 border-t border-background/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-background/40">
              © 2026 YourBestCard. All rights reserved.
            </p>
            <p className="text-xs text-background/40 text-center sm:text-right max-w-lg">
              CardWise may receive compensation from card issuers. Opinions are our own.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
