import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, Scissors, ChefHat, Sparkles, Award, Clock } from "lucide-react";
import Link from "next/link";
import { formationService, type Formation } from "@/services/formationService";
import { GetStaticProps } from "next";

interface BusinessProps {
  formations: Formation[];
}

export default function Business({ formations }: BusinessProps) {
  return (
    <>
      <SEO 
        title="Pôle Business & Lifestyle - TCI Formation"
        description="Formations en mode, esthétique, coiffure, hôtellerie, restauration et secrétariat."
      />
      
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="gradient-hero text-white py-20">
          <div className="container-custom text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm mb-6">
              <Briefcase className="w-10 h-10" />
            </div>
            <h1 className="font-heading font-bold text-4xl md:text-5xl mb-6">
              Pôle Business & Lifestyle
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              Développez vos talents dans les métiers de la mode, de la beauté, de l'hôtellerie et du secrétariat.
              Créez votre propre entreprise ou rejoignez les meilleurs établissements.
            </p>
          </div>
        </section>

        {/* Domaines Section */}
        <section className="py-20">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
              <Card className="text-center p-8 hover:shadow-xl transition-shadow">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-pink-100 dark:bg-pink-900 mb-4">
                  <Scissors className="w-8 h-8 text-pink-600 dark:text-pink-400" />
                </div>
                <h3 className="font-heading font-bold text-xl mb-3">Mode & Couture</h3>
                <p className="text-muted-foreground">
                  Stylisme, haute couture, modélisme
                </p>
              </Card>

              <Card className="text-center p-8 hover:shadow-xl transition-shadow">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900 mb-4">
                  <Sparkles className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="font-heading font-bold text-xl mb-3">Beauté & Esthétique</h3>
                <p className="text-muted-foreground">
                  Coiffure, make-up, onglerie, esthétique
                </p>
              </Card>

              <Card className="text-center p-8 hover:shadow-xl transition-shadow">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 dark:bg-orange-900 mb-4">
                  <ChefHat className="w-8 h-8 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="font-heading font-bold text-xl mb-3">Hôtellerie & Restauration</h3>
                <p className="text-muted-foreground">
                  Cuisine, pâtisserie, hôtellerie
                </p>
              </Card>

              <Card className="text-center p-8 hover:shadow-xl transition-shadow">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 mb-4">
                  <Briefcase className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-heading font-bold text-xl mb-3">Secrétariat</h3>
                <p className="text-muted-foreground">
                  Administration, bureautique
                </p>
              </Card>
            </div>

            {/* Formations List */}
            <div className="mb-12">
              <h2 className="font-heading font-bold text-3xl md:text-4xl mb-8 text-center">
                Nos Formations Business & Lifestyle
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
                        <div className="flex items-center gap-1">
                          <Award className="w-4 h-4" />
                          <span>Certifiant</span>
                        </div>
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
                Lancez votre carrière dans le business et le lifestyle
              </h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Des formations complètes avec stages pratiques et accompagnement à l'entrepreneuriat
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

  // Filter formations for Business pole
  const businessFormations = formations?.filter(f => 
    f.title.toLowerCase().includes('couture') ||
    f.title.toLowerCase().includes('coiffure') ||
    f.title.toLowerCase().includes('esthétique') ||
    f.title.toLowerCase().includes('stylisme') ||
    f.title.toLowerCase().includes('make up') ||
    f.title.toLowerCase().includes('cuisine') ||
    f.title.toLowerCase().includes('pâtisserie') ||
    f.title.toLowerCase().includes('hôtellerie') ||
    f.title.toLowerCase().includes('restauration') ||
    f.title.toLowerCase().includes('secrétariat') ||
    f.title.toLowerCase().includes('élevage')
  ) || [];

  return {
    props: {
      formations: businessFormations,
    },
    revalidate: 60,
  };
};