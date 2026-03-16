import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

interface NavbarProps {
  onNavigate: (section: string) => void;
}

export function Navbar({ onNavigate }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNav = (section: string) => {
    onNavigate(section);
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            type="button"
            onClick={() => handleNav("home")}
            className="flex items-center gap-3 group"
          >
            <span className="font-display italic text-2xl font-semibold tracking-tight text-foreground">
              Maison
            </span>
            <span className="hidden sm:block text-[10px] uppercase tracking-[0.25em] text-muted-foreground font-sans font-medium pt-1">
              Fashion & Home
            </span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {["home", "products", "about"].map((section) => (
              <button
                type="button"
                key={section}
                data-ocid={`nav.${section}.link`}
                onClick={() => handleNav(section)}
                className="text-xs uppercase tracking-[0.18em] font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </nav>

          {/* Mobile menu toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="md:hidden pb-4 flex flex-col gap-1 border-t border-border pt-3">
            {["home", "products", "about"].map((section) => (
              <button
                type="button"
                key={section}
                data-ocid={`nav.${section}.link`}
                onClick={() => handleNav(section)}
                className="w-full text-left px-2 py-2 text-xs uppercase tracking-[0.18em] font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
