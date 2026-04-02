import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-hero rounded-lg flex items-center justify-center">
              <span className="text-white font-heading font-bold text-xl">TCI</span>
            </div>
            <span className="font-heading font-bold text-xl hidden sm:block">
              TCI FORMATION
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
              Accueil
            </Link>
            <Link href="/formations" className="text-sm font-medium hover:text-primary transition-colors">
              Nos Formations
            </Link>
            <Link href="/apropos" className="text-sm font-medium hover:text-primary transition-colors">
              À propos
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:text-primary transition-colors">
              Contact
            </Link>
            <Link href="/galerie" className="text-sm font-medium hover:text-primary transition-colors">
              Galerie
            </Link>
            <Link href="/actualites">
              <Button variant="default" className="bg-secondary hover:bg-secondary/90">
                Nos actualités
              </Button>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="lg:hidden py-6 space-y-4 border-t border-border animate-slide-up">
            <Link
              href="/"
              className="block text-sm font-medium hover:text-primary transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Accueil
            </Link>
            <Link
              href="/formations"
              className="block text-sm font-medium hover:text-primary transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Nos Formations
            </Link>
            <Link
              href="/apropos"
              className="block text-sm font-medium hover:text-primary transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              À propos
            </Link>
            <Link
              href="/contact"
              className="block text-sm font-medium hover:text-primary transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <Link
              href="/galerie"
              className="block text-sm font-medium hover:text-primary transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Galerie
            </Link>
            <Link
              href="/actualites"
              onClick={() => setIsOpen(false)}
            >
              <Button variant="default" className="bg-secondary hover:bg-secondary/90 w-full">
                Nos actualités
              </Button>
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}