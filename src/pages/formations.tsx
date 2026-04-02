import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { FormationCard } from "@/components/FormationCard";
import { formationService, type Formation } from "@/services/formationService";
import { GetStaticProps } from "next";

interface FormationsProps {
  formations: Formation[];
}

export default function Formations({ formations }: FormationsProps) {
  const groupedFormations = formations.reduce((acc, formation) => {
    if (!acc[formation.category_id]) {
      acc[formation.category_id] = [];
    }
    acc[formation.category_id].push(formation);
    return acc;
  }, {} as Record<string, Formation[]>);

  const categories = {
    technique: { title: "Filières Techniques & Industrielles", color: "bg-primary" },
    diplomante: { title: "Formations Diplômantes", color: "bg-secondary" },
    bureautique: { title: "Bureautique", color: "bg-accent" },
    artisanale: { title: "Formations Artisanales", color: "bg-primary" }
  };

  return (
    <>
      <SEO 
        title="Nos Formations - TCI Formation"
        description="Découvrez nos formations diplômantes, techniques et artisanales. Formations en génie électrique, informatique, télécommunications, cuisine, couture et plus."
      />
      
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="gradient-hero text-white py-20">
          <div className="container-custom text-center">
            <h1 className="font-heading font-bold text-4xl md:text-5xl mb-6">
              Nos Formations
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              Des formations pratiques et diplômantes pour réussir votre insertion professionnelle
            </p>
          </div>
        </section>

        {/* Formations by Category */}
        {Object.entries(categories).map(([key, { title, color }]) => {
          const categoryFormations = groupedFormations[key];
          if (!categoryFormations || categoryFormations.length === 0) return null;

          return (
            <section key={key} id={key} className="py-20">
              <div className="container-custom">
                <div className="flex items-center gap-4 mb-12">
                  <div className={`w-1 h-12 ${color} rounded-full`}></div>
                  <div>
                    <p className="text-sm text-muted-foreground uppercase tracking-wider mb-1">
                      Nos filières de formation
                    </p>
                    <h2 className="font-heading font-bold text-3xl md:text-4xl">
                      {title}
                    </h2>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {categoryFormations.map((formation) => (
                    <FormationCard key={formation.id} formation={formation} />
                  ))}
                </div>
              </div>
            </section>
          );
        })}
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