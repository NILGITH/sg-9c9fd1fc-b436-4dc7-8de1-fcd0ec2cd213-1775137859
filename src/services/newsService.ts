import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export type News = Tables<"news">;

export const newsService = {
  async getAll() {
    const { data, error } = await supabase
      .from("news")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false });
    
    console.log("News query:", { data, error });
    if (error) console.error("Error:", error);
    
    return { data: data || [], error };
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from("news")
      .select("*")
      .eq("id", id)
      .single();
    
    console.log("News by ID:", { data, error });
    if (error) console.error("Error:", error);
    
    return { data, error };
  },

  async create(news: Omit<News, "id" | "created_at" | "updated_at">) {
    const { data, error } = await supabase
      .from("news")
      .insert(news)
      .select()
      .single();
    
    console.log("Create news:", { data, error });
    if (error) console.error("Error:", error);
    
    return { data, error };
  },

  async update(id: string, updates: Partial<News>) {
    const { data, error } = await supabase
      .from("news")
      .update(updates)
      .eq("id", id)
      .select()
      .single();
    
    console.log("Update news:", { data, error });
    if (error) console.error("Error:", error);
    
    return { data, error };
  },

  async delete(id: string) {
    const { error } = await supabase
      .from("news")
      .delete()
      .eq("id", id);
    
    console.log("Delete news:", { error });
    if (error) console.error("Error:", error);
    
    return { error };
  }
};