import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Award, Target, Eye, Heart } from "lucide-react";

export default function Apropos() {
  return (
    <>
      <SEO 
        title="À propos - TCI Formation"
        description="Découvrez TCI Formation, centre de formation professionnelle au Bénin. Notre mission, nos valeurs et notre engagement pour votre réussite."
      />
      
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="gradient-hero text-white py-20">
          <div className="container-custom text-center">
            <h1 className="font-heading font-bold text-4xl md:text-5xl mb-6">
              À propos de TCI Formation
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              Nous disons bien la pratique - Un centre d&apos;excellence au service de votre avenir
            </p>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-20">
          <div className="container-custom max-w-4xl">
            <div className="prose prose-lg mx-auto">
              <p className="text-lg text-muted-foreground leading-relaxed">
                TCI Formation est un centre de formation professionnelle situé à Porto-Novo, au Bénin. 
                Depuis plus de 10 ans, nous nous engageons à offrir des formations de qualité qui allient 
                théorie et pratique pour préparer nos étudiants à une insertion réussie dans le monde professionnel.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mt-6">
                Notre devise <strong className="text-foreground">&quot;Nous disons bien la pratique&quot;</strong> reflète 
                notre approche pédagogique centrée sur l&apos;apprentissage pratique et concret. Nous croyons fermement 
                que c&apos;est en pratiquant que l&apos;on acquiert les compétences nécessaires pour exceller dans son métier.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-muted/30">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
                Nos Valeurs
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Les principes qui guident notre action au quotidien
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-2xl flex items-center justify-center">
                  <Award className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-heading font-bold text-xl mb-3">Excellence</h3>
                <p className="text-muted-foreground">
                  Nous visons l&apos;excellence dans toutes nos formations et accompagnons chaque étudiant vers la réussite.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-secondary/10 rounded-2xl flex items-center justify-center">
                  <Target className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="font-heading font-bold text-xl mb-3">Pratique</h3>
                <p className="text-muted-foreground">
                  Notre approche privilégie la pratique et l&apos;apprentissage concret pour des compétences réelles.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-accent/10 rounded-2xl flex items-center justify-center">
                  <Eye className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-heading font-bold text-xl mb-3">Innovation</h3>
                <p className="text-muted-foreground">
                  Nous adaptons constamment nos programmes aux besoins du marché et aux nouvelles technologies.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-2xl flex items-center justify-center">
                  <Heart className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-heading font-bold text-xl mb-3">Accompagnement</h3>
                <p className="text-muted-foreground">
                  Un suivi personnalisé pour chaque étudiant tout au long de son parcours de formation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20">
          <div className="container-custom max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="bg-gradient-hero text-white p-10 rounded-3xl">
                <h2 className="font-heading font-bold text-3xl mb-6">Notre Mission</h2>
                <p className="text-lg leading-relaxed text-white/90">
                  Former des professionnels compétents et qualifiés, capables de répondre 
                  aux exigences du marché du travail béninois et africain. Nous nous engageons 
                  à offrir des formations pratiques et adaptées qui favorisent l&apos;insertion 
                  professionnelle et l&apos;entrepreneuriat.
                </p>
              </div>

              <div className="bg-secondary/10 p-10 rounded-3xl border-2 border-secondary/20">
                <h2 className="font-heading font-bold text-3xl mb-6">Notre Vision</h2>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  Devenir le centre de référence en matière de formation professionnelle au Bénin, 
                  reconnu pour la qualité de ses programmes, l&apos;expertise de ses formateurs et 
                  le taux d&apos;insertion professionnelle de ses diplômés.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-muted/30">
          <div className="container-custom max-w-4xl">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-center mb-12">
              Pourquoi choisir TCI Formation ?
            </h2>
            
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-primary flex-shrink-0 flex items-center justify-center text-white font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-xl mb-2">Formations certifiées et reconnues</h3>
                  <p className="text-muted-foreground">
                    Nos diplômes sont reconnus par l&apos;État et valorisés sur le marché du travail.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-secondary flex-shrink-0 flex items-center justify-center text-white font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-xl mb-2">Équipements modernes</h3>
                  <p className="text-muted-foreground">
                    Ateliers équipés et laboratoires permettant une formation pratique de qualité.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-accent flex-shrink-0 flex items-center justify-center text-white font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-xl mb-2">Formateurs expérimentés</h3>
                  <p className="text-muted-foreground">
                    Une équipe pédagogique qualifiée et passionnée, issue du monde professionnel.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-primary flex-shrink-0 flex items-center justify-center text-white font-bold">
                  4
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-xl mb-2">Accompagnement personnalisé</h3>
                  <p className="text-muted-foreground">
                    Suivi individuel et conseil d&apos;orientation tout au long de votre parcours.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-secondary flex-shrink-0 flex items-center justify-center text-white font-bold">
                  5
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-xl mb-2">Réseau professionnel</h3>
                  <p className="text-muted-foreground">
                    Partenariats avec des entreprises pour faciliter les stages et l&apos;insertion professionnelle.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}