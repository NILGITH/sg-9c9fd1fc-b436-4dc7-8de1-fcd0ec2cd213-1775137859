import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { formationService, type Formation } from "@/services/formationService";
import { enrollmentService } from "@/services/enrollmentService";
import { GraduationCap, BookOpen, CreditCard, Loader2 } from "lucide-react";

export default function Admissions() {
  const { toast } = useToast();
  const [formations, setFormations] = useState<Formation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: Form, 2: Payment
  const [enrollmentId, setEnrollmentId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    education_level: "",
    formation_id: "",
  });

  useEffect(() => {
    const loadFormations = async () => {
      const { data } = await formationService.getAll();
      if (data) setFormations(data);
    };
    loadFormations();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmitRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await enrollmentService.create({
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        phone: formData.phone,
        education_level: formData.education_level,
        formation_id: formData.formation_id,
        status: "pending",
        payment_status: "unpaid",
      });

      if (error) throw error;

      if (data) {
        setEnrollmentId(data.id);
        setStep(2); // Move to payment step
        toast({
          title: "Inscription enregistrée",
          description: "Veuillez procéder au paiement des droits d'inscription.",
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors de l'inscription.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSimulatePayment = async () => {
    setIsLoading(true);
    // Simulate payment processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    try {
      if (enrollmentId) {
        await enrollmentService.updatePaymentStatus(enrollmentId, "paid", 25000); // Ex: 25,000 FCFA / XOF
        
        toast({
          title: "Paiement réussi !",
          description: "Vos droits d'inscription ont été réglés avec succès. Bienvenue chez TCI Formation !",
        });
        
        setStep(3); // Success step
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur de paiement",
        description: "Le paiement a échoué. Veuillez réessayer.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <SEO 
        title="Admissions & Inscriptions | TCI Formation" 
        description="Inscrivez-vous en ligne à nos formations diplômantes CQM et CQP."
      />
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="py-16 bg-gradient-hero text-white">
          <div className="container-custom max-w-4xl text-center space-y-6">
            <h1 className="font-heading font-bold text-4xl md:text-5xl">
              Admissions
            </h1>
            <p className="text-xl text-white/90">
              Rejoignez TCI Formation. Obtenez votre diplôme d'État et lancez votre carrière.
            </p>
          </div>
        </section>

        <section className="py-12 bg-muted/20 border-b">
          <div className="container-custom max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="border-primary/20 bg-white">
                <CardContent className="p-8">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                    <GraduationCap className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-heading font-bold text-2xl mb-4">Diplômes Préparés</h3>
                  <ul className="space-y-4 text-muted-foreground">
                    <li><strong>CQM</strong> (Certificat de Qualification aux Métiers)</li>
                    <li><strong>CQP</strong> (Certificat de Qualification Professionnelle)</li>
                    <li className="pt-2 text-sm">Diplômes reconnus par l'État, garantissant votre expertise sur le marché de l'emploi.</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-secondary/20 bg-white">
                <CardContent className="p-8">
                  <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-6">
                    <BookOpen className="w-6 h-6 text-secondary" />
                  </div>
                  <h3 className="font-heading font-bold text-2xl mb-4">Critères d'Admission</h3>
                  <ul className="space-y-4 text-muted-foreground">
                    <li>Niveaux requis allant de la <strong>5ème à la Terminale</strong> selon les filières choisies.</li>
                    <li>Possibilité d'admission pour les professionnels en reconversion.</li>
                    <li className="pt-2 text-sm">Les exigences spécifiques sont détaillées sur chaque fiche de formation.</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Registration Form */}
        <section className="py-20">
          <div className="container-custom max-w-3xl">
            <div className="text-center mb-12">
              <h2 className="font-heading font-bold text-3xl mb-4">Inscription en Ligne</h2>
              <p className="text-muted-foreground">
                Remplissez le formulaire ci-dessous et réglez vos droits d'inscription de manière sécurisée.
              </p>
            </div>

            <Card className="shadow-lg border-0 ring-1 ring-muted">
              <CardContent className="p-8 md:p-10">
                {step === 1 && (
                  <form onSubmit={handleSubmitRegistration} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="first_name">Prénom</Label>
                        <Input id="first_name" name="first_name" required value={formData.first_name} onChange={handleInputChange} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last_name">Nom</Label>
                        <Input id="last_name" name="last_name" required value={formData.last_name} onChange={handleInputChange} />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" required value={formData.email} onChange={handleInputChange} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Téléphone</Label>
                        <Input id="phone" name="phone" required value={formData.phone} onChange={handleInputChange} />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="education_level">Niveau d'études actuel</Label>
                      <Select onValueChange={(val) => handleSelectChange("education_level", val)} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez votre niveau" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5eme">Niveau 5ème</SelectItem>
                          <SelectItem value="bepc">BEPC</SelectItem>
                          <SelectItem value="seconde">Niveau Seconde / Première</SelectItem>
                          <SelectItem value="bac">Baccalauréat</SelectItem>
                          <SelectItem value="bac+">Bac +2 ou plus</SelectItem>
                          <SelectItem value="pro">Professionnel / Artisan</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="formation_id">Formation souhaitée</Label>
                      <Select onValueChange={(val) => handleSelectChange("formation_id", val)} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez une formation" />
                        </SelectTrigger>
                        <SelectContent>
                          {formations.map(form => (
                            <SelectItem key={form.id} value={form.id}>{form.title}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <Button type="submit" className="w-full text-lg h-12" disabled={isLoading}>
                      {isLoading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
                      Continuer vers le paiement
                    </Button>
                  </form>
                )}

                {step === 2 && (
                  <div className="text-center space-y-8 py-8">
                    <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                      <CreditCard className="w-10 h-10 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-2xl mb-2">Paiement des Droits</h3>
                      <p className="text-muted-foreground">
                        Montant à régler pour valider l'inscription : <strong>25 000 FCFA</strong>
                      </p>
                    </div>
                    
                    <div className="bg-muted/30 p-6 rounded-xl text-left max-w-sm mx-auto space-y-4">
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-muted-foreground">Frais d'étude de dossier</span>
                        <span className="font-medium">10 000 FCFA</span>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-muted-foreground">Acompte inscription</span>
                        <span className="font-medium">15 000 FCFA</span>
                      </div>
                      <div className="flex justify-between pt-2">
                        <span className="font-bold">Total</span>
                        <span className="font-bold text-primary">25 000 FCFA</span>
                      </div>
                    </div>

                    <Button onClick={handleSimulatePayment} size="lg" className="w-full max-w-sm" disabled={isLoading}>
                      {isLoading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
                      Payer par Mobile Money / Carte
                    </Button>
                    <p className="text-xs text-muted-foreground mt-4 flex items-center justify-center gap-2">
                      <CreditCard className="w-4 h-4" /> Paiement 100% sécurisé
                    </p>
                  </div>
                )}

                {step === 3 && (
                  <div className="text-center space-y-6 py-8">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="font-heading font-bold text-3xl text-green-600">Inscription Validée !</h3>
                    <p className="text-lg text-muted-foreground max-w-md mx-auto">
                      Félicitations ! Vos droits d'inscription ont été réglés. Vous recevrez très prochainement un email avec vos identifiants d'accès et les prochaines étapes.
                    </p>
                    <div className="pt-8">
                      <Button asChild variant="outline">
                        <a href="/">Retour à l'accueil</a>
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}