import { collection, query, orderBy, onSnapshot, doc, getDoc } from 'firebase/firestore'
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
  let fallbackUnsub = null
  const ref = collection(db, 'products')
  const q = query(ref, orderBy('createdAt', 'desc'))
  const mainUnsub = onSnapshot(q,
    (snapshot) => {
      callback(snapshot.docs.map(normalizeProduct))
    },
    (error) => {
      console.warn('Firestore orderBy error, retrying without:', error.message)
      fallbackUnsub = onSnapshot(ref,
        (snapshot) => {
          callback(snapshot.docs.map(normalizeProduct))
        },
        () => callback([])
      )
    }
  )
  return () => {
    mainUnsub()
    if (fallbackUnsub) fallbackUnsub()
  }
}

export function listenProduct(slug, callback) {
  const ref = doc(db, 'products', slug)
  return onSnapshot(ref,
    (snap) => {
      if (snap.exists()) callback(normalizeProduct(snap))
      else callback(null)
    },
    () => callback(null)
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
