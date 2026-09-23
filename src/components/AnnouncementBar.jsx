import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Megaphone } from 'lucide-react';
import { listenAnnouncement } from '../data/announcement';

const AnnouncementBar = () => {
  const [ann, setAnn] = useState({ text: '', active: false });

  useEffect(() => listenAnnouncement(setAnn), []);

  if (!ann.active || !ann.text.trim()) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="bg-zinc-900/70 border border-zinc-800/60 backdrop-blur-sm"
      role="region"
      aria-label="Anuncio"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-3.5 flex items-center justify-center gap-3">
        <Megaphone size={14} className="text-accent flex-shrink-0" />
        <p className="font-display tracking-[0.15em] text-white text-base md:text-xl uppercase text-center leading-tight">
          {ann.text}
        </p>
      </div>
    </motion.div>
  );
};

export default AnnouncementBar;