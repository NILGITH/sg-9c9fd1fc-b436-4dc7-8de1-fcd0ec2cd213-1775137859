import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HeroSlider } from "@/components/HeroSlider";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight, Users, Award, MapPin, Calendar, Briefcase, GraduationCap } from "lucide-react";
import { formationService, type Formation } from "@/services/formationService";
import { newsService, type News } from "@/services/newsService";
import { NewsCard } from "@/components/NewsCard";
import { TestimonialsSlider } from "@/components/TestimonialsSlider";

interface HomeProps {
  featuredFormations: Formation[];
  recentNews: News[];
}

export default function Home({ featuredFormations, recentNews }: HomeProps) {
  const stats = [
    { icon: Award, value: "10+", label: "Années d'expérience" },
    { icon: MapPin, value: "5", label: "Sites de formation" },
    { icon: Users, value: "5000+", label: "Étudiants formés" },
    { icon: GraduationCap, value: "CQM/CQP", label: "Certifications d'État" },
  ];

  const poles = [
    {
      title: "Pôle Digital & Software",
      desc: "Génie Logiciel, Programmation Web, Design Graphique",
      icon: "💻",
      href: "/parcours/digital",
    },
    {
      title: "Pôle Énergie & Industrie",
      desc: "Solaire, Électrique, Froid & Climatisation",
      icon: "⚡",
      href: "/parcours/energie",
    },
    {
      title: "Pôle Business & Lifestyle",
      desc: "Mode, Esthétique, Hôtellerie & Restauration",
      icon: "👔",
      href: "/parcours/business",
    },
  ];

  return (
    <>
      <SEO
        title="TCI Formation - Centre de Formation Professionnelle à Cotonou et Abidjan"
        description="Propulsez votre carrière avec TCI Formation. 10+ ans d'expérience, 5 sites, certifications CQM/CQP. Formations diplômantes et en ligne."
      />

      <Header />

      <main>
        {/* Hero Slider */}
        <HeroSlider />

        {/* Stats Section */}
        <section className="py-16 bg-white border-b">
          <div className="container-custom">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-4">
                      <Icon className="w-8 h-8" />
                    </div>
                    <div className="font-heading font-bold text-3xl text-primary mb-2">{stat.value}</div>
                    <div className="text-muted-foreground font-medium">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Poles Section */}
        <section className="py-20 bg-muted/30">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="font-heading font-bold text-3xl md:text-5xl mb-6">
                Nos Pôles de Formation
              </h2>
              <p className="text-lg text-muted-foreground">
                Choisissez votre voie parmi nos trois pôles d'excellence reconnus par l'État
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {poles.map((pole, index) => (
                <Link key={index} href={pole.href}>
                  <Card className="group h-full hover:shadow-2xl hover:scale-105 transition-all duration-300 border-2 hover:border-primary">
                    <CardContent className="p-8 text-center space-y-4">
                      <div className="text-6xl mb-4">{pole.icon}</div>
                      <h3 className="font-heading font-bold text-2xl group-hover:text-primary transition-colors">
                        {pole.title}
                      </h3>
                      <p className="text-muted-foreground">{pole.desc}</p>
                      <Button variant="ghost" className="group-hover:text-primary">
                        En savoir plus <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-hero text-white">
          <div className="container-custom text-center max-w-4xl mx-auto space-y-8">
            <h2 className="font-heading font-bold text-3xl md:text-5xl">
              Prêt à transformer votre avenir professionnel ?
            </h2>
            <p className="text-xl text-white/90">
              Rejoignez des milliers d'étudiants qui ont déjà lancé leur carrière avec TCI Formation
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Link href="/admissions">
                <Button size="lg" variant="secondary" className="text-lg px-8">
                  S&apos;inscrire en ligne
                  <Calendar className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/entreprises">
                <Button size="lg" variant="outline" className="text-lg px-8 bg-white/10 border-white/30 text-white hover:bg-white/20">
                  <Briefcase className="mr-2 w-5 h-5" />
                  Solutions Entreprises
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* News Section */}
        {recentNews.length > 0 && (
          <section className="py-20">
            <div className="container-custom">
              <div className="flex items-end justify-between mb-12">
                <div>
                  <h2 className="font-heading font-bold text-3xl md:text-4xl mb-3">
                    Nos Actualités Récentes
                  </h2>
                  <p className="text-muted-foreground text-lg">
                    Restez informé de nos derniers événements et succès
                  </p>
                </div>
                <Link href="/actualites">
                  <Button variant="outline">
                    Voir tout
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {recentNews.map((news) => (
                  <NewsCard key={news.id} news={news} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Testimonials Section */}
        <section className="py-20 bg-muted/30">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="font-heading font-bold text-3xl md:text-5xl mb-6">
                Témoignages de nos Apprenants
              </h2>
              <p className="text-lg text-muted-foreground">
                Découvrez ce que nos anciens étudiants pensent de leur expérience à TCI Formation
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

export async function getStaticProps() {
  const { data: formations } = await formationService.getAll();
  const { data: news } = await newsService.getAll();

  return {
    props: {
      featuredFormations: formations?.slice(0, 6) || [],
      recentNews: news?.slice(0, 3) || [],
    },
    revalidate: 60,
  };
}