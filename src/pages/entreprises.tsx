import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, Target, ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function Entreprises() {
  return (
    <>
      <SEO 
        title="Solutions Entreprises | SoftGen" 
        description="Formations sur mesure, ingénierie de formation et renforcement de capacités pour votre entreprise."
      />
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-hero text-white">
          <div className="container-custom max-w-4xl text-center space-y-6">
            <h1 className="font-heading font-bold text-4xl md:text-5xl">
              Solutions Entreprises (B2B)
            </h1>
            <p className="text-xl text-white/90">
              Développez le potentiel de vos équipes avec nos programmes de formation sur mesure, 
              adaptés aux défis technologiques de votre secteur.
            </p>
          </div>
        </section>

        {/* Services */}
        <section className="py-20">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border-2 border-transparent hover:border-primary transition-colors">
                <CardContent className="p-8 space-y-4">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                    <Target className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading font-bold text-xl">Ingénierie de Formation</h3>
                  <p className="text-muted-foreground">
                    Audit approfondi des besoins en compétences de votre entreprise et élaboration de plans de formation personnalisés.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-transparent hover:border-primary transition-colors">
                <CardContent className="p-8 space-y-4">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading font-bold text-xl">Renforcement de Capacités</h3>
                  <p className="text-muted-foreground">
                    Des modules courts et intensifs pour mettre à jour vos équipes sur les nouvelles technologies (IA, Cloud, Solaire, etc.).
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-transparent hover:border-primary transition-colors">
                <CardContent className="p-8 space-y-4">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading font-bold text-xl">Conformité & Financements</h3>
                  <p className="text-muted-foreground">
                    Nos formations sont certifiées et éligibles aux financements institutionnels comme le FDFP, facilitant la prise en charge.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-muted/30">
          <div className="container-custom max-w-3xl text-center space-y-8">
            <h2 className="font-heading font-bold text-3xl">Prêt à former vos équipes ?</h2>
            <p className="text-lg text-muted-foreground">
              Contactez nos conseillers pour discuter de vos besoins spécifiques et obtenir une proposition sur mesure.
            </p>
            <Link href="/contact">
              <Button size="lg" className="text-lg px-8">
                Demander un devis
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}