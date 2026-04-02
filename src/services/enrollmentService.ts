import { supabase } from "@/integrations/supabase/client";
import type { Tables, TablesInsert } from "@/integrations/supabase/types";

export type Enrollment = Tables<"enrollments">;
export type FormationSession = Tables<"formation_sessions">;

export const enrollmentService = {
  async create(enrollment: TablesInsert<"enrollments">) {
    const { data, error } = await supabase
      .from("enrollments")
      .insert(enrollment)
      .select()
      .single();
    
    console.log("Create enrollment:", { data, error });
    if (error) console.error("Error:", error);
    
    return { data, error };
  },

  async getByUserId(userId: string) {
    const { data, error } = await supabase
      .from("enrollments")
      .select("*, formations(*)")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });
    
    return { data: data || [], error };
  },

  async updatePaymentStatus(id: string, status: string, amount?: number) {
    const updates: Partial<Enrollment> = {
      payment_status: status,
      updated_at: new Date().toISOString(),
    };
    
    if (amount) {
      updates.payment_amount = amount;
      updates.payment_date = new Date().toISOString();
    }

    const { data, error } = await supabase
      .from("enrollments")
      .update(updates)
      .eq("id", id)
      .select()
      .single();
    
    return { data, error };
  },
};

export const sessionService = {
  async getUpcoming() {
    const { data, error } = await supabase
      .from("formation_sessions")
      .select("*, formations(*)")
      .eq("status", "open")
      .gte("start_date", new Date().toISOString().split("T")[0])
      .order("start_date", { ascending: true });
    
    return { data: data || [], error };
  },

  async getByFormation(formationId: string) {
    const { data, error } = await supabase
      .from("formation_sessions")
      .select("*")
      .eq("formation_id", formationId)
      .eq("status", "open")
      .gte("start_date", new Date().toISOString().split("T")[0])
      .order("start_date", { ascending: true });
    
    return { data: data || [], error };
  },
};