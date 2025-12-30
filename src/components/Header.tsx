import { useState } from "react";
import { Menu, X, CreditCard } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { label: "Categories", href: "#categories" },
    { label: "Top Cards", href: "#top-cards" },
    { label: "How It Works", href: "#how-it-works" },
  ];

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    if (href.startsWith("#")) {
      // If on homepage, scroll to the section
      if (location.pathname === "/") {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        // If not on homepage, navigate to homepage with hash
        // ScrollToTop component will handle scrolling to the hash
        navigate(`/${href}`);
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center h-16 md:h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 group flex-shrink-0"
            onClick={() => {
              setIsMobileMenuOpen(false);
              // If already on homepage, scroll to top
              if (location.pathname === "/") {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
          >
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
              <CreditCard className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-serif text-xl font-semibold text-foreground">
              YourBestCard
            </span>
          </Link>

          {/* Desktop Navigation - Centered */}
          <nav className="hidden md:flex items-center gap-8 flex-1 justify-center">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* CTA Button - Right */}
          <div className="hidden md:block flex-shrink-0">
            <Button variant="default" size="lg" asChild>
              <Link to="/guides">Credit Card Guides</Link>
            </Button>
          </div>

          {/* Mobile Right Side - Guides Button and Menu */}
          <div className="md:hidden flex items-center gap-2 flex-shrink-0 ml-auto">
            <Button variant="default" size="sm" asChild>
              <Link to="/guides" onClick={() => setIsMobileMenuOpen(false)}>Guides</Link>
            </Button>
            <button
              className="p-2 text-foreground touch-manipulation"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-border animate-fade-in">
            <nav className="flex flex-col">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className="px-4 py-2 text-base font-medium text-muted-foreground hover:text-foreground transition-colors touch-manipulation"
                >
                  {item.label}
                </a>
              ))}
              <div className="px-4 mt-2">
                <Button variant="default" size="lg" className="w-full" asChild>
                  <Link to="/recommendations" onClick={() => setIsMobileMenuOpen(false)}>Find Your Card</Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
