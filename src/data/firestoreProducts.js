import { collection, onSnapshot, doc, getDoc } from 'firebase/firestore'
import { db } from '../lib/firebase'

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
  const ref = collection(db, 'products')
  return onSnapshot(ref,
    (snapshot) => {
      const products = snapshot.docs.map(normalizeProduct)
      callback(products)
    },
    (error) => {
      console.warn('Firestore error:', error.message)
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
