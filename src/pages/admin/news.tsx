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
import { supabase } from "@/integrations/supabase/client";
import { newsService, type News } from "@/services/newsService";
import { ArrowLeft, Plus, Pencil, Trash2, Calendar, Loader2, Newspaper } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ImageUploader } from "@/components/ImageUploader";
import { Switch } from "@/components/ui/switch";

export default function AdminNews() {
  const router = useRouter();
  const { toast } = useToast();
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<News | null>(null);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    published: true,
  });

  useEffect(() => {
    checkAuth();
    loadNews();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.push("/admin/login");
    }
  };

  const loadNews = async () => {
    setLoading(true);
    const { data } = await newsService.getAll();
    if (data) setNews(data);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingNews) {
        await newsService.update(editingNews.id, formData, imageUrls);
        toast({
          title: "Succès",
          description: "Actualité modifiée avec succès",
        });
      } else {
        await newsService.create({
          ...formData,
          author: "Admin",
          image_url: imageUrls[0] || null,
        }, imageUrls);
        toast({
          title: "Succès",
          description: "Actualité créée avec succès",
        });
      }
      
      setIsDialogOpen(false);
      resetForm();
      loadNews();
    } catch (error) {
      console.error("Error saving news:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (item: News) => {
    setEditingNews(item);
    setFormData({
      title: item.title,
      slug: item.slug,
      excerpt: item.excerpt,
      content: item.content || "",
      published: item.published,
    });
    // Load existing images if available
    if (item.image_url) {
      setImageUrls([item.image_url]);
    }
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette actualité ?")) return;
    
    await newsService.delete(id);
    loadNews();
  };

  const resetForm = () => {
    setEditingNews(null);
    setImageUrls([]);
    setFormData({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      published: true,
    });
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
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
        title="Gérer les Actualités - Admin TCI Formation"
        description="Interface d'administration des actualités"
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
                <h1 className="font-heading font-bold text-2xl">Actualités</h1>
              </div>
              
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={resetForm}>
                    <Plus className="w-4 h-4 mr-2" />
                    Nouvelle actualité
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>
                      {editingNews ? "Modifier l'actualité" : "Nouvelle actualité"}
                    </DialogTitle>
                    <DialogDescription>
                      Remplissez les informations de l'actualité
                    </DialogDescription>
                  </DialogHeader>
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Titre *</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            title: e.target.value,
                            slug: generateSlug(e.target.value),
                          });
                        }}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="slug">Slug (URL) *</Label>
                      <Input
                        id="slug"
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="excerpt">Résumé *</Label>
                      <Textarea
                        id="excerpt"
                        value={formData.excerpt}
                        onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                        rows={3}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="content">Contenu</Label>
                      <Textarea
                        id="content"
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        rows={6}
                      />
                    </div>

                    <div className="flex items-center justify-between space-x-2 p-4 border rounded-lg">
                      <div className="space-y-0.5">
                        <Label htmlFor="published">Publier l'actualité</Label>
                        <p className="text-sm text-muted-foreground">
                          Les actualités publiées seront visibles sur le site
                        </p>
                      </div>
                      <Switch
                        id="published"
                        checked={formData.published}
                        onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Images de l'article</Label>
                      <ImageUploader
                        multiple
                        maxFiles={5}
                        onMultipleUpload={(urls) => setImageUrls(urls)}
                        currentImage={imageUrls[0]}
                        onUpload={(url) => setImageUrls([url])}
                      />
                    </div>

                    <DialogFooter>
                      <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                        Annuler
                      </Button>
                      <Button type="submit">
                        {editingNews ? "Mettre à jour" : "Créer"}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </header>

        <main className="container-custom py-8">
          {news.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Newspaper className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-heading font-bold mb-2">Aucune actualité</h3>
                <p className="text-muted-foreground mb-6">
                  Commencez par créer votre première actualité
                </p>
                <Button onClick={() => setIsDialogOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Créer une actualité
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {news.map((item) => (
                <Card key={item.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-heading font-bold text-xl">{item.title}</h3>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            item.published 
                              ? "bg-green-100 text-green-800" 
                              : "bg-gray-100 text-gray-800"
                          }`}>
                            {item.published ? "Publié" : "Brouillon"}
                          </span>
                        </div>
                        <p className="text-muted-foreground line-clamp-2 mb-3">
                          {item.excerpt}
                        </p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          <time>
                            {new Date(item.created_at || "").toLocaleDateString("fr-FR")}
                          </time>
                        </div>
                      </div>
                    </div>
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
        </main>
      </div>
    </>
  );
}