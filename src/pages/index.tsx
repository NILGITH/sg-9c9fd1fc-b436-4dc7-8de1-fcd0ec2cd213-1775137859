import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import {
  Award, Users, MapPin, GraduationCap, Briefcase, ArrowRight,
  Network, Droplets, Snowflake, Scissors, Leaf, ChefHat, Coffee,
  Building, Calendar, Code, Zap, Monitor, Shirt, Sparkles, PaintBucket } from
"lucide-react";
import { HeroSlider } from "@/components/HeroSlider";
import { TestimonialsSlider } from "@/components/TestimonialsSlider";
import { formationService, type Formation } from "@/services/formationService";
import { newsService, type News } from "@/services/newsService";
import { NewsCard } from "@/components/NewsCard";
import { intakeDateService } from "@/services/intakeDateService";

interface HomeProps {
  featuredFormations: Formation[];
  recentNews: News[];
  intakeDates: Array<{date: string;label: string;}>;
}

export default function Home({ featuredFormations, recentNews, intakeDates }: HomeProps) {
  const stats = [
  { icon: Award, value: "10+", label: "Années d'expérience" },
  { icon: MapPin, value: "5", label: "Sites de formation" },
  { icon: Users, value: "1000+", label: "Diplômés" },
  { icon: GraduationCap, value: "CQM/CQP", label: "Certifications d'État" }];


  const formationsDiplomantes = [
  {
    title: "Génie Électrique Informatique & Réseaux",
    icon: Network,
    color: "text-blue-600",
    desc: "Niveau minimum requis pour cette filière: Baccalauréat ou tout autre diplôme équivalent"
  },
  {
    title: "Génie des Télécommunications & Réseaux",
    icon: Zap,
    color: "text-orange-600",
    desc: "Niveau minimum requis pour cette filière: Brevet d'Étude du Premier Cycle ou Certificat d'Aptitude Professionnelle ou tout autre Diplôme équivalent"
  },
  {
    title: "Génie Logiciel & Réseaux",
    icon: Code,
    color: "text-teal-600",
    desc: "Niveau minimum requis pour cette filière: Baccalauréat ou tout autre diplôme équivalent"
  },
  {
    title: "Génie Électrique Froid & Plomberie",
    icon: Snowflake,
    color: "text-cyan-600",
    desc: "Niveau minimum requis pour cette filière: Brevet d'Étude du Premier Cycle ou Certificat d'Aptitude Professionnelle ou tout autre Diplôme équivalent"
  },
  {
    title: "Génie Électrique & Maintenance Industrielle",
    icon: Building,
    color: "text-purple-600",
    desc: "Niveau minimum requis pour cette filière: Brevet d'Étude du Premier Cycle ou Certificat d'Aptitude Professionnelle ou tout autre Diplôme équivalent"
  },
  {
    title: "Génie Électrique & Informatique",
    icon: Monitor,
    color: "text-indigo-600",
    desc: "Filière recommandée pour toute personne possédant des spécialités après comment"
  },
  {
    title: "Secrétariat",
    icon: Briefcase,
    color: "text-green-600",
    desc: "Niveau minimum en anglais, Traitement de Textes et Gestion des Lycées et Collèges ou Brevet d'Étude du Premier Cycle ou Certificat d'Aptitude professionnelle ou tout autre diplôme équivalent"
  },
  {
    title: "Cuisine & Restauration",
    icon: ChefHat,
    color: "text-red-600",
    desc: "Filière recommandée pour tous les niveaux d'étude et les analphabètes"
  },
  {
    title: "Pâtisserie & Boulangerie",
    icon: Coffee,
    color: "text-amber-600",
    desc: "Filière recommandée pour tous les niveaux d'étude et les analphabètes"
  },
  {
    title: "Hôtellerie & Restauration",
    icon: Building,
    color: "text-pink-600",
    desc: "Filière recommandée pour tous les niveaux d'étude et les analphabètes"
  },
  {
    title: "Elevage",
    icon: Leaf,
    color: "text-green-700",
    desc: "Filière recommandée pour tous les niveaux d'étude et les analphabètes"
  },
  {
    title: "Coiffure & Esthétique",
    icon: Scissors,
    color: "text-purple-500",
    desc: "Filière recommandée pour tous les niveaux d'étude et les analphabètes"
  },
  {
    title: "Couture Homme",
    icon: Shirt,
    color: "text-blue-700",
    desc: "Filière recommandée pour tous les niveaux d'étude et les analphabètes"
  },
  {
    title: "Couture Dame",
    icon: Shirt,
    color: "text-purple-700",
    desc: "Filière recommandée pour tous les niveaux d'étude et les analphabètes"
  },
  {
    title: "Haute Couture",
    icon: Sparkles,
    color: "text-teal-700",
    desc: "Filière recommandée pour tous les niveaux d'étude et les analphabètes"
  },
  {
    title: "Stylisme",
    icon: Shirt,
    color: "text-cyan-700",
    desc: "Filière recommandée pour tous les niveaux d'étude et les analphabètes"
  },
  {
    title: "Stylisme Modélisme",
    icon: PaintBucket,
    color: "text-indigo-700",
    desc: "Filière recommandée pour tous les niveaux d'étude et les analphabètes"
  },
  {
    title: "Make up - Onglerie - Attache Foulard - Perruquerie",
    icon: Sparkles,
    color: "text-pink-700",
    desc: "Filière recommandée pour tous les niveaux d'étude et les analphabètes"
  }];


  const autresFormations = [
  {
    title: "Word - PowerPoint - Electricité Bâtiment - Systèmes Solaires Photovoltaïques",
    icon: Monitor,
    color: "text-blue-600"
  },
  {
    title: "Word - PowerPoint - Plomberie",
    icon: Droplets,
    color: "text-cyan-600"
  },
  {
    title: "Electricité Bâtiment - Froid et Climatisation - Word - PowerPoint",
    icon: Snowflake,
    color: "text-teal-600"
  },
  {
    title: "Electricité Bâtiment - Froid et Climatisation - Plomberie",
    icon: Zap,
    color: "text-orange-600"
  }];


  const formationsEnLigne = [
  { title: "Programmation Web", icon: Code, color: "text-blue-600" },
  { title: "Secrétariat", icon: Briefcase, color: "text-orange-600" },
  { title: "Génie Logiciel et Réseaux", icon: Network, color: "text-teal-600" },
  { title: "Electricité Bâtiment", icon: Zap, color: "text-green-600" },
  { title: "Installation et Maintenance des Systèmes Solaires Photovoltaïques", icon: Award, color: "text-yellow-600" },
  { title: "Word - Excel - PowerPoint", icon: Monitor, color: "text-purple-600" },
  { title: "Photoshop", icon: PaintBucket, color: "text-pink-600" }];


  return (
    <>
      <SEO
        title="TCI Formation - Centre de Formation Professionnelle à Cotonou et Abidjan"
        description="Propulsez votre carrière avec TCI Formation. 10+ ans d'expérience, 5 sites, certifications CQM/CQP. Formations diplômantes et en ligne." />
      

      <Header />

      <main>
        {/* Hero Slider */}
        <HeroSlider />

        {/* Stats Section */}
        <section className="py-16 bg-white border-b relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <img
              src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&auto=format&fit=crop"
              alt="Formation professionnelle"
              className="w-full h-full object-cover" />
            
          </div>
          <div className="container-custom relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) =>
              <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-4">
                    <stat.icon className="w-8 h-8" />
                  </div>
                  <p className="text-4xl font-bold font-heading text-primary mb-2">{stat.value}</p>
                  <p className="text-muted-foreground">{stat.label}</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Nos Rentrées Section */}
        <section className="py-16 bg-gray-900 text-white">
          <div className="container-custom">
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-10 text-left">
              NOS RENTRÉES
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl">
              {intakeDates.map((intake, index) =>
              <div
                key={index}
                className="bg-gradient-to-r from-secondary to-orange-600 text-white text-center py-4 px-6 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition-shadow">
                
                  {intake.label}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Formations Diplômantes */}
        <section className="py-20 bg-gray-50">
          <div className="container-custom">
            <div className="mb-12">
              <p className="text-primary font-semibold mb-2 uppercase tracking-wide text-sm">
                NOS FILIÈRES DE FORMATION
              </p>
              <h2 className="font-heading font-bold text-3xl md:text-4xl mb-3">
                FORMATIONS DIPLÔMANTES
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {formationsDiplomantes.map((formation, index) =>
              <Card key={index} className="hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0 ${formation.color}`}>
                        <formation.icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-heading font-bold text-lg mb-2">
                          {formation.title}
                        </h3>
                      </div>
                    </div>
                    {formation.desc &&
                  <p className="text-sm text-muted-foreground mb-4">{formation.desc}</p>
                  }
                    <Link href="/admissions">
                      <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                        En savoir plus
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </section>

        {/* Autres Formations Diplômantes */}
        <section className="py-20 bg-white">
          <div className="container-custom">
            <div className="mb-12">
              <p className="text-primary font-semibold mb-2 uppercase tracking-wide text-sm">
                NOS FILIÈRES DE FORMATION
              </p>
              <h2 className="font-heading font-bold text-3xl md:text-4xl mb-3">
                AUTRES FORMATIONS DIPLÔMANTES
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {autresFormations.map((formation, index) =>
              <Card key={index} className="hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0 ${formation.color}`}>
                        <formation.icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-heading font-bold text-base mb-2">
                          {formation.title}
                        </h3>
                      </div>
                    </div>
                    <Link href="/admissions">
                      <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                        En savoir plus
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </section>

        {/* Formations En Ligne */}
        <section className="py-20 bg-gray-50">
          <div className="container-custom">
            <div className="mb-12">
              <p className="text-primary font-semibold mb-2 uppercase tracking-wide text-sm">
                NOS FILIÈRES DE FORMATION
              </p>
              <h2 className="font-heading font-bold text-3xl md:text-4xl mb-3">
                FORMATIONS EN LIGNE
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {formationsEnLigne.map((formation, index) =>
              <Card key={index} className="hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0 ${formation.color}`}>
                        <formation.icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-heading font-bold text-lg mb-2">
                          {formation.title}
                        </h3>
                      </div>
                    </div>
                    <Link href="/online">
                      <Button size="sm" variant="outline">
                        En savoir plus
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </section>

        {/* Qui Sommes Nous */}
        <section className="py-20 bg-white">
          



























































































































          
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-hero text-white">
          <div className="container-custom text-center">
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-6">
              Prêt à Transformer Votre Avenir ?
            </h2>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Rejoignez TCI Formation et donnez vie à vos ambitions professionnelles
            </p>
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
              <Link href="/admissions">
                S'inscrire Maintenant
              </Link>
            </Button>
          </div>
        </section>

        {/* Actualités Section */}
        {recentNews.length > 0 &&
        <section className="py-20">
            <div className="container-custom">
              <div className="flex items-end justify-between mb-12">
                <div>
                  <h2 className="font-heading font-bold text-3xl md:text-4xl mb-3">
                    Nos Actualités Récentes
                  </h2>
                  <p className="text-muted-foreground text-lg">
                    Restez informé de nos derniers événements et succès
                  </p>
                </div>
                <Link href="/actualites">
                  <Button variant="outline">
                    Voir tout
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {recentNews.map((news) =>
              <Link key={news.id} href={`/actualites/${news.slug}`}>
                    <NewsCard news={news} />
                  </Link>
              )}
              </div>
            </div>
          </section>
        }

        {/* Testimonials Section */}
        <section className="py-20 bg-muted/30">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="font-heading font-bold text-3xl md:text-5xl mb-6">
                Témoignages de nos Apprenants
              </h2>
              <p className="text-lg text-muted-foreground">
                Découvrez ce que nos anciens étudiants pensent de leur expérience à TCI Formation
              </p>
            </div>
            <TestimonialsSlider />
          </div>
        </section>
      </main>

      <Footer />
    </>);

}

export async function getStaticProps() {
  const { data: formations } = await formationService.getAll();
  const { data: news } = await newsService.getAll();
  const { data: intakeDates } = await intakeDateService.getActive();

  return {
    props: {
      featuredFormations: formations?.slice(0, 6) || [],
      recentNews: news?.slice(0, 3) || [],
      intakeDates: intakeDates?.map((d) => ({ date: d.date, label: d.label })) || []
    },
    revalidate: 60
  };
}