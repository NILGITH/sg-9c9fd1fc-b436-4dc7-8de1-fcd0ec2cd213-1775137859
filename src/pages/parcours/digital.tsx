import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Monitor, Code, Palette, Laptop, Award, Clock } from "lucide-react";
import Link from "next/link";
import { formationService, type Formation } from "@/services/formationService";
import { GetStaticProps } from "next";

interface DigitalProps {
  formations: Formation[];
}

export default function Digital({ formations }: DigitalProps) {
  return (
    <>
      <SEO 
        title="Pôle Digital & Software - TCI Formation"
        description="Formations en développement web, génie logiciel, design graphique et réseaux informatiques."
      />
      
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="gradient-hero text-white py-20">
          <div className="container-custom text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm mb-6">
              <Monitor className="w-10 h-10" />
            </div>
            <h1 className="font-heading font-bold text-4xl md:text-5xl mb-6">
              Pôle Digital & Software
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              Formez-vous aux métiers du numérique et du développement logiciel. 
              Devenez développeur web, designer graphique ou expert en réseaux.
            </p>
          </div>
        </section>

        {/* Domaines Section */}
        <section className="py-20">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <Card className="text-center p-8 hover:shadow-xl transition-shadow">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 mb-4">
                  <Code className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-heading font-bold text-xl mb-3">Développement Web</h3>
                <p className="text-muted-foreground">
                  HTML, CSS, JavaScript, React, PHP, bases de données
                </p>
              </Card>

              <Card className="text-center p-8 hover:shadow-xl transition-shadow">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900 mb-4">
                  <Palette className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="font-heading font-bold text-xl mb-3">Design Graphique</h3>
                <p className="text-muted-foreground">
                  Photoshop, Illustrator, UI/UX Design, création visuelle
                </p>
              </Card>

              <Card className="text-center p-8 hover:shadow-xl transition-shadow">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal-100 dark:bg-teal-900 mb-4">
                  <Laptop className="w-8 h-8 text-teal-600 dark:text-teal-400" />
                </div>
                <h3 className="font-heading font-bold text-xl mb-3">Réseaux & Systèmes</h3>
                <p className="text-muted-foreground">
                  Administration réseau, maintenance, télécommunications
                </p>
              </Card>
            </div>

            {/* Formations List */}
            <div className="mb-12">
              <h2 className="font-heading font-bold text-3xl md:text-4xl mb-8 text-center">
                Nos Formations Digital & Software
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
                Prêt à lancer votre carrière dans le digital ?
              </h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Inscrivez-vous dès maintenant et bénéficiez de notre formation complète avec accompagnement personnalisé
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

  // Filter formations for Digital pole (category_id for "Formations Diplômantes")
  const digitalFormations = formations?.filter(f => 
    f.title.toLowerCase().includes('informatique') ||
    f.title.toLowerCase().includes('logiciel') ||
    f.title.toLowerCase().includes('réseaux') ||
    f.title.toLowerCase().includes('télécommunication') ||
    f.title.toLowerCase().includes('programmation') ||
    f.title.toLowerCase().includes('web')
  ) || [];

  return {
    props: {
      formations: digitalFormations,
    },
    revalidate: 60,
  };
};