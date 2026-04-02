import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, AlertCircle, GraduationCap, User, Mail, Phone, MapPin, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { enrollmentService } from "@/services/enrollmentService";
import { paymentService } from "@/services/paymentService";
import { formationService, type Formation } from "@/services/formationService";
import { GetStaticProps } from "next";

declare global {
  interface Window {
    openKkiapayWidget: (options: {
      amount: number;
      api_key: string;
      sandbox: boolean;
      email?: string;
      phone?: string;
      name?: string;
      data?: string;
      callback?: (response: any) => void;
    }) => void;
    addKkiapayListener: (event: string, callback: (response: any) => void) => void;
  }
}

interface AdmissionsProps {
  formations: Formation[];
}

export default function Admissions({ formations }: AdmissionsProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [enrollmentId, setEnrollmentId] = useState<string | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    birthDate: "",
    birthPlace: "",
    nationality: "Béninoise",
    address: "",
    city: "",
    formationId: "",
    educationLevel: "",
    lastDiploma: "",
    motivation: "",
  });

  useEffect(() => {
    // Load Kkiapay SDK
    const script = document.createElement("script");
    script.src = "https://cdn.kkiapay.me/k.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep === 1) setCurrentStep(2);
    else if (currentStep === 2) setCurrentStep(3);
  };

  const submitEnrollment = async () => {
    setLoading(true);
    try {
      const payload = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        birth_date: formData.birthDate || null,
        birth_place: formData.birthPlace || null,
        nationality: formData.nationality || null,
        address: formData.address || null,
        city: formData.city || null,
        formation_id: formData.formationId,
        education_level: formData.educationLevel,
        last_diploma: formData.lastDiploma || null,
        motivation: formData.motivation || null,
        status: "pending",
      };

      const { data, error } = await enrollmentService.create(payload as any);
      
      if (error) throw new Error(error.message || "Erreur lors de la création de l'inscription");
      if (!data) throw new Error("Aucune donnée d'inscription retournée");

      setEnrollmentId(data.id);
      setCurrentStep(4);
    } catch (err: any) {
      console.error("Error creating enrollment:", err);
      toast({
        title: "Erreur d'inscription",
        description: err.message || "Veuillez vérifier vos informations et réessayer.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = () => {
    if (!enrollmentId) return;

    const selectedFormation = formations.find(f => f.id === formData.formationId);

    if (window.openKkiapayWidget) {
      window.openKkiapayWidget({
        amount: 25000,
        api_key: process.env.NEXT_PUBLIC_KKIAPAY_PUBLIC_KEY || "3dc76a90680511ef88d4090c71824b16",
        sandbox: true,
        email: formData.email,
        phone: formData.phone,
        name: `${formData.firstName} ${formData.lastName}`,
        data: enrollmentId,
      });

      window.addKkiapayListener("success", async (response: any) => {
        console.log("Paiement réussi:", response);
        try {
          await paymentService.create({
            enrollment_id: enrollmentId,
            amount: 25000,
            payment_method: "mobile_money",
            payment_status: "pending",
            payment_date: new Date().toISOString(),
            payment_reference: response.transactionId || `KKP-${Date.now()}`,
            notes: `Paiement Kkiapay - ${selectedFormation?.title}`,
          } as any);

          setCurrentStep(5);
          toast({
            title: "Paiement réussi !",
            description: "Votre paiement a été enregistré avec succès.",
          });
        } catch (error) {
          console.error("Erreur enregistrement paiement:", error);
        }
      });

      window.addKkiapayListener("failed", (response: any) => {
        console.log("Paiement échoué:", response);
        toast({
          title: "Paiement échoué",
          description: "Le paiement n'a pas pu être effectué. Veuillez réessayer.",
          variant: "destructive",
        });
      });
    } else {
      toast({
        title: "Erreur",
        description: "Le système de paiement n'est pas disponible. Veuillez réessayer.",
        variant: "destructive",
      });
    }
  };

  const selectedFormation = formations.find(f => f.id === formData.formationId);

  return (
    <>
      <SEO 
        title="Inscrivez-vous - TCI Formation"
        description="Inscrivez-vous en ligne à l'une de nos formations professionnelles. Processus simple et sécurisé."
      />
      
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="gradient-hero text-white py-16">
          <div className="container-custom max-w-4xl text-center">
            <GraduationCap className="w-16 h-16 mx-auto mb-6" />
            <h1 className="font-heading font-bold text-4xl md:text-5xl mb-4">
              Inscription en Ligne
            </h1>
            <p className="text-lg md:text-xl text-white/90">
              Rejoignez TCI Formation et lancez votre carrière professionnelle
            </p>
          </div>
        </section>

        {/* Progress Steps */}
        <section className="py-8 bg-muted/30">
          <div className="container-custom max-w-4xl">
            <div className="flex items-center justify-between">
              {[
                { num: 1, label: "Informations personnelles" },
                { num: 2, label: "Formation & Niveau" },
                { num: 3, label: "Confirmation" },
                { num: 4, label: "Paiement" },
                { num: 5, label: "Terminé" },
              ].map((step, index) => (
                <div key={step.num} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                        currentStep >= step.num
                          ? "bg-primary text-white"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {currentStep > step.num ? <CheckCircle2 className="w-5 h-5" /> : step.num}
                    </div>
                    <p className="text-xs mt-2 text-center hidden md:block">{step.label}</p>
                  </div>
                  {index < 4 && (
                    <div
                      className={`h-0.5 w-12 md:w-20 mx-2 ${
                        currentStep > step.num ? "bg-primary" : "bg-muted"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-12">
          <div className="container-custom max-w-3xl">
            {currentStep === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Informations Personnelles
                  </CardTitle>
                  <CardDescription>
                    Renseignez vos informations personnelles
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleNextStep} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Prénom *</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => handleChange("firstName", e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Nom *</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => handleChange("lastName", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="email"
                            type="email"
                            className="pl-10"
                            value={formData.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Téléphone *</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="phone"
                            type="tel"
                            className="pl-10"
                            value={formData.phone}
                            onChange={(e) => handleChange("phone", e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="birthDate">Date de naissance</Label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="birthDate"
                            type="date"
                            className="pl-10"
                            value={formData.birthDate}
                            onChange={(e) => handleChange("birthDate", e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="birthPlace">Lieu de naissance</Label>
                        <Input
                          id="birthPlace"
                          value={formData.birthPlace}
                          onChange={(e) => handleChange("birthPlace", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="nationality">Nationalité</Label>
                      <Input
                        id="nationality"
                        value={formData.nationality}
                        onChange={(e) => handleChange("nationality", e.target.value)}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="address">Adresse</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="address"
                            className="pl-10"
                            value={formData.address}
                            onChange={(e) => handleChange("address", e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="city">Ville</Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) => handleChange("city", e.target.value)}
                        />
                      </div>
                    </div>

                    <Button type="submit" className="w-full" size="lg">
                      Continuer
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}

            {currentStep === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="w-5 h-5" />
                    Formation & Niveau d'Études
                  </CardTitle>
                  <CardDescription>
                    Sélectionnez votre formation et votre niveau
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleNextStep} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="formationId">Formation souhaitée *</Label>
                      <Select value={formData.formationId} onValueChange={(value) => handleChange("formationId", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez une formation" />
                        </SelectTrigger>
                        <SelectContent>
                          {formations.map((formation) => (
                            <SelectItem key={formation.id} value={formation.id}>
                              {formation.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="educationLevel">Niveau d'études *</Label>
                      <Select value={formData.educationLevel} onValueChange={(value) => handleChange("educationLevel", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez votre niveau" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="aucun">Aucun diplôme</SelectItem>
                          <SelectItem value="cep">CEP</SelectItem>
                          <SelectItem value="bepc">BEPC</SelectItem>
                          <SelectItem value="bac">BAC</SelectItem>
                          <SelectItem value="licence">Licence</SelectItem>
                          <SelectItem value="master">Master</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lastDiploma">Dernier diplôme obtenu</Label>
                      <Input
                        id="lastDiploma"
                        value={formData.lastDiploma}
                        onChange={(e) => handleChange("lastDiploma", e.target.value)}
                        placeholder="Ex: BAC Série D"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="motivation">Motivation (optionnel)</Label>
                      <Textarea
                        id="motivation"
                        rows={4}
                        value={formData.motivation}
                        onChange={(e) => handleChange("motivation", e.target.value)}
                        placeholder="Pourquoi souhaitez-vous suivre cette formation ?"
                      />
                    </div>

                    <div className="flex gap-4">
                      <Button type="button" variant="outline" onClick={() => setCurrentStep(1)} className="flex-1">
                        Retour
                      </Button>
                      <Button type="submit" className="flex-1" disabled={!formData.formationId || !formData.educationLevel}>
                        Continuer
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            {currentStep === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" />
                    Confirmation de votre inscription
                  </CardTitle>
                  <CardDescription>
                    Vérifiez vos informations avant de valider
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="bg-muted/50 p-6 rounded-lg space-y-4">
                      <h3 className="font-semibold text-lg">Informations personnelles</h3>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Nom complet</p>
                          <p className="font-medium">{formData.firstName} {formData.lastName}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Email</p>
                          <p className="font-medium">{formData.email}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Téléphone</p>
                          <p className="font-medium">{formData.phone}</p>
                        </div>
                        {formData.birthDate && (
                          <div>
                            <p className="text-muted-foreground">Date de naissance</p>
                            <p className="font-medium">{new Date(formData.birthDate).toLocaleDateString("fr-FR")}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="bg-primary/5 p-6 rounded-lg space-y-4">
                      <h3 className="font-semibold text-lg">Formation sélectionnée</h3>
                      <div className="space-y-2">
                        <p className="font-medium text-lg">{selectedFormation?.title}</p>
                        <p className="text-sm text-muted-foreground">{selectedFormation?.description}</p>
                        <div className="flex items-center gap-4 text-sm mt-4">
                          <span className="text-muted-foreground">Niveau d'études:</span>
                          <span className="font-medium uppercase">{formData.educationLevel}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button type="button" variant="outline" onClick={() => setCurrentStep(2)} className="flex-1">
                        Modifier
                      </Button>
                      <Button onClick={submitEnrollment} disabled={loading} className="flex-1">
                        {loading ? "Enregistrement..." : "Confirmer l'inscription"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {currentStep === 4 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    Paiement des frais d'inscription
                  </CardTitle>
                  <CardDescription>
                    Montant : 25 000 FCFA
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="bg-muted/50 p-6 rounded-lg text-center space-y-4">
                      <p className="text-3xl font-bold text-primary">25 000 FCFA</p>
                      <p className="text-muted-foreground">
                        Frais d'inscription pour la formation<br />
                        <span className="font-medium text-foreground">{selectedFormation?.title}</span>
                      </p>
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        Méthodes de paiement acceptées
                      </h4>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• MTN Mobile Money</li>
                        <li>• Moov Money</li>
                        <li>• Carte bancaire</li>
                      </ul>
                    </div>

                    <Button onClick={handlePayment} size="lg" className="w-full">
                      Payer avec Kkiapay
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {currentStep === 5 && (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center space-y-6 py-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 dark:bg-green-900">
                      <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold mb-2">Inscription réussie !</h2>
                      <p className="text-muted-foreground">
                        Votre paiement a été enregistré avec succès.
                      </p>
                    </div>
                    <div className="bg-muted/50 p-6 rounded-lg text-left space-y-3">
                      <h3 className="font-semibold">Prochaines étapes :</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>Vous recevrez un email de confirmation</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>Notre équipe validera votre inscription sous 24-48h</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>Vous serez contacté pour finaliser votre dossier</span>
                        </li>
                      </ul>
                    </div>
                    <Button onClick={() => window.location.href = "/"} size="lg">
                      Retour à l'accueil
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const { data: formations, error } = await formationService.getAll();
    
    if (error) {
      console.error("Error loading formations:", error);
    }

    return {
      props: {
        formations: formations || [],
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error("Error in getStaticProps:", error);
    return {
      props: {
        formations: [],
      },
      revalidate: 60,
    };
  }
};