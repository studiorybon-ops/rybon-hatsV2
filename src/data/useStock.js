import { initializeApp, getApp } from 'firebase/app'
import { getFirestore, doc, runTransaction } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDb01FXB_GE8nbRkahbdVnV6QrpU6HYePI",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "rybon-hats-ffc24.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "rybon-hats-ffc24",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "rybon-hats-ffc24.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "676180612675",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:676180612675:web:6ea89a397bb3d15a2126f6"
}

let app
try { app = getApp('rybon-web-stock') } catch { app = initializeApp(firebaseConfig, 'rybon-web-stock') }
const db = getFirestore(app)

export const decrementStock = async (slug, quantity) => {
  try {
    const productRef = doc(db, 'products', slug)
    await runTransaction(db, async (transaction) => {
      const docSnap = await transaction.get(productRef)
      if (!docSnap.exists()) throw new Error('Producto no encontrado')
      const newStock = docSnap.data().stock - quantity
      if (newStock < 0) throw new Error('Stock insuficiente')
      transaction.update(productRef, { stock: newStock })
    })
  } catch (err) {
    console.error('Error al actualizar stock:', err)
  }
}
