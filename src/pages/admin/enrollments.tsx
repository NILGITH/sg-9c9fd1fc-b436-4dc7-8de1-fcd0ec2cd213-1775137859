import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/router";
import { supabase } from "@/integrations/supabase/client";
import { Users, CheckCircle, XCircle, Clock, Filter } from "lucide-react";
import Link from "next/link";

interface Enrollment {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  formation_id: string;
  formation_title?: string;
  status: string;
  created_at: string;
  payment_status: string;
}

export default function AdminEnrollments() {
  const router = useRouter();
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [filteredEnrollments, setFilteredEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [paymentFilter, setPaymentFilter] = useState<string>("all");

  useEffect(() => {
    checkAuth();
    fetchEnrollments();
  }, []);

  useEffect(() => {
    filterEnrollments();
  }, [enrollments, statusFilter, paymentFilter]);

  async function checkAuth() {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.push("/admin/login");
    }
  }

  async function fetchEnrollments() {
    try {
      const { data, error } = await supabase
        .from("enrollments")
        .select(`
          *,
          formations (
            title
          )
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;

      const formattedData = (data || []).map(enrollment => ({
        ...enrollment,
        formation_title: enrollment.formations?.title || "Formation inconnue",
      }));

      setEnrollments(formattedData);
    } catch (error) {
      console.error("Erreur lors du chargement des inscriptions:", error);
    } finally {
      setLoading(false);
    }
  }

  function filterEnrollments() {
    let filtered = enrollments;

    if (statusFilter !== "all") {
      filtered = filtered.filter(e => e.status === statusFilter);
    }

    if (paymentFilter !== "all") {
      filtered = filtered.filter(e => e.payment_status === paymentFilter);
    }

    setFilteredEnrollments(filtered);
  }

  async function updateStatus(enrollmentId: string, newStatus: string) {
    try {
      const { error } = await supabase
        .from("enrollments")
        .update({ status: newStatus })
        .eq("id", enrollmentId);

      if (error) throw error;

      setEnrollments(prev => 
        prev.map(e => e.id === enrollmentId ? { ...e, status: newStatus } : e)
      );
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
      alert("Erreur lors de la mise à jour du statut");
    }
  }

  const stats = {
    total: enrollments.length,
    pending: enrollments.filter(e => e.status === "pending").length,
    approved: enrollments.filter(e => e.status === "approved").length,
    rejected: enrollments.filter(e => e.status === "rejected").length,
  };

  const getStatusBadge = (status: string) => {
    const variants: { [key: string]: "default" | "secondary" | "destructive" } = {
      pending: "secondary",
      approved: "default",
      rejected: "destructive",
    };
    const labels: { [key: string]: string } = {
      pending: "En attente",
      approved: "Approuvé",
      rejected: "Rejeté",
    };
    return <Badge variant={variants[status] || "default"}>{labels[status] || status}</Badge>;
  };

  const getPaymentBadge = (status: string) => {
    const variants: { [key: string]: "default" | "secondary" | "destructive" } = {
      pending: "secondary",
      completed: "default",
      failed: "destructive",
    };
    const labels: { [key: string]: string } = {
      pending: "En attente",
      completed: "Payé",
      failed: "Échoué",
    };
    return <Badge variant={variants[status] || "default"}>{labels[status] || status}</Badge>;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO title="Gestion des Inscriptions - Admin TCI Formation" />
      <Header />

      <main className="min-h-screen bg-muted/30 py-12">
        <div className="container-custom max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="font-heading font-bold text-3xl md:text-4xl mb-2">
                  Gestion des Inscriptions
                </h1>
                <p className="text-muted-foreground">
                  Gérez les demandes d'inscription des étudiants
                </p>
              </div>
              <Link href="/admin/dashboard">
                <Button variant="outline">Retour au tableau de bord</Button>
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Inscriptions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <Users className="w-8 h-8 text-primary" />
                  <span className="text-3xl font-bold">{stats.total}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  En Attente
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <Clock className="w-8 h-8 text-yellow-500" />
                  <span className="text-3xl font-bold">{stats.pending}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Approuvés
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                  <span className="text-3xl font-bold">{stats.approved}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Rejetés
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <XCircle className="w-8 h-8 text-red-500" />
                  <span className="text-3xl font-bold">{stats.rejected}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Filtres
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-[200px]">
                  <label className="text-sm font-medium mb-2 block">Statut</label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les statuts</SelectItem>
                      <SelectItem value="pending">En attente</SelectItem>
                      <SelectItem value="approved">Approuvé</SelectItem>
                      <SelectItem value="rejected">Rejeté</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex-1 min-w-[200px]">
                  <label className="text-sm font-medium mb-2 block">Paiement</label>
                  <Select value={paymentFilter} onValueChange={setPaymentFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les paiements</SelectItem>
                      <SelectItem value="pending">En attente</SelectItem>
                      <SelectItem value="completed">Payé</SelectItem>
                      <SelectItem value="failed">Échoué</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Table */}
          <Card>
            <CardHeader>
              <CardTitle>Liste des Inscriptions ({filteredEnrollments.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nom & Prénom</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Téléphone</TableHead>
                      <TableHead>Formation</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Paiement</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEnrollments.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                          Aucune inscription trouvée
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredEnrollments.map((enrollment) => (
                        <TableRow key={enrollment.id}>
                          <TableCell className="font-medium">
                            {enrollment.first_name} {enrollment.last_name}
                          </TableCell>
                          <TableCell>{enrollment.email}</TableCell>
                          <TableCell>{enrollment.phone}</TableCell>
                          <TableCell className="max-w-[200px] truncate">
                            {enrollment.formation_title}
                          </TableCell>
                          <TableCell>{getStatusBadge(enrollment.status)}</TableCell>
                          <TableCell>{getPaymentBadge(enrollment.payment_status)}</TableCell>
                          <TableCell>
                            {new Date(enrollment.created_at).toLocaleDateString("fr-FR")}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              {enrollment.status === "pending" && (
                                <>
                                  <Button
                                    size="sm"
                                    variant="default"
                                    onClick={() => updateStatus(enrollment.id, "approved")}
                                  >
                                    <CheckCircle className="w-4 h-4 mr-1" />
                                    Approuver
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => updateStatus(enrollment.id, "rejected")}
                                  >
                                    <XCircle className="w-4 h-4 mr-1" />
                                    Rejeter
                                  </Button>
                                </>
                              )}
                              {enrollment.status !== "pending" && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateStatus(enrollment.id, "pending")}
                                >
                                  Réinitialiser
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}