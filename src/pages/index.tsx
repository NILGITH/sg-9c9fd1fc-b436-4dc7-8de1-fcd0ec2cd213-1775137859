import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { 
  Award, Users, MapPin, GraduationCap, Briefcase, ArrowRight, 
  Network, Droplets, Snowflake, Scissors, Leaf, ChefHat, Coffee, 
  Building, Calendar, Code, Zap, Monitor, Shirt, Sparkles, PaintBucket
} from "lucide-react";
import { HeroSlider } from "@/components/HeroSlider";
import { TestimonialsSlider } from "@/components/TestimonialsSlider";
import { formationService, type Formation } from "@/services/formationService";
import { newsService, type News } from "@/services/newsService";
import { NewsCard } from "@/components/NewsCard";
import { intakeDateService } from "@/services/intakeDateService";

interface HomeProps {
  featuredFormations: Formation[];
  recentNews: News[];
  intakeDates: Array<{ date: string; label: string }>;
}

export default function Home({ featuredFormations, recentNews, intakeDates }: HomeProps) {
  const stats = [
    { icon: Award, value: "10+", label: "Années d'expérience" },
    { icon: MapPin, value: "5", label: "Sites de formation" },
    { icon: Users, value: "1000+", label: "Diplômés" },
    { icon: GraduationCap, value: "CQM/CQP", label: "Certifications d'État" },
  ];

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
    },
  ];

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
    },
  ];

  const formationsEnLigne = [
    { title: "Programmation Web", icon: Code, color: "text-blue-600" },
    { title: "Secrétariat", icon: Briefcase, color: "text-orange-600" },
    { title: "Génie Logiciel et Réseaux", icon: Network, color: "text-teal-600" },
    { title: "Electricité Bâtiment", icon: Zap, color: "text-green-600" },
    { title: "Installation et Maintenance des Systèmes Solaires Photovoltaïques", icon: Award, color: "text-yellow-600" },
    { title: "Word - Excel - PowerPoint", icon: Monitor, color: "text-purple-600" },
    { title: "Photoshop", icon: PaintBucket, color: "text-pink-600" },
  ];

  return (
    <>
      <SEO
        title="TCI Formation - Centre de Formation Professionnelle à Cotonou et Abidjan"
        description="Propulsez votre carrière avec TCI Formation. 10+ ans d'expérience, 5 sites, certifications CQM/CQP. Formations diplômantes et en ligne."
      />

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
              className="w-full h-full object-cover"
            />
          </div>
          <div className="container-custom relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-4">
                    <stat.icon className="w-8 h-8" />
                  </div>
                  <p className="text-4xl font-bold font-heading text-primary mb-2">{stat.value}</p>
                  <p className="text-muted-foreground">{stat.label}</p>
                </div>
              ))}
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
              {intakeDates.map((intake, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-r from-secondary to-orange-600 text-white text-center py-4 px-6 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition-shadow"
                >
                  {intake.label}
                </div>
              ))}
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
              {formationsDiplomantes.map((formation, index) => (
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
                    {formation.desc && (
                      <p className="text-sm text-muted-foreground mb-4">{formation.desc}</p>
                    )}
                    <Link href="/admissions">
                      <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                        En savoir plus
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
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
              {autresFormations.map((formation, index) => (
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
              ))}
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
              {formationsEnLigne.map((formation, index) => (
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
              ))}
            </div>
          </div>
        </section>

        {/* Qui Sommes Nous */}
        <section className="py-20 bg-white">
          <div className="container-custom max-w-5xl">
            <div className="mb-12">
              <p className="text-primary font-semibold mb-2 uppercase tracking-wide text-sm">
                À PROPOS DE NOUS
              </p>
              <h2 className="font-heading font-bold text-3xl md:text-4xl mb-6">
                QUI SOMMES NOUS ?
              </h2>
            </div>

            <div className="space-y-6 text-lg leading-relaxed text-gray-700">
              <div>
                <h3 className="font-heading font-bold text-2xl mb-4 text-primary">Problématique et Mission</h3>
                <p className="mb-4">
                  Le problème de l'emploi des jeunes est devenu une préoccupation majeure et un défi permanent pour les responsables à différents niveaux en général et pour les parents d'élèves, élèves et étudiants en particulier. Avec l'environnement économique qui caractérise le monde des entreprises aujourd'hui, il est important que la jeunesse reçoive une formation en adéquation avec les besoins du marché.
                </p>
                <p className="mb-4">
                  Aussi le capital est en train d'une valeur permanente pour les artisans et maîtres artisans dans la perspective de maintenir leurs acquis professionnels en harmonie avec les exigences des mutations, changements, nouvelles découvertes et normes à respecter sur le marché de l'emploi et dans le cadre des exigences clients.
                </p>
                <p className="mb-4">
                  Plusieurs milliers de diplômés universitaires arrivent sans s'insérer dans la vie professionnelle. De même des milliers de jeunes admis dans nos collèges n'arrivent pas à obtenir le BEPC ou le baccalauréat et croient qu'ils sont incapables d'exercer un métier qui leur donnerait plus de chance et de place dans la vie qu'un diplôme.
                </p>
                <p className="mb-4">
                  Des jeunes béninois ou ivoiriens sans aucun diplôme, orphelins, indigents, parents, errent et sont à la recherche d'une aide, d'un soutien, d'un accompagnement, d'une attention à leur endroit. Des parents investissent sans pour autant savoir avec précision ce que deviendront leurs fils ou filles.
                </p>
                <p>
                  Plusieurs enfants nourrissent le rêve d'obtenir de grands diplômes mais ne peuvent l'exprimer devant des parents qui ne perçoivent pas forcément la réalité comme eux. Cette situation représente l'une des voies d'accès au sous-développement.
                </p>
              </div>

              <div>
                <p className="mb-4">
                  Avec les changements observés depuis quelques années, les responsables à divers niveaux comprennent de plus en plus que la formation professionnelle fait partie des axes stratégiques pour quitter le sous-développement.
                </p>
                <p className="mb-4">
                  Voilà pourquoi le Programme d'Action du Gouvernement béninois accorde une importance particulière aux différentes réformes dans le système éducatif en général et à la formation professionnelle en particulier.
                </p>
                <p>
                  TCI BENIN entend promouvoir la formation professionnelle une offre qui, à travers la qualité de l'enseignement, la disponibilité des infrastructures, l'amélioration de l'environnement de travail et le développement personnel, met déjà sur le marché national et international un nouveau type de professionnels capables de se prendre en charge et travers plusieurs capacités adaptées pour satisfaire les besoins socio-économiques de plusieurs couches de populations.
                </p>
              </div>

              <div>
                <p>
                  Notre centre de formation apporte une solution efficace et concrète à tous les jeunes, artisans, maîtres artisans, particuliers qui expriment une passion pour l'énergie en général, l'énergie solaire en particulier, la technologie, l'informatique et l'industrie à travers de formations pratiques multidimensionnelles, des renforcements de capacités en mesure de leur permettre d'être plus efficaces dans l'exercice de leur métier.
                </p>
              </div>

              <div>
                <p>
                  Dans nos pays d'Afrique presque tous en voie de développement, les filières de formation de TCI-BENIN sont toutes des vecteurs essentiels de développement. Le développement d'un pays passe obligatoirement par l'existence d'une main d'œuvre qualifiée dans tous les secteurs d'activités. Voilà pourquoi TCI-BENIN a depuis 2013 décidé de rendre disponibles des professionnels compétents au temps et en fonction de l'évolutions qualitative et quantitatives des réalités des sources d'énergie, de la technologie de l'industrie des métiers de la mode, de l'art culinaire, de l'élevage, de la beauté, de la pâtisserie et bien d'autres.
                </p>
              </div>

              <div className="mt-8 bg-primary/5 p-6 rounded-lg">
                <h3 className="font-heading font-bold text-xl mb-4 text-primary">Domaines D'intervention</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Électricité bâtiment</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Systèmes solaires photovoltaïques</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Froid et climatisation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Vidéo surveillance</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Informatique appliquée</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Graphisme</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Génie Électrique et Informatique</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Génie Électrique Informatique et Réseaux</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Génie Logiciel et réseaux</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Génie des Télécommunications et Réseaux</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Génie Électrique et Maintenance Industrielle</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Génie Électrique Froid et Plomberie</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Secrétariat</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Coupe et Couture</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Coiffure et Esthétique</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Cuisine et restauration</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-hero text-white">
          <div className="container-custom text-center max-w-4xl mx-auto space-y-8">
            <h2 className="font-heading font-bold text-3xl md:text-5xl">
              Prêt à transformer votre avenir professionnel ?
            </h2>
            <p className="text-xl text-white/90">
              Rejoignez des milliers d'étudiants qui ont déjà lancé leur carrière avec TCI Formation
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Link href="/admissions">
                <Button size="lg" variant="secondary" className="text-lg px-8">
                  S'inscrire en ligne
                  <Calendar className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/entreprises">
                <Button size="lg" variant="outline" className="text-lg px-8 bg-white/10 border-white/30 text-white hover:bg-white/20">
                  <Briefcase className="mr-2 w-5 h-5" />
                  Solutions Entreprises
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* News Section */}
        {recentNews.length > 0 && (
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
                {recentNews.map((news) => (
                  <Link key={news.id} href={`/actualites/${news.slug}`}>
                    <NewsCard news={news} />
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

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
    </>
  );
}

export async function getStaticProps() {
  const { data: formations } = await formationService.getAll();
  const { data: news } = await newsService.getAll();
  const { data: intakeDates } = await intakeDateService.getActive();

  return {
    props: {
      featuredFormations: formations?.slice(0, 6) || [],
      recentNews: news?.slice(0, 3) || [],
      intakeDates: intakeDates?.map(d => ({ date: d.date, label: d.label })) || [],
    },
    revalidate: 60,
  };
}