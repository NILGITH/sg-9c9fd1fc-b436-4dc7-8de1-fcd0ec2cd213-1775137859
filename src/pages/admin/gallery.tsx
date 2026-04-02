import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { galleryService, type GalleryMedia } from "@/services/galleryService";
import { ArrowLeft, Plus, Pencil, Trash2, Image as ImageIcon, Video, Loader2 } from "lucide-react";

export default function AdminGallery() {
  const router = useRouter();
  const [photos, setPhotos] = useState<GalleryMedia[]>([]);
  const [videos, setVideos] = useState<GalleryMedia[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [mediaType, setMediaType] = useState<"photo" | "video">("photo");
  const [editingMedia, setEditingMedia] = useState<GalleryMedia | null>(null);
  const [formData, setFormData] = useState({
    type: "photo" as "photo" | "video",
    url: "",
    title: "",
    description: "",
  });

  useEffect(() => {
    checkAuth();
    loadGallery();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.push("/admin/login");
    }
  };

  const loadGallery = async () => {
    setLoading(true);
    const { data: allPhotos } = await galleryService.getAll("photo");
    const { data: allVideos } = await galleryService.getAll("video");
    if (allPhotos) setPhotos(allPhotos);
    if (allVideos) setVideos(allVideos);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingMedia) {
        await galleryService.update(editingMedia.id, formData);
      } else {
        await galleryService.create(formData);
      }
      
      setIsDialogOpen(false);
      resetForm();
      loadGallery();
    } catch (error) {
      console.error("Error saving media:", error);
    }
  };

  const handleEdit = (item: GalleryMedia) => {
    setEditingMedia(item);
    setFormData({
      type: item.type,
      url: item.url,
      title: item.title || "",
      description: item.description || "",
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce média ?")) return;
    
    await galleryService.delete(id);
    loadGallery();
  };

  const resetForm = () => {
    setEditingMedia(null);
    setFormData({
      type: mediaType,
      url: "",
      title: "",
      description: "",
    });
  };

  const openDialog = (type: "photo" | "video") => {
    setMediaType(type);
    setFormData({ ...formData, type });
    setIsDialogOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <SEO 
        title="Gérer la Galerie - Admin TCI Formation"
        description="Interface d'administration de la galerie"
      />

      <div className="min-h-screen bg-muted">
        <header className="bg-background border-b border-border">
          <div className="container-custom py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link href="/admin/dashboard">
                  <Button variant="ghost" size="sm">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Retour
                  </Button>
                </Link>
                <h1 className="font-heading font-bold text-2xl">Galerie</h1>
              </div>
            </div>
          </div>
        </header>

        <main className="container-custom py-8">
          <Tabs defaultValue="photos">
            <TabsList className="mb-6">
              <TabsTrigger value="photos">Photos ({photos.length})</TabsTrigger>
              <TabsTrigger value="videos">Vidéos ({videos.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="photos">
              <div className="mb-6">
                <Button onClick={() => openDialog("photo")}>
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter une photo
                </Button>
              </div>

              {photos.length === 0 ? (
                <Card>
                  <CardContent className="p-12 text-center">
                    <ImageIcon className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-xl font-heading font-bold mb-2">Aucune photo</h3>
                    <p className="text-muted-foreground mb-6">
                      Commencez par ajouter votre première photo
                    </p>
                    <Button onClick={() => openDialog("photo")}>
                      <Plus className="w-4 h-4 mr-2" />
                      Ajouter une photo
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {photos.map((item) => (
                    <Card key={item.id} className="overflow-hidden">
                      <div className="relative h-64 w-full">
                        <Image
                          src={item.url}
                          alt={item.title || "Photo"}
                          fill
                          className="object-cover"
                        />
                      </div>
                      {item.title && (
                        <CardHeader>
                          <CardTitle className="line-clamp-2">{item.title}</CardTitle>
                        </CardHeader>
                      )}
                      <CardFooter className="gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={() => handleEdit(item)}
                        >
                          <Pencil className="w-4 h-4 mr-2" />
                          Modifier
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(item.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="videos">
              <div className="mb-6">
                <Button onClick={() => openDialog("video")}>
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter une vidéo
                </Button>
              </div>

              {videos.length === 0 ? (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Video className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-xl font-heading font-bold mb-2">Aucune vidéo</h3>
                    <p className="text-muted-foreground mb-6">
                      Commencez par ajouter votre première vidéo
                    </p>
                    <Button onClick={() => openDialog("video")}>
                      <Plus className="w-4 h-4 mr-2" />
                      Ajouter une vidéo
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {videos.map((item) => (
                    <Card key={item.id}>
                      <CardContent className="p-6">
                        <div className="aspect-video mb-4">
                          <iframe
                            src={item.url}
                            className="w-full h-full rounded-lg"
                            allowFullScreen
                          />
                        </div>
                        {item.title && (
                          <h3 className="font-heading font-bold mb-2">{item.title}</h3>
                        )}
                        {item.description && (
                          <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
                        )}
                      </CardContent>
                      <CardFooter className="gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={() => handleEdit(item)}
                        >
                          <Pencil className="w-4 h-4 mr-2" />
                          Modifier
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(item.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </main>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingMedia ? `Modifier ${formData.type === "photo" ? "la photo" : "la vidéo"}` : `Ajouter ${formData.type === "photo" ? "une photo" : "une vidéo"}`}
              </DialogTitle>
              <DialogDescription>
                {formData.type === "photo" 
                  ? "Ajoutez une URL d'image depuis Unsplash ou un autre service"
                  : "Collez l'URL d'intégration YouTube (format embed)"}
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="url">URL *</Label>
                <Input
                  id="url"
                  type="url"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  placeholder={formData.type === "photo" ? "https://images.unsplash.com/..." : "https://www.youtube.com/embed/..."}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Titre</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Annuler
                </Button>
                <Button type="submit">
                  {editingMedia ? "Mettre à jour" : "Ajouter"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}