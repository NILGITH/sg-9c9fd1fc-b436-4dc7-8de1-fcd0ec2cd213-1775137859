-- Create table for news images (multiple images per news article)
CREATE TABLE IF NOT EXISTS news_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  news_id UUID NOT NULL REFERENCES news(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE news_images ENABLE ROW LEVEL SECURITY;

-- Drop policies if they exist to recreate them safely
DROP POLICY IF EXISTS "public_read_news_images" ON news_images;
DROP POLICY IF EXISTS "auth_insert_news_images" ON news_images;
DROP POLICY IF EXISTS "auth_update_news_images" ON news_images;
DROP POLICY IF EXISTS "auth_delete_news_images" ON news_images;

-- Policies for news_images
CREATE POLICY "public_read_news_images" ON news_images FOR SELECT USING (true);
CREATE POLICY "auth_insert_news_images" ON news_images FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "auth_update_news_images" ON news_images FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "auth_delete_news_images" ON news_images FOR DELETE USING (auth.uid() IS NOT NULL);

-- Create storage bucket if not exists for public access
INSERT INTO storage.buckets (id, name, public)
VALUES ('uploads', 'uploads', true)
ON CONFLICT (id) DO NOTHING;

-- Drop storage policies if they exist safely
DROP POLICY IF EXISTS "public_read_uploads" ON storage.objects;
DROP POLICY IF EXISTS "auth_insert_uploads" ON storage.objects;
DROP POLICY IF EXISTS "auth_delete_uploads" ON storage.objects;

-- Storage policies for uploads bucket
CREATE POLICY "public_read_uploads" ON storage.objects FOR SELECT USING (bucket_id = 'uploads');
CREATE POLICY "auth_insert_uploads" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'uploads' AND auth.uid() IS NOT NULL);
CREATE POLICY "auth_delete_uploads" ON storage.objects FOR DELETE USING (bucket_id = 'uploads' AND auth.uid() IS NOT NULL);