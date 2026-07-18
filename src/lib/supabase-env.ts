/** Resolve Supabase env on the server (works at runtime on Vercel). */
export function getSupabaseEnv() {
  const url = (
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.SUPABASE_URL ||
    ''
  ).trim()

  const anonKey = (
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    ''
  ).trim()

  return { url, anonKey }
}

export function isSupabaseEnvConfigured(env = getSupabaseEnv()) {
  return Boolean(env.url && env.anonKey)
}
