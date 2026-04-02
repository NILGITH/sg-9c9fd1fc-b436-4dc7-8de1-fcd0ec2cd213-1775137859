import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, ArrowRight, ArrowLeft, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { enrollmentService } from "@/services/enrollmentService";
import { paymentService } from "@/services/paymentService";
import { formationService, type Formation } from "@/services/formationService";
import { GetStaticProps } from "next";
import Script from "next/script";

interface AdmissionsProps {
  formations: Formation[];
}

// Kkiapay widget types
declare global {
  interface Window {
    openKkiapayWidget: (config: {
      amount: number;
      api_key: string;
      sandbox: boolean;
      email?: string;
      phone?: string;
      name?: string;
      reason?: string;
      data?: string;
    }) => void;
    addKkiapayListener: (event: string, callback: (response: any) => void) => void;
  }
}

const ENROLLMENT_FEE = 25000; // Frais d'inscription en FCFA

export default function Admissions({ formations }: AdmissionsProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<any>({});
  const [enrollmentId, setEnrollmentId] = useState<string | null>(null);
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [kkiapayReady, setKkiapayReady] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm();

  const steps = [
    { title: "Informations Personnelles", description: "Vos coordonnées" },
    { title: "Formation & Niveau", description: "Choix de formation" },
    { title: "Confirmation", description: "Vérification" },
    { title: "Paiement", description: "Frais d'inscription" },
    { title: "Terminé", description: "Inscription validée" },
  ];

  // Check if Kkiapay script is loaded
  useEffect(() => {
    const checkKkiapay = () => {
      if (window.openKkiapayWidget && window.addKkiapayListener) {
        setKkiapayReady(true);
        console.log("✅ Kkiapay SDK loaded successfully");
      }
    };

    // Check immediately
    checkKkiapay();

    // Check again after 2 seconds if not loaded
    const timeout = setTimeout(checkKkiapay, 2000);

    return () => clearTimeout(timeout);
  }, []);

  // Setup Kkiapay event listeners
  useEffect(() => {
    if (!kkiapayReady) return;

    const handleSuccess = async (response: any) => {
      console.log("✅ Kkiapay payment successful:", response);

      if (!paymentId) {
        console.error("❌ No payment ID found");
        return;
      }

      try {
        // Update payment status to validated
        await paymentService.update(paymentId, {
          payment_status: "validated",
          payment_reference: response.transactionId,
        });

        // Update enrollment status to approved
        if (enrollmentId) {
          await enrollmentService.update(enrollmentId, {
            status: "approved",
          });
        }

        console.log("✅ Payment and enrollment updated successfully");
        setCurrentStep(4); // Go to success step
      } catch (error) {
        console.error("❌ Error updating payment:", error);
        alert("Le paiement a réussi mais une erreur s'est produite. Contactez-nous avec votre ID de transaction: " + response.transactionId);
      }
    };

    const handleFailed = (error: any) => {
      console.error("❌ Kkiapay payment failed:", error);
      alert("Le paiement a échoué. Veuillez réessayer.");
    };

    // Add event listeners
    window.addKkiapayListener("success", handleSuccess);
    window.addKkiapayListener("failed", handleFailed);

    console.log("✅ Kkiapay event listeners configured");
  }, [kkiapayReady, paymentId, enrollmentId]);

  const submitEnrollment = async (data: any) => {
    setIsSubmitting(true);

    try {
      const payload = {
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        phone: data.phone,
        birth_date: data.birthDate,
        birth_place: data.birthPlace || null,
        nationality: data.nationality || "Béninoise",
        address: data.address || null,
        formation_id: data.formation,
        education_level: data.educationLevel,
        last_diploma: data.lastDiploma || null,
        motivation: data.motivation || null,
        status: "pending",
      };

      console.log("📝 Creating enrollment with payload:", payload);

      const { data: enrollment, error } = await enrollmentService.create(payload);

      if (error) {
        console.error("❌ Enrollment creation error:", error);
        throw new Error(error.message || "Erreur lors de la création de l'inscription");
      }

      if (!enrollment) {
        throw new Error("Aucune donnée d'inscription retournée");
      }

      console.log("✅ Enrollment created successfully:", enrollment);
      setEnrollmentId(enrollment.id);

      // Create payment record
      const paymentPayload = {
        enrollment_id: enrollment.id,
        amount: ENROLLMENT_FEE.toString(),
        payment_method: "kkiapay",
        payment_status: "pending",
        payment_date: new Date().toISOString(),
        payment_reference: null,
        notes: null,
        validated_at: null,
        validated_by: null,
      };

      console.log("💰 Creating payment with payload:", paymentPayload);

      const { data: payment, error: paymentError } = await paymentService.create(paymentPayload as any);

      if (paymentError) {
        console.error("❌ Payment creation error:", paymentError);
        throw new Error(paymentError.message || "Erreur lors de la création du paiement");
      }

      if (!payment) {
        throw new Error("Aucune donnée de paiement retournée");
      }

      console.log("✅ Payment created successfully:", payment);
      setPaymentId(payment.id);

      // Move to payment step
      setCurrentStep(3);
    } catch (err: any) {
      console.error("❌ Error in submitEnrollment:", err);
      alert(`Erreur: ${err.message || "Une erreur s'est produite. Veuillez réessayer."}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStepSubmit = (data: any) => {
    const completeData = { ...formData, ...data };
    setFormData(completeData);

    if (currentStep === 0) {
      // Step 1: Personal Info
      setCurrentStep(1);
    } else if (currentStep === 1) {
      // Step 2: Formation & Level
      setCurrentStep(2);
    } else if (currentStep === 2) {
      // Step 3: Confirmation - Submit enrollment
      submitEnrollment(completeData);
    }
  };

  const openKkiapayPayment = () => {
    if (!kkiapayReady) {
      alert("Le système de paiement n'est pas encore chargé. Veuillez patienter quelques secondes et réessayer.");
      return;
    }

    if (!window.openKkiapayWidget) {
      alert("Erreur: Le widget Kkiapay n'est pas disponible. Veuillez rafraîchir la page.");
      return;
    }

    const publicKey = process.env.NEXT_PUBLIC_KKIAPAY_PUBLIC_KEY;
    const isSandbox = process.env.NEXT_PUBLIC_KKIAPAY_ENV === "sandbox";

    if (!publicKey) {
      alert("Erreur de configuration: Clé API Kkiapay manquante");
      return;
    }

    console.log("💳 Opening Kkiapay widget with config:", {
      amount: ENROLLMENT_FEE,
      sandbox: isSandbox,
      email: formData.email,
      phone: formData.phone,
    });

    try {
      window.openKkiapayWidget({
        amount: ENROLLMENT_FEE,
        api_key: publicKey,
        sandbox: isSandbox,
        email: formData.email,
        phone: formData.phone,
        name: `${formData.firstName} ${formData.lastName}`,
        reason: "Frais d'inscription TCI Formation",
        data: enrollmentId || "",
      });
    } catch (error) {
      console.error("❌ Error opening Kkiapay widget:", error);
      alert("Erreur lors de l'ouverture du système de paiement. Veuillez réessayer.");
    }
  };

  const selectedFormation = formations.find(f => f.id === formData.formation);

  return (
    <>
      <SEO 
        title="Admissions - TCI Formation"
        description="Inscrivez-vous à TCI Formation - Processus d'admission en ligne simplifié"
      />
      
      {/* Load Kkiapay SDK */}
      <Script
        src="https://cdn.kkiapay.me/k.js"
        strategy="afterInteractive"
        onLoad={() => {
          console.log("✅ Kkiapay script loaded");
          setKkiapayReady(true);
        }}
        onError={(e) => {
          console.error("❌ Error loading Kkiapay script:", e);
        }}
      />

      <Header />
      
      <main className="pt-20 pb-16 bg-muted/30">
        <div className="container-custom max-w-4xl">
          {/* Progress Steps */}
          <div className="mb-12">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-colors ${
                    index === currentStep 
                      ? "bg-primary border-primary text-white" 
                      : index < currentStep 
                      ? "bg-green-600 border-green-600 text-white"
                      : "border-gray-300 text-gray-400"
                  }`}>
                    {index < currentStep ? (
                      <CheckCircle2 className="w-6 h-6" />
                    ) : (
                      <span className="font-bold">{index + 1}</span>
                    )}
                  </div>
                  <div className="text-center mt-2">
                    <div className={`font-medium text-sm ${
                      index === currentStep ? "text-primary" : index < currentStep ? "text-green-600" : "text-muted-foreground"
                    }`}>
                      {step.title}
                    </div>
                    <div className="text-xs text-muted-foreground hidden md:block">
                      {step.description}
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-0.5 ${
                      index < currentStep ? "bg-green-600" : "bg-gray-300"
                    } absolute top-6 left-[calc(50%+2rem)] w-[calc(20%-4rem)] hidden md:block`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <Card>
            <CardHeader>
              <CardTitle>{steps[currentStep].title}</CardTitle>
              <CardDescription>{steps[currentStep].description}</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Step 1: Personal Info */}
              {currentStep === 0 && (
                <form onSubmit={handleSubmit(handleStepSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Prénom *</Label>
                      <Input
                        id="firstName"
                        {...register("firstName", { required: "Le prénom est requis" })}
                        defaultValue={formData.firstName}
                      />
                      {errors.firstName && (
                        <p className="text-sm text-destructive">{errors.firstName.message as string}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lastName">Nom *</Label>
                      <Input
                        id="lastName"
                        {...register("lastName", { required: "Le nom est requis" })}
                        defaultValue={formData.lastName}
                      />
                      {errors.lastName && (
                        <p className="text-sm text-destructive">{errors.lastName.message as string}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        {...register("email", { 
                          required: "L'email est requis",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Email invalide"
                          }
                        })}
                        defaultValue={formData.email}
                      />
                      {errors.email && (
                        <p className="text-sm text-destructive">{errors.email.message as string}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Téléphone *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        {...register("phone", { required: "Le téléphone est requis" })}
                        defaultValue={formData.phone}
                      />
                      {errors.phone && (
                        <p className="text-sm text-destructive">{errors.phone.message as string}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="birthDate">Date de Naissance</Label>
                      <Input
                        id="birthDate"
                        type="date"
                        {...register("birthDate")}
                        defaultValue={formData.birthDate}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="birthPlace">Lieu de Naissance</Label>
                      <Input
                        id="birthPlace"
                        {...register("birthPlace")}
                        defaultValue={formData.birthPlace}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="nationality">Nationalité</Label>
                      <Input
                        id="nationality"
                        {...register("nationality")}
                        defaultValue={formData.nationality || "Béninoise"}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Adresse Complète</Label>
                    <Textarea
                      id="address"
                      {...register("address")}
                      defaultValue={formData.address}
                      rows={3}
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button type="submit">
                      Continuer
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </form>
              )}

              {/* Step 2: Formation & Level */}
              {currentStep === 1 && (
                <form onSubmit={handleSubmit(handleStepSubmit)} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="formation">Formation Souhaitée *</Label>
                    <Select
                      onValueChange={(value) => {
                        const form = document.getElementById("formation-form") as HTMLFormElement;
                        const input = form?.querySelector('input[name="formation"]') as HTMLInputElement;
                        if (input) input.value = value;
                      }}
                      defaultValue={formData.formation}
                    >
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
                    <input type="hidden" {...register("formation", { required: "La formation est requise" })} />
                    {errors.formation && (
                      <p className="text-sm text-destructive">{errors.formation.message as string}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="educationLevel">Niveau d'Études *</Label>
                    <Select
                      onValueChange={(value) => {
                        const form = document.getElementById("formation-form") as HTMLFormElement;
                        const input = form?.querySelector('input[name="educationLevel"]') as HTMLInputElement;
                        if (input) input.value = value;
                      }}
                      defaultValue={formData.educationLevel}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez votre niveau" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="BEPC">BEPC</SelectItem>
                        <SelectItem value="BAC">BAC</SelectItem>
                        <SelectItem value="BAC+1">BAC+1</SelectItem>
                        <SelectItem value="BAC+2">BAC+2</SelectItem>
                        <SelectItem value="BAC+3">BAC+3</SelectItem>
                        <SelectItem value="Autre">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                    <input type="hidden" {...register("educationLevel", { required: "Le niveau d'études est requis" })} />
                    {errors.educationLevel && (
                      <p className="text-sm text-destructive">{errors.educationLevel.message as string}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastDiploma">Dernier Diplôme Obtenu</Label>
                    <Input
                      id="lastDiploma"
                      {...register("lastDiploma")}
                      defaultValue={formData.lastDiploma}
                      placeholder="Ex: BEPC, BAC..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="motivation">Lettre de Motivation</Label>
                    <Textarea
                      id="motivation"
                      {...register("motivation")}
                      defaultValue={formData.motivation}
                      rows={5}
                      placeholder="Expliquez pourquoi vous souhaitez suivre cette formation..."
                    />
                  </div>

                  <div className="flex justify-between">
                    <Button type="button" variant="outline" onClick={() => setCurrentStep(0)}>
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Retour
                    </Button>
                    <Button type="submit">
                      Continuer
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </form>
              )}

              {/* Step 3: Confirmation */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="bg-muted/50 p-6 rounded-lg space-y-4">
                    <h3 className="font-heading font-bold text-lg mb-4">Récapitulatif de votre inscription</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Prénom</p>
                        <p className="font-medium">{formData.firstName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Nom</p>
                        <p className="font-medium">{formData.lastName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-medium">{formData.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Téléphone</p>
                        <p className="font-medium">{formData.phone}</p>
                      </div>
                      <div className="md:col-span-2">
                        <p className="text-sm text-muted-foreground">Formation</p>
                        <p className="font-medium">{selectedFormation?.title}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Niveau d'Études</p>
                        <p className="font-medium">{formData.educationLevel}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 p-4 rounded-lg">
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      En confirmant, vous acceptez les termes et conditions de TCI Formation. 
                      Vous serez redirigé vers le paiement des frais d'inscription de <strong>{ENROLLMENT_FEE.toLocaleString("fr-FR")} FCFA</strong>.
                    </p>
                  </div>

                  <div className="flex justify-between">
                    <Button type="button" variant="outline" onClick={() => setCurrentStep(1)} disabled={isSubmitting}>
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Retour
                    </Button>
                    <Button onClick={handleSubmit(handleStepSubmit)} disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Envoi en cours...
                        </>
                      ) : (
                        <>
                          Confirmer l'inscription
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 4: Payment */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="text-center py-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 dark:bg-green-900 mb-6">
                      <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="font-heading font-bold text-2xl mb-2">
                      Inscription Enregistrée !
                    </h3>
                    <p className="text-muted-foreground mb-8">
                      Votre demande d'inscription a été créée avec succès.
                      Procédez maintenant au paiement des frais d'inscription.
                    </p>

                    <Card className="bg-gradient-accent text-white mb-8">
                      <CardContent className="p-8">
                        <p className="text-white/80 mb-2">Frais d'inscription</p>
                        <p className="font-heading font-bold text-4xl">
                          {ENROLLMENT_FEE.toLocaleString("fr-FR")} FCFA
                        </p>
                      </CardContent>
                    </Card>

                    <div className="space-y-4">
                      <Button 
                        onClick={openKkiapayPayment}
                        size="lg"
                        className="w-full bg-gradient-accent hover:opacity-90"
                        disabled={!kkiapayReady}
                      >
                        {!kkiapayReady ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Chargement du système de paiement...
                          </>
                        ) : (
                          "Payer Maintenant avec Kkiapay"
                        )}
                      </Button>

                      <p className="text-xs text-muted-foreground">
                        Paiement sécurisé par Kkiapay • Mobile Money • Carte Bancaire
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 5: Success */}
              {currentStep === 4 && (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-100 dark:bg-green-900 mb-6">
                    <CheckCircle2 className="w-12 h-12 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="font-heading font-bold text-3xl mb-4">
                    Paiement Réussi !
                  </h3>
                  <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                    Votre inscription a été validée avec succès. Vous recevrez un email de confirmation 
                    avec toutes les informations nécessaires dans les prochaines minutes.
                  </p>

                  <div className="bg-muted/50 p-6 rounded-lg max-w-md mx-auto mb-8">
                    <h4 className="font-heading font-bold mb-4">Prochaines Étapes</h4>
                    <ol className="text-left space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="font-bold text-primary">1.</span>
                        <span>Consultez votre email pour la confirmation d'inscription</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="font-bold text-primary">2.</span>
                        <span>Préparez les documents nécessaires (photocopies diplômes, photos d'identité)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="font-bold text-primary">3.</span>
                        <span>Attendez la convocation pour finaliser votre inscription</span>
                      </li>
                    </ol>
                  </div>

                  <Button asChild size="lg">
                    <a href="/">Retour à l'Accueil</a>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const { data: formations } = await formationService.getAll();

    return {
      props: {
        formations: formations || [],
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error("Error fetching formations:", error);
    return {
      props: {
        formations: [],
      },
      revalidate: 60,
    };
  }
};