import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { LogOut, Newspaper, Image as ImageIcon, BarChart3, Users, GraduationCap, DollarSign, Calendar } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, PieChart, Pie, Cell } from "recharts";

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [enrollmentData, setEnrollmentData] = useState<any[]>([]);
  const [formationStats, setFormationStats] = useState<any[]>([]);
  const [paymentData, setPaymentData] = useState<any[]>([]);
  const [paymentStatusData, setPaymentStatusData] = useState<any[]>([]);
  const [stats, setStats] = useState({
    newsCount: 0,
    photosCount: 0,
    videosCount: 0,
    formationsCount: 0,
    enrollmentsCount: 0,
    paymentsCount: 0,
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
    const { data: formations } = await supabase.from("formations").select("id, title");
    const { data: enrollments } = await supabase.from("enrollments").select("id, created_at, formation_id");
    const { data: payments } = await supabase.from("payments").select("id, amount, payment_status, created_at");

    setStats({
      newsCount: news?.length || 0,
      photosCount: photos?.length || 0,
      videosCount: videos?.length || 0,
      formationsCount: formations?.length || 0,
      enrollmentsCount: enrollments?.length || 0,
      paymentsCount: payments?.length || 0,
    });

    // Generate chart data for enrollments over last 7 days
    if (enrollments) {
      const last7Days = Array.from({ length: 7 }).map((_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (6 - i));
        return d.toISOString().split('T')[0];
      });

      const chartData = last7Days.map(date => {
        const count = enrollments.filter(e => e.created_at?.startsWith(date)).length;
        const [year, month, day] = date.split('-');
        return {
          date: `${day}/${month}`,
          inscriptions: count
        };
      });
      setEnrollmentData(chartData);

      // Generate formation popularity data
      if (formations) {
        const popularityData = formations.slice(0, 5).map(f => {
          return {
            name: f.title.substring(0, 15) + (f.title.length > 15 ? '...' : ''),
            inscrits: enrollments.filter(e => e.formation_id === f.id).length
          };
        }).sort((a, b) => b.inscrits - a.inscrits);
        setFormationStats(popularityData);
      }
    }

    // Generate payment charts data
    if (payments) {
      // Payment evolution over last 7 days
      const last7Days = Array.from({ length: 7 }).map((_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (6 - i));
        return d.toISOString().split('T')[0];
      });

      const paymentChartData = last7Days.map(date => {
        const dayPayments = payments.filter(p => p.created_at?.startsWith(date));
        const totalAmount = dayPayments.reduce((sum, p) => sum + (parseFloat(p.amount as any) || 0), 0);
        const [year, month, day] = date.split('-');
        return {
          date: `${day}/${month}`,
          montant: totalAmount
        };
      });
      setPaymentData(paymentChartData);

      // Payment status distribution
      const pending = payments.filter(p => p.payment_status === 'pending').length;
      const validated = payments.filter(p => p.payment_status === 'validated').length;
      const rejected = payments.filter(p => p.payment_status === 'rejected').length;
      
      setPaymentStatusData([
        { name: 'En attente', value: pending, color: '#F59E0B' },
        { name: 'Validés', value: validated, color: '#10B981' },
        { name: 'Rejetés', value: rejected, color: '#EF4444' },
      ]);
    }
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
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
            <Link href="/admin/news">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Newspaper className="w-5 h-5" />
                    Actualités
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{stats.newsCount}</p>
                  <p className="text-sm text-muted-foreground">articles publiés</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/admin/gallery">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ImageIcon className="w-5 h-5" />
                    Galerie
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{stats.photosCount + stats.videosCount}</p>
                  <p className="text-sm text-muted-foreground">photos/vidéos</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/admin/formations">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="w-5 h-5" />
                    Formations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{stats.formationsCount}</p>
                  <p className="text-sm text-muted-foreground">formations actives</p>
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
                  <p className="text-2xl font-bold">{stats.enrollmentsCount}</p>
                  <p className="text-sm text-muted-foreground">demandes reçues</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/admin/payments">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    Paiements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{stats.paymentsCount}</p>
                  <p className="text-sm text-muted-foreground">paiements reçus</p>
                </CardContent>
              </Card>
            </Link>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Inscriptions des 7 derniers jours</CardTitle>
                <CardDescription>Évolution des demandes d'inscription</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={enrollmentData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorInscrits" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0066CC" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#0066CC" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="date" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Area type="monotone" dataKey="inscriptions" stroke="#0066CC" fillOpacity={1} fill="url(#colorInscrits)" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Paiements des 7 derniers jours</CardTitle>
                <CardDescription>Évolution des revenus (FCFA)</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={paymentData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorPayments" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="date" />
                    <YAxis allowDecimals={false} />
                    <Tooltip formatter={(value) => `${Number(value).toLocaleString('fr-FR')} FCFA`} />
                    <Area type="monotone" dataKey="montant" stroke="#10B981" fillOpacity={1} fill="url(#colorPayments)" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Formations les plus demandées</CardTitle>
                <CardDescription>Top 5 des formations</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={formationStats} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                    <XAxis type="number" allowDecimals={false} />
                    <YAxis dataKey="name" type="category" width={120} tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Bar dataKey="inscrits" fill="#E30613" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Statut des paiements</CardTitle>
                <CardDescription>Répartition par statut</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={paymentStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(entry) => `${entry.name}: ${entry.value}`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {paymentStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Newspaper className="w-5 h-5" />
                  Actualités
                </CardTitle>
                <CardDescription>
                  Gérez les actualités du centre
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/admin/news">
                  <Button className="w-full">
                    Accéder
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5" />
                  Formations
                </CardTitle>
                <CardDescription>
                  Gérez les formations proposées
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/admin/formations">
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    Accéder
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Inscriptions
                </CardTitle>
                <CardDescription>
                  Validez les inscriptions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/admin/enrollments">
                  <Button className="w-full bg-secondary hover:bg-secondary/90">
                    Accéder
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Paiements
                </CardTitle>
                <CardDescription>
                  Gérez les paiements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/admin/payments">
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    Accéder
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Dates de Rentrées
                </CardTitle>
                <CardDescription>
                  Gérez les dates d'inscription
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/admin/intake-dates">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    Accéder
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