import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, Check, Eye } from 'lucide-react';
import { useCart } from './CartContext';

const ProductCard = ({ product, index }) => {
  const [imgError, setImgError] = useState(false);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!product.available) return;
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        to={`/producto/${product.slug}`}
        className="group block"
        aria-label={`Ver ${product.name}`}
      >
        <div className="relative aspect-square overflow-hidden bg-zinc-900" style={{ aspectRatio: '1/1' }}>
          <img
            src={imgError ? product.images[0] : product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
            loading="lazy"
          />
          <img
            src={product.images[1] || product.images[0]}
            alt={`${product.name} - vista alternativa`}
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            loading="lazy"
            onError={() => setImgError(true)}
          />

          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            <span className={`px-2.5 py-1 text-[10px] font-body tracking-wider uppercase ${
              product.available
                ? 'bg-white text-black'
                : 'bg-zinc-800 text-zinc-500'
            }`}>
              {product.available ? 'Disponible' : 'Agotado'}
            </span>
            <span className="px-2.5 py-1 text-[10px] font-body tracking-wider uppercase bg-black/60 text-zinc-400 border border-zinc-700/50 backdrop-blur-sm">
              {product.quantity} uds
            </span>
          </div>

          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />

          <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <div
              onClick={handleAdd}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleAdd(e)}
              className={`w-full py-2.5 flex items-center justify-center gap-2 text-xs font-body tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                added
                  ? 'bg-green-600 text-white'
                  : product.available
                    ? 'bg-white text-black hover:bg-zinc-200'
                    : 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
              }`}
            >
              {added ? (
                <span className="flex items-center gap-1.5"><Check size={13} /> Agregado</span>
              ) : (
                <span className="flex items-center gap-1.5"><ShoppingBag size={13} /> {product.available ? 'Agregar' : 'Agotado'}</span>
              )}
            </div>
          </div>

          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="w-8 h-8 bg-white/90 backdrop-blur-sm flex items-center justify-center">
              <Eye size={14} className="text-black" />
            </span>
          </div>
        </div>

        <div className="mt-4 space-y-1">
          <h3 className="font-display text-xl md:text-2xl tracking-tight text-white group-hover:text-zinc-300 transition-colors duration-200">
            {product.name}
          </h3>
          <p className="text-zinc-600 font-body text-[10px] tracking-wider uppercase">
            {product.color}
          </p>
          <p className="font-display text-lg text-white">
            ${product.price.toLocaleString()}
            <span className=" font-body text-[10px] text-zinc-600 ml-1">{product.currency}</span>
          </p>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
