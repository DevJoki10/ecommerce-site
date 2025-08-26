// Mock authentication functions for development
export interface AuthUser {
  id: string
  email: string
  profile?: any
}

export const auth = {
  // Mock sign up
  async signUp(email: string, password: string, userData?: any) {
    return Promise.resolve({ 
      data: null, 
      error: { message: 'Authentication not configured. Please set up Supabase.' } 
    })
  },

  // Mock sign in
  async signIn(email: string, password: string) {
    return Promise.resolve({ 
      data: null, 
      error: { message: 'Authentication not configured. Please set up Supabase.' } 
    })
  },

  // Mock Google sign in
  async signInWithGoogle() {
    return Promise.resolve({ 
      data: null, 
      error: { message: 'Authentication not configured. Please set up Supabase.' } 
    })
  },

  // Mock sign out
  async signOut() {
    return Promise.resolve({ error: null })
  },

  // Mock get current user
  async getCurrentUser(): Promise<AuthUser | null> {
    return null
  },

  // Mock update profile
  async updateProfile(userId: string, updates: any) {
    return Promise.resolve({ 
      data: null, 
      error: { message: 'Authentication not configured. Please set up Supabase.' } 
    })
  },

  // Mock reset password
  async resetPassword(email: string) {
    return Promise.resolve({ error: null })
  },

  // Mock update password
  async updatePassword(password: string) {
    return Promise.resolve({ error: null })
  }
}