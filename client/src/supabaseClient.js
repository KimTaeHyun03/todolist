import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://dzwrqscrhbghwuqadyzs.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR6d3Jxc2NyaGJnaHd1cWFkeXpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg0ODE0NzksImV4cCI6MjA1NDA1NzQ3OX0.9mYOtowRGmSJ60AkKH15ExKO4nitKzshyjUoJN-KalM";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabase;