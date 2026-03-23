import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

const supabasekey = import.meta.env.VITE_SUPABASE_API_ΚΕΥ;

export const supabase = createClient(supabaseUrl, supabaseKey);