-- Supprimer l'ancienne politique qui ne gère pas correctement les DELETE
DROP POLICY IF EXISTS "auth_manage_formations" ON formations;

-- Créer 3 nouvelles politiques séparées pour plus de clarté
CREATE POLICY "auth_insert_formations" ON formations
  FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "auth_update_formations" ON formations
  FOR UPDATE
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "auth_delete_formations" ON formations
  FOR DELETE
  USING (auth.uid() IS NOT NULL);