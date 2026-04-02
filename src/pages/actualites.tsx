import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { NewsCard } from "@/components/NewsCard";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { newsService, type News } from "@/services/newsService";
import { GetStaticProps } from "next";

interface ActualitesProps {
  news: News[];
}

export default function Actualites({ news }: ActualitesProps) {
  const publishedNews = news.filter(item => item.published);

  return (
    <>
      <SEO 
        title="Nos Actualités - TCI Formation"
        description="Découvrez nos dernières actualités, événements et activités du centre TCI Formation."
      />
      
      <Header />
      
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative py-20 bg-white border-b border-gray-100">
          <div className="container-custom text-center">
            <div className="max-w-3xl mx-auto space-y-6">
              <Badge className="bg-tci-blue/10 text-tci-blue hover:bg-tci-blue/20 border-0 px-4 py-2 font-semibold">
                ACTUALITÉS
              </Badge>
              <h1 className="font-bold text-4xl md:text-5xl text-gray-900">
                Nos Actualités
              </h1>
              <p className="text-lg text-gray-600">
                Restez informé de nos dernières activités et événements
              </p>
            </div>
          </div>
        </section>

        {/* News Grid */}
        <section className="py-16">
          <div className="container-custom">
            {publishedNews.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {publishedNews.map((item) => (
                  <Link key={item.id} href={`/actualites/${item.slug}`}>
                    <NewsCard news={item} />
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
                <p className="text-gray-600 text-lg">
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