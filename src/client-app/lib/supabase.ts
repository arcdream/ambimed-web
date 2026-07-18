import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const PLACEHOLDER_URL = 'https://placeholder.supabase.co'
const PLACEHOLDER_KEY = 'placeholder'

export type SupabaseConfig = {
  url: string
  anonKey: string
}

let client: SupabaseClient | null = null
let configuredUrl = ''
let configuredAnon = ''

function createSupabaseClient(url: string, anonKey: string) {
  return createClient(url, anonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    },
  })
}

/** Called from root Providers with server-resolved env (runtime on Vercel). */
export function initSupabase(config: SupabaseConfig) {
  const url = config.url.trim()
  const anonKey = config.anonKey.trim()
  if (!url || !anonKey) return

  if (client && configuredUrl === url && configuredAnon === anonKey) return

  configuredUrl = url
  configuredAnon = anonKey
  client = createSupabaseClient(url, anonKey)
}

function resolveClient(): SupabaseClient {
  if (!client) {
    initSupabase({
      url: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
    })
  }

  return client ?? createSupabaseClient(PLACEHOLDER_URL, PLACEHOLDER_KEY)
}

export function isSupabaseConfigured(): boolean {
  if (configuredUrl && configuredAnon) return true

  const url = (process.env.NEXT_PUBLIC_SUPABASE_URL || '').trim()
  const anonKey = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '').trim()
  return Boolean(url && anonKey)
}

export const supabase: SupabaseClient = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    const resolved = resolveClient()
    const value = resolved[prop as keyof SupabaseClient]
    if (typeof value === 'function') {
      return (value as (...args: unknown[]) => unknown).bind(resolved)
    }
    return value
  },
})
