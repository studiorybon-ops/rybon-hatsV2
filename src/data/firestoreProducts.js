import { initializeApp } from 'firebase/app'
import { getFirestore, collection, query, orderBy, onSnapshot, doc, getDoc } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDb01FXB_GE8nbRkahbdVnV6QrpU6HYePI",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "rybon-hats-ffc24.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "rybon-hats-ffc24",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "rybon-hats-ffc24.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "676180612675",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:676180612675:web:6ea89a397bb3d15a2126f6"
}

const app = initializeApp(firebaseConfig, 'rybon-web')
const db = getFirestore(app)

function normalizeProduct(doc) {
  const data = doc.data()
  return {
    id: data.slug || doc.id,
    slug: data.slug || doc.id,
    name: data.name || data.slug || doc.id,
    price: Number(data.price) || 0,
    currency: 'DOP',
    quantity: Number(data.stock) || 0,
    available: data.active !== false && Number(data.stock) > 0,
    description: data.description || '',
    images: (data.images || []).map(img => img.data || img).filter(Boolean),
    color: data.color || '',
    hasAccesories: data.hasAccesories || false,
    accesoriesInfo: data.accesoriesInfo || '',
  }
}

export function listenProducts(callback) {
  const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'))
  return onSnapshot(q,
    (snapshot) => {
      const products = snapshot.docs.map(normalizeProduct)
      callback(products)
    },
    (error) => {
      console.warn('Firestore error, usando fallback local:', error.message)
      callback([])
    }
  )
}

export async function getProductBySlug(slug) {
  try {
    const ref = doc(db, 'products', slug)
    const snap = await getDoc(ref)
    if (snap.exists()) return normalizeProduct(snap)
    return null
  } catch {
    return null
  }
}
