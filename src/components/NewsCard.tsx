import Link from "next/link";
import Image from "next/image";
import { Calendar } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { News } from "@/services/newsService";

interface NewsCardProps {
  news: News;
}

export function NewsCard({ news }: NewsCardProps) {
  const formattedDate = new Date(news.published_at || news.created_at).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
      {news.image_url && (
        <div className="relative h-64 w-full overflow-hidden">
          <Image
            src={news.image_url}
            alt={news.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <CardContent className="p-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <Calendar className="w-4 h-4" />
          <span>{formattedDate}</span>
        </div>
        <h3 className="font-heading font-bold text-xl mb-3 group-hover:text-primary transition-colors line-clamp-2">
          {news.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-3">
          {news.excerpt}
        </p>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Link href={`/actualites/${news.slug}`} className="w-full">
          <Button variant="outline" className="w-full">
            Découvrir l&apos;événement
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}