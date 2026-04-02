import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Scissors, ChefHat, Sparkles, Award, Clock, ArrowRight, Target, Users, Heart, CheckCircle } from "lucide-react";
import Link from "next/link";
import { formationService, type Formation } from "@/services/formationService";
import { GetStaticProps } from "next";

interface BusinessProps {
  formations: Formation[];
}

export default function Business({ formations }: BusinessProps) {
  const features = [
    {
      icon: Target,
      title: "Pratique Intensive",
      description: "80% de pratique avec matériel professionnel et situations réelles"
    },
    {
      icon: Users,
      title: "Professionnels Experts",
      description: "Formateurs entrepreneurs avec expérience terrain reconnue"
    },
    {
      icon: Heart,
      title: "Accompagnement Création",
      description: "Support pour lancer votre propre entreprise ou salon"
    },
    {
      icon: Award,
      title: "Certifications Métier",
      description: "Diplômes reconnus par les fédérations professionnelles"
    }
  ];

  const skills = [
    "Mode & Couture",
    "Stylisme",
    "Coiffure Professionnelle",
    "Esthétique & Spa",
    "Cuisine Gastronomique",
    "Pâtisserie",
    "Hôtellerie",
    "Secrétariat"
  ];

  return (
    <>
      <SEO 
        title="Pôle Business & Lifestyle - TCI Formation"
        description="Formations en mode, esthétique, coiffure, hôtellerie, restauration et secrétariat. Lancez votre entreprise avec TCI Formation."
      />
      
      <Header />
      
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-white via-purple-50/30 to-white py-24 overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03]">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, #9333EA 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }}></div>
          </div>

          <div className="container-custom relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-purple-500 to-pink-600 shadow-xl mb-4">
                <Briefcase className="w-10 h-10 text-white" />
              </div>
              
              <div>
                <Badge className="mb-4 bg-purple-100 text-purple-700 hover:bg-purple-200 px-4 py-2 text-sm font-semibold">
                  PÔLE BUSINESS & LIFESTYLE
                </Badge>
                <h1 className="font-heading font-bold text-4xl md:text-6xl text-gray-900 mb-6 leading-tight">
                  Créez Votre Propre
                  <span className="block text-purple-600 mt-2">Entreprise</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                  Développez vos talents dans les métiers de la mode, de la beauté, de l'hôtellerie et du secrétariat. 
                  Formation complète avec accompagnement entrepreneurial.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button asChild size="lg" className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-pink-600 hover:to-purple-500 text-white shadow-xl text-lg px-8">
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
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 shadow-lg">
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
              <Badge className="mb-4 bg-purple-100 text-purple-700 hover:bg-purple-200 px-4 py-2 text-sm font-semibold">
                DOMAINES D'EXPERTISE
              </Badge>
              <h2 className="font-heading font-bold text-3xl md:text-5xl text-gray-900 mb-4">
                Ce Que Vous Allez Apprendre
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              <Card className="group border-2 hover:border-purple-500/50 hover:shadow-2xl transition-all duration-300 overflow-hidden bg-white">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-pink-100 group-hover:bg-gradient-to-br group-hover:from-pink-500 group-hover:to-pink-700 transition-all duration-300">
                    <Scissors className="w-8 h-8 text-pink-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-heading font-bold text-2xl text-gray-900">Mode & Couture</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Stylisme, modélisme, haute couture, confection professionnelle
                  </p>
                </CardContent>
              </Card>

              <Card className="group border-2 hover:border-purple-500/50 hover:shadow-2xl transition-all duration-300 overflow-hidden bg-white">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-purple-100 group-hover:bg-gradient-to-br group-hover:from-purple-500 group-hover:to-purple-700 transition-all duration-300">
                    <Sparkles className="w-8 h-8 text-purple-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-heading font-bold text-2xl text-gray-900">Beauté & Esthétique</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Coiffure, maquillage, soins esthétiques, onglerie professionnelle
                  </p>
                </CardContent>
              </Card>

              <Card className="group border-2 hover:border-purple-500/50 hover:shadow-2xl transition-all duration-300 overflow-hidden bg-white">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-orange-100 group-hover:bg-gradient-to-br group-hover:from-orange-500 group-hover:to-orange-700 transition-all duration-300">
                    <ChefHat className="w-8 h-8 text-orange-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-heading font-bold text-2xl text-gray-900">Hôtellerie & Restauration</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Cuisine gastronomique, pâtisserie, gestion hôtelière
                  </p>
                </CardContent>
              </Card>

              <Card className="group border-2 hover:border-purple-500/50 hover:shadow-2xl transition-all duration-300 overflow-hidden bg-white">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-100 group-hover:bg-gradient-to-br group-hover:from-blue-500 group-hover:to-blue-700 transition-all duration-300">
                    <Briefcase className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-heading font-bold text-2xl text-gray-900">Secrétariat</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Bureautique, administration, gestion d'entreprise
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Skills Pills */}
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              {skills.map((skill, index) => (
                <div key={index} className="px-6 py-3 bg-white border-2 border-gray-200 rounded-full text-gray-700 font-medium hover:border-purple-500 hover:text-purple-600 transition-all duration-300 shadow-sm hover:shadow-md">
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
              <Badge className="mb-4 bg-purple-100 text-purple-700 hover:bg-purple-200 px-4 py-2 text-sm font-semibold">
                NOS PROGRAMMES
              </Badge>
              <h2 className="font-heading font-bold text-3xl md:text-5xl text-gray-900 mb-4">
                Formations Business & Lifestyle
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Choisissez la formation qui correspond à vos ambitions professionnelles
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {formations.map((formation) => (
                <Card key={formation.id} className="group border-2 hover:border-purple-500/50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden bg-white">
                  {formation.image_url && (
                    <div className="aspect-[16/10] relative overflow-hidden bg-gradient-to-br from-purple-50 to-pink-100">
                      <img
                        src={formation.image_url}
                        alt={formation.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-white/95 text-purple-600 font-semibold shadow-lg">Business</Badge>
                      </div>
                    </div>
                  )}
                  <CardContent className="p-6 space-y-4">
                    <h3 className="font-heading font-bold text-xl text-gray-900 leading-tight group-hover:text-purple-600 transition-colors">
                      {formation.title}
                    </h3>
                    <p className="text-gray-600 line-clamp-3 leading-relaxed">
                      {formation.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-600 pt-2 border-t">
                      {formation.duration && (
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4 text-purple-600" />
                          <span className="font-medium">{formation.duration}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1.5">
                        <CheckCircle className="w-4 h-4 text-purple-600" />
                        <span className="font-medium">Certifiant</span>
                      </div>
                    </div>
                    <Button asChild className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-pink-600 hover:to-purple-500 shadow-lg">
                      <Link href="/admissions">
                        S'inscrire
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* CTA Section */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-500 via-purple-600 to-pink-600 text-white p-12 md:p-16 shadow-2xl">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-400/20 rounded-full blur-3xl"></div>
              
              <div className="relative z-10 text-center max-w-3xl mx-auto space-y-6">
                <h2 className="font-heading font-bold text-3xl md:text-4xl leading-tight">
                  Lancez Votre Carrière dans le Business et le Lifestyle
                </h2>
                <p className="text-lg md:text-xl text-white/90 leading-relaxed">
                  Formations complètes avec stages pratiques et accompagnement entrepreneurial personnalisé
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  <Button asChild size="lg" className="bg-white text-purple-600 hover:bg-gray-100 shadow-2xl text-lg px-8">
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

  const businessFormations = formations?.filter(f => 
    (f as any).pole === 'business' ||
    (!((f as any).pole) && (
      f.title.toLowerCase().includes('couture') ||
      f.title.toLowerCase().includes('coiffure') ||
      f.title.toLowerCase().includes('esthétique') ||
      f.title.toLowerCase().includes('stylisme') ||
      f.title.toLowerCase().includes('make up') ||
      f.title.toLowerCase().includes('cuisine') ||
      f.title.toLowerCase().includes('pâtisserie') ||
      f.title.toLowerCase().includes('hôtellerie') ||
      f.title.toLowerCase().includes('restauration') ||
      f.title.toLowerCase().includes('secrétariat') ||
      f.title.toLowerCase().includes('élevage')
    ))
  ) || [];

  return {
    props: {
      formations: businessFormations,
    },
    revalidate: 60,
  };
};