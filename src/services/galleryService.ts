import { supabase } from "@/integrations/supabase/client";
import type { Tables, TablesInsert } from "@/integrations/supabase/types";

export type GalleryMedia = Tables<"gallery">;

export const galleryService = {
  async getAll(type?: "photo" | "video") {
    let query = supabase
      .from("gallery")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (type) {
      query = query.eq("media_type", type);
    }
    
    const { data, error } = await query;
    
    console.log("Gallery query:", { data, error });
    if (error) console.error("Error:", error);
    
    return { data: data || [], error };
  },

  async create(media: TablesInsert<"gallery">) {
    const { data, error } = await supabase
      .from("gallery")
      .insert(media)
      .select()
      .single();
    
    console.log("Create media:", { data, error });
    if (error) console.error("Error:", error);
    
    return { data, error };
  },

  async update(id: string, updates: Partial<GalleryMedia>) {
    const { data, error } = await supabase
      .from("gallery")
      .update(updates)
      .eq("id", id)
      .select()
      .single();
    
    console.log("Update media:", { data, error });
    if (error) console.error("Error:", error);
    
    return { data, error };
  },

  async delete(id: string) {
    const { error } = await supabase
      .from("gallery")
      .delete()
      .eq("id", id);
    
    console.log("Delete media:", { error });
    if (error) console.error("Error:", error);
    
    return { error };
  }
};