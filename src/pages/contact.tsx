import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, MapPin, Clock, Send, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

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
        description="Contactez TCI Formation pour toute information. 5 centres au Bénin à votre disposition."
      />
      
      <Header />
      
      <main className="bg-gray-50">
        {/* Hero Section */}
        <section className="relative py-24 bg-gradient-to-br from-tci-blue via-tci-blue/95 to-tci-blue/90 text-white overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-tci-red/20 to-transparent"></div>
          
          <div className="container-custom relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <Badge variant="secondary" className="mb-6 bg-white/20 text-white border-white/30 backdrop-blur-sm">
                CONTACTEZ-NOUS
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Parlons de Votre Projet
              </h1>
              <p className="text-xl text-white/90 leading-relaxed">
                Notre équipe est à votre écoute pour répondre à toutes vos questions et vous accompagner dans votre parcours professionnel.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-20">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Contact Form */}
              <div className="lg:col-span-2">
                <Card className="border-0 shadow-xl">
                  <CardContent className="p-8 md:p-12">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-12 h-12 bg-tci-blue/10 rounded-xl flex items-center justify-center">
                        <MessageSquare className="w-6 h-6 text-tci-blue" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">Envoyez-nous un message</h2>
                        <p className="text-gray-600">Nous vous répondrons sous 24h</p>
                      </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="name" className="text-gray-900 font-medium mb-2 block">
                            Nom complet *
                          </Label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="h-12"
                            placeholder="Votre nom"
                          />
                        </div>

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
                            placeholder="votre@email.com"
                          />
                        </div>
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

                      <div>
                        <Label htmlFor="message" className="text-gray-900 font-medium mb-2 block">
                          Votre message *
                        </Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={6}
                          placeholder="Décrivez votre projet ou posez votre question..."
                        />
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        disabled={isSubmitting}
                        className="w-full bg-tci-blue hover:bg-tci-blue/90 h-14 text-base"
                      >
                        {isSubmitting ? (
                          "Envoi en cours..."
                        ) : (
                          <>
                            <Send className="w-5 h-5 mr-2" />
                            Envoyer le message
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Info */}
              <div className="space-y-6">
                <Card className="border-0 shadow-xl overflow-hidden">
                  <div className="bg-gradient-to-br from-tci-blue to-tci-blue/90 p-8 text-white">
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-6">
                      <MapPin className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Adresse Principale</h3>
                    <p className="text-white/90 leading-relaxed">
                      Porto-Novo<br />
                      République du Bénin
                    </p>
                  </div>
                </Card>

                <Card className="border-0 shadow-xl overflow-hidden">
                  <div className="bg-gradient-to-br from-tci-red to-tci-red/90 p-8 text-white">
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-6">
                      <Phone className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Téléphone</h3>
                    <div className="space-y-2 text-white/90">
                      <a href="tel:+229XXXXXXXX" className="block hover:text-white transition-colors">
                        +229 01 96 10 04 42
                      </a>
                      <a href="tel:+229XXXXXXXX" className="block hover:text-white transition-colors">
                        +229 01 47 37 44 56
                      </a>
                    </div>
                  </div>
                </Card>

                <Card className="border-0 shadow-xl">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 bg-tci-blue/10 rounded-xl flex items-center justify-center">
                        <Mail className="w-7 h-7 text-tci-blue" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">Email</h3>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <a href="mailto:contact@tciformation.com" className="block text-gray-600 hover:text-tci-blue transition-colors">
                        contact@tciformation.com
                      </a>
                      <a href="mailto:info@tciformation.com" className="block text-gray-600 hover:text-tci-blue transition-colors">
                        info@tciformation.com
                      </a>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-xl">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 bg-tci-blue/10 rounded-xl flex items-center justify-center">
                        <Clock className="w-7 h-7 text-tci-blue" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">Horaires</h3>
                      </div>
                    </div>
                    <div className="space-y-3 text-gray-600">
                      <div className="flex justify-between">
                        <span className="font-medium">Lun - Ven</span>
                        <span>8h00 - 17h00</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Samedi</span>
                        <span>8h00 - 13h00</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Dimanche</span>
                        <span className="text-tci-red">Fermé</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Links Section */}
        <section className="py-20 bg-white">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Besoin d'Informations Rapides ?
              </h2>
              <p className="text-gray-600">
                Explorez nos ressources pour trouver rapidement ce que vous cherchez
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-tci-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <MessageSquare className="w-8 h-8 text-tci-blue" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">FAQ</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Questions fréquentes sur nos formations
                  </p>
                  <Button variant="outline" className="w-full">
                    Voir la FAQ
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-tci-red/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Phone className="w-8 h-8 text-tci-red" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Nos Sites</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    5 centres à votre disposition
                  </p>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/apropos#sites">Voir les centres</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-tci-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8 text-tci-blue" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Admissions</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Inscrivez-vous en ligne
                  </p>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/admissions">S'inscrire</Link>
                  </Button>
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