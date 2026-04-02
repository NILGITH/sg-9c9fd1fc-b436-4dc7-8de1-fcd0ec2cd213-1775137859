import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export type Enrollment = Tables<"enrollments">;

export const enrollmentService = {
  async getAll() {
    const { data, error } = await supabase
      .from("enrollments")
      .select(`
        *,
        formations (
          id,
          title
        )
      `)
      .order("created_at", { ascending: false });

    return { data, error };
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from("enrollments")
      .select(`
        *,
        formations (
          id,
          title
        )
      `)
      .eq("id", id)
      .single();

    return { data, error };
  },

  async create(enrollment: any) {
    console.log("EnrollmentService: Creating enrollment with data:", enrollment);

    // Validate required fields
    if (!enrollment.first_name || !enrollment.last_name || !enrollment.email || !enrollment.phone) {
      console.error("EnrollmentService: Missing required fields");
      return { 
        data: null, 
        error: { message: "Tous les champs obligatoires doivent être remplis" } 
      };
    }

    if (!enrollment.formation_id) {
      console.error("EnrollmentService: Missing formation_id");
      return { 
        data: null, 
        error: { message: "Veuillez sélectionner une formation" } 
      };
    }

    try {
      const { data, error } = await supabase
        .from("enrollments")
        .insert([enrollment])
        .select()
        .single();

      if (error) {
        console.error("EnrollmentService: Database error:", error);
        return { data: null, error };
      }

      console.log("EnrollmentService: Enrollment created successfully:", data);
      return { data, error: null };
    } catch (err: any) {
      console.error("EnrollmentService: Unexpected error:", err);
      return { 
        data: null, 
        error: { message: err.message || "Erreur inattendue lors de la création" } 
      };
    }
  },

  async update(id: string, updates: Partial<Enrollment>) {
    console.log("EnrollmentService: Updating enrollment:", id, updates);

    const { data, error } = await supabase
      .from("enrollments")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("EnrollmentService: Update error:", error);
    } else {
      console.log("EnrollmentService: Updated successfully:", data);
    }

    return { data, error };
  },

  async delete(id: string) {
    const { error } = await supabase
      .from("enrollments")
      .delete()
      .eq("id", id);

    return { error };
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