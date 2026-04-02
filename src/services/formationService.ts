import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export type Formation = Tables<"formations">;

export const formationService = {
  async getAll() {
    const { data, error } = await supabase
      .from("formations")
      .select("*")
      .order("title", { ascending: true });
    
    console.log("Formations query:", { data, error });
    if (error) console.error("Error:", error);
    
    return { data: data || [], error };
  },

  async getByCategory(category: string) {
    const { data, error } = await supabase
      .from("formations")
      .select("*")
      .eq("category_id", category)
      .order("title", { ascending: true });
    
    console.log("Formations by category:", { data, error });
    if (error) console.error("Error:", error);
    
    return { data: data || [], error };
  },

  async getBySlug(slug: string) {
    const { data, error } = await supabase
      .from("formations")
      .select("*")
      .eq("slug", slug)
      .single();
    
    console.log("Formation by slug:", { data, error });
    if (error) console.error("Error:", error);
    
    return { data, error };
  }
};