import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MonitorPlay, Award, Users, Clock, GraduationCap, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { formationService, type Formation } from "@/services/formationService";

interface OnlineProps {
  onlineFormations: Formation[];
}

export default function Online({ onlineFormations }: OnlineProps) {
  return (
    <>
      <SEO 
        title="TCI Online - Formations à Distance"
        description="Suivez nos formations professionnelles 100% en ligne. Apprenez à votre rythme, où que vous soyez au Bénin ou ailleurs en Afrique."
      />
      <Header />
      
      <main>
        {/* Hero Section with Background */}
        <section className="py-20 bg-gradient-hero text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <img 
              src="https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=1200&auto=format&fit=crop"
              alt="Formation en ligne"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="container-custom max-w-4xl text-center space-y-6 relative z-10">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm mb-4">
              <MonitorPlay className="w-10 h-10" />
            </div>
            <h1 className="font-heading font-bold text-4xl md:text-6xl">
              TCI Online
            </h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
              L'excellence de nos formations, 100% à distance. Apprenez d'où vous voulez, à votre rythme, avec l'accompagnement de nos formateurs experts.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Award className="w-5 h-5" />
                <span>Certifications reconnues</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Users className="w-5 h-5" />
                <span>Support personnalisé</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Clock className="w-5 h-5" />
                <span>Accès 24/7</span>
              </div>
            </div>
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