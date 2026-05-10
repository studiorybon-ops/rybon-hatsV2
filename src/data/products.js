import { getProductBySlug as getFSProduct } from './firestoreProducts'

export const brandInfo = {
  name: 'Rybon Hats',
  country: 'República Dominicana',
  email: 'studiorybon@gmail.com',
  instagram: 'rybon.hats',
  tiktok: 'rybon.hats',
  hours: '24/7',
  concept: 'Gorras con un estilo diferente para quienes buscan destacar. Inspirada en la exclusividad y la autenticidad, cada diseño se crea en ediciones limitadas.',
  logoUrl: 'https://customer-assets.emergentagent.com/job_df23813b-3c3a-4e90-a12c-ea5ad85b93b9/artifacts/u0ichcdd_logo%20png.png',
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
    description: 'Gorra negra con detalles en azul. Edición limitada diseñada para quienes buscan destacar con autenticidad y estilo único.',
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
    description: 'Gorra negra con detalles en rojo. Una pieza con identidad propia, creada en edición limitada para los que valoran la exclusividad.',
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
