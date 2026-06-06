import { initializeApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDb01FXB_GE8nbRkahbdVnV6QrpU6HYePI",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "rybon-hats-ffc24.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "rybon-hats-ffc24",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "rybon-hats-ffc24.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "676180612675",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:676180612675:web:6ea89a397bb3d15a2126f6"
}

const existing = getApps().find(a => a.name === 'rybon-web')
const app = existing || initializeApp(firebaseConfig, 'rybon-web')
const db = getFirestore(app)

export { db }
