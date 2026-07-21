import { createBrowserClient } from '@supabase/ssr'
import { cred } from '../cred'

export function createClient() {

  
  return createBrowserClient(
    cred.NEXT_PUBLIC_SUPABASE_URL,
    cred.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
}