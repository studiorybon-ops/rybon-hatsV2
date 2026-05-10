import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ChevronLeft, ChevronRight, ShoppingBag, Check } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { getProductBySlug } from '../data/products'
import { useCart } from '../components/CartContext'

const ProductDetailPage = () => {
  const { slug } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [added, setAdded] = useState(false)
  const { addItem } = useCart()

  useEffect(() => {
    setLoading(true)
    setCurrentImageIndex(0)
    setAdded(false)
    getProductBySlug(slug).then((p) => {
      setProduct(p)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-[100dvh] bg-surface flex items-center justify-center">
        <div className="w-6 h-6 border border-zinc-600 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-[100dvh] bg-surface flex items-center justify-center">
        <div className="text-center space-y-6">
          <h1 className="font-display text-5xl text-white">Producto no encontrado</h1>
          <Link to="/catalogo" className="inline-block btn-secondary text-sm">
            Volver al catálogo
          </Link>
        </div>
      </div>
    )
  }

  const hasImages = product.images && product.images.length > 0
  const currentImage = hasImages ? product.images[currentImageIndex] : ''
  const nextImage = () => setCurrentImageIndex((prev) => prev === product.images.length - 1 ? 0 : prev + 1)
  const prevImage = () => setCurrentImageIndex((prev) => prev === 0 ? product.images.length - 1 : prev - 1)

  const handleAddToCart = () => {
    addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="min-h-[100dvh] bg-surface">
      <Header />

      <main className="relative pt-28 pb-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/catalogo"
              className="inline-flex items-center gap-2 text-zinc-500 hover:text-accent transition-colors font-body text-xs tracking-wider uppercase mb-12 group"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              Volver al catálogo
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4"
            >
              <div className="relative overflow-hidden bg-zinc-900" style={{ aspectRatio: '4/5' }}>
                {hasImages ? (
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentImageIndex}
                      src={currentImage}
                      alt={`${product.name} - Imagen ${currentImageIndex + 1}`}
                      className="w-full h-full object-cover"
                      initial={{ opacity: 0, scale: 1.02 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                    />
                  </AnimatePresence>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-zinc-700 font-body text-sm">
                    Sin imagen
                  </div>
                )}

                {hasImages && product.images.length > 1 && (
                  <>
                    <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 backdrop-blur-sm flex items-center justify-center transition-colors group" aria-label="Imagen anterior">
                      <ChevronLeft size={18} className="text-zinc-300 group-hover:text-white transition-colors" />
                    </button>
                    <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 backdrop-blur-sm flex items-center justify-center transition-colors group" aria-label="Siguiente imagen">
                      <ChevronRight size={18} className="text-zinc-300 group-hover:text-white transition-colors" />
                    </button>
                  </>
                )}

                {hasImages && (
                  <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-black/60 backdrop-blur-sm text-zinc-400 font-body text-[10px] tracking-wider">
                    {currentImageIndex + 1} / {product.images.length}
                  </div>
                )}
              </div>

              {hasImages && product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`aspect-square overflow-hidden bg-zinc-900 transition-all duration-200 ${
                        currentImageIndex === index
                          ? 'ring-1 ring-accent ring-offset-2 ring-offset-surface'
                          : 'opacity-50 hover:opacity-80'
                      }`}
                      aria-label={`Seleccionar imagen ${index + 1}`}
                    >
                      <img src={image} alt={`${product.name} - Miniatura ${index + 1}`} className="w-full h-full object-cover" loading="lazy" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="lg:pt-8"
            >
              <div className="space-y-8">
                <div className="flex items-center gap-3">
                  <span className={product.available ? 'badge-available' : 'badge-soldout'}>
                    {product.available ? 'Disponible' : 'Agotado'}
                  </span>
                  <span className="px-3 py-1 text-[10px] font-body tracking-wider bg-zinc-900 text-zinc-600 border border-zinc-800/50">
                    Edición Limitada
                  </span>
                </div>

                <h1 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-tight text-white leading-none">
                  {product.name}
                </h1>

                <p className="font-display text-4xl md:text-5xl text-accent">
                  ${product.price.toLocaleString()}
                  <span className="font-body text-base text-zinc-600 ml-2">{product.currency}</span>
                </p>

                <p className="text-zinc-400 font-body text-base leading-relaxed max-w-lg">
                  {product.description}
                </p>

                {product.hasAccesories && product.accesoriesInfo && (
                  <div className="p-4 bg-zinc-900/50 border border-zinc-800/50">
                    <p className="text-zinc-600 font-body text-[10px] uppercase tracking-[0.15em] mb-1">Accesorios incluidos</p>
                    <p className="text-zinc-400 font-body text-sm">{product.accesoriesInfo}</p>
                  </div>
                )}

                <div className="space-y-3 pt-6 border-t border-zinc-800/50">
                  <div className="flex justify-between items-center py-2">
                    <span className="text-zinc-600 font-body text-xs tracking-wider uppercase">Color</span>
                    <span className="text-white font-body text-sm">{product.color}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-t border-zinc-800/30">
                    <span className="text-zinc-600 font-body text-xs tracking-wider uppercase">Disponibles</span>
                    <span className="text-white font-body text-sm">{product.quantity} unidades</span>
                  </div>
                </div>

                <div className="pt-4">
                  <motion.button
                    onClick={handleAddToCart}
                    disabled={!product.available}
                    className={`w-full py-4 font-display text-xl tracking-wider uppercase flex items-center justify-center gap-3 transition-all duration-200 ${
                      product.available
                        ? added
                          ? 'bg-green-600 text-white'
                          : 'btn-primary text-lg'
                        : 'bg-zinc-900 text-zinc-600 cursor-not-allowed border border-zinc-800'
                    }`}
                    whileTap={product.available ? { scale: 0.98 } : {}}
                  >
                    <AnimatePresence mode="wait">
                      {added ? (
                        <motion.span key="added" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="flex items-center gap-2">
                          <Check size={18} /> ¡Agregado!
                        </motion.span>
                      ) : (
                        <motion.span key="add" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="flex items-center gap-2">
                          <ShoppingBag size={18} /> {product.available ? 'Agregar al carrito' : 'Agotado'}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                  <p className="text-zinc-700 font-body text-[10px] text-center mt-3 tracking-wider uppercase">
                    Pago seguro con PayPal
                  </p>
                </div>

                <div className="flex items-center gap-6 pt-6 border-t border-zinc-800/50">
                  {[
                    { label: 'Instagram', href: `https://instagram.com/rybon.hats` },
                    { label: 'TikTok', href: `https://tiktok.com/rybon.hats` },
                  ].map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="text-zinc-600 hover:text-accent transition-colors font-body text-xs tracking-wider uppercase">
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default ProductDetailPage
