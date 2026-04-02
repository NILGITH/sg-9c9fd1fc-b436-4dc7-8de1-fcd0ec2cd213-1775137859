import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HeroSlider } from "@/components/HeroSlider";
import { FormationCard } from "@/components/FormationCard";
import { NewsCard } from "@/components/NewsCard";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { ArrowRight, Award, Users, BookOpen, TrendingUp } from "lucide-react";
import Link from "next/link";
import { formationService, type Formation } from "@/services/formationService";
import { newsService, type News } from "@/services/newsService";

interface HomeProps {
  featuredFormations: Formation[];
  recentNews: News[];
}

export default function Home({ featuredFormations, recentNews }: HomeProps) {
  return (
    <>
      <SEO
        title="TCI Formation - Centre de Formation Professionnelle au Bénin"
        description="TCI Formation offre des formations diplômantes et professionnelles dans plus de 25 filières. Électricité, Informatique, Couture, Cuisine, et plus encore."
        image="/og-image.png"
      />

      <Header />

      <main>
        <HeroSlider />

        <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-heading font-bold text-3xl mb-2">25+</h3>
                <p className="text-muted-foreground">Filières de Formation</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-heading font-bold text-3xl mb-2">5000+</h3>
                <p className="text-muted-foreground">Apprenants Formés</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-heading font-bold text-3xl mb-2">15+</h3>
                <p className="text-muted-foreground">Années d&apos;Expérience</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-heading font-bold text-3xl mb-2">85%</h3>
                <p className="text-muted-foreground">Taux d&apos;Insertion</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-primary font-semibold mb-2 uppercase tracking-wide">
                Nos Filières de Formation
              </p>
              <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl mb-4">
                Formations Diplômantes
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Découvrez nos programmes de formation professionnelle reconnus et certifiés
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {featuredFormations.map((formation) => (
                <FormationCard key={formation.id} formation={formation} />
              ))}
            </div>

            <div className="text-center">
              <Link href="/formations">
                <Button size="lg" className="group">
                  Voir toutes nos formations
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-accent font-semibold mb-2 uppercase tracking-wide">
                Actualités
              </p>
              <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl mb-4">
                Nos Activités Récentes
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Restez informés de nos dernières actualités et événements
              </p>
            </div>

            {recentNews.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                  {recentNews.map((news) => (
                    <NewsCard key={news.id} news={news} />
                  ))}
                </div>

                <div className="text-center">
                  <Link href="/actualites">
                    <Button size="lg" variant="outline" className="group">
                      Voir toutes les actualités
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  Aucune actualité disponible pour le moment.
                </p>
              </div>
            )}
          </div>
        </section>

        <section className="py-16 lg:py-24 bg-gradient-hero text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl mb-6">
              Prêt à Démarrer Votre Formation ?
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Rejoignez des milliers d&apos;apprenants qui ont réussi leur insertion professionnelle avec TCI Formation
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" variant="secondary" className="px-8">
                  Nous Contacter
                </Button>
              </Link>
              <Link href="/formations">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur-sm px-8"
                >
                  Découvrir nos Formations
                </Button>
              </Link>
            </div>
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