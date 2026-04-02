import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import type { News } from "@/services/newsService";

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

  const imageUrl = news.news_images && news.news_images.length > 0 
    ? news.news_images[0].image_url 
    : news.image_url;

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
      <div className="aspect-video relative overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={news.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
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