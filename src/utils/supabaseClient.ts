import { createClient } from "@supabase/supabase-js";

// Use type assertion for import.meta to avoid TypeScript errors
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string || "";

// Initialize Supabase client with URL and anon key from environment variables
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
