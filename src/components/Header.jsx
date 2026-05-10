import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { brandInfo } from '../data/products';
import { useCart } from './CartContext';

const Header = () => {
  const location = useLocation();
  const { totalItems, setIsOpen } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { name: 'Inicio', path: '/' },
    { name: 'Catálogo', path: '/catalogo' },
    { name: 'Contacto', path: '/contacto' },
  ];

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-40"
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="absolute inset-0 bg-surface/80 backdrop-blur-xl border-b border-zinc-800/50" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="relative z-10" aria-label="Ir al inicio">
            <motion.img
              src={brandInfo.logoUrl}
              alt="Rybon Hats"
              className="h-7 md:h-9 invert brightness-0"
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.2 }}
            />
          </Link>

          <nav className="hidden md:flex items-center gap-10">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative text-sm tracking-widest uppercase font-body font-medium transition-colors duration-200 ${
                    isActive ? 'text-accent' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent"
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            <motion.button
              onClick={() => setIsOpen(true)}
              className="relative p-2 text-zinc-400 hover:text-white transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`Abrir carrito${totalItems > 0 ? `, ${totalItems} artículos` : ''}`}
            >
              <ShoppingBag size={20} />
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span
                    key="cart-badge"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 bg-accent text-black text-[10px] font-body font-bold rounded-full flex items-center justify-center"
                    style={{ width: '18px', height: '18px' }}
                  >
                    {totalItems > 9 ? '9+' : totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-zinc-400 hover:text-white transition-colors"
              aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-zinc-800/50 bg-surface/95 backdrop-blur-xl overflow-hidden"
          >
            <div className="px-6 py-6 space-y-4">
              {navItems.map((item, i) => {
                const isActive = location.pathname === item.path;
                return (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <Link
                      to={item.path}
                      onClick={() => setMobileOpen(false)}
                      className={`block py-3 text-2xl font-display tracking-wide uppercase transition-colors ${
                        isActive ? 'text-accent' : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
