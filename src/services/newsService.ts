import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export type News = Tables<"news">;
export type NewsImage = Tables<"news_images">;

export const newsService = {
  async getAll() {
    const { data, error } = await supabase
      .from("news")
      .select(`
        *,
        news_images (
          id,
          image_url,
          display_order
        )
      `)
      .order("created_at", { ascending: false });
    
    return { data: data || [], error };
  },

  async getBySlug(slug: string) {
    const { data, error } = await supabase
      .from("news")
      .select(`
        *,
        news_images (
          id,
          image_url,
          display_order
        )
      `)
      .eq("slug", slug)
      .single();
    
    return { data, error };
  },

  async create(news: Omit<News, "id" | "created_at" | "updated_at">, imageUrls: string[] = []) {
    const { data, error } = await supabase
      .from("news")
      .insert(news)
      .select()
      .single();
    
    if (error || !data) {
      return { data: null, error };
    }

    // Insert images
    if (imageUrls.length > 0) {
      const newsImages = imageUrls.map((url, index) => ({
        news_id: data.id,
        image_url: url,
        display_order: index,
      }));

      const { error: imagesError } = await supabase
        .from("news_images")
        .insert(newsImages);

      if (imagesError) {
        console.error("Error inserting images:", imagesError);
      }
    }

    return { data, error: null };
  },

  async update(id: string, news: Partial<News>, imageUrls?: string[]) {
    const { data, error } = await supabase
      .from("news")
      .update(news)
      .eq("id", id)
      .select()
      .single();
    
    if (error || !data) {
      return { data: null, error };
    }

    // Update images if provided
    if (imageUrls !== undefined) {
      // Delete old images
      await supabase
        .from("news_images")
        .delete()
        .eq("news_id", id);

      // Insert new images
      if (imageUrls.length > 0) {
        const newsImages = imageUrls.map((url, index) => ({
          news_id: id,
          image_url: url,
          display_order: index,
        }));

        const { error: imagesError } = await supabase
          .from("news_images")
          .insert(newsImages);

        if (imagesError) {
          console.error("Error inserting images:", imagesError);
        }
      }
    }

    return { data, error: null };
  },

  async delete(id: string) {
    // Images will be deleted automatically via ON DELETE CASCADE
    const { error } = await supabase
      .from("news")
      .delete()
      .eq("id", id);
    
    return { error };
  },
};