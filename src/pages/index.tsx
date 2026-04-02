import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { FormationCard } from "@/components/FormationCard";
import { NewsCard } from "@/components/NewsCard";
import { formationService, type Formation } from "@/services/formationService";
import { newsService, type News } from "@/services/newsService";
import Link from "next/link";
import { Award, Users, GraduationCap, TrendingUp } from "lucide-react";
import { GetStaticProps } from "next";

interface HomeProps {
  featuredFormations: Formation[];
  recentNews: News[];
}

export default function Home({ featuredFormations, recentNews }: HomeProps) {
  return (
    <>
      <SEO 
        title="TCI Formation - Centre de formation professionnelle au Bénin"
        description="Nous disons bien la pratique. Centre de formation professionnelle offrant des formations diplômantes, techniques et artisanales au Bénin."
      />
      
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative gradient-hero text-white py-24 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
          <div className="container-custom relative z-10">
            <div className="max-w-3xl animate-fade-in">
              <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl mb-6 text-balance">
                Nous disons bien la pratique
              </h1>
              <p className="text-lg md:text-xl mb-8 text-white/90 max-w-2xl">
                Centre de formation professionnelle offrant des formations diplômantes, 
                techniques et artisanales au Bénin. Votre avenir commence ici.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/formations">
                  <Button size="lg" variant="secondary" className="bg-secondary hover:bg-secondary/90">
                    Découvrir nos formations
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/30">
                    Nous contacter
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-muted/30">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center animate-scale-in">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-2xl flex items-center justify-center">
                  <Award className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-heading font-bold text-3xl mb-2">15+</h3>
                <p className="text-muted-foreground">Formations diplômantes</p>
              </div>
              <div className="text-center animate-scale-in" style={{ animationDelay: "0.1s" }}>
                <div className="w-16 h-16 mx-auto mb-4 bg-secondary/10 rounded-2xl flex items-center justify-center">
                  <Users className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="font-heading font-bold text-3xl mb-2">500+</h3>
                <p className="text-muted-foreground">Étudiants formés</p>
              </div>
              <div className="text-center animate-scale-in" style={{ animationDelay: "0.2s" }}>
                <div className="w-16 h-16 mx-auto mb-4 bg-accent/10 rounded-2xl flex items-center justify-center">
                  <GraduationCap className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-heading font-bold text-3xl mb-2">10+</h3>
                <p className="text-muted-foreground">Années d&apos;expérience</p>
              </div>
              <div className="text-center animate-scale-in" style={{ animationDelay: "0.3s" }}>
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-2xl flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-heading font-bold text-3xl mb-2">95%</h3>
                <p className="text-muted-foreground">Taux de réussite</p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Formations */}
        <section className="py-20">
          <div className="container-custom">
            <div className="text-center mb-12">
              <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">Nos Formations</p>
              <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
                Nos filières de formation
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Découvrez nos formations diplômantes, techniques et artisanales adaptées à vos ambitions professionnelles.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {featuredFormations.map((formation) => (
                <FormationCard key={formation.id} formation={formation} />
              ))}
            </div>

            <div className="text-center">
              <Link href="/formations">
                <Button size="lg" variant="outline">
                  Voir toutes les formations
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Recent News */}
        {recentNews.length > 0 && (
          <section className="py-20 bg-muted/30">
            <div className="container-custom">
              <div className="text-center mb-12">
                <p className="text-secondary font-semibold text-sm uppercase tracking-wider mb-3">Actualités</p>
                <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
                  Nos activités récentes
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Restez informé de nos dernières activités, événements et réussites.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {recentNews.slice(0, 3).map((news) => (
                  <NewsCard key={news.id} news={news} />
                ))}
              </div>

              <div className="text-center">
                <Link href="/actualites">
                  <Button size="lg" variant="default" className="bg-secondary hover:bg-secondary/90">
                    Toutes les actualités
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-20">
          <div className="container-custom">
            <div className="gradient-hero rounded-3xl p-12 text-center text-white">
              <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
                Prêt à commencer votre formation ?
              </h2>
              <p className="text-lg mb-8 text-white/90 max-w-2xl mx-auto">
                Rejoignez TCI Formation et donnez un nouvel élan à votre carrière professionnelle.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/contact">
                  <Button size="lg" variant="secondary" className="bg-secondary hover:bg-secondary/90">
                    Nous contacter
                  </Button>
                </Link>
                <Link href="/formations">
                  <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/30">
                    Voir les formations
                  </Button>
                </Link>
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
  const { data: news } = await newsService.getAll();

  return {
    props: {
      featuredFormations: formations?.slice(0, 6) || [],
      recentNews: news?.slice(0, 3) || [],
    },
    revalidate: 60,
  };
};