import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { NewsCard } from "@/components/NewsCard";
import Link from "next/link";
import { newsService, type News } from "@/services/newsService";
import { GetStaticProps } from "next";

interface ActualitesProps {
  news: News[];
}

export default function Actualites({ news }: ActualitesProps) {
  return (
    <>
      <SEO 
        title="Nos Actualités - TCI Formation"
        description="Découvrez nos dernières actualités, événements et activités du centre TCI Formation."
      />
      
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="gradient-hero text-white py-20">
          <div className="container-custom text-center">
            <h1 className="font-heading font-bold text-4xl md:text-5xl mb-6">
              Nos Actualités
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              Restez informé de nos dernières activités et événements
            </p>
          </div>
        </section>

        {/* News Grid */}
        <section className="py-20">
          <div className="container-custom">
            {news.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {news.map((item) => (
                  <Link key={item.id} href={`/actualites/${item.slug}`}>
                    <NewsCard news={item} />
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg">
                  Aucune actualité disponible pour le moment.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { data: news } = await newsService.getAll();

  return {
    props: {
      news: news || [],
    },
    revalidate: 60,
  };
};