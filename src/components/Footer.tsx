import Link from "next/link";
import Image from "next/image";
import { Facebook, Youtube, Phone, Mail, MapPin, ArrowRight } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const parcours = [
    { name: "Digital & Software", href: "/parcours/digital" },
    { name: "Énergie & Industrie", href: "/parcours/energie" },
    { name: "Business & Lifestyle", href: "/parcours/business" },
  ];

  const quickLinks = [
    { name: "Accueil", href: "/" },
    { name: "À Propos", href: "/apropos" },
    { name: "Actualités", href: "/actualites" },
    { name: "Galerie", href: "/galerie" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-50 to-white border-t">
      <div className="container-custom">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand Column */}
            <div className="lg:col-span-1">
              <Link href="/" className="flex items-center gap-3 mb-4 group">
                <Image 
                  src="/logo-tci.jpg" 
                  alt="TCI Formation" 
                  width={48} 
                  height={48}
                  className="rounded-full ring-2 ring-primary/10"
                />
                <div>
                  <span className="font-heading font-bold text-lg text-foreground">
                    TCI <span className="text-accent-red">Formation</span>
                  </span>
                </div>
              </Link>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                Centre de formation professionnelle de référence au Bénin. 
                Nous formons les professionnels de demain avec des programmes pratiques et certifiants.
              </p>
              <div className="flex gap-3">
                <a
                  href="https://facebook.com/tciformation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-primary/10 hover:bg-primary hover:text-white flex items-center justify-center transition-all duration-300"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="https://youtube.com/@tciformation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-accent-red/10 hover:bg-accent-red hover:text-white flex items-center justify-center transition-all duration-300"
                  aria-label="YouTube"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-heading font-semibold text-base mb-6 text-foreground">
                Navigation
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link 
                      href={link.href} 
                      className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Parcours */}
            <div>
              <h3 className="font-heading font-semibold text-base mb-6 text-foreground">
                Nos Parcours
              </h3>
              <ul className="space-y-3">
                {parcours.map((item) => (
                  <li key={item.href}>
                    <Link 
                      href={item.href} 
                      className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="font-heading font-semibold text-base mb-6 text-foreground">
                Contact
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-sm text-muted-foreground">
                  <MapPin className="w-5 h-5 flex-shrink-0 text-primary mt-0.5" />
                  <span>Porto-Novo, Bénin</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                  <Phone className="w-5 h-5 flex-shrink-0 text-primary" />
                  <a href="tel:+229XXXXXXXX">+229 XX XX XX XX</a>
                </li>
                <li className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                  <Mail className="w-5 h-5 flex-shrink-0 text-primary" />
                  <a href="mailto:contact@tciformation.com">contact@tciformation.com</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>
              © {currentYear} <span className="font-semibold text-foreground">TCI Formation</span>. Tous droits réservés.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/mentions-legales" className="hover:text-primary transition-colors">
                Mentions légales
              </Link>
              <Link href="/confidentialite" className="hover:text-primary transition-colors">
                Confidentialité
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}