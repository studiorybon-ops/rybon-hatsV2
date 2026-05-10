import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { brandInfo } from '../data/products';

const SplashScreen = ({ onEnter }) => {
  const [isExiting, setIsExiting] = useState(false);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowHint(true), 1200);
    return () => clearTimeout(t);
  }, []);

  const handleClick = () => {
    setIsExiting(true);
    setTimeout(onEnter, 1200);
  };

  return (
    <AnimatePresence>
      {!isExiting ? (
        <motion.div
          onClick={handleClick}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-surface cursor-pointer"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="bg-glow-strong fixed inset-0 pointer-events-none" />

          <motion.div
            className="flex flex-col items-center gap-8"
            initial={{ scale: 1, opacity: 1 }}
            exit={{ scale: 15, opacity: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.img
              src={brandInfo.logoUrl}
              alt="Rybon Hats"
              className="w-48 md:w-72 lg:w-96 invert brightness-0"
              initial={{ opacity: 0, scale: 0.9, filter: 'blur(8px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.p
              className="text-zinc-600 font-display text-xl tracking-[0.4em] uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.8 }}
            >
              Ediciones Limitadas
            </motion.p>
          </motion.div>

          <AnimatePresence>
            {showHint && (
              <motion.p
                className="absolute bottom-16 text-zinc-700 font-body text-xs tracking-[0.3em] uppercase"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
              >
                Toca para entrar
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      ) : (
        <motion.div
          className="fixed inset-0 z-50 bg-surface"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        />
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
