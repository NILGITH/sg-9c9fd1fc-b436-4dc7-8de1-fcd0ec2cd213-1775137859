import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { LogIn, Loader2, AlertCircle, RefreshCw } from "lucide-react";
import Image from "next/image";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [error, setError] = useState("");
  const [networkError, setNetworkError] = useState(false);

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error("Session check error:", error);
        setNetworkError(true);
      }
      
      if (session) {
        router.push("/admin/dashboard");
      }
    } catch (err) {
      console.error("Network error during session check:", err);
      setNetworkError(true);
    } finally {
      setCheckingSession(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setNetworkError(false);
    setLoading(true);

    try {
      // Test network connection first
      const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/`, {
        method: 'HEAD',
        headers: {
          'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
        },
      });

      if (!response.ok) {
        throw new Error('Network connection failed');
      }

      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      });

      if (authError) {
        console.error("Auth error:", authError);
        
        if (authError.message.includes('Invalid login credentials')) {
          setError("Email ou mot de passe incorrect");
        } else if (authError.message.includes('Email not confirmed')) {
          setError("Veuillez confirmer votre email avant de vous connecter");
        } else if (authError.message.includes('network') || authError.message.includes('fetch')) {
          setNetworkError(true);
          setError("Erreur de connexion. Vérifiez votre connexion internet.");
        } else {
          setError(authError.message);
        }
        setLoading(false);
        return;
      }

      if (data.user) {
        console.log("Login successful:", data.user.email);
        await router.push("/admin/dashboard");
      }
    } catch (err: any) {
      console.error("Unexpected error:", err);
      
      if (err.message.includes('fetch') || err.message.includes('network') || err.message.includes('Failed to fetch')) {
        setNetworkError(true);
        setError("Impossible de se connecter au serveur. Vérifiez votre connexion internet et réessayez.");
      } else {
        setError("Une erreur inattendue s'est produite. Veuillez réessayer.");
      }
      setLoading(false);
    }
  };

  const handleRetry = () => {
    setError("");
    setNetworkError(false);
    setCheckingSession(true);
    checkSession();
  };

  if (checkingSession) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary via-blue-600 to-blue-800 flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-8 h-8 animate-spin text-white" />
        <p className="text-white text-sm">Vérification de la session...</p>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title="Connexion Admin - TCI Formation"
        description="Interface d'administration TCI Formation"
      />

      <div className="min-h-screen bg-gradient-to-br from-primary via-blue-600 to-blue-800 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-2xl">
          <CardHeader className="space-y-4 text-center pb-8">
            <div className="flex justify-center">
              <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-white p-2">
                <Image 
                  src="/logo-tci.jpg" 
                  alt="TCI Formation" 
                  width={80} 
                  height={80}
                  className="rounded-full"
                />
              </div>
            </div>
            <div>
              <CardTitle className="text-3xl font-heading font-bold">
                Connexion Admin
              </CardTitle>
              <CardDescription className="text-base mt-2">
                Connectez-vous pour gérer le site TCI Formation
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            {networkError && (
              <div className="bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200 p-4 rounded-lg mb-6 space-y-3">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="font-medium">Problème de connexion réseau</p>
                    <p className="text-sm mt-1">
                      Impossible de se connecter au serveur Supabase. Vérifiez votre connexion internet.
                    </p>
                  </div>
                </div>
                <Button 
                  onClick={handleRetry}
                  variant="outline" 
                  size="sm"
                  className="w-full"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Réessayer la connexion
                </Button>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Adresse Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="votre.email@tciformation.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading || networkError}
                  autoComplete="email"
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Mot de passe
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading || networkError}
                  autoComplete="current-password"
                  className="h-11"
                />
              </div>

              {error && !networkError && (
                <div className="bg-destructive/10 border border-destructive/20 text-destructive text-sm p-3 rounded-lg flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full h-11 bg-primary hover:bg-primary/90 text-base font-medium"
                disabled={loading || networkError}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Connexion en cours...
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4 mr-2" />
                    Se connecter
                  </>
                )}
              </Button>

              <p className="text-center text-xs text-muted-foreground mt-4">
                En vous connectant, vous acceptez nos conditions d'utilisation
              </p>
            </form>

            {/* Network Diagnostic */}
            <div className="mt-6 p-3 bg-muted/50 rounded-lg text-xs space-y-1">
              <p className="font-medium">État de la connexion :</p>
              <p className="text-muted-foreground">
                URL: {process.env.NEXT_PUBLIC_SUPABASE_URL}
              </p>
              <p className="text-muted-foreground">
                Clé API: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✓ Configurée' : '✗ Manquante'}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}