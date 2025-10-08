// Firebase configuration and initialization
import { initializeApp, getApps } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyDemo-Key-For-Development-Only",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "kj-electronics-demo.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "kj-electronics-demo",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "kj-electronics-demo.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "123456789012",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:123456789012:web:abcdef123456789012"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Connect to emulators in development (only if not already connected)
if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
  let authEmulatorConnected = false;
  let firestoreEmulatorConnected = false;
  let storageEmulatorConnected = false;

  try {
    // Check if auth emulator is already connected
    if (!authEmulatorConnected && !auth.config.emulator) {
      connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
      authEmulatorConnected = true;
    }
  } catch (error) {
    // Auth emulator already connected or not available
  }

  try {
    // Check if Firestore emulator is already connected
    if (!firestoreEmulatorConnected) {
      connectFirestoreEmulator(db, 'localhost', 8080);
      firestoreEmulatorConnected = true;
    }
  } catch (error) {
    // Firestore emulator already connected or not available
  }

  try {
    // Check if Storage emulator is already connected
    if (!storageEmulatorConnected) {
      connectStorageEmulator(storage, 'localhost', 9199);
      storageEmulatorConnected = true;
    }
  } catch (error) {
    // Storage emulator already connected or not available
  }
}

export default app;