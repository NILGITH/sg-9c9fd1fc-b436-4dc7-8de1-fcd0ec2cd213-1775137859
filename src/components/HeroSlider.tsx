import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=1920&auto=format&fit=crop&q=80",
    title: "Formez-vous aux Métiers de Demain",
    subtitle: "Des formations professionnelles certifiées par l'État béninois",
    cta: "Découvrir Nos Formations",
    ctaLink: "/formations",
  },
  {
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1920&auto=format&fit=crop&q=80",
    title: "Excellence et Innovation",
    subtitle: "10 ans d'expérience, 5 sites de formation au Bénin",
    cta: "En Savoir Plus",
    ctaLink: "/apropos",
  },
  {
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&auto=format&fit=crop&q=80",
    title: "Accompagnement Personnalisé",
    subtitle: "Des formateurs experts pour votre réussite professionnelle",
    cta: "Nous Contacter",
    ctaLink: "/contact",
  },
  {
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1920&auto=format&fit=crop&q=80",
    title: "Diplômes Reconnus",
    subtitle: "Certifications CQM/CQP délivrées par l'État",
    cta: "Voir les Parcours",
    ctaLink: "/formations",
  },
  {
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&auto=format&fit=crop&q=80",
    title: "95% de Taux d'Insertion",
    subtitle: "Plus de 2000 diplômés intégrés avec succès dans le monde du travail",
    cta: "S'inscrire Maintenant",
    ctaLink: "/admissions",
  },
];

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  return (
    <section className="relative h-[600px] md:h-[700px] overflow-hidden bg-gray-900">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            index === currentSlide 
              ? "opacity-100 scale-100" 
              : "opacity-0 scale-105"
          }`}
        >
          {/* Image Background */}
          <div className="absolute inset-0">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
          </div>

          {/* Content */}
          <div className="absolute inset-0 z-20 flex items-center">
            <div className="container-custom">
              <div className="max-w-3xl text-white space-y-6 animate-fade-in">
                <h1 className="font-heading font-bold text-4xl md:text-6xl lg:text-7xl leading-tight">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
                  {slide.subtitle}
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <Button
                    size="lg"
                    className="bg-tci-blue hover:bg-tci-blue/90 text-white text-lg px-8 shadow-2xl"
                    asChild
                  >
                    <Link href={slide.ctaLink}>{slide.cta}</Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white/10 text-lg px-8 backdrop-blur-sm"
                    asChild
                  >
                    <Link href="/admissions">S'inscrire</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <Button
        variant="secondary"
        size="icon"
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 backdrop-blur-sm border-white/40 w-12 h-12"
        onClick={prevSlide}
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </Button>
      <Button
        variant="secondary"
        size="icon"
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 backdrop-blur-sm border-white/40 w-12 h-12"
        onClick={nextSlide}
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </Button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide 
                ? "w-10 h-3 bg-white" 
                : "w-3 h-3 bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Aller à la slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Auto-play toggle */}
      <button
        onClick={() => setIsAutoPlaying(!isAutoPlaying)}
        className="absolute bottom-8 right-8 z-30 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all"
        aria-label={isAutoPlaying ? "Pause" : "Play"}
      >
        {isAutoPlaying ? (
          <div className="w-4 h-4 flex gap-1">
            <div className="w-1.5 h-full bg-white rounded-full"></div>
            <div className="w-1.5 h-full bg-white rounded-full"></div>
          </div>
        ) : (
          <Play className="w-4 h-4 text-white" />
        )}
      </button>
    </section>
  );
}