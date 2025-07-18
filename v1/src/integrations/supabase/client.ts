// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://mzjzeizlawauigaulthp.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im16anplaXpsYXdhdWlnYXVsdGhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEzODA1NTUsImV4cCI6MjA2Njk1NjU1NX0.ZRiFVv6tR8xZ3qHQOTE2YGyNLq1oVXo10digYyG4UK4";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});