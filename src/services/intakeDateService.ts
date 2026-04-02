import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export type IntakeDate = Tables<"intake_dates">;

export const intakeDateService = {
  async getAll() {
    const { data, error } = await supabase
      .from("intake_dates")
      .select("*")
      .order("date", { ascending: true });
    
    return { data: data || [], error };
  },

  async getActive() {
    const { data, error } = await supabase
      .from("intake_dates")
      .select("*")
      .eq("is_active", true)
      .order("date", { ascending: true });
    
    return { data: data || [], error };
  },

  async create(intakeDate: Omit<IntakeDate, "id" | "created_at" | "updated_at">) {
    const { data, error } = await supabase
      .from("intake_dates")
      .insert(intakeDate)
      .select()
      .single();
    
    return { data, error };
  },

  async update(id: string, intakeDate: Partial<IntakeDate>) {
    const { data, error } = await supabase
      .from("intake_dates")
      .update({ ...intakeDate, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();
    
    return { data, error };
  },

  async delete(id: string) {
    const { error } = await supabase
      .from("intake_dates")
      .delete()
      .eq("id", id);
    
    return { error };
  },
};