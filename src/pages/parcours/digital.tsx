import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Code, Palette, Network, Database, Award, Clock, GraduationCap } from "lucide-react";
import { formationService, type Formation } from "@/services/formationService";

interface DigitalProps {
  formations: Formation[];
}

export default function Digital({ formations }: DigitalProps) {
  const benefits = [
    {
      icon: Award,
      title: "Certifications Officielles",
      desc: "Diplômes CQM & CQP reconnus par l'État",
    },
    {
      icon: Clock,
      title: "Formation Pratique",
      desc: "80% de pratique sur des projets réels",
    },
    {
      icon: GraduationCap,
      title: "Formateurs Experts",
      desc: "Professionnels actifs de l'industrie",
    },
  ];

  return (
    <>
      <SEO
        title="Pôle Digital & Software - TCI Formation"
        description="Formations en Génie Logiciel, Programmation Web, Design Graphique et Réseaux. Devenez expert du numérique avec TCI Formation."
      />

      <Header />

      <main>
        {/* Hero with Background Image */}
        <section className="py-20 bg-gradient-hero text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop"
              alt="Formation informatique"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="container-custom max-w-5xl text-center space-y-8 relative z-10">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm mb-4">
              <Code className="w-10 h-10" />
            </div>
            <h1 className="font-heading font-bold text-4xl md:text-6xl">
              Pôle Digital & Software
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Maîtrisez les technologies du futur. De la programmation au design, en passant par les réseaux et la cybersécurité, 
              nos formations vous préparent aux métiers les plus demandés du secteur numérique.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Link href="/admissions">
                <Button size="lg" variant="secondary" className="text-lg px-8">
                  Postuler maintenant
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="text-lg px-8 bg-white/10 border-white/30 text-white hover:bg-white/20">
                  Nous contacter
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 bg-white border-b">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-4">
                      <Icon className="w-8 h-8" />
                    </div>
                    <h3 className="font-heading font-bold text-xl mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Formations */}
        <section className="py-20">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="font-heading font-bold text-3xl md:text-5xl mb-6">
                Nos Formations Digital & Software
              </h2>
              <p className="text-lg text-muted-foreground">
                Choisissez la formation qui correspond à votre projet professionnel
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {formations.map((formation) => (
                <Card key={formation.id} className="group hover:shadow-2xl hover:scale-105 transition-all duration-300 border-2 hover:border-primary">
                  <CardContent className="p-8 space-y-6">
                    <div className="flex items-center justify-between">
                      <div 
                        className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
                        style={{ backgroundColor: `${formation.icon_color || '#10b981'}20` }}
                      >
                        💻
                      </div>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        Diplômant
                      </span>
                    </div>

                    <div className="space-y-3">
                      <h3 className="font-heading font-bold text-xl group-hover:text-primary transition-colors">
                        {formation.title}
                      </h3>
                      <p className="text-muted-foreground line-clamp-3">
                        {formation.description}
                      </p>
                    </div>

                    <div className="pt-4 space-y-3">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="w-4 h-4 mr-2" />
                        Durée variable selon niveau
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <GraduationCap className="w-4 h-4 mr-2" />
                        Niveau : {formation.requirements}
                      </div>
                    </div>

                    <Link href="/admissions">
                      <Button className="w-full bg-gradient-accent hover:opacity-90">
                        S'inscrire
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Débouchés */}
        <section className="py-20 bg-muted/30">
          <div className="container-custom max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
                Débouchés Professionnels
              </h2>
              <p className="text-lg text-muted-foreground">
                Nos diplômés occupent des postes stratégiques dans le secteur du numérique
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                "Développeur Full Stack",
                "Ingénieur Logiciel",
                "Administrateur Réseaux & Systèmes",
                "Designer UI/UX",
                "Chef de Projet Digital",
                "Technicien en Cybersécurité",
                "Graphiste Multimédia",
                "Webmaster",
              ].map((metier, index) => (
                <div key={index} className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm border border-muted">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <span className="text-muted-foreground font-semibold">{metier}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-hero text-white">
          <div className="container-custom text-center max-w-4xl mx-auto space-y-8">
            <h2 className="font-heading font-bold text-3xl md:text-5xl">
              Prêt à devenir un expert du digital ?
            </h2>
            <p className="text-xl text-white/90">
              Rejoignez le Pôle Digital & Software et lancez votre carrière dans la tech
            </p>
            <Link href="/admissions">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                Postuler maintenant
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export async function getStaticProps() {
  const { data: formations } = await formationService.getAll();
  
  const digitalFormations = formations?.filter(f => 
    f.category_id === "11111111-1111-1111-1111-111111111111" &&
    (f.title.includes("Logiciel") || f.title.includes("Informatique") || 
     f.title.includes("Télécommunications") || f.title.includes("Graphisme"))
  ) || [];

  return {
    props: {
      formations: digitalFormations,
    },
    revalidate: 60,
  };
}