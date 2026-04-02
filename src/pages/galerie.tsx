import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Badge } from "@/components/ui/badge";
import { galleryService, type GalleryMedia } from "@/services/galleryService";
import { GetStaticProps } from "next";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { X } from "lucide-react";

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
      
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative py-20 bg-white border-b border-gray-100">
          <div className="container-custom text-center">
            <div className="max-w-3xl mx-auto space-y-6">
              <Badge className="bg-tci-blue/10 text-tci-blue hover:bg-tci-blue/20 border-0 px-4 py-2 font-semibold">
                GALERIE MÉDIA
              </Badge>
              <h1 className="font-bold text-4xl md:text-5xl text-gray-900">
                Galerie
              </h1>
              <p className="text-lg text-gray-600">
                Découvrez nos activités en images et vidéos
              </p>
            </div>
          </div>
        </section>

        {/* Gallery Content */}
        <section className="py-16">
          <div className="container-custom">
            <Tabs defaultValue="photos" className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto mb-12 grid-cols-2 h-auto bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
                <TabsTrigger 
                  value="photos" 
                  className="py-4 rounded-xl data-[state=active]:bg-tci-blue data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-300 font-semibold"
                >
                  Photos ({photos.length})
                </TabsTrigger>
                <TabsTrigger 
                  value="videos"
                  className="py-4 rounded-xl data-[state=active]:bg-tci-blue data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-300 font-semibold"
                >
                  Vidéos ({videos.length})
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="photos">
                {photos.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {photos.map((photo) => (
                      <div
                        key={photo.id}
                        className="group relative aspect-[4/3] overflow-hidden rounded-2xl cursor-pointer hover:shadow-xl transition-all duration-300 bg-white border border-gray-100"
                        onClick={() => setSelectedMedia(photo)}
                      >
                        <Image
                          src={photo.media_url}
                          alt={photo.title || "Gallery photo"}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {photo.title && (
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                            <h3 className="text-white font-semibold text-lg">{photo.title}</h3>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
                    <p className="text-gray-600 text-lg">
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
                        <div className="aspect-video rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm">
                          <iframe
                            src={video.media_url}
                            title={video.title || "Video"}
                            className="w-full h-full"
                            allowFullScreen
                          />
                        </div>
                        {video.title && (
                          <h3 className="font-semibold text-xl text-gray-900">{video.title}</h3>
                        )}
                        {video.description && (
                          <p className="text-gray-600 leading-relaxed">{video.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
                    <p className="text-gray-600 text-lg">
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
      {selectedMedia && selectedMedia.media_type === "photo" && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setSelectedMedia(null)}
        >
          <button
            onClick={() => setSelectedMedia(null)}
            className="absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
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