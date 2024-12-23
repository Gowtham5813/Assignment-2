
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wjdynhmwsftyxepllnsn.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqZHluaG13c2Z0eXhlcGxsbnNuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ2MjgwMzQsImV4cCI6MjA1MDIwNDAzNH0.jvjdrZCNroQsNRzXyNqp00_Rd1gHI9Vf_0a5unqEMK0'


export const supabase = createClient(supabaseUrl, supabaseKey)

