import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraduationCap, Users, Award, TrendingUp, Calendar, ArrowRight, Monitor, Zap, Briefcase, BookOpen, Clock, CheckCircle } from "lucide-react";
import Link from "next/link";
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
    { icon: GraduationCap, label: "Formations", value: "50+", color: "from-blue-500 to-blue-600" },
    { icon: Users, label: "Étudiants", value: "2000+", color: "from-green-500 to-green-600" },
    { icon: Award, label: "Certifications", value: "15+", color: "from-purple-500 to-purple-600" },
    { icon: TrendingUp, label: "Taux de réussite", value: "95%", color: "from-orange-500 to-orange-600" },
  ];

  return (
    <>
      <SEO 
        title="TCI Formation - Centre de Formation Professionnelle au Bénin"
        description="Centre de formation professionnelle leader au Bénin. Formations diplômantes en informatique, électricité, mode, hôtellerie et plus encore."
      />
      
      <Header />
      
      <main className="overflow-hidden">
        {/* Hero Slider */}
        <HeroSlider />

        {/* Stats Section - Modern Cards */}
        <section className="py-16 bg-gradient-to-b from-muted/30 to-background relative">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="container-custom relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div 
                    key={index} 
                    className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                    <div className="relative z-10">
                      <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${stat.color} mb-4 shadow-lg`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <div className="font-heading font-bold text-3xl md:text-4xl mb-2 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                        {stat.value}
                      </div>
                      <div className="text-sm md:text-base text-muted-foreground font-medium">{stat.label}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Intake Dates Section - Orange Design like the image */}
        {intakeDates.length > 0 && (
          <section className="py-20 bg-gradient-to-br from-gray-800 via-gray-900 to-black relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,152,0,0.1),transparent_50%)]"></div>
            </div>
            
            <div className="container-custom relative z-10">
              <div className="text-center mb-12">
                <h2 className="font-heading font-bold text-3xl md:text-5xl mb-4 text-white">
                  NOS RENTRÉES
                </h2>
                <div className="h-1 w-24 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto rounded-full"></div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
                {intakeDates.map((date, index) => (
                  <div
                    key={date.id}
                    className="group relative overflow-hidden rounded-lg"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 transform transition-transform duration-300 group-hover:scale-105"></div>
                    <div className="relative z-10 p-6 text-center">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Calendar className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="font-heading font-bold text-xl text-white">
                        {date.label}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-12">
                <Button asChild size="lg" className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5 transition-all duration-300">
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

        {/* Nos Parcours - Premium Design */}
        <section className="py-20 bg-gradient-to-b from-background to-muted/20">
          <div className="container-custom">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 text-sm px-4 py-2">
                NOS PARCOURS
              </Badge>
              <h2 className="font-heading font-bold text-3xl md:text-5xl mb-4 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Découvrez Nos Formations
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Choisissez votre parcours professionnel parmi nos 3 pôles d'excellence
              </p>
            </div>

            <Tabs defaultValue="digital" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8 h-auto bg-muted/50 p-2 rounded-2xl">
                <TabsTrigger 
                  value="digital" 
                  className="flex flex-col gap-2 py-4 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-lg transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                    <Monitor className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-semibold">Digital & Software</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="energie" 
                  className="flex flex-col gap-2 py-4 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-lg transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-semibold">Énergie & Industrie</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="business" 
                  className="flex flex-col gap-2 py-4 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-lg transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-semibold">Business & Lifestyle</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="digital" className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {digitalFormations.slice(0, 6).map((formation) => (
                    <Card key={formation.id} className="group hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 hover:border-primary/50">
                      {formation.image_url && (
                        <div className="aspect-video relative overflow-hidden">
                          <img
                            src={formation.image_url}
                            alt={formation.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        </div>
                      )}
                      <CardHeader>
                        <div className="flex items-start gap-3 mb-2">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                            <BookOpen className="w-5 h-5 text-white" />
                          </div>
                          <CardTitle className="text-lg leading-tight">{formation.title}</CardTitle>
                        </div>
                        <CardDescription className="line-clamp-2">
                          {formation.description}
                        </CardDescription>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-3">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{formation.duration || '6 mois'}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <CheckCircle className="w-4 h-4" />
                            <span>{formation.requirements}</span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <Button asChild className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                          <Link href="/admissions">S'inscrire</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="text-center">
                  <Button asChild variant="outline" size="lg" className="group">
                    <Link href="/parcours/digital" className="flex items-center gap-2">
                      Voir toutes les formations Digital
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="energie" className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {energieFormations.slice(0, 6).map((formation) => (
                    <Card key={formation.id} className="group hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 hover:border-primary/50">
                      {formation.image_url && (
                        <div className="aspect-video relative overflow-hidden">
                          <img
                            src={formation.image_url}
                            alt={formation.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        </div>
                      )}
                      <CardHeader>
                        <div className="flex items-start gap-3 mb-2">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center flex-shrink-0">
                            <Zap className="w-5 h-5 text-white" />
                          </div>
                          <CardTitle className="text-lg leading-tight">{formation.title}</CardTitle>
                        </div>
                        <CardDescription className="line-clamp-2">
                          {formation.description}
                        </CardDescription>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-3">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{formation.duration || '6 mois'}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <CheckCircle className="w-4 h-4" />
                            <span>{formation.requirements}</span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <Button asChild className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700">
                          <Link href="/admissions">S'inscrire</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="text-center">
                  <Button asChild variant="outline" size="lg" className="group">
                    <Link href="/parcours/energie" className="flex items-center gap-2">
                      Voir toutes les formations Énergie
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="business" className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {businessFormations.slice(0, 6).map((formation) => (
                    <Card key={formation.id} className="group hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 hover:border-primary/50">
                      {formation.image_url && (
                        <div className="aspect-video relative overflow-hidden">
                          <img
                            src={formation.image_url}
                            alt={formation.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        </div>
                      )}
                      <CardHeader>
                        <div className="flex items-start gap-3 mb-2">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                            <Briefcase className="w-5 h-5 text-white" />
                          </div>
                          <CardTitle className="text-lg leading-tight">{formation.title}</CardTitle>
                        </div>
                        <CardDescription className="line-clamp-2">
                          {formation.description}
                        </CardDescription>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-3">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{formation.duration || '6 mois'}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <CheckCircle className="w-4 h-4" />
                            <span>{formation.requirements}</span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <Button asChild className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700">
                          <Link href="/admissions">S'inscrire</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="text-center">
                  <Button asChild variant="outline" size="lg" className="group">
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
        <section className="py-24 bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          
          <div className="container-custom text-center relative z-10">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-heading font-bold text-3xl md:text-5xl mb-6">
                Prêt à Transformer Votre Avenir ?
              </h2>
              <p className="text-lg md:text-xl text-white/90 mb-8">
                Rejoignez TCI Formation et donnez vie à vos ambitions professionnelles. 
                Plus de 2000 étudiants nous ont fait confiance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 shadow-xl">
                  <Link href="/admissions" className="flex items-center gap-2">
                    S'inscrire Maintenant
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <Link href="/apropos">
                    En savoir plus
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Actualités Section - Modern Cards */}
        {latestNews.length > 0 && (
          <section className="py-20 bg-background">
            <div className="container-custom">
              <div className="flex items-center justify-between mb-12">
                <div>
                  <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
                    ACTUALITÉS
                  </Badge>
                  <h2 className="font-heading font-bold text-3xl md:text-5xl bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                    Dernières Nouvelles
                  </h2>
                </div>
                <Button asChild variant="outline" className="group hidden md:flex">
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
                <Button asChild variant="outline">
                  <Link href="/actualites" className="flex items-center gap-2">
                    Voir tout
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        )}

        {/* Testimonials Section */}
        <section className="py-20 bg-muted/30">
          <div className="container-custom">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
                TÉMOIGNAGES
              </Badge>
              <h2 className="font-heading font-bold text-3xl md:text-5xl mb-4 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Ce Que Disent Nos Étudiants
              </h2>
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