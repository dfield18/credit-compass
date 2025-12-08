import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const footerLinks = {
  Product: ["Credit Cards", "Compare Cards", "Best Cards", "Reviews"],
  Resources: ["Guides", "Calculator", "Blog", "FAQ"],
  Company: ["About Us", "Careers", "Press", "Contact"],
  Legal: ["Privacy Policy", "Terms of Service", "Disclosures"],
};

const Footer = () => {
  return (
    <footer className="bg-foreground text-background/80">
      {/* Newsletter Section */}
      <div className="border-b border-background/10">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-display text-xl font-medium text-background mb-2">
                Stay in the loop
              </h3>
              <p className="text-background/60 text-sm">
                Get the latest credit card offers and tips delivered to your inbox.
              </p>
            </div>
            <div className="flex w-full md:w-auto gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-64 px-4 py-2.5 rounded-lg bg-background/10 border border-background/20 text-background placeholder:text-background/40 focus:outline-none focus:border-background/40"
              />
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg">
                <Mail className="w-4 h-4 mr-2" />
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
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
              © 2024 CardWise. All rights reserved.
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
