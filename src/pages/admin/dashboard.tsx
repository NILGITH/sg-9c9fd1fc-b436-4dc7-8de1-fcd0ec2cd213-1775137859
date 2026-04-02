import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { LogOut, Newspaper, Image as ImageIcon, BarChart3, Users } from "lucide-react";

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    newsCount: 0,
    photosCount: 0,
    videosCount: 0,
  });

  useEffect(() => {
    checkUser();
    loadStats();
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      router.push("/admin/login");
      return;
    }
    
    setUser(session.user);
    setLoading(false);
  };

  const loadStats = async () => {
    const { data: news } = await supabase.from("news").select("id");
    const { data: photos } = await supabase.from("gallery").select("id").eq("media_type", "photo");
    const { data: videos } = await supabase.from("gallery").select("id").eq("media_type", "video");

    setStats({
      newsCount: news?.length || 0,
      photosCount: photos?.length || 0,
      videosCount: videos?.length || 0,
    });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title="Dashboard Admin - TCI Formation"
        description="Interface d'administration TCI Formation"
      />

      <div className="min-h-screen bg-muted">
        {/* Header */}
        <header className="bg-background border-b border-border">
          <div className="container-custom py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-hero rounded-lg flex items-center justify-center">
                <span className="text-white font-heading font-bold text-xl">TCI</span>
              </div>
              <div>
                <h1 className="font-heading font-bold text-xl">Admin TCI Formation</h1>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/" target="_blank">
                <Button variant="outline" size="sm">
                  Voir le site
                </Button>
              </Link>
              <Button variant="destructive" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Déconnexion
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container-custom py-8">
          <div className="mb-8">
            <h2 className="text-3xl font-heading font-bold mb-2">Tableau de bord</h2>
            <p className="text-muted-foreground">Gérez le contenu de votre site TCI Formation</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Link href="/admin/news">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Newspaper className="w-5 h-5" />
                    Actualités
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{stats.news}</p>
                  <p className="text-sm text-muted-foreground">articles publiés</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/admin/gallery">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Image className="w-5 h-5" />
                    Galerie
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{stats.gallery}</p>
                  <p className="text-sm text-muted-foreground">photos/vidéos</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/admin/enrollments">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Inscriptions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">Gérer</p>
                  <p className="text-sm text-muted-foreground">demandes d'inscription</p>
                </CardContent>
              </Card>
            </Link>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Newspaper className="w-5 h-5" />
                  Gérer les Actualités
                </CardTitle>
                <CardDescription>
                  Ajoutez, modifiez ou supprimez des actualités
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/admin/news">
                  <Button className="w-full">
                    Accéder aux actualités
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ImageIcon className="w-5 h-5" />
                  Gérer la Galerie
                </CardTitle>
                <CardDescription>
                  Gérez les photos et vidéos de la galerie
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/admin/gallery">
                  <Button className="w-full bg-secondary hover:bg-secondary/90">
                    Accéder à la galerie
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </>
  );
}