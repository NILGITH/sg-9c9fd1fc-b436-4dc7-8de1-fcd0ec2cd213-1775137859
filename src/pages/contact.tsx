import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast({
      title: "Message envoyé !",
      description: "Nous vous répondrons dans les plus brefs délais.",
    });

    setFormData({ name: "", email: "", phone: "", message: "" });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <>
      <SEO 
        title="Contact - TCI Formation"
        description="Contactez TCI Formation pour toute information sur nos formations professionnelles au Bénin. Nous sommes à votre écoute."
      />
      
      <Header />
      
      <main>
        {/* Hero with Image */}
        <section className="py-20 bg-gradient-hero text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <img 
              src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&auto=format&fit=crop"
              alt="Contactez-nous"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="container-custom max-w-3xl text-center space-y-6 relative z-10">
            <h1 className="font-heading font-bold text-4xl md:text-6xl">
              Contactez-Nous
            </h1>
            <p className="text-xl text-white/90">
              Une question ? Un projet de formation ? Notre équipe est à votre écoute pour vous accompagner dans votre parcours professionnel.
            </p>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-20">
          <div className="container-custom max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <h2 className="font-heading font-bold text-2xl mb-6">Envoyez-nous un message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name">Nom complet *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Téléphone *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="mt-2"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary/90"
                  >
                    {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
                  </Button>
                </form>
              </div>

              {/* Contact Info */}
              <div className="space-y-6">
                <h2 className="font-heading font-bold text-2xl mb-6">Nos coordonnées</h2>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Adresse</h3>
                        <p className="text-muted-foreground">
                          Porto-Novo<br />
                          République du Bénin
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Phone className="w-6 h-6 text-secondary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Téléphone</h3>
                        <p className="text-muted-foreground">
                          +229 XX XX XX XX<br />
                          +229 XX XX XX XX
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Mail className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Email</h3>
                        <p className="text-muted-foreground">
                          contact@tciformation.com<br />
                          info@tciformation.com
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Clock className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Horaires d&apos;ouverture</h3>
                        <p className="text-muted-foreground">
                          Lundi - Vendredi : 8h00 - 17h00<br />
                          Samedi : 8h00 - 13h00<br />
                          Dimanche : Fermé
                        </p>
                      </div>
                    </div>
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