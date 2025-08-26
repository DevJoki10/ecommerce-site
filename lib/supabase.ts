// Mock Supabase client for development without actual Supabase setup
const mockSupabaseUrl = 'https://mock.supabase.co'
const mockSupabaseKey = 'mock-key'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || mockSupabaseUrl
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || mockSupabaseKey

// Create a mock client that doesn't require actual Supabase connection
export const supabase = {
  auth: {
    getUser: () => Promise.resolve({ data: { user: null }, error: null }),
    getSession: () => Promise.resolve({ data: { session: null }, error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    signUp: () => Promise.resolve({ data: null, error: { message: 'Authentication not configured' } }),
    signInWithPassword: () => Promise.resolve({ data: null, error: { message: 'Authentication not configured' } }),
    signInWithOAuth: () => Promise.resolve({ data: null, error: { message: 'Authentication not configured' } }),
    signOut: () => Promise.resolve({ error: null }),
    resetPasswordForEmail: () => Promise.resolve({ error: null }),
    updateUser: () => Promise.resolve({ error: null })
  },
  from: () => ({
    select: () => ({
      eq: () => ({
        single: () => Promise.resolve({ data: null, error: null }),
        limit: () => Promise.resolve({ data: [], error: null })
      }),
      order: () => ({
        limit: () => Promise.resolve({ data: [], error: null })
      }),
      limit: () => Promise.resolve({ data: [], error: null })
    }),
    insert: () => ({
      select: () => ({
        single: () => Promise.resolve({ data: null, error: null })
      })
    }),
    update: () => ({
      eq: () => ({
        select: () => ({
          single: () => Promise.resolve({ data: null, error: null })
        })
      })
    }),
    delete: () => ({
      eq: () => Promise.resolve({ error: null })
    })
  })
}

// Server-side client (same mock for now)
export const supabaseAdmin = supabase