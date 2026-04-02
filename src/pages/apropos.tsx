import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Award, Target, MapPin, Handshake, Globe } from "lucide-react";
import Image from "next/image";

export default function Apropos() {
  return (
    <>
      <SEO 
        title="À Propos | TCI Formation" 
        description="Découvrez notre mission, nos centres de formation au Bénin et en Côte d'Ivoire, et nos partenaires."
      />
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-hero text-white">
          <div className="container-custom max-w-4xl text-center space-y-6">
            <h1 className="font-heading font-bold text-4xl md:text-5xl">
              Notre ADN & Notre Mission
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Répondre au défi de l'emploi des jeunes en Afrique par une formation en adéquation réelle avec le marché.
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20">
          <div className="container-custom max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="bg-gradient-hero text-white p-10 rounded-3xl">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h2 className="font-heading font-bold text-3xl mb-6">Problématique et Mission</h2>
                <p className="text-lg leading-relaxed text-white/90">
                  Le problème de l'emploi des jeunes est devenu une préoccupation majeure. Avec l'environnement concurrentiel d'aujourd'hui, il est important que la jeunesse reçoive une formation en adéquation avec les besoins du marché.
                </p>
                <p className="text-lg leading-relaxed text-white/90 mt-4">
                  Voilà pourquoi <strong>TCI Formation</strong> s'est engagé depuis plus de dix (10) ans à faire de la formation professionnelle une offre qui, à travers la qualité de l'enseignement, met sur le marché un nouveau type de professionnels capables de se prendre en charge et d'innover.
                </p>
              </div>

              <div className="bg-secondary/10 p-10 rounded-3xl border-2 border-secondary/20">
                <div className="w-12 h-12 bg-secondary/20 rounded-xl flex items-center justify-center mb-6">
                  <Globe className="w-6 h-6 text-secondary" />
                </div>
                <h2 className="font-heading font-bold text-3xl mb-6">Notre Vision</h2>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  Devenir le hub technologique et professionnel de référence en Afrique de l'Ouest, 
                  reconnu pour la qualité de ses programmes, l'expertise de ses formateurs et 
                  le taux d'insertion professionnelle exceptionnel de ses diplômés.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Ancrage Local (Sites) */}
        <section className="py-20 bg-muted/30">
          <div className="container-custom max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
                Notre Ancrage Local
              </h2>
              <p className="text-lg text-muted-foreground">
                Des campus modernes équipés pour un apprentissage optimal
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-sm border">
                <h3 className="flex items-center gap-3 font-heading font-bold text-2xl mb-6 text-primary">
                  <MapPin className="w-6 h-6" />
                  Bénin
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-lg">
                    <div className="w-2 h-2 rounded-full bg-secondary" />
                    <strong>Cotonou</strong> (Campus Vèdoko)
                  </li>
                  <li className="flex items-center gap-3 text-lg">
                    <div className="w-2 h-2 rounded-full bg-secondary" />
                    <strong>Godomey</strong>
                  </li>
                  <li className="flex items-center gap-3 text-lg">
                    <div className="w-2 h-2 rounded-full bg-secondary" />
                    <strong>Abomey-Calavi</strong>
                  </li>
                  <li className="flex items-center gap-3 text-lg">
                    <div className="w-2 h-2 rounded-full bg-secondary" />
                    <strong>Porto-Novo</strong>
                  </li>
                  <li className="flex items-center gap-3 text-lg">
                    <div className="w-2 h-2 rounded-full bg-secondary" />
                    <strong>Parakou</strong>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm border">
                <h3 className="flex items-center gap-3 font-heading font-bold text-2xl mb-6 text-secondary">
                  <MapPin className="w-6 h-6" />
                  Côte d'Ivoire
                </h3>
                <div className="space-y-4">
                  <p className="text-lg text-muted-foreground mb-4">
                    Notre nouveau hub en plein développement pour rayonner sur l'Afrique de l'Ouest francophone.
                  </p>
                  <li className="flex items-center gap-3 text-lg">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <strong>Abidjan</strong> (Campus Principal)
                  </li>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Partenaires */}
        <section className="py-20">
          <div className="container-custom max-w-6xl text-center">
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-6">
              Nos Partenaires de Confiance
            </h2>
            <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
              Nous collaborons avec des institutions reconnues pour garantir l'excellence et la pertinence de nos formations.
            </p>

            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70">
              {/* Note: Replacing actual images with stylized text/icons for partners as placeholders */}
              <div className="flex flex-col items-center gap-2">
                <Handshake className="w-12 h-12 text-primary" />
                <span className="font-bold text-xl">SOS Village d'Enfant</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Globe className="w-12 h-12 text-secondary" />
                <span className="font-bold text-xl">Ambassade du Danemark</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Award className="w-12 h-12 text-primary" />
                <span className="font-bold text-xl">CNAP-BENIN</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}