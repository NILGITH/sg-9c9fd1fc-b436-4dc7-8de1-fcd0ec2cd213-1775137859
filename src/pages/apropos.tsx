import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Award, Target, MapPin, Handshake, Phone, Building2 } from "lucide-react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export default function Apropos() {
  const sites = [
    {
      name: "Vèdoko (siège)",
      location: "Voir Canal, dans rue à droite",
      phones: ["(+229) 01 96 10 04 42", "(+229) 01 47 37 44 56", "(+229) 01 47 37 44 57"],
      image: "/site-vedoko.png",
      color: "bg-primary",
    },
    {
      name: "Godomey",
      location: "Rue en face du bar-Restaurant PARC DES PRINCES de Godomey",
      phones: ["(+229) 01 47 37 44 59", "(+229) 01 47 37 44 57", "(+229) 01 96 10 04 42"],
      image: "/site-godomey.png",
      color: "bg-secondary",
    },
    {
      name: "Abomey-Calavi",
      location: "Zone universitaire",
      phones: ["(+229) 01 47 37 44 57"],
      image: null,
      color: "bg-primary",
    },
    {
      name: "Parakou",
      location: "Dépôt rue pavée en face de la douane à côté du marché dépôt",
      phones: ["(+229) 01 47 37 44 60", "(+229) 01 96 10 04 42", "(+229) 01 47 37 44 57"],
      image: "/site-parakou.png",
      color: "bg-secondary",
    },
    {
      name: "Porto-Novo",
      location: "Quartier OUASSIN à côté de la clinique Louis Pasteur",
      phones: ["(+229) 01 97 00 85 83", "(+229) 01 47 37 44 57", "(+229) 01 96 10 04 42"],
      image: "/site-porto-novo.png",
      color: "bg-primary",
    },
  ];

  const partners = [
    "CNAR : Centre National d'Assistance aux Réfugiés",
    "SOS Village d'Enfant",
    "Projet PISSCA : Projets Innovants de la Société Civile et des Coalitions d'Acteurs",
    "Projet SWEED",
    "PROJET WAPCO",
    "ANPS- ARCH FORMATION",
    "Association de Chevaliers de SALOMON France-Bénin",
    "ONG RACINÉ",
    "ONG ESA : Education Santé Assistance",
    "AMBASSADE DU DANEMARK",
    "ORTB - Canal 3 BENIN",
    "Radio Tado – Radio CAPP-FM",
    "ONG APROVIE",
    "CNAB-BENIN : Confédération Nationale des Artisans Professionnels du BENIN",
    "CNAB : Confédération Nationale des Artisans du BENIN",
    "UCIMB",
    "MESTFP",
    "LA ROCHE",
  ];

  return (
    <>
      <SEO 
        title="À Propos | TCI Formation" 
        description="Découvrez notre mission, nos 5 centres de formation au Bénin et nos nombreux partenaires."
      />
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-hero text-white">
          <div className="container-custom max-w-4xl text-center space-y-6">
            <h1 className="font-heading font-bold text-4xl md:text-5xl">
              Notre ADN & Notre Mission
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Répondre au défi de l'emploi des jeunes en Afrique par une formation en adéquation réelle avec le marché.
            </p>
          </div>
        </section>

        {/* Who We Are with Image */}
        <section className="py-20">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-heading font-bold text-3xl md:text-5xl mb-6">
                  Qui Sommes-Nous ?
                </h2>
                <div className="space-y-4 text-lg text-muted-foreground">
                  <p>
                    <strong className="text-foreground">TCI BENIN</strong> est un centre de formation professionnelle créé depuis plus de 10 ans, 
                    dédié à l'excellence et à l'insertion professionnelle des jeunes au Bénin et en Côte d'Ivoire.
                  </p>
                  <p>
                    Nous proposons des formations diplômantes reconnues par l'État (CQM et CQP) dans les domaines 
                    du numérique, de l'énergie, de l'industrie et des métiers du lifestyle.
                  </p>
                  <p>
                    Avec <strong>5 sites de formation</strong> au Bénin (Cotonou, Godomey, Abomey-Calavi, Porto-Novo, Parakou) 
                    et une présence à Abidjan en Côte d'Ivoire, nous sommes le partenaire de référence pour votre 
                    développement professionnel.
                  </p>
                </div>
              </div>
              <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&auto=format&fit=crop"
                  alt="Centre de formation TCI"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision with Images */}
        <section className="py-20 bg-muted/30">
          <div className="container-custom max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="relative">
                <div className="bg-gradient-hero text-white p-10 rounded-3xl relative overflow-hidden">
                  <div className="absolute inset-0 opacity-5">
                    <img 
                      src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop"
                      alt="Étudiants en formation"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="relative z-10">
                    <h2 className="font-heading font-bold text-3xl mb-6">Problématique et Mission</h2>
                    <p className="text-lg leading-relaxed text-white/90">
                      Le problème de l'emploi des jeunes est devenu une préoccupation majeure. Avec l'environnement concurrentiel d'aujourd'hui, il est important que la jeunesse reçoive une formation en adéquation avec les besoins du marché.
                    </p>
                    <p className="text-lg leading-relaxed text-white/90 mt-4">
                      Voilà pourquoi <strong>TCI BENIN</strong> s'est engagé depuis dix (10) ans à faire de la formation professionnelle une offre qui, à travers la qualité de l'enseignement, met déjà sur le marché un nouveau type de professionnels capables de se prendre en charge.
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="bg-secondary/10 p-10 rounded-3xl border-2 border-secondary/20 relative overflow-hidden">
                  <div className="absolute inset-0 opacity-5">
                    <img 
                      src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop"
                      alt="Vision TCI"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="relative z-10">
                    <h2 className="font-heading font-bold text-3xl mb-6">Notre Vision</h2>
                    <p className="text-lg leading-relaxed text-muted-foreground">
                      Devenir le centre de référence en matière de formation professionnelle au Bénin, 
                      reconnu pour la qualité de ses programmes, l'expertise de ses formateurs et 
                      le taux d'insertion professionnelle de ses diplômés.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sites Section */}
        <section className="py-20 bg-muted/30">
          <div className="container-custom max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
                Nos Sites de Formation
              </h2>
              <p className="text-lg text-muted-foreground">
                5 centres modernes équipés au Bénin pour votre formation
              </p>
            </div>

            <div className="space-y-8">
              {sites.map((site, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow">
                  <CardContent className="p-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                      <div className="p-8 md:p-10 space-y-6">
                        <div className={`inline-flex items-center gap-2 ${site.color} text-white px-4 py-2 rounded-full`}>
                          <Building2 className="w-4 h-4" />
                          <span className="font-semibold">Site de {site.name}</span>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                            <p className="text-muted-foreground">{site.location}</p>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 font-semibold">
                              <Phone className="w-5 h-5 text-primary" />
                              <span>Tél:</span>
                            </div>
                            {site.phones.map((phone, i) => (
                              <a
                                key={i}
                                href={`tel:${phone.replace(/\s/g, "")}`}
                                className="block pl-7 text-muted-foreground hover:text-primary transition-colors"
                              >
                                {phone}
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="relative h-64 md:h-auto bg-muted">
                        {site.image ? (
                          <Image
                            src={site.image}
                            alt={`Site de ${site.name}`}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Building2 className="w-20 h-20 text-muted-foreground/30" />
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Partners Section */}
        <section className="py-20">
          <div className="container-custom max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
                Quelques Partenaires
              </h2>
              <p className="text-lg text-muted-foreground">
                Nous collaborons avec des institutions reconnues pour garantir l'excellence
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {partners.map((partner, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 bg-white p-6 rounded-xl shadow-sm border border-muted hover:border-primary/30 hover:shadow-md transition-all"
                >
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Handshake className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground leading-snug">
                    {partner}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Domaines d'intervention */}
        <section className="py-20 bg-muted/30">
          <div className="container-custom max-w-4xl">
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-12 text-center">
              Domaines D'intervention
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                "Électricité bâtiment",
                "Systèmes solaires photovoltaïques",
                "Froid et climatisation",
                "Vidéo surveillance",
                "Informatique appliquée",
                "Graphisme",
                "Génie Electrique et Informatique",
                "Génie Electrique Informatique et Réseaux",
                "Génie Logiciel et réseaux",
                "Génie des Télécommunications et Réseaux",
                "Génie Electrique et Maintenance Industrielle",
                "Génie Electrique Froid et Plomberie",
                "Secrétariat",
                "Coupe et Couture",
                "Coiffure et Esthétique",
                "Cuisine et restauration",
              ].map((domaine, index) => (
                <div key={index} className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm border border-muted">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <span className="text-muted-foreground font-semibold">{domaine}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}