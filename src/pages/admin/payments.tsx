import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, CheckCircle, XCircle, Eye, DollarSign } from "lucide-react";
import Link from "next/link";
import { paymentService, type Payment } from "@/services/paymentService";

type PaymentWithEnrollment = Payment & {
  enrollments: {
    id: string;
    full_name: string;
    email: string;
    phone: string;
    formations: {
      title: string;
    };
  };
};

export default function PaymentsAdmin() {
  const router = useRouter();
  const { toast } = useToast();
  const [payments, setPayments] = useState<PaymentWithEnrollment[]>([]);
  const [filteredPayments, setFilteredPayments] = useState<PaymentWithEnrollment[]>([]);
  const [selectedPayment, setSelectedPayment] = useState<PaymentWithEnrollment | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isRejectOpen, setIsRejectOpen] = useState(false);
  const [rejectNotes, setRejectNotes] = useState("");
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>("all");

  useEffect(() => {
    checkAuth();
    loadPayments();
  }, []);

  useEffect(() => {
    filterPaymentsByStatus();
  }, [filterStatus, payments]);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.push("/admin/login");
      return;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", session.user.id)
      .single();

    if (profile?.role !== "admin") {
      router.push("/");
    }
  };

  const loadPayments = async () => {
    setLoading(true);
    const { data, error } = await paymentService.getAll();

    if (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les paiements.",
        variant: "destructive",
      });
    } else {
      setPayments(data as PaymentWithEnrollment[]);
    }
    setLoading(false);
  };

  const filterPaymentsByStatus = () => {
    if (filterStatus === "all") {
      setFilteredPayments(payments);
    } else {
      setFilteredPayments(payments.filter((p) => p.payment_status === filterStatus));
    }
  };

  const handleValidatePayment = async (paymentId: string) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    const { error } = await paymentService.validatePayment(paymentId, session.user.id);

    if (error) {
      toast({
        title: "Erreur",
        description: "Impossible de valider le paiement.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Succès",
        description: "Paiement validé avec succès.",
      });
      loadPayments();
      setIsDetailOpen(false);
    }
  };

  const handleRejectPayment = async () => {
    if (!selectedPayment) return;

    const { error } = await paymentService.rejectPayment(selectedPayment.id, rejectNotes);

    if (error) {
      toast({
        title: "Erreur",
        description: "Impossible de rejeter le paiement.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Succès",
        description: "Paiement rejeté.",
      });
      loadPayments();
      setIsRejectOpen(false);
      setIsDetailOpen(false);
      setRejectNotes("");
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "validated":
        return <Badge className="bg-green-500">Validé</Badge>;
      case "rejected":
        return <Badge variant="destructive">Rejeté</Badge>;
      case "pending":
        return <Badge variant="secondary">En attente</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "XOF",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      <div className="min-h-screen bg-muted/30">
        <header className="bg-white border-b sticky top-0 z-10">
          <div className="container-custom py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link href="/admin/dashboard">
                  <Button variant="ghost" size="sm">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Retour
                  </Button>
                </Link>
                <h1 className="font-heading font-bold text-2xl">Gestion des Paiements</h1>
              </div>
            </div>
          </div>
        </header>

        <main className="container-custom py-8">
          {/* Filters */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Filtres</CardTitle>
              <CardDescription>Filtrer les paiements par statut</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label>Statut du paiement</Label>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="Tous les statuts" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les statuts</SelectItem>
                      <SelectItem value="pending">En attente</SelectItem>
                      <SelectItem value="validated">Validés</SelectItem>
                      <SelectItem value="rejected">Rejetés</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total</p>
                    <p className="text-2xl font-bold">{payments.length}</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">En attente</p>
                    <p className="text-2xl font-bold">
                      {payments.filter((p) => p.payment_status === "pending").length}
                    </p>
                  </div>
                  <DollarSign className="w-8 h-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Validés</p>
                    <p className="text-2xl font-bold">
                      {payments.filter((p) => p.payment_status === "validated").length}
                    </p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Rejetés</p>
                    <p className="text-2xl font-bold">
                      {payments.filter((p) => p.payment_status === "rejected").length}
                    </p>
                  </div>
                  <XCircle className="w-8 h-8 text-red-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payments Table */}
          <Card>
            <CardHeader>
              <CardTitle>Liste des Paiements ({filteredPayments.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8">Chargement...</div>
              ) : filteredPayments.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  Aucun paiement trouvé.
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Étudiant</TableHead>
                      <TableHead>Formation</TableHead>
                      <TableHead>Montant</TableHead>
                      <TableHead>Méthode</TableHead>
                      <TableHead>Référence</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPayments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{payment.enrollments.full_name}</p>
                            <p className="text-sm text-muted-foreground">
                              {payment.enrollments.email}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>{payment.enrollments.formations.title}</TableCell>
                        <TableCell className="font-bold">
                          {formatCurrency(Number(payment.amount))}
                        </TableCell>
                        <TableCell className="capitalize">
                          {payment.payment_method?.replace("_", " ") || "N/A"}
                        </TableCell>
                        <TableCell className="font-mono text-sm">
                          {payment.payment_reference || "N/A"}
                        </TableCell>
                        <TableCell>{getStatusBadge(payment.payment_status || "pending")}</TableCell>
                        <TableCell className="text-sm">
                          {payment.payment_date
                            ? formatDate(payment.payment_date)
                            : formatDate(payment.created_at || "")}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedPayment(payment);
                              setIsDetailOpen(true);
                            }}
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            Détails
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </main>
      </div>

      {/* Payment Details Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Détails du Paiement</DialogTitle>
          </DialogHeader>
          {selectedPayment && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Étudiant</Label>
                  <p className="font-medium">{selectedPayment.enrollments.full_name}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Email</Label>
                  <p className="font-medium">{selectedPayment.enrollments.email}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Téléphone</Label>
                  <p className="font-medium">{selectedPayment.enrollments.phone}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Formation</Label>
                  <p className="font-medium">{selectedPayment.enrollments.formations.title}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Montant</Label>
                  <p className="font-medium text-lg text-primary">
                    {formatCurrency(Number(selectedPayment.amount))}
                  </p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Méthode de paiement</Label>
                  <p className="font-medium capitalize">
                    {selectedPayment.payment_method?.replace("_", " ") || "Non spécifié"}
                  </p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Référence de paiement</Label>
                  <p className="font-medium font-mono text-sm">
                    {selectedPayment.payment_reference || "Non spécifié"}
                  </p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Statut</Label>
                  <div className="mt-1">{getStatusBadge(selectedPayment.payment_status || "pending")}</div>
                </div>
                <div>
                  <Label className="text-muted-foreground">Date de paiement</Label>
                  <p className="font-medium">
                    {selectedPayment.payment_date
                      ? formatDate(selectedPayment.payment_date)
                      : formatDate(selectedPayment.created_at || "")}
                  </p>
                </div>
                {selectedPayment.validated_at && (
                  <div>
                    <Label className="text-muted-foreground">Validé le</Label>
                    <p className="font-medium">{formatDate(selectedPayment.validated_at)}</p>
                  </div>
                )}
              </div>
              {selectedPayment.notes && (
                <div>
                  <Label className="text-muted-foreground">Notes</Label>
                  <p className="mt-1 p-3 bg-muted rounded-lg">{selectedPayment.notes}</p>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            {selectedPayment?.payment_status === "pending" && (
              <>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsRejectOpen(true);
                  }}
                  className="mr-auto"
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Rejeter
                </Button>
                <Button
                  onClick={() => selectedPayment && handleValidatePayment(selectedPayment.id)}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Valider le paiement
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={isRejectOpen} onOpenChange={setIsRejectOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rejeter le paiement</DialogTitle>
            <DialogDescription>
              Veuillez indiquer la raison du rejet de ce paiement.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Raison du rejet</Label>
              <Textarea
                value={rejectNotes}
                onChange={(e) => setRejectNotes(e.target.value)}
                placeholder="Ex: Référence de paiement invalide, montant incorrect..."
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRejectOpen(false)}>
              Annuler
            </Button>
            <Button
              variant="destructive"
              onClick={handleRejectPayment}
              disabled={!rejectNotes.trim()}
            >
              Confirmer le rejet
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}