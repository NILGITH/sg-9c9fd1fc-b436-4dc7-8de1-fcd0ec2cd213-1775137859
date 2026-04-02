import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FormationCard } from "@/components/FormationCard";
import { SEO } from "@/components/SEO";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formationService, type Formation } from "@/services/formationService";

interface FormationsProps {
  formations: Formation[];
}

export default function Formations({ formations }: FormationsProps) {
  const diplomantes = formations.filter((f) => f.category_id === "diplomantes");
  const autresDiplomantes = formations.filter((f) => f.category_id === "autres_diplomantes");
  const enLigne = formations.filter((f) => f.category_id === "en_ligne");

  return (
    <>
      <SEO
        title="Nos Formations - TCI Formation"
        description="Découvrez toutes nos formations diplômantes et professionnelles : Électricité, Informatique, Couture, Cuisine, et bien plus encore."
      />

      <Header />

      <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-primary font-semibold mb-2 uppercase tracking-wide">
                Nos Filières de Formation
              </p>
              <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl mb-6">
                Catalogue Complet des Formations
              </h1>
              <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
                Plus de 25 filières de formation pour construire votre avenir professionnel
              </p>
            </div>

            <Tabs defaultValue="diplomantes" className="w-full">
              <TabsList className="grid w-full max-w-3xl mx-auto grid-cols-3 mb-12">
                <TabsTrigger value="diplomantes" className="text-sm md:text-base">
                  Formations Diplômantes
                </TabsTrigger>
                <TabsTrigger value="autres" className="text-sm md:text-base">
                  Autres Formations
                </TabsTrigger>
                <TabsTrigger value="enligne" className="text-sm md:text-base">
                  Formations en Ligne
                </TabsTrigger>
              </TabsList>

              <TabsContent value="diplomantes">
                <div className="mb-8">
                  <h2 className="font-heading font-bold text-2xl md:text-3xl mb-2">
                    Formations Diplômantes
                  </h2>
                  <p className="text-muted-foreground">
                    {diplomantes.length} formations diplômantes certifiées par l&apos;État
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {diplomantes.map((formation) => (
                    <FormationCard key={formation.id} formation={formation} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="autres">
                <div className="mb-8">
                  <h2 className="font-heading font-bold text-2xl md:text-3xl mb-2">
                    Autres Formations Diplômantes
                  </h2>
                  <p className="text-muted-foreground">
                    {autresDiplomantes.length} formations combinées techniques et bureautiques
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {autresDiplomantes.map((formation) => (
                    <FormationCard key={formation.id} formation={formation} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="enligne">
                <div className="mb-8">
                  <h2 className="font-heading font-bold text-2xl md:text-3xl mb-2">
                    Formations en Ligne
                  </h2>
                  <p className="text-muted-foreground">
                    {enLigne.length} formations 100% en ligne avec certificat
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {enLigne.map((formation) => (
                    <FormationCard key={formation.id} formation={formation} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export async function getStaticProps() {
  const { data: formations } = await formationService.getAll();

  return {
    props: {
      formations: formations || [],
    },
    revalidate: 60,
  };
}