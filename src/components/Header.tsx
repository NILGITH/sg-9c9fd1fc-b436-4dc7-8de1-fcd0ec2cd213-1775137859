import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const parcours = [
    { 
      title: "Pôle Digital & Software", 
      href: "/parcours/digital", 
      desc: "Génie Logiciel, Développement Web, Design UI/UX",
      icon: "💻"
    },
    { 
      title: "Pôle Énergie & Industrie", 
      href: "/parcours/energie", 
      desc: "Énergie Solaire, Électricité, Froid & Climatisation",
      icon: "⚡"
    },
    { 
      title: "Pôle Business & Lifestyle", 
      href: "/parcours/business", 
      desc: "Couture, Coiffure, Hôtellerie, Secrétariat",
      icon: "💼"
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur-md shadow-sm">
      <div className="container-custom">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <Image 
                src="/logo-tci.jpg" 
                alt="TCI Formation" 
                width={56} 
                height={56}
                className="rounded-full ring-2 ring-primary/10 group-hover:ring-primary/30 transition-all duration-300"
              />
            </div>
            <div className="hidden sm:block">
              <span className="font-heading font-bold text-xl text-foreground">
                TCI <span className="text-accent-red">Formation</span>
              </span>
              <p className="text-xs text-muted-foreground leading-tight">
                Centre de Formation Professionnelle
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link 
              href="/" 
              className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary rounded-lg hover:bg-secondary/50 transition-all duration-200"
            >
              Accueil
            </Link>
            
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium">
                    Nos Parcours
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[550px] gap-3 p-4">
                      {parcours.map((item) => (
                        <li key={item.href}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={item.href}
                              className="block select-none rounded-lg p-4 leading-none no-underline outline-none transition-all duration-200 hover:bg-secondary/80 hover:shadow-md group"
                            >
                              <div className="flex items-start gap-3">
                                <span className="text-2xl">{item.icon}</span>
                                <div>
                                  <div className="text-sm font-semibold leading-none mb-2 group-hover:text-primary transition-colors">
                                    {item.title}
                                  </div>
                                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                    {item.desc}
                                  </p>
                                </div>
                              </div>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <Link 
              href="/entreprises" 
              className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary rounded-lg hover:bg-secondary/50 transition-all duration-200"
            >
              Entreprises
            </Link>
            <Link 
              href="/galerie" 
              className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary rounded-lg hover:bg-secondary/50 transition-all duration-200"
            >
              Galerie
            </Link>
            <Link 
              href="/apropos" 
              className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary rounded-lg hover:bg-secondary/50 transition-all duration-200"
            >
              À Propos
            </Link>
            <Link 
              href="/actualites" 
              className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary rounded-lg hover:bg-secondary/50 transition-all duration-200"
            >
              Actualités
            </Link>
            <Link 
              href="/contact" 
              className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary rounded-lg hover:bg-secondary/50 transition-all duration-200"
            >
              Contact
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/admissions">
              <Button className="btn-tci-accent font-medium">
                S&apos;inscrire
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 hover:bg-secondary/50 rounded-lg transition-colors"
            aria-label="Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="lg:hidden py-6 space-y-1 border-t animate-fade-in">
            <Link 
              href="/" 
              className="block px-4 py-3 text-sm font-medium hover:bg-secondary/50 rounded-lg transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Accueil
            </Link>
            
            <div className="space-y-1">
              <p className="px-4 py-2 text-sm font-semibold text-muted-foreground">Nos Parcours</p>
              {parcours.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-4 py-3 pl-8 text-sm hover:bg-secondary/50 rounded-lg transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.icon} {item.title}
                </Link>
              ))}
            </div>
            
            <Link 
              href="/entreprises" 
              className="block px-4 py-3 text-sm font-medium hover:bg-secondary/50 rounded-lg transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Entreprises
            </Link>
            <Link 
              href="/galerie" 
              className="block px-4 py-3 text-sm font-medium hover:bg-secondary/50 rounded-lg transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Galerie
            </Link>
            <Link 
              href="/apropos" 
              className="block px-4 py-3 text-sm font-medium hover:bg-secondary/50 rounded-lg transition-colors"
              onClick={() => setIsOpen(false)}
            >
              À Propos
            </Link>
            <Link 
              href="/actualites" 
              className="block px-4 py-3 text-sm font-medium hover:bg-secondary/50 rounded-lg transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Actualités
            </Link>
            <Link 
              href="/contact" 
              className="block px-4 py-3 text-sm font-medium hover:bg-secondary/50 rounded-lg transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            
            <div className="px-4 pt-4">
              <Link href="/admissions" onClick={() => setIsOpen(false)}>
                <Button className="w-full btn-tci-accent font-medium">
                  S&apos;inscrire
                </Button>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}