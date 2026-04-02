import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { galleryService, type GalleryMedia } from "@/services/galleryService";
import { GetStaticProps } from "next";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface GalerieProps {
  photos: GalleryMedia[];
  videos: GalleryMedia[];
}

export default function Galerie({ photos, videos }: GalerieProps) {
  const [selectedMedia, setSelectedMedia] = useState<GalleryMedia | null>(null);

  return (
    <>
      <SEO 
        title="Galerie - TCI Formation"
        description="Découvrez nos photos et vidéos des formations, événements et activités du centre TCI Formation."
      />
      
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="gradient-hero text-white py-20">
          <div className="container-custom text-center">
            <h1 className="font-heading font-bold text-4xl md:text-5xl mb-6">
              Galerie
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              Découvrez nos activités en images et vidéos
            </p>
          </div>
        </section>

        {/* Gallery Content */}
        <section className="py-20">
          <div className="container-custom">
            <Tabs defaultValue="photos" className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto mb-12 grid-cols-2">
                <TabsTrigger value="photos">Photos ({photos.length})</TabsTrigger>
                <TabsTrigger value="videos">Vidéos ({videos.length})</TabsTrigger>
              </TabsList>
              
              <TabsContent value="photos">
                {photos.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {photos.map((photo) => (
                      <div
                        key={photo.id}
                        className="group relative aspect-[4/3] overflow-hidden rounded-2xl cursor-pointer hover:shadow-xl transition-all duration-300"
                        onClick={() => setSelectedMedia(photo)}
                      >
                        <Image
                          src={photo.media_url}
                          alt={photo.title || "Gallery photo"}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        {photo.title && (
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                            <h3 className="text-white font-semibold">{photo.title}</h3>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20">
                    <p className="text-muted-foreground text-lg">
                      Aucune photo disponible pour le moment.
                    </p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="videos">
                {videos.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {videos.map((video) => (
                      <div key={video.id} className="space-y-4">
                        <div className="aspect-video rounded-2xl overflow-hidden bg-muted">
                          <iframe
                            src={video.media_url}
                            title={video.title || "Video"}
                            className="w-full h-full"
                            allowFullScreen
                          />
                        </div>
                        {video.title && (
                          <h3 className="font-heading font-semibold text-xl">{video.title}</h3>
                        )}
                        {video.description && (
                          <p className="text-muted-foreground">{video.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20">
                    <p className="text-muted-foreground text-lg">
                      Aucune vidéo disponible pour le moment.
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>

      <Footer />

      {/* Lightbox Modal */}
      {selectedMedia && selectedMedia.type === "photo" && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedMedia(null)}
        >
          <div className="relative max-w-6xl w-full aspect-[4/3]">
            <Image
              src={selectedMedia.media_url}
              alt={selectedMedia.title || "Gallery photo"}
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { data: allPhotos } = await galleryService.getAll("photo");
  const { data: allVideos } = await galleryService.getAll("video");

  return {
    props: {
      photos: allPhotos || [],
      videos: allVideos || [],
    },
    revalidate: 60,
  };
};