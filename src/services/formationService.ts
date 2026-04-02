import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export type Formation = Tables<"formations">;

export const formationService = {
  async getAll() {
    const { data, error } = await supabase
      .from("formations")
      .select("*")
      .order("created_at", { ascending: false });
    
    return { data: data || [], error };
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from("formations")
      .select("*")
      .eq("id", id)
      .single();
    
    return { data, error };
  },

  async create(formation: Omit<Formation, "id" | "created_at" | "updated_at">) {
    const { data, error } = await supabase
      .from("formations")
      .insert(formation)
      .select()
      .single();
    
    return { data, error };
  },

  async update(id: string, formation: Partial<Formation>) {
    const { data, error } = await supabase
      .from("formations")
      .update(formation)
      .eq("id", id)
      .select()
      .single();
    
    return { data, error };
  },

  async delete(id: string) {
    const { error } = await supabase
      .from("formations")
      .delete()
      .eq("id", id);
    
    return { error };
  },

  async uploadImage(file: File) {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `formations/${fileName}`;

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
};