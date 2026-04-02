import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070",
    title: "Excellence en Formation Professionnelle",
    subtitle: "Bâtissons ensemble votre avenir professionnel",
  },
  {
    image: "https://images.unsplash.com/photo-1573167243872-43c6433b9d40?q=80&w=2069",
    title: "Formations Diplômantes Certifiées",
    subtitle: "Des programmes reconnus par l'État béninois",
  },
  {
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070",
    title: "Apprentissage Pratique & Moderne",
    subtitle: "Équipements de pointe et formateurs qualifiés",
  },
  {
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071",
    title: "Plus de 25 Filières de Formation",
    subtitle: "Trouvez la formation qui vous correspond",
  },
  {
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070",
    title: "Insertion Professionnelle Garantie",
    subtitle: "Un accompagnement jusqu'à votre premier emploi",
  },
];

export function HeroSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="relative overflow-hidden">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide, index) => (
            <div key={index} className="flex-[0_0_100%] min-w-0 relative">
              <div className="relative h-[600px] lg:h-[700px]">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${slide.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
                
                <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
                  <div className="max-w-3xl">
                    <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight">
                      {slide.title}
                    </h1>
                    <p className="text-xl md:text-2xl text-white/90 mb-8">
                      {slide.subtitle}
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8">
                        Nos Formations
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        className="bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur-sm px-8"
                      >
                        Nous Contacter
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm h-12 w-12 rounded-full"
        onClick={scrollPrev}
      >
        <ChevronLeft className="w-6 h-6" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm h-12 w-12 rounded-full"
        onClick={scrollNext}
      >
        <ChevronRight className="w-6 h-6" />
      </Button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`h-2 rounded-full transition-all ${
              index === selectedIndex
                ? "w-12 bg-primary"
                : "w-2 bg-white/40 hover:bg-white/60"
            }`}
            onClick={() => emblaApi?.scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
}