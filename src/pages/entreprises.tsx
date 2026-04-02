import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Target, ShieldCheck, ArrowRight, CheckCircle2, Users, TrendingUp, Award } from "lucide-react";
import Link from "next/link";

export default function Entreprises() {
  const services = [
    {
      icon: Target,
      title: "Ingénierie de Formation",
      description: "Audit complet des besoins en compétences de votre entreprise et élaboration de plans de formation personnalisés alignés avec vos objectifs stratégiques.",
      features: [
        "Analyse des besoins",
        "Plans de formation sur mesure",
        "Évaluation des compétences",
        "Suivi des progrès"
      ]
    },
    {
      icon: Briefcase,
      title: "Renforcement de Capacités",
      description: "Modules courts et intensifs pour mettre à jour vos équipes sur les nouvelles technologies et pratiques de votre secteur.",
      features: [
        "Formations certifiantes",
        "Technologies émergentes",
        "Pratiques professionnelles",
        "Formation continue"
      ]
    },
    {
      icon: ShieldCheck,
      title: "Conformité & Certifications",
      description: "Formations certifiées et éligibles aux financements institutionnels comme le FDFP, facilitant la prise en charge financière.",
      features: [
        "Diplômes reconnus",
        "Éligibilité FDFP",
        "Certifications professionnelles",
        "Normes internationales"
      ]
    }
  ];

  const advantages = [
    {
      icon: Users,
      title: "Formateurs Experts",
      description: "Professionnels qualifiés avec une expérience terrain dans leur domaine"
    },
    {
      icon: TrendingUp,
      title: "ROI Mesurable",
      description: "Amélioration quantifiable des compétences et de la productivité"
    },
    {
      icon: Award,
      title: "Qualité Certifiée",
      description: "Formations reconnues par l'État et les institutions professionnelles"
    }
  ];

  return (
    <>
      <SEO 
        title="Solutions Entreprises - TCI Formation" 
        description="Formations sur mesure, ingénierie de formation et renforcement de capacités pour votre entreprise au Bénin."
      />
      <Header />
      
      <main className="bg-gray-50">
        {/* Hero Section */}
        <section className="relative py-24 bg-gradient-to-br from-tci-blue via-tci-blue/95 to-tci-blue/90 text-white overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-tci-red/20 to-transparent"></div>
          
          <div className="container-custom relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <Badge variant="secondary" className="mb-6 bg-white/20 text-white border-white/30 backdrop-blur-sm">
                SOLUTIONS B2B
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Formez Vos Équipes pour l'Excellence
              </h1>
              <p className="text-xl text-white/90 leading-relaxed mb-8">
                Développez le potentiel de vos collaborateurs avec nos programmes de formation sur mesure, 
                adaptés aux défis technologiques et professionnels de votre secteur.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Button size="lg" className="bg-white text-tci-blue hover:bg-gray-100 h-14 px-8 text-base">
                  <Link href="/contact" className="flex items-center gap-2">
                    Demander un Devis
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 h-14 px-8 text-base backdrop-blur-sm">
                  Télécharger la Brochure
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20">
          <div className="container-custom">
            <div className="text-center mb-16">
              <Badge className="bg-tci-blue/10 text-tci-blue border-0 mb-4">NOS SERVICES</Badge>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Solutions de Formation Complètes
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Un accompagnement personnalisé pour développer les compétences de vos équipes
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <Card key={index} className="border-0 shadow-xl hover:shadow-2xl transition-all group">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-tci-blue/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-tci-blue group-hover:scale-110 transition-all">
                      <service.icon className="w-8 h-8 text-tci-blue group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {service.description}
                    </p>
                    <div className="space-y-3">
                      {service.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-tci-blue flex-shrink-0" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Advantages Section */}
        <section className="py-20 bg-white">
          <div className="container-custom">
            <div className="text-center mb-16">
              <Badge className="bg-tci-blue/10 text-tci-blue border-0 mb-4">POURQUOI NOUS CHOISIR</Badge>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Nos Avantages Compétitifs
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {advantages.map((advantage, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-tci-blue/10 rounded-2xl mb-6">
                    <advantage.icon className="w-10 h-10 text-tci-blue" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{advantage.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{advantage.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20">
          <div className="container-custom">
            <div className="text-center mb-16">
              <Badge className="bg-tci-blue/10 text-tci-blue border-0 mb-4">NOTRE PROCESSUS</Badge>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Comment Nous Procédons
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {[
                { step: "01", title: "Analyse", desc: "Audit de vos besoins en formation" },
                { step: "02", title: "Proposition", desc: "Programme personnalisé et devis" },
                { step: "03", title: "Formation", desc: "Déploiement des modules adaptés" },
                { step: "04", title: "Suivi", desc: "Évaluation et accompagnement continu" }
              ].map((item, index) => (
                <div key={index} className="relative text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-tci-blue text-white rounded-2xl font-bold text-2xl mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                  {index < 3 && (
                    <div className="hidden md:block absolute top-8 left-[60%] w-full h-0.5 bg-tci-blue/20"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-tci-blue to-tci-blue/90 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <div className="container-custom relative z-10">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold">
                Prêt à Former Vos Équipes ?
              </h2>
              <p className="text-xl text-white/90">
                Contactez nos conseillers pour discuter de vos besoins spécifiques et obtenir une proposition sur mesure adaptée à votre entreprise.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <Button size="lg" className="bg-white text-tci-blue hover:bg-gray-100 h-14 px-8 text-base" asChild>
                  <Link href="/contact" className="flex items-center gap-2">
                    Demander un Devis
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 h-14 px-8 text-base backdrop-blur-sm">
                  <a href="tel:+229XXXXXXXX" className="flex items-center gap-2">
                    Appeler Maintenant
                  </a>
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