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
    { title: "Pôle Digital & Software", href: "/parcours/digital", desc: "Génie Logiciel, Web, Design" },
    { title: "Pôle Énergie & Industrie", href: "/parcours/energie", desc: "Solaire, Électrique, Froid" },
    { title: "Pôle Business & Lifestyle", href: "/parcours/business", desc: "Mode, Esthétique, Hôtellerie" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="container-custom">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <Image 
              src="/logo-tci.jpg" 
              alt="TCI Formation" 
              width={60} 
              height={60}
              className="rounded-full"
            />
            <div>
              <span className="font-heading font-bold text-xl text-primary">TCI Formation</span>
              <p className="text-xs text-muted-foreground">Centre de Formation Professionnelle</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
              Accueil
            </Link>
            
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Nos Parcours</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[500px] gap-3 p-4">
                      {parcours.map((item) => (
                        <li key={item.href}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={item.href}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              <div className="text-sm font-medium leading-none">{item.title}</div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                {item.desc}
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <Link href="/entreprises" className="text-sm font-medium hover:text-primary transition-colors">
              Solutions Entreprises
            </Link>
            <Link href="/online" className="text-sm font-medium hover:text-primary transition-colors">
              TCI Online
            </Link>
            <Link href="/apropos" className="text-sm font-medium hover:text-primary transition-colors">
              À Propos
            </Link>
            <Link href="/actualites" className="text-sm font-medium hover:text-primary transition-colors">
              Actualités
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <Link href="/admissions">
              <Button className="bg-gradient-accent hover:opacity-90">
                S&apos;inscrire
              </Button>
            </Link>
          </div>

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
          <nav className="lg:hidden py-6 space-y-4 border-t">
            <Link href="/" className="block py-2 text-sm font-medium hover:text-primary">
              Accueil
            </Link>
            <div className="space-y-2">
              <p className="text-sm font-semibold text-muted-foreground px-2">Nos Parcours</p>
              {parcours.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block py-2 pl-4 text-sm hover:text-primary"
                >
                  {item.title}
                </Link>
              ))}
            </div>
            <Link href="/entreprises" className="block py-2 text-sm font-medium hover:text-primary">
              Solutions Entreprises
            </Link>
            <Link href="/online" className="block py-2 text-sm font-medium hover:text-primary">
              TCI Online
            </Link>
            <Link href="/apropos" className="block py-2 text-sm font-medium hover:text-primary">
              À Propos
            </Link>
            <Link href="/actualites" className="block py-2 text-sm font-medium hover:text-primary">
              Actualités
            </Link>
            <Link href="/contact" className="block py-2 text-sm font-medium hover:text-primary">
              Contact
            </Link>
            <Link href="/admissions">
              <Button className="w-full bg-gradient-accent hover:opacity-90">
                S&apos;inscrire
              </Button>
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}