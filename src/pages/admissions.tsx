import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, ArrowRight, ArrowLeft, Send, Info, Phone, Mail, MessageSquare } from "lucide-react";
import { enrollmentService } from "@/services/enrollmentService";
import { paymentService } from "@/services/paymentService";
import { formationService, type Formation } from "@/services/formationService";
import { GetStaticProps } from "next";
import Script from "next/script";
import Link from "next/link";

interface AdmissionsProps {
  formations: Formation[];
}

declare global {
  interface Window {
    openKkiapayWidget: (config: any) => void;
    addKkiapayListener: (event: string, callback: (response: any) => void) => void;
  }
}

const ENROLLMENT_FEE = 25000;

export default function Admissions({ formations = [] }: AdmissionsProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<any>({});
  const [enrollmentId, setEnrollmentId] = useState<string | null>(null);
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [kkiapayReady, setKkiapayReady] = useState(false);

  const steps = [
    { title: "Informations Personnelles", description: "Vos coordonnées" },
    { title: "Formation & Niveau", description: "Choix de formation" },
    { title: "Confirmation", description: "Vérification" },
    { title: "Paiement", description: "Frais d'inscription" }
  ];

  const intakeDates = [
    { id: "1", label: "Octobre 2026" },
    { id: "2", label: "Février 2027" }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => setCurrentStep(p => Math.min(p + 1, steps.length - 1));
  const handlePrevious = () => setCurrentStep(p => Math.max(p - 1, 0));

  useEffect(() => {
    const checkKkiapay = () => {
      if (typeof window !== "undefined" && window.openKkiapayWidget && window.addKkiapayListener) {
        setKkiapayReady(true);
      }
    };
    checkKkiapay();
    const timeout = setTimeout(checkKkiapay, 2000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!kkiapayReady || typeof window === "undefined") return;

    const handleSuccess = async (response: any) => {
      if (!paymentId) return;
      try {
        await paymentService.update(paymentId, {
          payment_status: "validated",
          payment_reference: response.transactionId,
        });
        if (enrollmentId) {
          await enrollmentService.update(enrollmentId, { status: "approved" });
        }
        setCurrentStep(4);
      } catch (error) {
        console.error("Error updating payment:", error);
      }
    };

    window.addKkiapayListener("success", handleSuccess);
    window.addKkiapayListener("failed", () => alert("Le paiement a échoué."));
  }, [kkiapayReady, paymentId, enrollmentId]);

  const submitEnrollment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < 2) {
      handleNext();
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        birth_date: formData.dateOfBirth,
        nationality: formData.nationality || "Béninoise",
        formation_id: formData.formation,
        education_level: formData.education || "Non spécifié",
        status: "pending",
      };

      const { data: enrollment, error } = await enrollmentService.create(payload);
      if (error || !enrollment) throw new Error("Erreur de création");

      setEnrollmentId(enrollment.id);

      const paymentPayload = {
        enrollment_id: enrollment.id,
        amount: ENROLLMENT_FEE.toString(),
        payment_method: "kkiapay",
        payment_status: "pending",
        payment_date: new Date().toISOString(),
      };

      const { data: payment, error: paymentError } = await paymentService.create(paymentPayload as any);
      if (paymentError || !payment) throw new Error("Erreur de paiement");

      setPaymentId(payment.id);
      setCurrentStep(3);
    } catch (err: any) {
      alert("Une erreur s'est produite. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEO title="Admissions - TCI Formation" description="Inscrivez-vous en ligne" />
      <Script src="https://cdn.kkiapay.me/k.js" strategy="afterInteractive" onLoad={() => setKkiapayReady(true)} />

      <Header />
      
      <main className="min-h-screen bg-gray-50">
        <section className="relative py-20 bg-gradient-to-br from-tci-blue via-tci-blue/95 to-tci-blue/90 text-white overflow-hidden">
          <div className="container-custom relative z-10 text-center max-w-3xl mx-auto">
            <Badge variant="secondary" className="mb-6 bg-white/20 text-white border-white/30">
              INSCRIPTIONS OUVERTES
            </Badge>
            <h1 className="text-5xl font-bold mb-6">Commencez Votre Parcours</h1>
            <p className="text-xl text-white/90">Remplissez notre formulaire d'inscription en ligne.</p>
          </div>
        </section>

        <section className="py-12 bg-white border-b border-gray-100">
          <div className="container-custom">
            <div className="flex items-center justify-center gap-4 max-w-3xl mx-auto">
              {steps.map((stepItem, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className={`flex flex-col items-center gap-2`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                      currentStep > index ? 'bg-tci-blue text-white' : currentStep === index ? 'bg-tci-blue text-white ring-4 ring-tci-blue/20' : 'bg-gray-200 text-gray-500'
                    }`}>
                      {index + 1}
                    </div>
                    <span className={`text-xs md:text-sm font-medium ${currentStep >= index ? 'text-gray-900' : 'text-gray-500'}`}>
                      {stepItem.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`h-0.5 w-8 md:w-16 ${currentStep > index ? 'bg-tci-blue' : 'bg-gray-200'}`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto">
              <Card className="border-0 shadow-2xl bg-white">
                <CardContent className="p-8">
                  <form onSubmit={submitEnrollment} className="space-y-8">
                    {currentStep === 0 && (
                      <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-gray-900">Informations Personnelles</h2>
                        <div className="grid grid-cols-2 gap-6">
                          <div>
                            <Label className="text-gray-900 mb-2 block">Prénom *</Label>
                            <Input name="firstName" value={formData.firstName || ''} onChange={handleChange} required className="h-12" />
                          </div>
                          <div>
                            <Label className="text-gray-900 mb-2 block">Nom *</Label>
                            <Input name="lastName" value={formData.lastName || ''} onChange={handleChange} required className="h-12" />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                          <div>
                            <Label className="text-gray-900 mb-2 block">Email *</Label>
                            <Input name="email" type="email" value={formData.email || ''} onChange={handleChange} required className="h-12" />
                          </div>
                          <div>
                            <Label className="text-gray-900 mb-2 block">Téléphone *</Label>
                            <Input name="phone" value={formData.phone || ''} onChange={handleChange} required className="h-12" />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                          <div>
                            <Label className="text-gray-900 mb-2 block">Date de naissance *</Label>
                            <Input name="dateOfBirth" type="date" value={formData.dateOfBirth || ''} onChange={handleChange} required className="h-12" />
                          </div>
                        </div>
                      </div>
                    )}

                    {currentStep === 1 && (
                      <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-gray-900">Choix de Formation</h2>
                        <div>
                          <Label className="text-gray-900 mb-2 block">Formation souhaitée *</Label>
                          <select name="formation" value={formData.formation || ''} onChange={handleChange} required className="w-full h-12 px-3 rounded-lg border border-gray-200 focus:border-tci-blue focus:ring-2 focus:ring-tci-blue/20 bg-white text-gray-900">
                            <option value="">Choisir une formation</option>
                            {formations.map((f) => <option key={f.id} value={f.id}>{f.title}</option>)}
                          </select>
                        </div>
                        <div>
                          <Label className="text-gray-900 mb-2 block">Site *</Label>
                          <select name="site" value={formData.site || ''} onChange={handleChange} required className="w-full h-12 px-3 rounded-lg border border-gray-200 focus:border-tci-blue focus:ring-2 focus:ring-tci-blue/20 bg-white text-gray-900">
                            <option value="">Choisir un site</option>
                            <option value="vedoko">Vèdoko</option>
                            <option value="godomey">Godomey</option>
                          </select>
                        </div>
                        <div>
                          <Label className="text-gray-900 mb-2 block">Date de rentrée *</Label>
                          <select name="intakeDate" value={formData.intakeDate || ''} onChange={handleChange} required className="w-full h-12 px-3 rounded-lg border border-gray-200 focus:border-tci-blue focus:ring-2 focus:ring-tci-blue/20 bg-white text-gray-900">
                            <option value="">Choisir une date</option>
                            {intakeDates.map((d) => <option key={d.id} value={d.id}>{d.label}</option>)}
                          </select>
                        </div>
                      </div>
                    )}

                    {currentStep === 2 && (
                      <div className="space-y-6">
                        <div className="text-center py-8">
                          <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
                          <h2 className="text-3xl font-bold text-gray-900 mb-2">Vérification</h2>
                          <p className="text-gray-600">Vérifiez vos informations avant de soumettre.</p>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-6 grid grid-cols-2 gap-4 text-sm text-gray-900">
                          <div><span className="text-gray-500 block">Nom:</span> {formData.firstName} {formData.lastName}</div>
                          <div><span className="text-gray-500 block">Email:</span> {formData.email}</div>
                          <div><span className="text-gray-500 block">Téléphone:</span> {formData.phone}</div>
                          <div><span className="text-gray-500 block">Formation:</span> {formations.find(f => f.id === formData.formation)?.title || '-'}</div>
                        </div>
                      </div>
                    )}

                    {currentStep === 3 && (
                      <div className="space-y-6 text-center py-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Paiement des Frais</h2>
                        <p className="text-gray-600 mb-6">Procédez au paiement de {ENROLLMENT_FEE} FCFA pour valider votre inscription.</p>
                        <Button type="button" onClick={() => window.openKkiapayWidget({ amount: ENROLLMENT_FEE, api_key: process.env.NEXT_PUBLIC_KKIAPAY_PUBLIC_KEY, sandbox: true, email: formData.email, phone: formData.phone })} className="px-8 h-12 bg-green-600 hover:bg-green-700 text-white text-lg rounded-xl">
                          Payer avec Kkiapay
                        </Button>
                      </div>
                    )}

                    {currentStep === 4 && (
                      <div className="space-y-6 text-center py-8">
                        <CheckCircle2 className="w-20 h-20 text-green-600 mx-auto mb-4" />
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Inscription Validée !</h2>
                        <p className="text-gray-600">Votre paiement a été reçu et votre inscription est confirmée. Nous vous contacterons bientôt.</p>
                        <Button asChild className="mt-4"><Link href="/">Retour à l'accueil</Link></Button>
                      </div>
                    )}

                    {currentStep < 3 && (
                      <div className="flex justify-between pt-6">
                        <Button type="button" variant="outline" onClick={handlePrevious} disabled={currentStep === 0}>
                          Précédent
                        </Button>
                        <Button type="submit" disabled={isSubmitting} className="bg-tci-blue hover:bg-tci-blue/90">
                          {currentStep === 2 ? (isSubmitting ? "Envoi..." : "Soumettre") : "Suivant"}
                        </Button>
                      </div>
                    )}
                  </form>
                </CardContent>
              </Card>
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
    return { props: { formations: formations || [] }, revalidate: 60 };
  } catch {
    return { props: { formations: [] }, revalidate: 60 };
  }
};