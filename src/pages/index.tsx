import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraduationCap, Users, Award, TrendingUp, Calendar, ArrowRight, Monitor, Zap, Briefcase, BookOpen, Clock, CheckCircle, Star, Building2, Target } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { HeroSlider } from "@/components/HeroSlider";
import { TestimonialsSlider } from "@/components/TestimonialsSlider";
import { NewsCard } from "@/components/NewsCard";
import { newsService } from "@/services/newsService";
import { intakeDateService } from "@/services/intakeDateService";
import { formationService } from "@/services/formationService";
import type { GetStaticProps } from "next";

interface HomeProps {
  latestNews: any[];
  intakeDates: any[];
  digitalFormations: any[];
  energieFormations: any[];
  businessFormations: any[];
}

export default function Home({ latestNews, intakeDates, digitalFormations, energieFormations, businessFormations }: HomeProps) {
  const stats = [
    { 
      icon: GraduationCap, 
      label: "Programmes", 
      value: "50+",
      description: "Formations certifiantes",
      gradient: "from-tci-blue via-tci-blue to-blue-700"
    },
    { 
      icon: Users, 
      label: "Étudiants", 
      value: "2000+",
      description: "Formés chaque année",
      gradient: "from-tci-red via-red-500 to-red-700"
    },
    { 
      icon: Award, 
      label: "Diplômes", 
      value: "15+",
      description: "Certifications reconnues",
      gradient: "from-tci-blue via-tci-blue to-blue-700"
    },
    { 
      icon: TrendingUp, 
      label: "Insertion", 
      value: "95%",
      description: "Taux de réussite",
      gradient: "from-tci-red via-red-500 to-red-700"
    },
  ];

  const advantages = [
    {
      icon: Target,
      title: "Formation Pratique",
      description: "70% de pratique pour une maîtrise professionnelle complète"
    },
    {
      icon: Building2,
      title: "Infrastructures Modernes",
      description: "Équipements de pointe et ateliers techniques professionnels"
    },
    {
      icon: Award,
      title: "Diplômes Reconnus",
      description: "Certifications officielles reconnues par l'État et les entreprises"
    },
    {
      icon: Users,
      title: "Accompagnement Personnalisé",
      description: "Suivi individuel et coaching professionnel tout au long du parcours"
    }
  ];

  return (
    <>
      <SEO 
        title="TCI Formation - Centre de Formation Professionnelle au Bénin"
        description="Centre de formation professionnelle leader au Bénin. Formations diplômantes en informatique, électricité, mode, hôtellerie et plus encore."
      />
      
      <Header />
      
      <main className="min-h-screen">
        {/* Hero Section - Clean & Professional */}
        <section className="relative bg-gradient-to-br from-white via-gray-50 to-blue-50 overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, #0066CC 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }}></div>
          </div>
          
          <div className="container-custom relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[600px] py-20">
              {/* Left Content */}
              <div className="space-y-8 animate-fade-in">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-tci-blue/10 rounded-full">
                  <span className="w-2 h-2 bg-tci-blue rounded-full animate-pulse"></span>
                  <span className="text-sm font-semibold text-tci-blue">Centre de Formation d'Excellence</span>
                </div>
                
                <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl leading-tight">
                  Façonnez Votre
                  <span className="block text-tci-blue mt-2">Avenir Professionnel</span>
                  <span className="block text-tci-red mt-2">Avec TCI Formation</span>
                </h1>
                
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-xl">
                  Rejoignez le centre de formation professionnelle de référence au Bénin. 
                  Des programmes certifiants, des équipements modernes et un accompagnement personnalisé.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="btn-tci text-lg px-8 group shadow-xl">
                    <Link href="/admissions" className="flex items-center gap-2">
                      Commencer Maintenant
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="text-lg px-8 border-2">
                    <Link href="/formations">
                      Découvrir Nos Formations
                    </Link>
                  </Button>
                </div>

                {/* Trust Indicators */}
                <div className="flex flex-wrap items-center gap-8 pt-6">
                  <div>
                    <div className="flex items-center gap-1 text-yellow-500 mb-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-5 h-5 fill-current" />
                      ))}
                    </div>
                    <p className="text-sm text-gray-600">
                      <span className="font-bold text-gray-900">4.9/5</span> basé sur 500+ avis
                    </p>
                  </div>
                  <div className="h-12 w-px bg-gray-300"></div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">2000+</p>
                    <p className="text-sm text-gray-600">Étudiants formés</p>
                  </div>
                </div>
              </div>

              {/* Right Image */}
              <div className="relative animate-slide-up hidden lg:block">
                <div className="absolute -top-6 -left-6 w-72 h-72 bg-tci-blue/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-6 -right-6 w-72 h-72 bg-tci-red/10 rounded-full blur-3xl"></div>
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="/logo-tci.jpg"
                    alt="TCI Formation"
                    width={600}
                    height={600}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section - Modern & Clean */}
        <section className="py-20 bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div 
                    key={index}
                    className="group relative text-center animate-scale"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="space-y-4">
                      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.gradient} shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                          {stat.value}
                        </div>
                        <div className="text-base font-semibold text-gray-900 mb-1">
                          {stat.label}
                        </div>
                        <div className="text-sm text-gray-600">
                          {stat.description}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Intake Dates - Clean Orange Design */}
        {intakeDates.length > 0 && (
          <section className="py-20 bg-gradient-to-br from-orange-50 to-white">
            <div className="container-custom">
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-orange-100 text-orange-700 hover:bg-orange-200 px-4 py-2 text-sm font-semibold">
                  PROCHAINES RENTRÉES
                </Badge>
                <h2 className="font-heading font-bold text-3xl md:text-5xl text-gray-900 mb-4">
                  Planifiez Votre Inscription
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Ne manquez pas nos prochaines sessions de formation
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {intakeDates.map((date, index) => (
                  <div
                    key={date.id}
                    className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10 p-8 text-center">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-orange-100 group-hover:bg-white/20 mb-4 transition-colors">
                        <Calendar className="w-6 h-6 text-orange-600 group-hover:text-white transition-colors" />
                      </div>
                      <h3 className="font-heading font-bold text-xl text-gray-900 group-hover:text-white transition-colors">
                        {date.label}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-12">
                <Button asChild size="lg" className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-xl text-lg px-8">
                  <Link href="/admissions" className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    S'inscrire Maintenant
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        )}

        {/* Advantages Section */}
        <section className="py-20 bg-white">
          <div className="container-custom">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-tci-blue/10 text-tci-blue hover:bg-tci-blue/20 px-4 py-2 text-sm font-semibold">
                NOS ATOUTS
              </Badge>
              <h2 className="font-heading font-bold text-3xl md:text-5xl text-gray-900 mb-4">
                Pourquoi Choisir TCI Formation ?
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {advantages.map((advantage, index) => {
                const Icon = advantage.icon;
                return (
                  <div 
                    key={index}
                    className="group text-center space-y-4 p-6 rounded-2xl hover:bg-gray-50 transition-all duration-300"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-tci-blue to-blue-700 shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-heading font-semibold text-xl text-gray-900">
                      {advantage.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {advantage.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Formations Section - Clean Tabs */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container-custom">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-tci-blue/10 text-tci-blue hover:bg-tci-blue/20 px-4 py-2 text-sm font-semibold">
                NOS PARCOURS
              </Badge>
              <h2 className="font-heading font-bold text-3xl md:text-5xl text-gray-900 mb-4">
                Découvrez Nos Formations
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Choisissez votre parcours professionnel parmi nos 3 pôles d'excellence
              </p>
            </div>

            <Tabs defaultValue="digital" className="w-full">
              <TabsList className="grid w-full max-w-3xl mx-auto grid-cols-3 mb-12 h-auto bg-white shadow-lg rounded-2xl p-2">
                <TabsTrigger 
                  value="digital" 
                  className="flex flex-col gap-2 py-6 rounded-xl data-[state=active]:bg-gradient-to-br data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-xl transition-all duration-300"
                >
                  <Monitor className="w-8 h-8" />
                  <span className="font-semibold text-sm md:text-base">Digital</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="energie" 
                  className="flex flex-col gap-2 py-6 rounded-xl data-[state=active]:bg-gradient-to-br data-[state=active]:from-yellow-500 data-[state=active]:to-yellow-600 data-[state=active]:text-white data-[state=active]:shadow-xl transition-all duration-300"
                >
                  <Zap className="w-8 h-8" />
                  <span className="font-semibold text-sm md:text-base">Énergie</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="business" 
                  className="flex flex-col gap-2 py-6 rounded-xl data-[state=active]:bg-gradient-to-br data-[state=active]:from-purple-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-xl transition-all duration-300"
                >
                  <Briefcase className="w-8 h-8" />
                  <span className="font-semibold text-sm md:text-base">Business</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="digital" className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                  {digitalFormations.slice(0, 6).map((formation) => (
                    <Card key={formation.id} className="group hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 hover:border-blue-500/50 bg-white">
                      {formation.image_url && (
                        <div className="aspect-[16/10] relative overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100">
                          <img
                            src={formation.image_url}
                            alt={formation.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                          <div className="absolute top-4 right-4">
                            <Badge className="bg-white/90 text-blue-600 font-semibold">Digital</Badge>
                          </div>
                        </div>
                      )}
                      <CardHeader className="space-y-3">
                        <CardTitle className="text-xl font-bold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors">
                          {formation.title}
                        </CardTitle>
                        <CardDescription className="text-gray-600 line-clamp-2 leading-relaxed">
                          {formation.description}
                        </CardDescription>
                        <div className="flex items-center gap-4 text-sm text-gray-600 pt-2">
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4 text-blue-600" />
                            <span className="font-medium">{formation.duration || '6 mois'}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <CheckCircle className="w-4 h-4 text-blue-600" />
                            <span className="font-medium">{formation.requirements}</span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <Button asChild className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg">
                          <Link href="/admissions">S'inscrire</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="text-center">
                  <Button asChild variant="outline" size="lg" className="group border-2">
                    <Link href="/parcours/digital" className="flex items-center gap-2">
                      Voir toutes les formations Digital
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="energie" className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                  {energieFormations.slice(0, 6).map((formation) => (
                    <Card key={formation.id} className="group hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 hover:border-yellow-500/50 bg-white">
                      {formation.image_url && (
                        <div className="aspect-[16/10] relative overflow-hidden bg-gradient-to-br from-yellow-50 to-yellow-100">
                          <img
                            src={formation.image_url}
                            alt={formation.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                          <div className="absolute top-4 right-4">
                            <Badge className="bg-white/90 text-yellow-600 font-semibold">Énergie</Badge>
                          </div>
                        </div>
                      )}
                      <CardHeader className="space-y-3">
                        <CardTitle className="text-xl font-bold text-gray-900 leading-tight group-hover:text-yellow-600 transition-colors">
                          {formation.title}
                        </CardTitle>
                        <CardDescription className="text-gray-600 line-clamp-2 leading-relaxed">
                          {formation.description}
                        </CardDescription>
                        <div className="flex items-center gap-4 text-sm text-gray-600 pt-2">
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4 text-yellow-600" />
                            <span className="font-medium">{formation.duration || '6 mois'}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <CheckCircle className="w-4 h-4 text-yellow-600" />
                            <span className="font-medium">{formation.requirements}</span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <Button asChild className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 shadow-lg">
                          <Link href="/admissions">S'inscrire</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="text-center">
                  <Button asChild variant="outline" size="lg" className="group border-2">
                    <Link href="/parcours/energie" className="flex items-center gap-2">
                      Voir toutes les formations Énergie
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="business" className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                  {businessFormations.slice(0, 6).map((formation) => (
                    <Card key={formation.id} className="group hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 hover:border-purple-500/50 bg-white">
                      {formation.image_url && (
                        <div className="aspect-[16/10] relative overflow-hidden bg-gradient-to-br from-purple-50 to-purple-100">
                          <img
                            src={formation.image_url}
                            alt={formation.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                          <div className="absolute top-4 right-4">
                            <Badge className="bg-white/90 text-purple-600 font-semibold">Business</Badge>
                          </div>
                        </div>
                      )}
                      <CardHeader className="space-y-3">
                        <CardTitle className="text-xl font-bold text-gray-900 leading-tight group-hover:text-purple-600 transition-colors">
                          {formation.title}
                        </CardTitle>
                        <CardDescription className="text-gray-600 line-clamp-2 leading-relaxed">
                          {formation.description}
                        </CardDescription>
                        <div className="flex items-center gap-4 text-sm text-gray-600 pt-2">
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4 text-purple-600" />
                            <span className="font-medium">{formation.duration || '6 mois'}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <CheckCircle className="w-4 h-4 text-purple-600" />
                            <span className="font-medium">{formation.requirements}</span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <Button asChild className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 shadow-lg">
                          <Link href="/admissions">S'inscrire</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="text-center">
                  <Button asChild variant="outline" size="lg" className="group border-2">
                    <Link href="/parcours/business" className="flex items-center gap-2">
                      Voir toutes les formations Business
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* CTA Section - Modern Gradient */}
        <section className="py-24 bg-gradient-to-br from-tci-blue via-blue-600 to-blue-800 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }}></div>
          </div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-tci-red/20 rounded-full blur-3xl"></div>
          
          <div className="container-custom text-center relative z-10">
            <div className="max-w-3xl mx-auto space-y-8">
              <h2 className="font-heading font-bold text-3xl md:text-5xl leading-tight">
                Prêt à Transformer Votre Avenir Professionnel ?
              </h2>
              <p className="text-lg md:text-xl text-white/90 leading-relaxed">
                Rejoignez TCI Formation et donnez vie à vos ambitions. 
                Plus de 2000 étudiants nous ont fait confiance pour leur formation professionnelle.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button asChild size="lg" className="bg-white text-tci-blue hover:bg-gray-100 shadow-2xl text-lg px-8">
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
        </section>

        {/* News Section */}
        {latestNews.length > 0 && (
          <section className="py-20 bg-white">
            <div className="container-custom">
              <div className="flex items-center justify-between mb-12">
                <div>
                  <Badge className="mb-4 bg-tci-blue/10 text-tci-blue hover:bg-tci-blue/20 px-4 py-2 text-sm font-semibold">
                    ACTUALITÉS
                  </Badge>
                  <h2 className="font-heading font-bold text-3xl md:text-5xl text-gray-900">
                    Dernières Nouvelles
                  </h2>
                </div>
                <Button asChild variant="outline" className="group hidden md:flex border-2">
                  <Link href="/actualites" className="flex items-center gap-2">
                    Voir tout
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {latestNews.slice(0, 3).map((news) => (
                  <NewsCard key={news.id} news={news} />
                ))}
              </div>

              <div className="text-center mt-8 md:hidden">
                <Button asChild variant="outline" className="border-2">
                  <Link href="/actualites" className="flex items-center gap-2">
                    Voir tout
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        )}

        {/* Testimonials */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container-custom">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-tci-blue/10 text-tci-blue hover:bg-tci-blue/20 px-4 py-2 text-sm font-semibold">
                TÉMOIGNAGES
              </Badge>
              <h2 className="font-heading font-bold text-3xl md:text-5xl text-gray-900 mb-4">
                Ils Nous Font Confiance
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Découvrez les témoignages de nos étudiants et diplômés
              </p>
            </div>
            <TestimonialsSlider />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { data: allNews } = await newsService.getAll();
  const latestNews = allNews?.slice(0, 3) || [];
  
  const { data: intakeDates } = await intakeDateService.getAll();
  const { data: allFormations } = await formationService.getAll();

  const digitalFormations = allFormations?.filter(f => 
    (f as any).pole === 'digital' || 
    (!((f as any).pole) && (
      f.title.toLowerCase().includes('informatique') ||
      f.title.toLowerCase().includes('logiciel') ||
      f.title.toLowerCase().includes('réseaux') ||
      f.title.toLowerCase().includes('web')
    ))
  ) || [];

  const energieFormations = allFormations?.filter(f => 
    (f as any).pole === 'energie' ||
    (!((f as any).pole) && (
      f.title.toLowerCase().includes('électrique') ||
      f.title.toLowerCase().includes('électricité') ||
      f.title.toLowerCase().includes('froid') ||
      f.title.toLowerCase().includes('solaire')
    ))
  ) || [];

  const businessFormations = allFormations?.filter(f => 
    (f as any).pole === 'business' ||
    (!((f as any).pole) && (
      f.title.toLowerCase().includes('couture') ||
      f.title.toLowerCase().includes('coiffure') ||
      f.title.toLowerCase().includes('hôtellerie') ||
      f.title.toLowerCase().includes('secrétariat')
    ))
  ) || [];

  return {
    props: {
      latestNews: latestNews || [],
      intakeDates: intakeDates || [],
      digitalFormations,
      energieFormations,
      businessFormations,
    },
    revalidate: 60,
  };
};