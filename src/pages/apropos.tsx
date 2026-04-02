import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Building2, Target, Award, Users, Briefcase, CheckCircle2, Handshake } from "lucide-react";
import Image from "next/image";

export default function Apropos() {
  const sites = [
    {
      name: "Vèdoko (siège)",
      location: "Voir Canal, dans rue à droite",
      phones: ["(+229) 01 96 10 04 42", "(+229) 01 47 37 44 56", "(+229) 01 47 37 44 57"],
      image: "/site-vedoko.png",
    },
    {
      name: "Godomey",
      location: "Rue en face du bar-Restaurant PARC DES PRINCES de Godomey",
      phones: ["(+229) 01 47 37 44 59", "(+229) 01 47 37 44 57", "(+229) 01 96 10 04 42"],
      image: "/site-godomey.png",
    },
    {
      name: "Abomey-Calavi",
      location: "Zone universitaire",
      phones: ["(+229) 01 47 37 44 57"],
      image: null,
    },
    {
      name: "Parakou",
      location: "Dépôt rue pavée en face de la douane à côté du marché dépôt",
      phones: ["(+229) 01 47 37 44 60", "(+229) 01 96 10 04 42", "(+229) 01 47 37 44 57"],
      image: "/site-parakou.png",
    },
    {
      name: "Porto-Novo",
      location: "Quartier OUASSIN à côté de la clinique Louis Pasteur",
      phones: ["(+229) 01 97 00 85 83", "(+229) 01 47 37 44 57", "(+229) 01 96 10 04 42"],
      image: "/site-porto-novo.png",
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

  const stats = [
    { icon: Award, value: "10+", label: "Années d'Expérience" },
    { icon: Users, value: "2000+", label: "Étudiants Formés" },
    { icon: Building2, value: "5", label: "Centres de Formation" },
    { icon: Briefcase, value: "40+", label: "Formations Disponibles" },
  ];

  return (
    <>
      <SEO 
        title="À Propos - TCI Formation" 
        description="Découvrez TCI Formation, leader de la formation professionnelle au Bénin. 10 ans d'expérience, 5 centres, 2000+ étudiants formés."
      />
      <Header />
      
      <main className="bg-gray-50">
        {/* Hero Section */}
        <section className="relative py-24 bg-gradient-to-br from-tci-blue via-tci-blue/95 to-tci-blue/90 text-white overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-tci-red/20 to-transparent"></div>
          
          <div className="container-custom relative z-10">
            <div className="max-w-3xl">
              <Badge variant="secondary" className="mb-6 bg-white/20 text-white border-white/30 backdrop-blur-sm">
                À PROPOS DE NOUS
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Plus de 10 Ans d'Excellence en Formation
              </h1>
              <p className="text-xl text-white/90 leading-relaxed">
                TCI Formation, votre partenaire de confiance pour une formation professionnelle de qualité au Bénin.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-tci-blue/10 rounded-2xl mb-4">
                    <stat.icon className="w-8 h-8 text-tci-blue" />
                  </div>
                  <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Who We Are - FIXED: Corriger les couleurs de texte */}
        <section className="py-20 bg-gray-50">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <Badge className="bg-tci-blue/10 text-tci-blue border-0">QUI SOMMES-NOUS</Badge>
                <h2 className="text-4xl font-bold text-gray-900">
                  Leader de la Formation Professionnelle au Bénin
                </h2>
                <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                  <p>
                    <strong className="text-tci-blue">TCI BENIN</strong> est un centre de formation professionnelle créé depuis plus de 10 ans, 
                    dédié à l'excellence et à l'insertion professionnelle des jeunes au Bénin et en Côte d'Ivoire.
                  </p>
                  <p>
                    Nous proposons des formations diplômantes reconnues par l'État (CQM et CQP) dans les domaines 
                    du numérique, de l'énergie, de l'industrie et des métiers du lifestyle.
                  </p>
                  <p>
                    Avec <strong className="text-tci-red">5 sites de formation</strong> au Bénin et une présence à Abidjan, 
                    nous sommes le partenaire de référence pour votre développement professionnel.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-tci-blue flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold text-gray-900">Diplômes Reconnus</div>
                      <div className="text-sm text-gray-600">CQM et CQP certifiés</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-tci-blue flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold text-gray-900">Formateurs Experts</div>
                      <div className="text-sm text-gray-600">Professionnels qualifiés</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-tci-blue flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold text-gray-900">Équipements Modernes</div>
                      <div className="text-sm text-gray-600">Matériel professionnel</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-tci-blue flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold text-gray-900">Insertion Garantie</div>
                      <div className="text-sm text-gray-600">Suivi post-formation</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&auto=format&fit=crop"
                    alt="Centre TCI Formation"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-8 -left-8 bg-tci-red text-white p-8 rounded-2xl shadow-xl max-w-xs">
                  <div className="text-3xl font-bold mb-2">2000+</div>
                  <div className="text-white/90">Étudiants nous ont fait confiance</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="border-0 shadow-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-tci-blue to-tci-blue/80"></div>
                <CardContent className="relative z-10 p-12 text-white">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold mb-6">Notre Mission</h3>
                  <p className="text-lg text-white/90 leading-relaxed mb-6">
                    Répondre au défi de l'emploi des jeunes en Afrique par une formation professionnelle de qualité, 
                    en parfaite adéquation avec les besoins réels du marché du travail.
                  </p>
                  <p className="text-white/80 leading-relaxed">
                    Nous nous engageons à former des professionnels compétents, autonomes et capables de s'adapter 
                    aux évolutions technologiques et économiques de leur secteur.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-tci-red to-tci-red/80"></div>
                <CardContent className="relative z-10 p-12 text-white">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold mb-6">Notre Vision</h3>
                  <p className="text-lg text-white/90 leading-relaxed mb-6">
                    Devenir le centre de référence en matière de formation professionnelle au Bénin et en Afrique de l'Ouest.
                  </p>
                  <p className="text-white/80 leading-relaxed">
                    Reconnu pour l'excellence de nos programmes, l'expertise de nos formateurs et le taux d'insertion 
                    professionnelle exceptionnel de nos diplômés dans leurs domaines respectifs.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Sites Section - FIXED */}
        <section className="py-20 bg-white">
          <div className="container-custom">
            <div className="text-center mb-16">
              <Badge className="bg-tci-blue/10 text-tci-blue border-0 mb-4">NOS CENTRES</Badge>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                5 Centres Modernes au Bénin
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Des infrastructures équipées et accessibles pour votre formation
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {sites.map((site, index) => (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow overflow-hidden bg-white">
                  <CardContent className="p-0">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-0">
                      <div className="md:col-span-3 p-8 space-y-6">
                        <div className="inline-flex items-center gap-2 bg-tci-blue text-white px-4 py-2 rounded-full font-semibold">
                          <Building2 className="w-4 h-4" />
                          {site.name}
                        </div>
                        
                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <MapPin className="w-5 h-5 text-tci-blue flex-shrink-0 mt-1" />
                            <p className="text-gray-700">{site.location}</p>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 font-semibold text-gray-900">
                              <Phone className="w-5 h-5 text-tci-blue" />
                              <span>Contacts :</span>
                            </div>
                            <div className="pl-7 space-y-1">
                              {site.phones.map((phone, i) => (
                                <a
                                  key={i}
                                  href={`tel:${phone.replace(/\s/g, "")}`}
                                  className="block text-gray-600 hover:text-tci-blue transition-colors"
                                >
                                  {phone}
                                </a>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="md:col-span-2 relative h-64 md:h-auto bg-gray-100">
                        {site.image ? (
                          <Image
                            src={site.image}
                            alt={`Site de ${site.name}`}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Building2 className="w-16 h-16 text-gray-300" />
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

        {/* Partners Section - FIXED */}
        <section className="py-20 bg-gray-50">
          <div className="container-custom">
            <div className="text-center mb-16">
              <Badge className="bg-tci-blue/10 text-tci-blue border-0 mb-4">NOS PARTENAIRES</Badge>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Ils Nous Font Confiance
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Collaboration avec des institutions reconnues pour garantir l'excellence
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {partners.map((partner, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 bg-white p-6 rounded-xl border border-gray-200 hover:border-tci-blue hover:shadow-md transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-tci-blue/10 flex items-center justify-center flex-shrink-0 group-hover:bg-tci-blue group-hover:text-white transition-colors">
                    <Handshake className="w-5 h-5 text-tci-blue group-hover:text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 leading-snug">
                    {partner}
                  </span>
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