import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/integrations/supabase/client";
import { intakeDateService, type IntakeDate } from "@/services/intakeDateService";
import { ArrowLeft, Plus, Pencil, Trash2, Calendar, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { SEO } from "@/components/SEO";

export default function AdminIntakeDates() {
  const router = useRouter();
  const { toast } = useToast();
  const [intakeDates, setIntakeDates] = useState<IntakeDate[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingDate, setEditingDate] = useState<IntakeDate | null>(null);
  const [formData, setFormData] = useState({
    date: "",
    label: "",
    is_active: true,
  });

  useEffect(() => {
    checkAuth();
    loadDates();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.push("/admin/login");
    }
  };

  const loadDates = async () => {
    setLoading(true);
    const { data } = await intakeDateService.getAll();
    setIntakeDates(data || []);
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingDate) {
        await intakeDateService.update(editingDate.id, formData);
        toast({
          title: "Succès",
          description: "Date de rentrée modifiée avec succès",
        });
      } else {
        await intakeDateService.create(formData as any);
        toast({
          title: "Succès",
          description: "Date de rentrée créée avec succès",
        });
      }
      
      setIsDialogOpen(false);
      resetForm();
      loadDates();
    } catch (error) {
      console.error("Error saving date:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (intakeDate: IntakeDate) => {
    setEditingDate(intakeDate);
    setFormData({
      date: intakeDate.date,
      label: intakeDate.label,
      is_active: intakeDate.is_active,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette date ?")) return;
    
    try {
      await intakeDateService.delete(id);
      toast({
        title: "Succès",
        description: "Date de rentrée supprimée",
      });
      loadDates();
    } catch (error) {
      console.error("Error deleting date:", error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer cette date",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setEditingDate(null);
    setFormData({
      date: "",
      label: "",
      is_active: true,
    });
  };

  return (
    <>
      <SEO title="Gestion des Dates de Rentrées - Admin TCI" />
      
      <div className="min-h-screen bg-muted/30">
        {/* Header */}
        <header className="bg-gradient-hero text-white py-6 sticky top-0 z-10 shadow-lg">
          <div className="container-custom flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin/dashboard">
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-heading font-bold">Dates de Rentrées</h1>
                <p className="text-white/80 text-sm">Gérez les dates d'inscription</p>
              </div>
            </div>
            <Button variant="ghost" onClick={handleLogout} className="text-white hover:bg-white/20">
              Se déconnecter
            </Button>
          </div>
        </header>

        {/* Content */}
        <div className="container-custom py-8">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Dates de Rentrées
                  </CardTitle>
                  <CardDescription>
                    {intakeDates.length} date(s) enregistrée(s)
                  </CardDescription>
                </div>
                <Button onClick={() => {
                  resetForm();
                  setIsDialogOpen(true);
                }}>
                  <Plus className="w-4 h-4 mr-2" />
                  Nouvelle date
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              ) : intakeDates.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  Aucune date de rentrée enregistrée
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Libellé</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {intakeDates.map((intakeDate) => (
                      <TableRow key={intakeDate.id}>
                        <TableCell className="font-medium">
                          {new Date(intakeDate.date).toLocaleDateString("fr-FR", {
                            year: "numeric",
                            month: "long",
                            day: "numeric"
                          })}
                        </TableCell>
                        <TableCell>{intakeDate.label}</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            intakeDate.is_active 
                              ? "bg-green-100 text-green-800" 
                              : "bg-gray-100 text-gray-800"
                          }`}>
                            {intakeDate.is_active ? "Active" : "Inactive"}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEdit(intakeDate)}
                            >
                              <Pencil className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDelete(intakeDate.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingDate ? "Modifier" : "Nouvelle"} date de rentrée
              </DialogTitle>
              <DialogDescription>
                Remplissez les informations de la date
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date *</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="label">Libellé *</Label>
                <Input
                  id="label"
                  value={formData.label}
                  onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                  placeholder="Ex: 10 Septembre 2025"
                  required
                />
              </div>

              <div className="flex items-center justify-between space-x-2 p-4 border rounded-lg">
                <div className="space-y-0.5">
                  <Label htmlFor="is_active">Date active</Label>
                  <p className="text-sm text-muted-foreground">
                    Les dates actives sont affichées sur le site
                  </p>
                </div>
                <Switch
                  id="is_active"
                  checked={formData.is_active}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                />
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Annuler
                </Button>
                <Button type="submit">
                  {editingDate ? "Mettre à jour" : "Créer"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}