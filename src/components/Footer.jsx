import { motion } from 'framer-motion';
import { Instagram, Mail } from 'lucide-react';
import { brandInfo } from '../data/products';

const Footer = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1, y: 0,
      transition: { duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] },
    }),
  };

  return (
    <footer className="relative bg-surface border-t border-zinc-800/50 overflow-hidden">

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12">
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            <img
              src={brandInfo.logoUrl}
              alt="Rybon Hats"
              className="h-8 invert brightness-0"
            />
            <p className="text-zinc-500 font-body text-sm leading-relaxed max-w-xs">
              {brandInfo.concept}
            </p>
            <p className="text-zinc-700 font-body text-xs tracking-wider uppercase">
              República Dominicana
            </p>
          </motion.div>

          <motion.div
            custom={1}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="font-display text-2xl tracking-wide text-white uppercase">
              Contacto
            </h3>
            <div className="space-y-4">
              <a
                href={`mailto:${brandInfo.email}`}
                className="flex items-center gap-3 text-zinc-400 hover:text-accent transition-colors font-body text-sm group"
              >
                <span className="w-8 h-8 flex items-center justify-center bg-zinc-900 group-hover:bg-accent/10 rounded-sm transition-colors">
                  <Mail size={14} className="group-hover:text-accent transition-colors" />
                </span>
                {brandInfo.email}
              </a>
              <p className="text-zinc-600 font-body text-xs ml-11">
                Disponible {brandInfo.hours}
              </p>
            </div>
          </motion.div>

          <motion.div
            custom={2}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="font-display text-2xl tracking-wide text-white uppercase">
              Síguenos
            </h3>
            <div className="space-y-4">
              {[
                { label: 'Instagram', handle: brandInfo.instagram, icon: <Instagram size={14} />, href: `https://instagram.com/${brandInfo.instagram}` },
                {
                  label: 'TikTok', handle: brandInfo.tiktok,
                  icon: (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                    </svg>
                  ),
                  href: `https://tiktok.com/@${brandInfo.tiktok}`,
                },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-zinc-400 hover:text-accent transition-colors font-body text-sm group"
                >
                  <span className="w-8 h-8 flex items-center justify-center bg-zinc-900 group-hover:bg-accent/10 rounded-sm transition-colors">
                    <span className="group-hover:text-accent transition-colors">{s.icon}</span>
                  </span>
                  @{s.handle}
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 pt-8 border-t border-zinc-800/50 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-zinc-700 font-body text-xs">
            &copy; {new Date().getFullYear()} {brandInfo.name}. Todos los derechos reservados.
          </p>
          <p className="text-zinc-800 font-body text-[10px] tracking-wider uppercase">
            Ediciones Limitadas
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
