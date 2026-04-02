import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Clock, CheckCircle, ArrowRight, Monitor, Zap, Briefcase } from "lucide-react";
import Link from "next/link";
import { formationService } from "@/services/formationService";
import type { GetStaticProps } from "next";
import { useState } from "react";

interface FormationsProps {
  formations: any[];
}

export default function Formations({ formations }: FormationsProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const digitalFormations = formations.filter(f => (f as any).pole === 'digital');
  const energieFormations = formations.filter(f => (f as any).pole === 'energie');
  const businessFormations = formations.filter(f => (f as any).pole === 'business');

  const filteredFormations = formations.filter(formation =>
    formation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    formation.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const FormationCard = ({ formation }: any) => (
    <Card className="group hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 hover:border-primary/50 h-full flex flex-col">
      {formation.image_url && (
        <div className="aspect-video relative overflow-hidden">
          <img
            src={formation.image_url}
            alt={formation.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          {(formation as any).pole && (
            <Badge className="absolute top-4 right-4 bg-primary text-white">
              {(formation as any).pole === 'digital' ? 'Digital & Software' : 
               (formation as any).pole === 'energie' ? 'Énergie & Industrie' : 
               'Business & Lifestyle'}
            </Badge>
          )}
        </div>
      )}
      <CardHeader className="flex-grow">
        <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">
          {formation.title}
        </CardTitle>
        <CardDescription className="line-clamp-3">
          {formation.description}
        </CardDescription>
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mt-4">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{formation.duration || '6 mois'}</span>
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle className="w-4 h-4" />
            <span>{formation.requirements}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="mt-auto">
        <Button asChild className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
          <Link href="/admissions" className="flex items-center justify-center gap-2">
            S'inscrire
            <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <>
      <SEO 
        title="Nos Formations - TCI Formation"
        description="Découvrez toutes nos formations professionnelles diplômantes. Plus de 40 formations dans 3 pôles : Digital, Énergie et Business."
      />
      
      <Header />
      
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-primary/10 via-background to-muted/20 overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="container-custom relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 text-sm px-4 py-2">
                CATALOGUE COMPLET
              </Badge>
              <h1 className="font-heading font-bold text-4xl md:text-6xl mb-6 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Nos Formations Professionnelles
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                Plus de 40 formations diplômantes dans 3 pôles d'excellence. 
                Trouvez la formation qui correspond à vos ambitions.
              </p>
              
              {/* Search Bar */}
              <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Rechercher une formation..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 py-6 text-lg border-2 focus:border-primary"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Formations by Pole */}
        <section className="py-20">
          <div className="container-custom">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-12 h-auto bg-muted/50 p-2 rounded-2xl max-w-3xl mx-auto">
                <TabsTrigger 
                  value="all" 
                  className="flex flex-col gap-2 py-4 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-lg transition-all duration-300"
                >
                  <span className="font-semibold">Toutes</span>
                  <span className="text-xs text-muted-foreground">({formations.length})</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="digital" 
                  className="flex flex-col gap-2 py-4 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-lg transition-all duration-300"
                >
                  <Monitor className="w-5 h-5 mx-auto" />
                  <span className="font-semibold text-sm">Digital</span>
                  <span className="text-xs text-muted-foreground">({digitalFormations.length})</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="energie" 
                  className="flex flex-col gap-2 py-4 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-lg transition-all duration-300"
                >
                  <Zap className="w-5 h-5 mx-auto" />
                  <span className="font-semibold text-sm">Énergie</span>
                  <span className="text-xs text-muted-foreground">({energieFormations.length})</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="business" 
                  className="flex flex-col gap-2 py-4 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-lg transition-all duration-300"
                >
                  <Briefcase className="w-5 h-5 mx-auto" />
                  <span className="font-semibold text-sm">Business</span>
                  <span className="text-xs text-muted-foreground">({businessFormations.length})</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredFormations.map((formation) => (
                    <FormationCard key={formation.id} formation={formation} />
                  ))}
                </div>
                {filteredFormations.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-lg text-muted-foreground">
                      Aucune formation trouvée pour "{searchTerm}"
                    </p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="digital">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {digitalFormations.map((formation) => (
                    <FormationCard key={formation.id} formation={formation} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="energie">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {energieFormations.map((formation) => (
                    <FormationCard key={formation.id} formation={formation} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="business">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {businessFormations.map((formation) => (
                    <FormationCard key={formation.id} formation={formation} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <div className="container-custom text-center relative z-10">
            <h2 className="font-heading font-bold text-3xl md:text-5xl mb-6">
              Prêt à Démarrer Votre Formation ?
            </h2>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Rejoignez plus de 2000 étudiants qui nous ont fait confiance
            </p>
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 shadow-xl">
              <Link href="/admissions" className="flex items-center gap-2">
                S'inscrire Maintenant
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { data: formations } = await formationService.getAll();

  return {
    props: {
      formations: formations || [],
    },
    revalidate: 60,
  };
};