import { createClient } from '@supabase/supabase-js';
import { triggerRestore } from './db-wake.js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
  global: {
    fetch: async (url, options) => {
      const res = await fetch(url, options);

      if (!res.ok && res.status >= 500) {
        triggerRestore();
      }

      return res;
    },
  },
});

export default supabase;