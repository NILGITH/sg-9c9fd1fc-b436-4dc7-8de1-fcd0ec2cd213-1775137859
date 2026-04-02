import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=1200&auto=format&fit=crop",
    title: "Formez-vous aux métiers de demain",
    subtitle: "Des formations professionnelles certifiées par l'État",
  },
  {
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1200&auto=format&fit=crop",
    title: "Excellence et Innovation",
    subtitle: "10 ans d'expérience, 5 sites de formation au Bénin et en Côte d'Ivoire",
  },
  {
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&auto=format&fit=crop",
    title: "Accompagnement Personnalisé",
    subtitle: "Des formateurs experts pour votre réussite professionnelle",
  },
  {
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&auto=format&fit=crop",
    title: "Diplômes Reconnus",
    subtitle: "Certifications CQM/CQP délivrées par l'État béninois",
  },
  {
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&auto=format&fit=crop",
    title: "Insertion Professionnelle Garantie",
    subtitle: "Plus de 1000 diplômés intégrés avec succès dans le monde du travail",
  },
];

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative h-[600px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 z-10" />
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 z-20 flex items-center">
            <div className="container-custom">
              <div className="max-w-3xl text-white space-y-6">
                <h1 className="font-heading font-bold text-5xl md:text-7xl leading-tight">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl text-white/90">
                  {slide.subtitle}
                </p>
                <Button
                  size="lg"
                  className="bg-secondary hover:bg-secondary/90 text-white text-lg px-8 mt-4"
                  onClick={() => window.location.href = "/admissions"}
                >
                  S'inscrire maintenant
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <Button
        variant="secondary"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 backdrop-blur-sm"
        onClick={prevSlide}
      >
        <ChevronLeft className="w-6 h-6" />
      </Button>
      <Button
        variant="secondary"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 backdrop-blur-sm"
        onClick={nextSlide}
      >
        <ChevronRight className="w-6 h-6" />
      </Button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}