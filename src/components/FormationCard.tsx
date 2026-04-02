import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { BookOpen } from "lucide-react";
import type { Formation } from "@/services/formationService";

interface FormationCardProps {
  formation: Formation;
}

export function FormationCard({ formation }: FormationCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <CardContent className="p-6">
        <div
          className="w-16 h-16 rounded-2xl mb-6 flex items-center justify-center text-3xl"
          style={{ backgroundColor: `${formation.icon_color}20`, color: formation.icon_color }}
        >
          <BookOpen className="w-8 h-8" />
        </div>
        <h3 className="font-heading font-bold text-xl mb-3 group-hover:text-primary transition-colors">
          {formation.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
          {formation.description}
        </p>
        {formation.requirements && (
          <p className="text-xs text-muted-foreground mb-4">
            <span className="font-semibold">Niveau requis :</span> {formation.requirements}
          </p>
        )}
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Link href={`/formations/${formation.slug}`} className="w-full">
          <Button variant="default" className="w-full bg-primary hover:bg-primary/90">
            En savoir plus
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}