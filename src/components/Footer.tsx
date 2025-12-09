
const footerLinks = {
  Guides: ["Credit Card Basics", "How to Choose", "Rewards Guide", "Travel Cards"],
  Resources: ["Calculator", "Blog", "FAQ", "Compare Cards"],
  About: ["About Us", "Contact", "Privacy Policy", "Terms of Service"],
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
                  {links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm text-background/50 hover:text-background transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
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
