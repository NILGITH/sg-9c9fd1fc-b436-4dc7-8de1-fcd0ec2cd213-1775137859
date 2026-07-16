import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export type News = Tables<"news">;

export const newsService = {
  async getAll() {
    const { data, error } = await supabase
      .from("news")
      .select("*")
      .eq("published", true)
      .order("published_at", { ascending: false });
    
    return { data: data || [], error };
  },

  async getBySlug(slug: string): Promise<{ data: News | null; error: any }> {
    const { data, error } = await supabase
      .from("news")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();
    
    return { data, error };
  },

  async create(news: Omit<News, "id" | "created_at" | "updated_at">) {
    const { data, error } = await supabase
      .from("news")
      .insert(news)
      .select()
      .single();
    
    return { data, error };
  },

  async update(id: string, news: Partial<News>) {
    const { data, error } = await supabase
      .from("news")
      .update(news)
      .eq("id", id)
      .select()
      .single();
    
    return { data, error };
  },

  async delete(id: string) {
    const { error } = await supabase
      .from("news")
      .delete()
      .eq("id", id);
    
    return { error };
  },

  generateSlug(title: string): string {
    return title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  },

  async uploadImage(file: File) {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `news/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("public")
      .upload(filePath, file);

    if (uploadError) {
      return { data: null, error: uploadError };
    }

    const { data: { publicUrl } } = supabase.storage
      .from("public")
      .getPublicUrl(filePath);

    return { data: publicUrl, error: null };
  },

  async getRelated(currentSlug: string, limit = 3) {
    const { data, error } = await supabase
      .from("news")
      .select("*")
      .eq("published", true)
      .neq("slug", currentSlug)
      .order("published_at", { ascending: false })
      .limit(limit);
    
    return { data: data || [], error };
  },

  async getAllSlugs() {
    const { data, error } = await supabase
      .from("news")
      .select("slug")
      .eq("published", true);
    
    return { data: data || [], error };
  },
};