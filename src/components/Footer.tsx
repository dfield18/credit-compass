import { CreditCard } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-navy text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-xl">
                CardMatch<span className="text-primary">AI</span>
              </span>
            </div>
            <p className="text-primary-foreground/60 text-sm">
              AI-powered credit card recommendations to help you find the perfect card for your lifestyle.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Credit Cards</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/60">
              <li><a href="#" className="hover:text-primary transition-colors">Travel Cards</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Cash Back Cards</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Business Cards</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Student Cards</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/60">
              <li><a href="#" className="hover:text-primary transition-colors">Credit Score Guide</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Rewards Calculator</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">FAQs</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/60">
              <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-primary-foreground/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-primary-foreground/40">
          <p>© 2024 CardMatchAI. All rights reserved.</p>
          <p>
            Advertiser Disclosure: We may receive compensation when you apply for credit cards.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
