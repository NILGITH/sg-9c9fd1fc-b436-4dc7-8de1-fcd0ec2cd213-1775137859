import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Card, CardContent } from "@/components/ui/card";
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
    <Card className="group overflow-hidden border border-gray-100 hover:border-tci-blue/30 hover:shadow-xl transition-all duration-300 h-full flex flex-col bg-white">
      {formation.image_url && (
        <div className="aspect-[4/3] relative overflow-hidden bg-gray-50">
          <img
            src={formation.image_url}
            alt={formation.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
          {(formation as any).pole && (
            <Badge className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm text-tci-blue border-0 font-semibold shadow-lg">
              {(formation as any).pole === 'digital' ? 'Digital & Software' : 
               (formation as any).pole === 'energie' ? 'Énergie & Industrie' : 
               'Business & Lifestyle'}
            </Badge>
          )}
        </div>
      )}
      <CardContent className="p-6 flex-grow flex flex-col">
        <h3 className="font-semibold text-lg text-gray-900 mb-3 group-hover:text-tci-blue transition-colors line-clamp-2">
          {formation.title}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-3 mb-6 leading-relaxed flex-grow">
          {formation.description}
        </p>
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6 pb-6 border-t pt-4">
          {formation.duration && (
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-tci-blue" />
              <span className="font-medium">{formation.duration}</span>
            </div>
          )}
          <div className="flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-tci-blue" />
            <span className="font-medium">Certifiant</span>
          </div>
        </div>
        <Button asChild className="w-full bg-tci-blue hover:bg-tci-blue/90 text-white shadow-md hover:shadow-lg transition-all">
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
      
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative py-20 bg-white border-b border-gray-100">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <Badge className="bg-tci-blue/10 text-tci-blue hover:bg-tci-blue/20 border-0 px-4 py-2 font-semibold">
                CATALOGUE COMPLET
              </Badge>
              <h1 className="font-bold text-4xl md:text-5xl text-gray-900 leading-tight">
                Nos Formations Professionnelles
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                Plus de 40 formations diplômantes dans 3 pôles d'excellence. 
                Trouvez la formation qui correspond à vos ambitions.
              </p>
              
              {/* Search Bar */}
              <div className="relative max-w-xl mx-auto pt-4">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Rechercher une formation..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 h-14 text-base border-gray-200 focus:border-tci-blue focus:ring-tci-blue/20 rounded-xl bg-white shadow-sm"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Formations by Pole */}
        <section className="py-16">
          <div className="container-custom">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-12 h-auto bg-white p-2 rounded-2xl shadow-sm border border-gray-100 max-w-3xl mx-auto">
                <TabsTrigger 
                  value="all" 
                  className="flex flex-col gap-2 py-4 rounded-xl data-[state=active]:bg-tci-blue data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-300"
                >
                  <span className="font-semibold">Toutes</span>
                  <span className="text-xs opacity-70">({formations.length})</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="digital" 
                  className="flex flex-col gap-2 py-4 rounded-xl data-[state=active]:bg-tci-blue data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-300"
                >
                  <Monitor className="w-5 h-5 mx-auto" />
                  <span className="font-semibold text-sm">Digital</span>
                  <span className="text-xs opacity-70">({digitalFormations.length})</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="energie" 
                  className="flex flex-col gap-2 py-4 rounded-xl data-[state=active]:bg-tci-blue data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-300"
                >
                  <Zap className="w-5 h-5 mx-auto" />
                  <span className="font-semibold text-sm">Énergie</span>
                  <span className="text-xs opacity-70">({energieFormations.length})</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="business" 
                  className="flex flex-col gap-2 py-4 rounded-xl data-[state=active]:bg-tci-blue data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-300"
                >
                  <Briefcase className="w-5 h-5 mx-auto" />
                  <span className="font-semibold text-sm">Business</span>
                  <span className="text-xs opacity-70">({businessFormations.length})</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredFormations.map((formation) => (
                    <FormationCard key={formation.id} formation={formation} />
                  ))}
                </div>
                {filteredFormations.length === 0 && (
                  <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
                    <p className="text-lg text-gray-600">
                      Aucune formation trouvée pour "{searchTerm}"
                    </p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="digital">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {digitalFormations.map((formation) => (
                    <FormationCard key={formation.id} formation={formation} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="energie">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {energieFormations.map((formation) => (
                    <FormationCard key={formation.id} formation={formation} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="business">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {businessFormations.map((formation) => (
                    <FormationCard key={formation.id} formation={formation} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-tci-blue text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }}></div>
          </div>
          <div className="container-custom text-center relative z-10">
            <div className="max-w-3xl mx-auto space-y-6">
              <h2 className="font-bold text-3xl md:text-4xl">
                Prêt à Démarrer Votre Formation ?
              </h2>
              <p className="text-lg text-white/90">
                Rejoignez plus de 2000 étudiants qui nous ont fait confiance
              </p>
              <div className="pt-4">
                <Button asChild size="lg" className="bg-white text-tci-blue hover:bg-gray-100 shadow-xl text-base px-8 h-14">
                  <Link href="/admissions" className="flex items-center gap-2">
                    S'inscrire Maintenant
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
              </div>
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

  return {
    props: {
      formations: formations || [],
    },
    revalidate: 60,
  };
};