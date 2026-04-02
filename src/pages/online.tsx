import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MonitorPlay, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { formationService, type Formation } from "@/services/formationService";

interface OnlineProps {
  onlineFormations: Formation[];
}

export default function Online({ onlineFormations }: OnlineProps) {
  return (
    <>
      <SEO 
        title="SoftGen Online | Formation à distance" 
        description="Apprenez d'où vous voulez avec le même niveau d'exigence que nos centres physiques."
      />
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-hero text-white">
          <div className="container-custom max-w-4xl text-center space-y-6">
            <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-full mb-4">
              <MonitorPlay className="w-8 h-8 text-secondary" />
            </div>
            <h1 className="font-heading font-bold text-4xl md:text-5xl">
              SoftGen Online
            </h1>
            <p className="text-xl text-white/90">
              L'excellence de nos formations, 100% à distance. Apprenez d'où vous voulez, à votre rythme.
            </p>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-12 border-b">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="space-y-2">
                <CheckCircle2 className="w-8 h-8 text-primary mx-auto" />
                <h3 className="font-bold">Flexibilité totale</h3>
                <p className="text-sm text-muted-foreground">Suivez les cours selon votre emploi du temps</p>
              </div>
              <div className="space-y-2">
                <CheckCircle2 className="w-8 h-8 text-primary mx-auto" />
                <h3 className="font-bold">Qualité identique</h3>
                <p className="text-sm text-muted-foreground">Mêmes formateurs et mêmes diplômes</p>
              </div>
              <div className="space-y-2">
                <CheckCircle2 className="w-8 h-8 text-primary mx-auto" />
                <h3 className="font-bold">Support continu</h3>
                <p className="text-sm text-muted-foreground">Accompagnement pédagogique dédié</p>
              </div>
            </div>
          </div>
        </section>

        {/* Online Catalog */}
        <section className="py-20 bg-muted/20">
          <div className="container-custom">
            <h2 className="font-heading font-bold text-3xl mb-10 text-center">Notre Catalogue en Ligne</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {onlineFormations.map((formation) => (
                <Card key={formation.id} className="group hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 space-y-4">
                    <h3 className="font-heading font-bold text-xl group-hover:text-primary transition-colors">
                      {formation.title}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-3">
                      {formation.description}
                    </p>
                    <div className="pt-4 flex items-center justify-between">
                      <span className="text-sm font-semibold text-secondary">{formation.duration}</span>
                      <Link href={`/admissions?formation=${formation.id}`}>
                        <Button variant="outline" size="sm">
                          S'inscrire
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
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
  
  // Filter for online formations (category_id matching 'en ligne')
  const onlineFormations = formations?.filter(f => f.category_id === '33333333-3333-3333-3333-333333333333') || [];

  return {
    props: {
      onlineFormations,
    },
    revalidate: 60,
  };
}