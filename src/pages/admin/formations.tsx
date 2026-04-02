import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { formationService, type Formation } from "@/services/formationService";
import { LogOut, Plus, Edit, Trash2, Save, X, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ImageUploader } from "@/components/ImageUploader";

export default function AdminFormations() {
  const router = useRouter();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [formations, setFormations] = useState<Formation[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingFormation, setEditingFormation] = useState<Formation | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requirements: "",
    duration: "",
    category_id: "",
    icon_color: "#10b981",
    image_url: "",
    pole: "",
  });

  useEffect(() => {
    checkUser();
    loadFormations();
    loadCategories();
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      router.push("/admin/login");
      return;
    }
    
    setUser(session.user);
    setLoading(false);
  };

  const loadFormations = async () => {
    const { data } = await formationService.getAll();
    setFormations(data || []);
  };

  const loadCategories = async () => {
    const { data } = await supabase.from("formation_categories").select("*");
    setCategories(data || []);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingFormation) {
        await formationService.update(editingFormation.id, formData);
        toast({
          title: "Succès",
          description: "Formation modifiée avec succès",
        });
      } else {
        await formationService.create({
          ...formData,
          slug: formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
        } as any);
        toast({
          title: "Succès",
          description: "Formation créée avec succès",
        });
      }
      
      setIsDialogOpen(false);
      resetForm();
      loadFormations();
    } catch (error) {
      console.error("Error saving formation:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (formation: Formation) => {
    setEditingFormation(formation);
    setFormData({
      title: formation.title,
      description: formation.description,
      requirements: formation.requirements,
      duration: formation.duration || "",
      category_id: formation.category_id || "",
      icon_color: formation.icon_color || "#10b981",
      image_url: formation.image_url || "",
      pole: (formation as any).pole || "",
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette formation ?")) return;

    const { error } = await formationService.delete(id);
    if (error) {
      toast({
        title: "Erreur",
        description: "Échec de la suppression",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Succès",
      description: "Formation supprimée avec succès",
    });
    loadFormations();
  };

  const resetForm = () => {
    setEditingFormation(null);
    setFormData({
      title: "",
      description: "",
      requirements: "",
      duration: "",
      category_id: "",
      icon_color: "#10b981",
      image_url: "",
      pole: "",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title="Gestion des Formations - Admin TCI"
        description="Interface d'administration des formations"
      />

      <div className="min-h-screen bg-muted">
        {/* Header */}
        <header className="bg-background border-b border-border">
          <div className="container-custom py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-hero rounded-lg flex items-center justify-center">
                <span className="text-white font-heading font-bold text-xl">TCI</span>
              </div>
              <div>
                <h1 className="font-heading font-bold text-xl">Gestion des Formations</h1>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/admin/dashboard">
                <Button variant="outline" size="sm">
                  Retour au dashboard
                </Button>
              </Link>
              <Button variant="destructive" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Déconnexion
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container-custom py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-heading font-bold mb-2">Formations</h2>
              <p className="text-muted-foreground">Gérez les formations de votre centre</p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={resetForm}>
                  <Plus className="w-4 h-4 mr-2" />
                  Nouvelle formation
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingFormation ? "Modifier la formation" : "Nouvelle formation"}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Titre *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      required
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="requirements">Prérequis *</Label>
                    <Input
                      id="requirements"
                      value={formData.requirements}
                      onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                      required
                      placeholder="Ex: CEP, BEPC, BAC..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="duration">Durée</Label>
                    <Input
                      id="duration"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      placeholder="Ex: 6 mois, 1 an..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Catégorie *</Label>
                    <Select value={formData.category_id} onValueChange={(value) => setFormData({ ...formData, category_id: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner une catégorie" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.id}>
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pole">Pôle de formation</Label>
                    <Select value={formData.pole} onValueChange={(value) => setFormData({ ...formData, pole: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Aucun pôle (ou s'applique à tous)" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">Aucun pôle</SelectItem>
                        <SelectItem value="digital">Digital & Software</SelectItem>
                        <SelectItem value="energie">Énergie & Industrie</SelectItem>
                        <SelectItem value="business">Business & Lifestyle</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="icon_color">Couleur de l'icône</Label>
                    <Input
                      id="icon_color"
                      type="color"
                      value={formData.icon_color}
                      onChange={(e) => setFormData({ ...formData, icon_color: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Image de couverture</Label>
                    <ImageUploader
                      onUpload={(url) => setFormData({ ...formData, image_url: url })}
                      currentImage={formData.image_url}
                    />
                  </div>

                  <div className="flex gap-4">
                    <Button type="submit" className="flex-1">
                      <Save className="w-4 h-4 mr-2" />
                      {editingFormation ? "Modifier" : "Créer"}
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                      <X className="w-4 h-4 mr-2" />
                      Annuler
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Formations List */}
          <div className="grid grid-cols-1 gap-6">
            {formations.map((formation) => (
              <Card key={formation.id}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    {formation.image_url ? (
                      <img
                        src={formation.image_url}
                        alt={formation.title}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                    ) : (
                      <div
                        className="w-24 h-24 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${formation.icon_color}20` }}
                      >
                        <ImageIcon className="w-12 h-12" style={{ color: formation.icon_color }} />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="font-heading font-bold text-xl mb-2">{formation.title}</h3>
                      <p className="text-muted-foreground mb-2 line-clamp-2">{formation.description}</p>
                      <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                        <span className="bg-muted px-2 py-1 rounded">
                          Prérequis: {formation.requirements}
                        </span>
                        {formation.duration && (
                          <span className="bg-muted px-2 py-1 rounded">
                            Durée: {formation.duration}
                          </span>
                        )}
                        <span className="bg-muted px-2 py-1 rounded">
                          Catégorie: {categories.find(c => c.id === formation.category_id)?.name || "N/A"}
                        </span>
                        {(formation as any).pole && (formation as any).pole !== 'none' && (
                          <span className="bg-primary/10 text-primary px-2 py-1 rounded">
                            Pôle: {(formation as any).pole === 'digital' ? 'Digital' : (formation as any).pole === 'energie' ? 'Énergie' : 'Business'}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(formation)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDelete(formation.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {formations.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-muted-foreground">Aucune formation pour le moment</p>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </>
  );
}