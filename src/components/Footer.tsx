import Link from "next/link";
import { Facebook, Youtube, Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* À propos */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-4">TCI FORMATION</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Nous disons bien la pratique. Centre de formation professionnelle au Bénin.
            </p>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/90 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/90 transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-4">Navigation</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-sm hover:text-secondary transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/formations" className="text-sm hover:text-secondary transition-colors">
                  Nos Formations
                </Link>
              </li>
              <li>
                <Link href="/apropos" className="text-sm hover:text-secondary transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/actualites" className="text-sm hover:text-secondary transition-colors">
                  Actualités
                </Link>
              </li>
              <li>
                <Link href="/galerie" className="text-sm hover:text-secondary transition-colors">
                  Galerie
                </Link>
              </li>
            </ul>
          </div>

          {/* Formations */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-4">Nos Filières</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/formations#technique" className="text-sm hover:text-secondary transition-colors">
                  Techniques & Industrielles
                </Link>
              </li>
              <li>
                <Link href="/formations#diplomante" className="text-sm hover:text-secondary transition-colors">
                  Formations Diplômantes
                </Link>
              </li>
              <li>
                <Link href="/formations#bureautique" className="text-sm hover:text-secondary transition-colors">
                  Bureautique
                </Link>
              </li>
              <li>
                <Link href="/formations#artisanale" className="text-sm hover:text-secondary transition-colors">
                  Formations Artisanales
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-4">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 flex-shrink-0 text-secondary mt-0.5" />
                <span className="text-sm">Porto-Novo, Bénin</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 flex-shrink-0 text-secondary" />
                <span className="text-sm">+229 XX XX XX XX</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 flex-shrink-0 text-secondary" />
                <span className="text-sm">contact@tciformation.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/20 text-center text-sm text-muted-foreground">
          <p>© {currentYear} TCI Formation. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}