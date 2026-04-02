import { Card, CardContent } from "@/components/ui/card";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import type { News } from "@/services/newsService";
import { useState } from "react";
import { Button } from "@/components/ui/button";

type NewsImage = {
  id: string;
  image_url: string;
  display_order: number;
};

type NewsWithImages = News & {
  news_images?: NewsImage[];
};

interface NewsCardProps {
  news: NewsWithImages;
}

export function NewsCard({ news }: NewsCardProps) {
  const date = new Date(news.created_at || "").toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const images = news.news_images && news.news_images.length > 0 
    ? news.news_images.sort((a, b) => a.display_order - b.display_order).map(img => img.image_url)
    : news.image_url ? [news.image_url] : [];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
      <div className="aspect-video relative overflow-hidden group">
        {images.length > 0 ? (
          <>
            <img
              src={images[currentImageIndex]}
              alt={news.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
            {images.length > 1 && (
              <>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={prevImage}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={nextImage}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                  {images.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentImageIndex ? "bg-white" : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <Calendar className="w-12 h-12 text-muted-foreground" />
          </div>
        )}
      </div>
      <CardContent className="p-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <Calendar className="w-4 h-4" />
          <time>{date}</time>
        </div>
        <h3 className="font-heading font-bold text-xl mb-3 line-clamp-2">
          {news.title}
        </h3>
        {news.excerpt && (
          <p className="text-muted-foreground line-clamp-3">{news.excerpt}</p>
        )}
      </CardContent>
    </Card>
  );
}