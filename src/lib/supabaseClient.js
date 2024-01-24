import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY;

if (!SUPABASE_KEY || !SUPABASE_URL) {
  throw new Error(
    "Supabase key is required. Make sure it is defined in your .env file."
  );
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
