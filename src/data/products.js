import { getProductBySlug as getFSProduct } from './firestoreProducts'

export const brandInfo = {
  name: 'Rybon',
  country: 'República Dominicana',
  email: 'studiorybon@gmail.com',
  instagram: 'rybon.ry',
  tiktok: 'rybon.ry',
  hours: '24/7',
  concept: 'Autenticidad que no se negocia. Cada diseño es una declaración. Ediciones limitadas para los que entienden.',
  logoUrl: '/logo-rybon.png',
}

export const fallbackProducts = [
  {
    id: 'rybon-sky',
    slug: 'rybon-sky',
    name: 'RYBON SKY',
    price: 1250,
    currency: 'DOP',
    quantity: 8,
    available: true,
    description: 'Negro profundo con detalles en azul. Edición limitada. Para los que entienden.',
    images: ['/images/sky/sky-1.jpg', '/images/sky/sky-2.jpg', '/images/sky/sky-3.jpg', '/images/sky/sky-4.jpg'],
    color: 'Negro / Azul',
  },
  {
    id: 'rybon-loyal',
    slug: 'rybon-loyal',
    name: 'RYBON LOYAL',
    price: 1250,
    currency: 'DOP',
    quantity: 8,
    available: true,
    description: 'Negro profundo con detalles en rojo. Identidad que no se negocia. Edición limitada.',
    images: ['/images/loyal/loyal-1.jpg', '/images/loyal/loyal-2.jpg', '/images/loyal/loyal-3.jpg', '/images/loyal/loyal-4.jpg'],
    color: 'Negro / Rojo',
  },
]

export async function getProductBySlug(slug) {
  try {
    const fsProduct = await getFSProduct(slug)
    if (fsProduct) return fsProduct
  } catch {}
  return fallbackProducts.find(p => p.slug === slug) || null
}
