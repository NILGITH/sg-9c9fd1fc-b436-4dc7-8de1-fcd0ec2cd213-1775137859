-- Table pour les actualités
CREATE TABLE news (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT NOT NULL,
  image_url TEXT,
  author TEXT DEFAULT 'TCI BENIN',
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table pour la galerie (photos et vidéos)
CREATE TABLE gallery (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  media_url TEXT NOT NULL,
  media_type TEXT NOT NULL CHECK (media_type IN ('image', 'video')),
  thumbnail_url TEXT,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  order_position INTEGER DEFAULT 0
);

-- Table pour les catégories de formations
CREATE TABLE formation_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  icon_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table pour les formations
CREATE TABLE formations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id UUID REFERENCES formation_categories(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  requirements TEXT,
  duration TEXT,
  icon_color TEXT DEFAULT '#16a34a',
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS Policies - Public read, authenticated write (T2)
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_read_news" ON news FOR SELECT USING (true);
CREATE POLICY "auth_insert_news" ON news FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "auth_update_news" ON news FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "auth_delete_news" ON news FOR DELETE USING (auth.uid() IS NOT NULL);

ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_read_gallery" ON gallery FOR SELECT USING (true);
CREATE POLICY "auth_insert_gallery" ON gallery FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "auth_update_gallery" ON gallery FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "auth_delete_gallery" ON gallery FOR DELETE USING (auth.uid() IS NOT NULL);

ALTER TABLE formation_categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_read_categories" ON formation_categories FOR SELECT USING (true);
CREATE POLICY "auth_write_categories" ON formation_categories FOR ALL WITH CHECK (auth.uid() IS NOT NULL);

ALTER TABLE formations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_read_formations" ON formations FOR SELECT USING (true);
CREATE POLICY "auth_write_formations" ON formations FOR ALL WITH CHECK (auth.uid() IS NOT NULL);

-- Insert formation categories
INSERT INTO formation_categories (name, slug, description, icon_name) VALUES
('Formations Diplômantes', 'formations-diplomantes', 'Filières techniques et industrielles reconnues par l''État', 'GraduationCap'),
('Autres Formations', 'autres-formations', 'Formations professionnelles et spécialisées', 'BookOpen');

-- Insert formations
INSERT INTO formations (category_id, title, slug, description, requirements, icon_color) 
SELECT 
  (SELECT id FROM formation_categories WHERE slug = 'formations-diplomantes'),
  'Génie Electrique Informatique & Réseaux',
  'genie-electrique-informatique-reseaux',
  'Filière recommandée pour détenteur de l''un des diplômes suivants ou équivalents : CEP ; BEPC ou non ; BAC ou non ou tout autre diplôme équivalent.',
  'CEP, BEPC ou BAC',
  '#3b82f6'
UNION ALL
SELECT 
  (SELECT id FROM formation_categories WHERE slug = 'formations-diplomantes'),
  'Génie des Télécommunications & Réseaux',
  'genie-telecommunications-reseaux',
  'Niveau minimum requis pour cette filière : Brevet d''Etude du Premier Cycle ou Certificat d''Aptitude Professionnelle ou tout autre Diplôme équivalent.',
  'BEPC ou CAP',
  '#f97316'
UNION ALL
SELECT 
  (SELECT id FROM formation_categories WHERE slug = 'formations-diplomantes'),
  'Génie Logiciel & Réseaux',
  'genie-logiciel-reseaux',
  'Niveau minimum requis : Baccalauréat ou tout autre diplôme équivalent.',
  'Baccalauréat',
  '#10b981'
UNION ALL
SELECT 
  (SELECT id FROM formation_categories WHERE slug = 'formations-diplomantes'),
  'Génie Electrique Froid & Plomberie',
  'genie-electrique-froid-plomberie',
  'Niveau minimum requis : Brevet d''Etude du Premier Cycle ou Certificat d''Aptitude Professionnelle ou tout autre Diplôme équivalent.',
  'BEPC ou CAP',
  '#14b8a6'
UNION ALL
SELECT 
  (SELECT id FROM formation_categories WHERE slug = 'formations-diplomantes'),
  'Génie Electrique & Maintenance Industrielle',
  'genie-electrique-maintenance-industrielle',
  'Niveau minimum requis : Brevet d''Etude du Premier Cycle ou Certificat d''Aptitude Professionnelle ou tout autre Diplôme équivalent.',
  'BEPC ou CAP',
  '#f59e0b'
UNION ALL
SELECT 
  (SELECT id FROM formation_categories WHERE slug = 'formations-diplomantes'),
  'Génie Electrique & Informatique',
  'genie-electrique-informatique',
  'Filière recommandée pour toute personne passionnée des spécialités qu''elle contient.',
  'Tous niveaux',
  '#8b5cf6'
UNION ALL
SELECT 
  (SELECT id FROM formation_categories WHERE slug = 'formations-diplomantes'),
  'Secrétariat',
  'secretariat',
  'Niveau minimum requis : troisième année des Lycées et Collèges ou Brevet d''Etude du Premier Cycle ou Certificat d''Aptitude professionnelle ou tout autre diplôme équivalent.',
  '3ème année, BEPC ou CAP',
  '#ec4899'
UNION ALL
SELECT 
  (SELECT id FROM formation_categories WHERE slug = 'formations-diplomantes'),
  'Cuisine & Restauration',
  'cuisine-restauration',
  'Formation professionnelle en arts culinaires et service en restauration.',
  'Tous niveaux',
  '#ef4444'
UNION ALL
SELECT 
  (SELECT id FROM formation_categories WHERE slug = 'formations-diplomantes'),
  'Pâtisserie & Boulangerie',
  'patisserie-boulangerie',
  'Formation spécialisée en pâtisserie, viennoiserie et boulangerie artisanale.',
  'Tous niveaux',
  '#f59e0b'
UNION ALL
SELECT 
  (SELECT id FROM formation_categories WHERE slug = 'formations-diplomantes'),
  'Hôtellerie & Restauration',
  'hotellerie-restauration',
  'Formation complète en gestion hôtelière et service de restauration.',
  'Tous niveaux',
  '#06b6d4'
UNION ALL
SELECT 
  (SELECT id FROM formation_categories WHERE slug = 'formations-diplomantes'),
  'Elevage',
  'elevage',
  'Formation aux techniques modernes d''élevage et de production animale.',
  'Tous niveaux',
  '#84cc16'
UNION ALL
SELECT 
  (SELECT id FROM formation_categories WHERE slug = 'formations-diplomantes'),
  'Coiffure & Esthétique',
  'coiffure-esthetique',
  'Formation professionnelle en coiffure, soins esthétiques et cosmétologie.',
  'Tous niveaux',
  '#a855f7'
UNION ALL
SELECT 
  (SELECT id FROM formation_categories WHERE slug = 'formations-diplomantes'),
  'Couture Homme',
  'couture-homme',
  'Formation en couture et confection pour vêtements masculins.',
  'Tous niveaux',
  '#0891b2'
UNION ALL
SELECT 
  (SELECT id FROM formation_categories WHERE slug = 'formations-diplomantes'),
  'Couture Dame',
  'couture-dame',
  'Formation en couture et confection pour vêtements féminins.',
  'Tous niveaux',
  '#db2777'
UNION ALL
SELECT 
  (SELECT id FROM formation_categories WHERE slug = 'formations-diplomantes'),
  'Haute Couture',
  'haute-couture',
  'Formation d''excellence en haute couture et création de mode.',
  'Tous niveaux',
  '#c026d3'
UNION ALL
SELECT 
  (SELECT id FROM formation_categories WHERE slug = 'formations-diplomantes'),
  'Stylisme',
  'stylisme',
  'Formation en stylisme, modélisme et création de mode.',
  'Tous niveaux',
  '#16a34a'
UNION ALL
SELECT 
  (SELECT id FROM formation_categories WHERE slug = 'formations-diplomantes'),
  'Stylisme Modélisme',
  'stylisme-modelisme',
  'Formation approfondie en stylisme et techniques de modélisme.',
  'Tous niveaux',
  '#059669'
UNION ALL
SELECT 
  (SELECT id FROM formation_categories WHERE slug = 'formations-diplomantes'),
  'Make up - Onglerie - Attache Foulard - Purruquerie',
  'make-up-onglerie-attache-foulard',
  'Formation complète en maquillage professionnel, pose d''ongles, art du foulard et perruques.',
  'Tous niveaux',
  '#be185d'
UNION ALL
SELECT 
  (SELECT id FROM formation_categories WHERE slug = 'autres-formations'),
  'Word - PowerPoint - Electricité Bâtiment - Systèmes Solaires Photovoltaïques',
  'word-powerpoint-electricite-batiment-solaire',
  'Filière recommandée pour détenteur de l''un des diplômes suivants ou équivalents : CEP ; BEPC ou non ; BAC ou non ou tout autre diplôme équivalent.',
  'CEP, BEPC ou BAC',
  '#3b82f6'
UNION ALL
SELECT 
  (SELECT id FROM formation_categories WHERE slug = 'autres-formations'),
  'Word - PowerPoint - Plomberie',
  'word-powerpoint-plomberie',
  'Filière recommandée pour détenteur de l''un des diplômes suivants ou équivalents : CEP ; BEPC ou non ; BAC ou non ou tout autre diplôme équivalent.',
  'CEP, BEPC ou BAC',
  '#0ea5e9'
UNION ALL
SELECT 
  (SELECT id FROM formation_categories WHERE slug = 'autres-formations'),
  'Electricité Bâtiment - Froid et Climatisation - Word - PowerPoint',
  'electricite-batiment-froid-climatisation-word-powerpoint',
  'Filière recommandée pour détenteur de l''un des diplômes suivants ou équivalents : CEP ; BEPC ou non ; BAC ou non ou tout autre diplôme équivalent.',
  'CEP, BEPC ou BAC',
  '#06b6d4'
UNION ALL
SELECT 
  (SELECT id FROM formation_categories WHERE slug = 'autres-formations'),
  'Electricité Bâtiment - Froid et Climatisation - Plomberie',
  'electricite-batiment-froid-climatisation-plomberie',
  'Filière recommandée pour détenteur de l''un des diplômes suivants ou équivalents : CEP ; BEPC ou non ; BAC ou non ou tout autre diplôme équivalent.',
  'CEP, BEPC ou BAC',
  '#14b8a6';