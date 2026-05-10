import { motion } from 'framer-motion';
import { Instagram, Mail, Clock, MapPin } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { brandInfo } from '../data/products';

const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

const ContactPage = () => {
  return (
    <div className="min-h-[100dvh] bg-surface">
      <div className="bg-glow fixed inset-0 pointer-events-none" />
      <Header />

      <main className="relative pt-28 pb-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="mb-16"
          >
            <motion.h1 variants={fadeUp} className="section-heading">
              Contacto
            </motion.h1>
            <motion.p variants={fadeUp} className="section-sub">
              ¿Tienes alguna pregunta sobre nuestros modelos? Estamos aquí para ayudarte.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="show"
              className="space-y-12"
            >
              <motion.div variants={fadeUp} className="space-y-5">
                <div className="flex items-center gap-4">
                  <span className="w-10 h-10 flex items-center justify-center bg-accent/10 border border-accent/20">
                    <Mail size={18} className="text-accent" />
                  </span>
                  <h2 className="font-display text-2xl tracking-wide text-white uppercase">Email</h2>
                </div>
                <a href={`mailto:${brandInfo.email}`} className="block text-zinc-400 hover:text-accent transition-colors font-body text-base ml-14">
                  {brandInfo.email}
                </a>
              </motion.div>

              <motion.div variants={fadeUp} className="space-y-5">
                <div className="flex items-center gap-4">
                  <span className="w-10 h-10 flex items-center justify-center bg-accent/10 border border-accent/20">
                    <Clock size={18} className="text-accent" />
                  </span>
                  <h2 className="font-display text-2xl tracking-wide text-white uppercase">Horario</h2>
                </div>
                <p className="text-zinc-400 font-body text-base ml-14">
                  Disponible {brandInfo.hours}
                </p>
              </motion.div>

              <motion.div variants={fadeUp} className="space-y-5">
                <div className="flex items-center gap-4">
                  <span className="w-10 h-10 flex items-center justify-center bg-accent/10 border border-accent/20">
                    <MapPin size={18} className="text-accent" />
                  </span>
                  <h2 className="font-display text-2xl tracking-wide text-white uppercase">Ubicación</h2>
                </div>
                <p className="text-zinc-400 font-body text-base ml-14">
                  {brandInfo.country}
                </p>
              </motion.div>

              <motion.div variants={fadeUp} className="space-y-6">
                <h2 className="font-display text-2xl tracking-wide text-white uppercase">Redes Sociales</h2>
                <div className="space-y-4 ml-0">
                  {[
                    { label: 'Instagram', handle: brandInfo.instagram, icon: <Instagram size={18} />, href: `https://instagram.com/${brandInfo.instagram}` },
                    {
                      label: 'TikTok', handle: brandInfo.tiktok,
                      icon: (
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
                          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                        </svg>
                      ),
                      href: `https://tiktok.com/@${brandInfo.tiktok}`,
                    },
                  ].map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-zinc-400 hover:text-accent transition-colors group">
                      <span className="w-12 h-12 flex items-center justify-center bg-zinc-900 border border-zinc-800 group-hover:border-accent/30 group-hover:bg-accent/5 transition-all">
                        {s.icon}
                      </span>
                      <div>
                        <p className="font-body text-[10px] text-zinc-600 uppercase tracking-wider">{s.label}</p>
                        <p className="font-body text-sm">@{s.handle}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="p-8 md:p-12 bg-zinc-900/30 border border-zinc-800/50 relative overflow-hidden">
                <div className="bg-glow-strong absolute inset-0 pointer-events-none" />
                <div className="relative">
                  <h2 className="font-display text-3xl md:text-4xl tracking-wide text-white uppercase mb-6">
                    Sobre {brandInfo.name}
                  </h2>
                  <p className="text-zinc-400 font-body leading-relaxed mb-8">
                    {brandInfo.concept}
                  </p>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-3 border-b border-zinc-800/50">
                      <span className="text-zinc-600 font-body text-xs tracking-wider uppercase">País</span>
                      <span className="text-white font-body text-sm">{brandInfo.country}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-zinc-800/50">
                      <span className="text-zinc-600 font-body text-xs tracking-wider uppercase">Disponibilidad</span>
                      <span className="text-white font-body text-sm">{brandInfo.hours}</span>
                    </div>
                    <div className="flex justify-between items-center py-3">
                      <span className="text-zinc-600 font-body text-xs tracking-wider uppercase">Envíos</span>
                      <span className="text-accent font-body text-sm tracking-wide">Próximamente</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;
