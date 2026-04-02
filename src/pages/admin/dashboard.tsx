import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/integrations/supabase/client";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut, Newspaper, Image as ImageIcon, BarChart3, Users, GraduationCap, DollarSign, Calendar, Loader2 } from "lucide-react";
import Link from "next/link";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, PieChart, Pie, Cell } from "recharts";

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState("");
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
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push("/admin/login");
        return;
      }

      setUserEmail(session.user.email || "");
      await loadStats();
    } catch (error) {
      console.error("Auth check error:", error);
      router.push("/admin/login");
    }
  };

  const loadStats = async () => {
    try {
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
              name: f.title.substring(0, 20) + (f.title.length > 20 ? '...' : ''),
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
    } catch (error) {
      console.error("Error loading stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
      <SEO 
        title="Dashboard Admin - TCI Formation"
        description="Tableau de bord administrateur TCI Formation"
      />

      <div className="min-h-screen bg-muted/30">
        {/* Header */}
        <header className="bg-white border-b sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link href="/" className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                    <span className="text-white font-bold text-lg">TCI</span>
                  </div>
                </Link>
                <div>
                  <h1 className="font-heading font-bold text-xl">Dashboard Admin</h1>
                  <p className="text-sm text-muted-foreground">{userEmail}</p>
                </div>
              </div>
              <Button onClick={handleLogout} variant="outline" size="sm">
                <LogOut className="w-4 h-4 mr-2" />
                Déconnexion
              </Button>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Actualités</CardTitle>
                <Newspaper className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.newsCount}</div>
                <p className="text-xs text-muted-foreground">Articles publiés</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Formations</CardTitle>
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.formationsCount}</div>
                <p className="text-xs text-muted-foreground">Formations disponibles</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Inscriptions</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.enrollmentsCount}</div>
                <p className="text-xs text-muted-foreground">Demandes d'inscription</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Paiements</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.paymentsCount}</div>
                <p className="text-xs text-muted-foreground">Paiements enregistrés</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Photos</CardTitle>
                <ImageIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.photosCount}</div>
                <p className="text-xs text-muted-foreground">Dans la galerie</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Vidéos</CardTitle>
                <ImageIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.videosCount}</div>
                <p className="text-xs text-muted-foreground">Dans la galerie</p>
              </CardContent>
            </Card>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  <ImageIcon className="w-5 h-5" />
                  Galerie
                </CardTitle>
                <CardDescription>
                  Gérez les photos et vidéos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/admin/gallery">
                  <Button className="w-full bg-accent hover:bg-accent/90">
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