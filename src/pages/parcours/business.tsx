import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Briefcase, Scissors, Coffee, Award, Clock, GraduationCap } from "lucide-react";
import { formationService, type Formation } from "@/services/formationService";

interface BusinessProps {
  formations: Formation[];
}

export default function Business({ formations }: BusinessProps) {
  const benefits = [
    {
      icon: Award,
      title: "Certifications Officielles",
      desc: "Diplômes CQM & CQP reconnus par l'État",
    },
    {
      icon: Clock,
      title: "Formation Pratique",
      desc: "Mise en situation réelle",
    },
    {
      icon: GraduationCap,
      title: "Entrepreneuriat",
      desc: "Créez votre propre entreprise",
    },
  ];

  return (
    <>
      <SEO
        title="Pôle Business & Lifestyle - TCI Formation"
        description="Formations en Secrétariat, Hôtellerie, Restauration, Mode, Esthétique et Coiffure. Lancez votre carrière dans le lifestyle avec TCI Formation."
      />

      <Header />

      <main>
        {/* Hero */}
        <section className="py-20 bg-gradient-hero text-white">
          <div className="container-custom max-w-5xl text-center space-y-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm mb-4">
              <Briefcase className="w-10 h-10" />
            </div>
            <h1 className="font-heading font-bold text-4xl md:text-6xl">
              Pôle Business & Lifestyle
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Excellez dans les métiers du service, de la mode et de l'accueil. Du secrétariat à la haute couture, 
              en passant par l'hôtellerie et l'esthétique, nos formations vous ouvrent les portes de l'entrepreneuriat.
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
                Nos Formations Business & Lifestyle
              </h2>
              <p className="text-lg text-muted-foreground">
                Des métiers passion au service de l'excellence
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {formations.map((formation) => {
                let icon = "📋";
                if (formation.title.includes("Cuisine") || formation.title.includes("Restauration")) icon = "🍳";
                if (formation.title.includes("Pâtisserie") || formation.title.includes("Boulangerie")) icon = "🎂";
                if (formation.title.includes("Hôtellerie") || formation.title.includes("Elevage")) icon = "🏨";
                if (formation.title.includes("Couture") || formation.title.includes("Stylisme")) icon = "👗";
                if (formation.title.includes("Coiffure") || formation.title.includes("Esthétique")) icon = "✂️";

                return (
                  <Card key={formation.id} className="group hover:shadow-2xl hover:scale-105 transition-all duration-300 border-2 hover:border-primary">
                    <CardContent className="p-8 space-y-6">
                      <div className="flex items-center justify-between">
                        <div 
                          className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
                          style={{ backgroundColor: `${formation.color}20` }}
                        >
                          {icon}
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
                );
              })}
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
                Entrepreneuriat, emploi salarié ou freelance : de multiples opportunités
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                "Secrétaire de Direction",
                "Assistant(e) Administratif(ve)",
                "Chef Cuisinier / Pâtissier",
                "Responsable Restauration",
                "Réceptionniste d'Hôtel",
                "Styliste / Modéliste",
                "Couturier(e) Haute Couture",
                "Coiffeur(se) Professionnel(le)",
                "Esthéticien(ne) & Spa Manager",
                "Entrepreneur dans le lifestyle",
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
              Prêt à lancer votre carrière lifestyle ?
            </h2>
            <p className="text-xl text-white/90">
              Rejoignez le Pôle Business & Lifestyle et transformez votre passion en profession
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
  
  const businessFormations = formations?.filter(f => 
    f.category_id === "11111111-1111-1111-1111-111111111111" &&
    (f.title.includes("Secrétariat") || f.title.includes("Cuisine") || 
     f.title.includes("Pâtisserie") || f.title.includes("Hôtellerie") ||
     f.title.includes("Elevage") || f.title.includes("Coiffure") || 
     f.title.includes("Esthétique") || f.title.includes("Couture") ||
     f.title.includes("Stylisme") || f.title.includes("Make up"))
  ) || [];

  return {
    props: {
      formations: businessFormations,
    },
    revalidate: 60,
  };
}