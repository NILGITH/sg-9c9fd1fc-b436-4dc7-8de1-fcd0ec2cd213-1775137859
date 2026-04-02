import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export type Payment = Tables<"payments">;

export const paymentService = {
  async getAll() {
    const { data, error } = await supabase
      .from("payments")
      .select(`
        *,
        enrollments (
          id,
          first_name,
          last_name,
          email,
          phone,
          formations (
            title
          )
        )
      `)
      .order("created_at", { ascending: false });
    
    return { data: data || [], error };
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from("payments")
      .select(`
        *,
        enrollments (
          id,
          first_name,
          last_name,
          email,
          phone,
          formations (
            title
          )
        )
      `)
      .eq("id", id)
      .single();
    
    return { data, error };
  },

  async getByEnrollmentId(enrollmentId: string) {
    const { data, error } = await supabase
      .from("payments")
      .select("*")
      .eq("enrollment_id", enrollmentId)
      .order("created_at", { ascending: false });
    
    return { data: data || [], error };
  },

  async create(payment: Omit<Payment, "id" | "created_at" | "updated_at">) {
    const { data, error } = await supabase
      .from("payments")
      .insert(payment)
      .select()
      .single();
    
    return { data, error };
  },

  async update(id: string, payment: Partial<Payment>) {
    const { data, error } = await supabase
      .from("payments")
      .update({ ...payment, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();
    
    return { data, error };
  },

  async validatePayment(id: string, validatedBy: string) {
    const { data, error } = await supabase
      .from("payments")
      .update({
        payment_status: "validated",
        validated_by: validatedBy,
        validated_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();
    
    return { data, error };
  },

  async rejectPayment(id: string, notes: string) {
    const { data, error } = await supabase
      .from("payments")
      .update({
        payment_status: "rejected",
        notes,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();
    
    return { data, error };
  },

  async delete(id: string) {
    const { error } = await supabase
      .from("payments")
      .delete()
      .eq("id", id);
    
    return { error };
  },
};