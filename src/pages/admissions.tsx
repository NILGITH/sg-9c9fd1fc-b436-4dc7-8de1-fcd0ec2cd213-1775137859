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
import { CheckCircle2, ArrowRight, ArrowLeft, Loader2, Send, Info, Phone, Mail, MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { enrollmentService } from "@/services/enrollmentService";
import { paymentService } from "@/services/paymentService";
import { formationService, type Formation } from "@/services/formationService";
import { GetStaticProps } from "next";
import Script from "next/script";
import Link from "next/link";

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

export default function Admissions() {
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
        description="Inscrivez-vous en ligne à TCI Formation. Processus simple et rapide pour rejoindre nos formations professionnelles certifiantes."
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
      
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-tci-blue via-tci-blue/95 to-tci-blue/90 text-white overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-tci-red/20 to-transparent"></div>
          
          <div className="container-custom relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <Badge variant="secondary" className="mb-6 bg-white/20 text-white border-white/30 backdrop-blur-sm">
                INSCRIPTIONS OUVERTES
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Commencez Votre Parcours Professionnel
              </h1>
              <p className="text-xl text-white/90 leading-relaxed">
                Remplissez notre formulaire d'inscription en ligne et rejoignez plus de 2000 étudiants qui nous ont fait confiance.
              </p>
            </div>
          </div>
        </section>

        {/* Progress Steps - Updated avec couleurs correctes */}
        <section className="py-12 bg-white border-b border-gray-100">
          <div className="container-custom">
            <div className="flex items-center justify-center gap-4 md:gap-8 max-w-3xl mx-auto">
              {steps.map((stepItem, index) => (
                <div key={index} className="flex items-center gap-2 md:gap-4">
                  <div className="flex flex-col items-center gap-2">
                    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold text-sm md:text-base transition-all ${
                      step > index 
                        ? 'bg-tci-blue text-white' 
                        : step === index 
                        ? 'bg-tci-blue text-white ring-4 ring-tci-blue/20' 
                        : 'bg-gray-200 text-gray-500'
                    }`}>
                      {index + 1}
                    </div>
                    <span className={`text-xs md:text-sm font-medium transition-colors ${
                      step >= index ? 'text-gray-900' : 'text-gray-500'
                    }`}>
                      {stepItem}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`h-0.5 w-8 md:w-16 transition-colors ${
                      step > index ? 'bg-tci-blue' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Form Section - Couleurs correctes garanties */}
        <section className="py-16">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto">
              <Card className="border-0 shadow-2xl bg-white">
                <CardContent className="p-8 md:p-12">
                  <form onSubmit={handleSubmit} className="space-y-8">
                    {step === 0 && (
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900 mb-2">Informations Personnelles</h2>
                          <p className="text-gray-600">Veuillez remplir vos informations de base</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <Label htmlFor="firstName" className="text-gray-900 font-medium mb-2 block">
                              Prénom *
                            </Label>
                            <Input
                              id="firstName"
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleChange}
                              required
                              className="h-12"
                              placeholder="Jean"
                            />
                          </div>

                          <div>
                            <Label htmlFor="lastName" className="text-gray-900 font-medium mb-2 block">
                              Nom *
                            </Label>
                            <Input
                              id="lastName"
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleChange}
                              required
                              className="h-12"
                              placeholder="Dupont"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <Label htmlFor="email" className="text-gray-900 font-medium mb-2 block">
                              Email *
                            </Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={handleChange}
                              required
                              className="h-12"
                              placeholder="jean.dupont@email.com"
                            />
                          </div>

                          <div>
                            <Label htmlFor="phone" className="text-gray-900 font-medium mb-2 block">
                              Téléphone *
                            </Label>
                            <Input
                              id="phone"
                              name="phone"
                              type="tel"
                              value={formData.phone}
                              onChange={handleChange}
                              required
                              className="h-12"
                              placeholder="+229 XX XX XX XX"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <Label htmlFor="dateOfBirth" className="text-gray-900 font-medium mb-2 block">
                              Date de naissance *
                            </Label>
                            <Input
                              id="dateOfBirth"
                              name="dateOfBirth"
                              type="date"
                              value={formData.dateOfBirth}
                              onChange={handleChange}
                              required
                              className="h-12"
                            />
                          </div>

                          <div>
                            <Label htmlFor="gender" className="text-gray-900 font-medium mb-2 block">
                              Genre *
                            </Label>
                            <select
                              id="gender"
                              name="gender"
                              value={formData.gender}
                              onChange={handleChange as any}
                              required
                              className="w-full h-12 px-3 rounded-lg border border-gray-200 focus:border-tci-blue focus:ring-2 focus:ring-tci-blue/20 bg-white text-gray-900"
                            >
                              <option value="">Sélectionner</option>
                              <option value="M">Masculin</option>
                              <option value="F">Féminin</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="address" className="text-gray-900 font-medium mb-2 block">
                            Adresse complète *
                          </Label>
                          <Textarea
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                            rows={3}
                            placeholder="Votre adresse complète"
                          />
                        </div>
                      </div>
                    )}

                    {step === 1 && (
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900 mb-2">Choix de Formation</h2>
                          <p className="text-gray-600">Sélectionnez votre formation et votre site</p>
                        </div>

                        <div>
                          <Label htmlFor="formation" className="text-gray-900 font-medium mb-2 block">
                            Formation souhaitée *
                          </Label>
                          <select
                            id="formation"
                            name="formation"
                            value={formData.formation}
                            onChange={handleChange as any}
                            required
                            className="w-full h-12 px-3 rounded-lg border border-gray-200 focus:border-tci-blue focus:ring-2 focus:ring-tci-blue/20 bg-white text-gray-900"
                          >
                            <option value="">Choisir une formation</option>
                            {formations.map((f) => (
                              <option key={f.id} value={f.id}>{f.title}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <Label htmlFor="site" className="text-gray-900 font-medium mb-2 block">
                            Site de formation *
                          </Label>
                          <select
                            id="site"
                            name="site"
                            value={formData.site}
                            onChange={handleChange as any}
                            required
                            className="w-full h-12 px-3 rounded-lg border border-gray-200 focus:border-tci-blue focus:ring-2 focus:ring-tci-blue/20 bg-white text-gray-900"
                          >
                            <option value="">Choisir un site</option>
                            <option value="vedoko">Vèdoko (siège)</option>
                            <option value="godomey">Godomey</option>
                            <option value="calavi">Abomey-Calavi</option>
                            <option value="parakou">Parakou</option>
                            <option value="porto-novo">Porto-Novo</option>
                          </select>
                        </div>

                        <div>
                          <Label htmlFor="intakeDate" className="text-gray-900 font-medium mb-2 block">
                            Date de rentrée souhaitée *
                          </Label>
                          <select
                            id="intakeDate"
                            name="intakeDate"
                            value={formData.intakeDate}
                            onChange={handleChange as any}
                            required
                            className="w-full h-12 px-3 rounded-lg border border-gray-200 focus:border-tci-blue focus:ring-2 focus:ring-tci-blue/20 bg-white text-gray-900"
                          >
                            <option value="">Choisir une date</option>
                            {intakeDates.map((date) => (
                              <option key={date.id} value={date.id}>{date.label}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    )}

                    {step === 2 && (
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900 mb-2">Informations Académiques</h2>
                          <p className="text-gray-600">Parlez-nous de votre parcours</p>
                        </div>

                        <div>
                          <Label htmlFor="education" className="text-gray-900 font-medium mb-2 block">
                            Dernier diplôme obtenu *
                          </Label>
                          <select
                            id="education"
                            name="education"
                            value={formData.education}
                            onChange={handleChange as any}
                            required
                            className="w-full h-12 px-3 rounded-lg border border-gray-200 focus:border-tci-blue focus:ring-2 focus:ring-tci-blue/20 bg-white text-gray-900"
                          >
                            <option value="">Sélectionner</option>
                            <option value="BEPC">BEPC</option>
                            <option value="BAC">BAC</option>
                            <option value="License">License</option>
                            <option value="Master">Master</option>
                            <option value="Autre">Autre</option>
                          </select>
                        </div>

                        <div>
                          <Label htmlFor="previousExperience" className="text-gray-900 font-medium mb-2 block">
                            Expérience professionnelle
                          </Label>
                          <Textarea
                            id="previousExperience"
                            name="previousExperience"
                            value={formData.previousExperience}
                            onChange={handleChange}
                            rows={4}
                            placeholder="Décrivez brièvement votre expérience professionnelle (optionnel)"
                          />
                        </div>

                        <div>
                          <Label htmlFor="motivation" className="text-gray-900 font-medium mb-2 block">
                            Pourquoi souhaitez-vous suivre cette formation ? *
                          </Label>
                          <Textarea
                            id="motivation"
                            name="motivation"
                            value={formData.motivation}
                            onChange={handleChange}
                            required
                            rows={5}
                            placeholder="Expliquez vos motivations et vos objectifs..."
                          />
                        </div>
                      </div>
                    )}

                    {step === 3 && (
                      <div className="space-y-6">
                        <div className="text-center py-8">
                          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle2 className="w-12 h-12 text-green-600" />
                          </div>
                          <h2 className="text-3xl font-bold text-gray-900 mb-4">Vérification</h2>
                          <p className="text-gray-600">Vérifiez vos informations avant de soumettre</p>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-gray-600">Nom complet:</span>
                              <p className="font-semibold text-gray-900">{formData.firstName} {formData.lastName}</p>
                            </div>
                            <div>
                              <span className="text-gray-600">Email:</span>
                              <p className="font-semibold text-gray-900">{formData.email}</p>
                            </div>
                            <div>
                              <span className="text-gray-600">Téléphone:</span>
                              <p className="font-semibold text-gray-900">{formData.phone}</p>
                            </div>
                            <div>
                              <span className="text-gray-600">Formation:</span>
                              <p className="font-semibold text-gray-900">
                                {formations.find(f => f.id === formData.formation)?.title || '-'}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl border border-blue-200">
                          <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                          <div className="text-sm">
                            <p className="font-semibold text-blue-900 mb-1">Note importante</p>
                            <p className="text-blue-800">
                              Après soumission, vous recevrez un email de confirmation avec les prochaines étapes. 
                              Notre équipe vous contactera sous 48h pour finaliser votre inscription.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handlePrevious}
                        disabled={step === 0}
                        className="px-8"
                      >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Précédent
                      </Button>

                      {step < 3 ? (
                        <Button
                          type="button"
                          onClick={handleNext}
                          className="px-8 bg-tci-blue hover:bg-tci-blue/90"
                        >
                          Suivant
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      ) : (
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="px-8 bg-tci-blue hover:bg-tci-blue/90"
                        >
                          {isSubmitting ? "Envoi..." : "Soumettre l'inscription"}
                          <Send className="w-4 h-4 ml-2" />
                        </Button>
                      )}
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Help Section - Couleurs correctes */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Besoin d'Aide ?
              </h2>
              <p className="text-gray-600 mb-8">
                Notre équipe est là pour vous accompagner dans votre inscription
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-0 shadow-lg bg-white">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-tci-blue/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Phone className="w-6 h-6 text-tci-blue" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Appelez-nous</h3>
                    <p className="text-sm text-gray-600">+229 01 96 10 04 42</p>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-white">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-tci-blue/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Mail className="w-6 h-6 text-tci-blue" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Écrivez-nous</h3>
                    <p className="text-sm text-gray-600">contact@tciformation.com</p>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-white">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-tci-blue/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <MessageSquare className="w-6 h-6 text-tci-blue" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Visitez-nous</h3>
                    <p className="text-sm text-gray-600">5 sites au Bénin</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
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