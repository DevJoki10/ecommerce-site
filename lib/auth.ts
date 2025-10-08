// Firebase authentication functions
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  updatePassword as firebaseUpdatePassword,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

export interface AuthUser {
  id: string;
  email: string;
  profile?: any;
}

export interface UserProfile {
  id: string;
  email: string;
  fullName?: string;
  phone?: string;
  avatarUrl?: string;
  role: 'buyer' | 'seller' | 'admin';
  sellerStatus?: 'pending' | 'approved' | 'suspended' | 'rejected';
  businessName?: string;
  businessAddress?: string;
  taxId?: string;
  bankAccountDetails?: any;
  preferences?: any;
  createdAt: Date;
  updatedAt: Date;
}

const googleProvider = new GoogleAuthProvider();

export const authService = {
  // Sign up with email and password
  async signUp(email: string, password: string, userData?: any) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Create user profile in Firestore
      const userProfile: UserProfile = {
        id: user.uid,
        email: user.email!,
        fullName: userData?.full_name || userData?.fullName || '',
        phone: userData?.phone || '',
        role: userData?.role || 'buyer',
        sellerStatus: userData?.role === 'seller' ? 'pending' : undefined,
        businessName: userData?.businessName || '',
        createdAt: new Date(),
        updatedAt: new Date(),
        ...userData
      };

      await setDoc(doc(db, 'users', user.uid), userProfile);

      return { data: { user: userCredential.user }, error: null };
    } catch (error: any) {
      return { data: null, error: { message: error.message } };
    }
  },

  // Sign in with email and password
  async signIn(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return { data: { user: userCredential.user }, error: null };
    } catch (error: any) {
      return { data: null, error: { message: error.message } };
    }
  },

  // Sign in with Google
  async signInWithGoogle() {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Check if user profile exists, create if not
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (!userDoc.exists()) {
        const userProfile: UserProfile = {
          id: user.uid,
          email: user.email!,
          fullName: user.displayName || '',
          avatarUrl: user.photoURL || '',
          role: 'buyer',
          createdAt: new Date(),
          updatedAt: new Date()
        };
        await setDoc(doc(db, 'users', user.uid), userProfile);
      }

      return { data: { user }, error: null };
    } catch (error: any) {
      return { data: null, error: { message: error.message } };
    }
  },

  // Sign out
  async signOut() {
    try {
      await firebaseSignOut(auth);
      return { error: null };
    } catch (error: any) {
      return { error: { message: error.message } };
    }
  },

  // Get current user
  async getCurrentUser(): Promise<AuthUser | null> {
    return new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        unsubscribe();
        if (user) {
          // Get user profile from Firestore
          try {
            const userDoc = await getDoc(doc(db, 'users', user.uid));
            const profile = userDoc.exists() ? userDoc.data() : null;
          
            resolve({
              id: user.uid,
              email: user.email!,
              profile
            });
          } catch (error) {
            console.error('Error fetching user profile:', error);
            resolve({
              id: user.uid,
              email: user.email!,
              profile: null
            });
          }
        } else {
          resolve(null);
        }
      });
    });
  },

  // Update user profile
  async updateProfile(userId: string, updates: any) {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        ...updates,
        updatedAt: new Date()
      });
      return { data: updates, error: null };
    } catch (error: any) {
      return { data: null, error: { message: error.message } };
    }
  },

  // Reset password
  async resetPassword(email: string) {
    try {
      await sendPasswordResetEmail(auth, email);
      return { error: null };
    } catch (error: any) {
      return { error: { message: error.message } };
    }
  },

  // Update password
  async updatePassword(password: string) {
    try {
      if (auth.currentUser) {
        await firebaseUpdatePassword(auth.currentUser, password);
        return { error: null };
      }
      return { error: { message: 'No user logged in' } };
    } catch (error: any) {
      return { error: { message: error.message } };
    }
  },

  // Listen to auth state changes
  onAuthStateChange(callback: (user: AuthUser | null) => void) {
    return onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          const profile = userDoc.exists() ? userDoc.data() : null;
        
          callback({
            id: user.uid,
            email: user.email!,
            profile
          });
        } catch (error) {
          console.error('Error fetching user profile:', error);
          callback({
            id: user.uid,
            email: user.email!,
            profile: null
          });
        }
      } else {
        callback(null);
      }
    });
  }
};
