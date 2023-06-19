import { createClient } from "@supabase/supabase-js"

const supabase = createClient('https://nwkldbpebxtpwzgwduuj.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53a2xkYnBlYnh0cHd6Z3dkdXVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQxNzI3MjIsImV4cCI6MTk5OTc0ODcyMn0.iJ-0p9iVEMFZs3rN1PEtKHEPpfLCGMZEvxYrbQyAJyI')

export default supabase