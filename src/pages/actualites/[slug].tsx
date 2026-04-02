import { GetStaticPaths, GetStaticProps } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { newsService, type News, type NewsImage } from "@/services/newsService";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

type NewsWithImages = News & {
  news_images: NewsImage[];
};

interface NewsDetailProps {
  news: NewsWithImages;
}

export default function NewsDetail({ news }: NewsDetailProps) {
  const formattedDate = new Date(news.created_at || "").toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <SEO
        title={`${news.title} - TCI Formation`}
        description={news.excerpt || ""}
        image={news.news_images[0]?.image_url || news.image_url}
      />

      <Header />

      <main className="py-20">
        <div className="container-custom max-w-4xl">
          <Link href="/actualites">
            <Button variant="ghost" className="mb-8">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour aux actualités
            </Button>
          </Link>

          <article>
            <h1 className="font-heading font-bold text-4xl md:text-5xl mb-6">
              {news.title}
            </h1>

            <div className="flex items-center gap-2 text-muted-foreground mb-8">
              <Calendar className="w-4 h-4" />
              <time dateTime={news.created_at || ""}>{formattedDate}</time>
            </div>

            {/* Images Carousel */}
            {news.news_images && news.news_images.length > 0 ? (
              <div className="mb-8">
                {news.news_images.length === 1 ? (
                  <div className="aspect-video relative rounded-2xl overflow-hidden">
                    <img
                      src={news.news_images[0].image_url}
                      alt={news.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <Carousel className="w-full">
                    <CarouselContent>
                      {news.news_images
                        .sort((a, b) => a.display_order - b.display_order)
                        .map((image, index) => (
                          <CarouselItem key={image.id}>
                            <div className="aspect-video relative rounded-2xl overflow-hidden">
                              <img
                                src={image.image_url}
                                alt={`${news.title} - Image ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>
                )}
              </div>
            ) : news.image_url ? (
              <div className="aspect-video relative rounded-2xl overflow-hidden mb-8">
                <img
                  src={news.image_url}
                  alt={news.title}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : null}

            {/* Excerpt */}
            {news.excerpt && (
              <div className="text-xl text-muted-foreground mb-8 p-6 bg-muted/50 rounded-xl border-l-4 border-primary">
                {news.excerpt}
              </div>
            )}

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <div className="whitespace-pre-wrap">{news.content}</div>
            </div>
          </article>

          <div className="mt-12 pt-8 border-t">
            <Link href="/actualites">
              <Button size="lg">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voir toutes les actualités
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data: news } = await newsService.getAll();
  
  const paths = (news || []).map((item) => ({
    params: { slug: item.slug },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  
  const { data: news, error } = await newsService.getBySlug(slug);

  if (error || !news) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      news,
    },
    revalidate: 60,
  };
};