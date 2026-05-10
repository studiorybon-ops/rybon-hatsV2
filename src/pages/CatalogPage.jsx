import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ProductCard from '../components/ProductCard'
import CursorGlow from '../components/CursorGlow'
import { listenProducts } from '../data/firestoreProducts'
import { fallbackProducts } from '../data/products'

const CatalogPage = () => {
  const [products, setProducts] = useState(fallbackProducts)
  const [loading, setLoading] = useState(true)
  const [usingFirestore, setUsingFirestore] = useState(false)

  useEffect(() => {
    const unsub = listenProducts((data) => {
      if (data.length > 0) {
        const merged = data.map(p => {
          const fallback = fallbackProducts.find(f => f.slug === p.slug)
          const hasSvg = p.images?.length && p.images[0]?.startsWith?.('data:image/svg')
          if (fallback && (hasSvg || !p.images?.length)) {
            return { ...p, images: fallback.images }
          }
          return p
        })
        setProducts(merged)
        setUsingFirestore(true)
      }
      setLoading(false)
    })
    return unsub
  }, [])

  return (
    <div className="min-h-[100dvh] bg-surface">
      <Header />
      <CursorGlow />

      <main className="relative pt-28 pb-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12"
          >
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-tight text-white leading-none">
              Catálogo
            </h1>
            <p className="mt-3 text-zinc-600 font-body text-sm max-w-xl">
              {loading ? 'Cargando...' : `${products.length} modelos · Ediciones limitadas · Envíos próximamente`}
            </p>
          </motion.div>

          {loading ? (
            <div className="py-32 flex items-center justify-center">
              <div className="w-6 h-6 border border-zinc-600 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {products.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          )}

          {!loading && products.length === 0 && (
            <div className="py-32 text-center">
              <p className="text-zinc-700 font-body text-sm tracking-wider uppercase">Próximamente</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default CatalogPage
