import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Credit Cards", href: "/" },
    { label: "Compare", href: "#" },
    { label: "Guides", href: "/guides" },
    { label: "Reviews", href: "/reviews" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-display font-bold text-lg">C</span>
            </div>
            <span className="font-display text-xl font-medium text-foreground">
              CardWise
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const isRoute = item.href.startsWith("/");
              const LinkComponent = isRoute ? Link : "a";
              const linkProps = isRoute 
                ? { to: item.href } 
                : { href: item.href };
              return (
                <LinkComponent
                  key={item.label}
                  {...linkProps}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors link-underline"
                >
                  {item.label}
                </LinkComponent>
              );
            })}
          </nav>


          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => {
                const isRoute = item.href.startsWith("/");
                const LinkComponent = isRoute ? Link : "a";
                const linkProps = isRoute 
                  ? { to: item.href } 
                  : { href: item.href };
                return (
                  <LinkComponent
                    key={item.label}
                    {...linkProps}
                    className="px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors"
                  >
                    {item.label}
                  </LinkComponent>
                );
              })}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
