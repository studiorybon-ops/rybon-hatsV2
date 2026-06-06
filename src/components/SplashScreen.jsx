import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { brandInfo } from '../data/products';
import Meteors from './Meteors';

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
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-surface cursor-pointer overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Meteors number={30} />

          <motion.div
            className="flex flex-col items-center gap-8 relative z-10"
            initial={{ scale: 1, opacity: 1 }}
            exit={{ scale: 15, opacity: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.img
              src={brandInfo.logoUrl}
              alt="Rybon"
              className="w-40 md:w-56 lg:w-72"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.p
              className="text-zinc-700 font-body text-xs tracking-[0.35em] uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.9 }}
            >
              Rewrite Yourself
            </motion.p>
          </motion.div>

          <AnimatePresence>
            {showHint && (
              <motion.p
                className="absolute bottom-16 text-zinc-800 font-body text-[10px] tracking-[0.3em] uppercase"
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
