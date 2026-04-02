-- Fix RLS policies for enrollments table to allow anonymous inserts (public form)
-- The enrollment form is PUBLIC, so we need to allow unauthenticated users to create enrollments

-- Drop existing policies if any
DROP POLICY IF EXISTS "anon_insert_enrollments" ON enrollments;
DROP POLICY IF EXISTS "public_read_enrollments" ON enrollments;
DROP POLICY IF EXISTS "auth_update_enrollments" ON enrollments;

-- Enable RLS (if not already enabled)
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to INSERT (public enrollment form)
CREATE POLICY "anon_insert_enrollments" ON enrollments
  FOR INSERT
  WITH CHECK (true);

-- Allow public READ access (for admins to view)
CREATE POLICY "public_read_enrollments" ON enrollments
  FOR SELECT
  USING (true);

-- Allow authenticated users (admins) to UPDATE
CREATE POLICY "auth_update_enrollments" ON enrollments
  FOR UPDATE
  USING (auth.uid() IS NOT NULL);

-- Allow authenticated users (admins) to DELETE
CREATE POLICY "auth_delete_enrollments" ON enrollments
  FOR DELETE
  USING (auth.uid() IS NOT NULL);