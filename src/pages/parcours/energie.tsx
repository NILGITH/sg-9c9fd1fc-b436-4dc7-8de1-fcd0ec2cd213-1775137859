import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Battery, Wrench, Sun, Award, Clock } from "lucide-react";
import Link from "next/link";
import { formationService, type Formation } from "@/services/formationService";
import { GetStaticProps } from "next";

interface EnergieProps {
  formations: Formation[];
}

export default function Energie({ formations }: EnergieProps) {
  return (
    <>
      <SEO 
        title="Pôle Énergie & Industrie - TCI Formation"
        description="Formations en électricité, énergie solaire, froid et climatisation, plomberie et maintenance industrielle."
      />
      
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="gradient-hero text-white py-20">
          <div className="container-custom text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm mb-6">
              <Zap className="w-10 h-10" />
            </div>
            <h1 className="font-heading font-bold text-4xl md:text-5xl mb-6">
              Pôle Énergie & Industrie
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              Maîtrisez les métiers de l'énergie, de l'électricité et de la maintenance industrielle.
              Devenez technicien en énergie solaire, électricien ou frigoriste qualifié.
            </p>
          </div>
        </section>

        {/* Domaines Section */}
        <section className="py-20">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <Card className="text-center p-8 hover:shadow-xl transition-shadow">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-100 dark:bg-yellow-900 mb-4">
                  <Zap className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
                </div>
                <h3 className="font-heading font-bold text-xl mb-3">Électricité</h3>
                <p className="text-muted-foreground">
                  Installation électrique, maintenance, câblage industriel
                </p>
              </Card>

              <Card className="text-center p-8 hover:shadow-xl transition-shadow">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 dark:bg-orange-900 mb-4">
                  <Sun className="w-8 h-8 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="font-heading font-bold text-xl mb-3">Énergie Solaire</h3>
                <p className="text-muted-foreground">
                  Installation photovoltaïque, systèmes solaires, énergies renouvelables
                </p>
              </Card>

              <Card className="text-center p-8 hover:shadow-xl transition-shadow">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cyan-100 dark:bg-cyan-900 mb-4">
                  <Battery className="w-8 h-8 text-cyan-600 dark:text-cyan-400" />
                </div>
                <h3 className="font-heading font-bold text-xl mb-3">Froid & Climatisation</h3>
                <p className="text-muted-foreground">
                  Réfrigération, climatisation, maintenance des systèmes de froid
                </p>
              </Card>
            </div>

            {/* Formations List */}
            <div className="mb-12">
              <h2 className="font-heading font-bold text-3xl md:text-4xl mb-8 text-center">
                Nos Formations Énergie & Industrie
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {formations.map((formation) => (
                  <Card key={formation.id} className="hover:shadow-xl transition-shadow overflow-hidden">
                    {formation.image_url && (
                      <div className="aspect-video relative overflow-hidden">
                        <img
                          src={formation.image_url}
                          alt={formation.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <CardContent className="p-6">
                      <h3 className="font-heading font-bold text-xl mb-3">
                        {formation.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 line-clamp-3">
                        {formation.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        {formation.duration && (
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{formation.duration}</span>
                          </div>
                        )}
                        {formation.certification && (
                          <div className="flex items-center gap-1">
                            <Award className="w-4 h-4" />
                            <span>Certifiant</span>
                          </div>
                        )}
                      </div>
                      <Button asChild className="w-full bg-primary">
                        <Link href="/admissions">
                          S'inscrire
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="text-center bg-muted/50 p-12 rounded-2xl">
              <h2 className="font-heading font-bold text-2xl md:text-3xl mb-4">
                Rejoignez le secteur de l'énergie et de l'industrie
              </h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Des formations pratiques avec équipements professionnels et stages en entreprise
              </p>
              <Button asChild size="lg" className="bg-gradient-accent hover:opacity-90">
                <Link href="/admissions">
                  S'inscrire Maintenant
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { data: formations } = await formationService.getAll();

  // Filter formations for Energie pole
  const energieFormations = formations?.filter(f => 
    f.title.toLowerCase().includes('électrique') ||
    f.title.toLowerCase().includes('électricité') ||
    f.title.toLowerCase().includes('froid') ||
    f.title.toLowerCase().includes('plomberie') ||
    f.title.toLowerCase().includes('solaire') ||
    f.title.toLowerCase().includes('maintenance industrielle') ||
    f.title.toLowerCase().includes('climatisation')
  ) || [];

  return {
    props: {
      formations: energieFormations,
    },
    revalidate: 60,
  };
};