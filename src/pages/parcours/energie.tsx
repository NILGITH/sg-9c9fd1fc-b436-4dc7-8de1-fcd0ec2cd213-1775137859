import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap, Battery, Sun, Wrench, Award, Clock, ArrowRight, Target, Users, Sparkles, CheckCircle } from "lucide-react";
import Link from "next/link";
import { formationService, type Formation } from "@/services/formationService";
import { GetStaticProps } from "next";

interface EnergieProps {
  formations: Formation[];
}

export default function Energie({ formations }: EnergieProps) {
  const features = [
    {
      icon: Target,
      title: "Ateliers Pratiques",
      description: "Formation sur équipements professionnels et installations réelles"
    },
    {
      icon: Users,
      title: "Experts Métier",
      description: "Formateurs électriciens et techniciens certifiés avec 10+ ans d'expérience"
    },
    {
      icon: Sparkles,
      title: "Technologies Vertes",
      description: "Focus sur les énergies renouvelables et solutions écologiques"
    },
    {
      icon: Award,
      title: "Habilitations Officielles",
      description: "Certifications reconnues et habilitations électriques réglementaires"
    }
  ];

  const skills = [
    "Installation Électrique",
    "Énergie Solaire",
    "Maintenance Industrielle",
    "Froid & Climatisation",
    "Domotique",
    "Énergies Renouvelables",
    "Plomberie Sanitaire",
    "Câblage Professionnel"
  ];

  return (
    <>
      <SEO 
        title="Pôle Énergie & Industrie - TCI Formation"
        description="Formations en électricité, énergie solaire, froid et climatisation, plomberie et maintenance industrielle. Devenez technicien qualifié avec TCI Formation."
      />
      
      <Header />
      
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-white via-yellow-50/30 to-white py-24 overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03]">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, #F59E0B 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }}></div>
          </div>

          <div className="container-custom relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-yellow-500 to-orange-600 shadow-xl mb-4">
                <Zap className="w-10 h-10 text-white" />
              </div>
              
              <div>
                <Badge className="mb-4 bg-yellow-100 text-yellow-700 hover:bg-yellow-200 px-4 py-2 text-sm font-semibold">
                  PÔLE ÉNERGIE & INDUSTRIE
                </Badge>
                <h1 className="font-heading font-bold text-4xl md:text-6xl text-gray-900 mb-6 leading-tight">
                  Maîtrisez les Métiers
                  <span className="block text-yellow-600 mt-2">de l'Énergie</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                  Formez-vous aux technologies de l'électricité, du solaire et de la maintenance industrielle. 
                  Formation pratique avec équipements professionnels et stages en entreprise.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button asChild size="lg" className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-orange-600 hover:to-yellow-500 text-white shadow-xl text-lg px-8">
                  <Link href="/admissions" className="flex items-center gap-2">
                    S'inscrire Maintenant
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-2 border-gray-300 text-lg px-8">
                  <Link href="/contact">
                    Demander des Infos
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 bg-white">
          <div className="container-custom">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="text-center space-y-4">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-600 shadow-lg">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-heading font-semibold text-xl text-gray-900">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Domaines Section */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container-custom">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-yellow-100 text-yellow-700 hover:bg-yellow-200 px-4 py-2 text-sm font-semibold">
                DOMAINES D'EXPERTISE
              </Badge>
              <h2 className="font-heading font-bold text-3xl md:text-5xl text-gray-900 mb-4">
                Ce Que Vous Allez Apprendre
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <Card className="group border-2 hover:border-yellow-500/50 hover:shadow-2xl transition-all duration-300 overflow-hidden bg-white">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-yellow-100 group-hover:bg-gradient-to-br group-hover:from-yellow-500 group-hover:to-yellow-700 transition-all duration-300">
                    <Zap className="w-8 h-8 text-yellow-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-heading font-bold text-2xl text-gray-900">Électricité</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Installation électrique bâtiment et industrielle, câblage, maintenance préventive
                  </p>
                </CardContent>
              </Card>

              <Card className="group border-2 hover:border-yellow-500/50 hover:shadow-2xl transition-all duration-300 overflow-hidden bg-white">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-orange-100 group-hover:bg-gradient-to-br group-hover:from-orange-500 group-hover:to-orange-700 transition-all duration-300">
                    <Sun className="w-8 h-8 text-orange-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-heading font-bold text-2xl text-gray-900">Énergie Solaire</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Installation photovoltaïque, systèmes solaires, dimensionnement, énergies vertes
                  </p>
                </CardContent>
              </Card>

              <Card className="group border-2 hover:border-yellow-500/50 hover:shadow-2xl transition-all duration-300 overflow-hidden bg-white">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-cyan-100 group-hover:bg-gradient-to-br group-hover:from-cyan-500 group-hover:to-cyan-700 transition-all duration-300">
                    <Battery className="w-8 h-8 text-cyan-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-heading font-bold text-2xl text-gray-900">Froid & Climatisation</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Réfrigération commerciale, climatisation, dépannage, maintenance des circuits frigorifiques
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Skills Pills */}
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              {skills.map((skill, index) => (
                <div key={index} className="px-6 py-3 bg-white border-2 border-gray-200 rounded-full text-gray-700 font-medium hover:border-yellow-500 hover:text-yellow-600 transition-all duration-300 shadow-sm hover:shadow-md">
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Formations List */}
        <section className="py-20 bg-white">
          <div className="container-custom">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-yellow-100 text-yellow-700 hover:bg-yellow-200 px-4 py-2 text-sm font-semibold">
                NOS PROGRAMMES
              </Badge>
              <h2 className="font-heading font-bold text-3xl md:text-5xl text-gray-900 mb-4">
                Formations Énergie & Industrie
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Choisissez la formation qui correspond à vos ambitions professionnelles
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {formations.map((formation) => (
                <Card key={formation.id} className="group border-2 hover:border-yellow-500/50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden bg-white">
                  {formation.image_url && (
                    <div className="aspect-[16/10] relative overflow-hidden bg-gradient-to-br from-yellow-50 to-orange-100">
                      <img
                        src={formation.image_url}
                        alt={formation.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-white/95 text-yellow-600 font-semibold shadow-lg">Énergie</Badge>
                      </div>
                    </div>
                  )}
                  <CardContent className="p-6 space-y-4">
                    <h3 className="font-heading font-bold text-xl text-gray-900 leading-tight group-hover:text-yellow-600 transition-colors">
                      {formation.title}
                    </h3>
                    <p className="text-gray-600 line-clamp-3 leading-relaxed">
                      {formation.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-600 pt-2 border-t">
                      {formation.duration && (
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4 text-yellow-600" />
                          <span className="font-medium">{formation.duration}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1.5">
                        <CheckCircle className="w-4 h-4 text-yellow-600" />
                        <span className="font-medium">Certifiant</span>
                      </div>
                    </div>
                    <Button asChild className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-orange-600 hover:to-yellow-500 shadow-lg">
                      <Link href="/admissions">
                        S'inscrire
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* CTA Section */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-yellow-500 via-orange-500 to-orange-600 text-white p-12 md:p-16 shadow-2xl">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-400/20 rounded-full blur-3xl"></div>
              
              <div className="relative z-10 text-center max-w-3xl mx-auto space-y-6">
                <h2 className="font-heading font-bold text-3xl md:text-4xl leading-tight">
                  Rejoignez le Secteur de l'Énergie et de l'Industrie
                </h2>
                <p className="text-lg md:text-xl text-white/90 leading-relaxed">
                  Des formations complètes avec équipements professionnels et stages pratiques en entreprise
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  <Button asChild size="lg" className="bg-white text-yellow-600 hover:bg-gray-100 shadow-2xl text-lg px-8">
                    <Link href="/admissions" className="flex items-center gap-2">
                      S'inscrire Maintenant
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 text-lg px-8">
                    <Link href="/contact">
                      Nous Contacter
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { data: formations } = await formationService.getAll();

  const energieFormations = formations?.filter(f => 
    (f as any).pole === 'energie' ||
    (!((f as any).pole) && (
      f.title.toLowerCase().includes('électrique') ||
      f.title.toLowerCase().includes('électricité') ||
      f.title.toLowerCase().includes('froid') ||
      f.title.toLowerCase().includes('plomberie') ||
      f.title.toLowerCase().includes('solaire') ||
      f.title.toLowerCase().includes('maintenance industrielle') ||
      f.title.toLowerCase().includes('climatisation')
    ))
  ) || [];

  return {
    props: {
      formations: energieFormations,
    },
    revalidate: 60,
  };
};