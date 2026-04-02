import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraduationCap, Users, Award, TrendingUp, Calendar, ArrowRight, Monitor, Zap, Briefcase } from "lucide-react";
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
    { icon: GraduationCap, label: "Formations", value: "50+", color: "text-blue-600" },
    { icon: Users, label: "Étudiants", value: "2000+", color: "text-green-600" },
    { icon: Award, label: "Certifications", value: "15+", color: "text-purple-600" },
    { icon: TrendingUp, label: "Taux de réussite", value: "95%", color: "text-orange-600" },
  ];

  return (
    <>
      <SEO 
        title="TCI Formation - Centre de Formation Professionnelle au Bénin"
        description="Centre de formation professionnelle leader au Bénin. Formations diplômantes en informatique, électricité, mode, hôtellerie et plus encore."
      />
      
      <Header />
      
      <main>
        {/* Hero Slider */}
        <HeroSlider />

        {/* Stats Section */}
        <section className="py-12 bg-muted/30">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="text-center">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-md mb-4 ${stat.color}`}>
                      <Icon className="w-8 h-8" />
                    </div>
                    <div className="font-heading font-bold text-3xl mb-2">{stat.value}</div>
                    <div className="text-muted-foreground">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Intake Dates Section */}
        {intakeDates.length > 0 && (
          <section className="py-20">
            <div className="container-custom">
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
                  PROCHAINES RENTRÉES
                </Badge>
                <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
                  Nos Rentrées 2026
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Préparez votre inscription pour les prochaines sessions de formation
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {intakeDates.slice(0, 6).map((date) => (
                  <Card key={date.id} className="hover:shadow-lg transition-shadow border-l-4 border-l-primary">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <Calendar className="w-5 h-5 text-primary" />
                        <Badge className="bg-orange-500 hover:bg-orange-600">{date.session_name}</Badge>
                      </div>
                      <CardTitle className="text-xl">{date.title}</CardTitle>
                      <CardDescription className="text-base">
                        Date limite : {new Date(date.deadline).toLocaleDateString('fr-FR', { 
                          day: 'numeric', 
                          month: 'long', 
                          year: 'numeric' 
                        })}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>

              <div className="text-center mt-8">
                <Button asChild size="lg" className="bg-gradient-accent hover:opacity-90">
                  <Link href="/admissions">
                    <Calendar className="w-4 h-4 mr-2" />
                    S'inscrire Maintenant
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        )}

        {/* Nos Parcours - Formations par Pôles */}
        <section className="py-20 bg-muted/30">
          <div className="container-custom">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
                NOS PARCOURS
              </Badge>
              <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
                Découvrez Nos Formations par Pôles
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Choisissez votre parcours professionnel parmi nos 3 pôles d'excellence
              </p>
            </div>

            <Tabs defaultValue="digital" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8 h-auto">
                <TabsTrigger value="digital" className="flex flex-col gap-2 py-4">
                  <Monitor className="w-6 h-6" />
                  <span>Digital & Software</span>
                </TabsTrigger>
                <TabsTrigger value="energie" className="flex flex-col gap-2 py-4">
                  <Zap className="w-6 h-6" />
                  <span>Énergie & Industrie</span>
                </TabsTrigger>
                <TabsTrigger value="business" className="flex flex-col gap-2 py-4">
                  <Briefcase className="w-6 h-6" />
                  <span>Business & Lifestyle</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="digital">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {digitalFormations.slice(0, 6).map((formation) => (
                    <Card key={formation.id} className="hover:shadow-xl transition-shadow">
                      {formation.image_url && (
                        <div className="aspect-video relative overflow-hidden">
                          <img
                            src={formation.image_url}
                            alt={formation.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <CardHeader>
                        <CardTitle className="text-lg">{formation.title}</CardTitle>
                        <CardDescription className="line-clamp-2">
                          {formation.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button asChild className="w-full bg-primary">
                          <Link href="/admissions">S'inscrire</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="text-center">
                  <Button asChild variant="outline" size="lg">
                    <Link href="/parcours/digital">
                      Voir toutes les formations Digital
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="energie">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {energieFormations.slice(0, 6).map((formation) => (
                    <Card key={formation.id} className="hover:shadow-xl transition-shadow">
                      {formation.image_url && (
                        <div className="aspect-video relative overflow-hidden">
                          <img
                            src={formation.image_url}
                            alt={formation.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <CardHeader>
                        <CardTitle className="text-lg">{formation.title}</CardTitle>
                        <CardDescription className="line-clamp-2">
                          {formation.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button asChild className="w-full bg-primary">
                          <Link href="/admissions">S'inscrire</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="text-center">
                  <Button asChild variant="outline" size="lg">
                    <Link href="/parcours/energie">
                      Voir toutes les formations Énergie
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="business">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {businessFormations.slice(0, 6).map((formation) => (
                    <Card key={formation.id} className="hover:shadow-xl transition-shadow">
                      {formation.image_url && (
                        <div className="aspect-video relative overflow-hidden">
                          <img
                            src={formation.image_url}
                            alt={formation.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <CardHeader>
                        <CardTitle className="text-lg">{formation.title}</CardTitle>
                        <CardDescription className="line-clamp-2">
                          {formation.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button asChild className="w-full bg-primary">
                          <Link href="/admissions">S'inscrire</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="text-center">
                  <Button asChild variant="outline" size="lg">
                    <Link href="/parcours/business">
                      Voir toutes les formations Business
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-hero text-white">
          <div className="container-custom text-center">
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-6">
              Prêt à Transformer Votre Avenir ?
            </h2>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Rejoignez TCI Formation et donnez vie à vos ambitions professionnelles
            </p>
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
              <Link href="/admissions">
                S'inscrire Maintenant
              </Link>
            </Button>
          </div>
        </section>

        {/* Actualités Section */}
        {latestNews.length > 0 && (
          <section className="py-20">
            <div className="container-custom">
              <div className="flex items-center justify-between mb-12">
                <div>
                  <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
                    ACTUALITÉS
                  </Badge>
                  <h2 className="font-heading font-bold text-3xl md:text-4xl">
                    Dernières Nouvelles
                  </h2>
                </div>
                <Button asChild variant="outline">
                  <Link href="/actualites">
                    Voir tout
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {latestNews.slice(0, 3).map((news) => (
                  <NewsCard key={news.id} news={news} />
                ))}
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
              <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
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

  // Filter formations by pole
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