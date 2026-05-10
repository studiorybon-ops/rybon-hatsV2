import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2, Tag, CheckCircle, XCircle, ShoppingBag, ArrowRight, ArrowLeft, AlertCircle, CreditCard } from 'lucide-react';
import { useCart } from './CartContext';

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_lkj1s9j';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_y8xtkrs';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'CThFzcrBiI1WhF44w';
const PAYPAL_CLIENT_ID = import.meta.env.VITE_PAYPAL_CLIENT_ID || 'Aew8Ekg0d7L2J58K7cwp5JH5UN3Id0Gat9VMgQGteA7TX3G2g6ywDgH8RefF-67QS9Ofb3fTCgSYy9Ni';

const PROMO_CODES = {
  RYBON10: { discount: 0.10, label: '10% de descuento' },
  RYBON20: { discount: 0.20, label: '20% de descuento' },
  LAUNCH50: { discount: 0.50, label: '50% de descuento' },
};

const PayPalButton = ({ totalUSD, onSuccess, onError }) => {
  const containerRef = useRef(null);
  const [sdkReady, setSdkReady] = useState(false);
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    if (document.getElementById('paypal-sdk')) { setSdkReady(true); return; }
    const script = document.createElement('script');
    script.id = 'paypal-sdk';
    script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=USD`;
    script.onload = () => setSdkReady(true);
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    if (!sdkReady || !containerRef.current || rendered) return;
    if (!window.paypal) return;
    containerRef.current.innerHTML = '';
    window.paypal.Buttons({
      style: { layout: 'vertical', color: 'gold', shape: 'rect', label: 'pay', height: 48 },
      createOrder: (data, actions) =>
        actions.order.create({
          purchase_units: [{
            amount: { value: String(totalUSD), currency_code: 'USD' },
            description: 'Rybon Hats — Orden',
          }],
        }),
      onApprove: (data, actions) =>
        actions.order.capture().then((details) => onSuccess(details)),
      onError: (err) => { console.error('PayPal error:', err); onError(); },
    }).render(containerRef.current);
    setRendered(true);
  }, [sdkReady, totalUSD, rendered]);

  useEffect(() => { setRendered(false); }, [totalUSD]);

  return (
    <div>
      {!sdkReady && (
        <div className="flex items-center justify-center py-6 text-zinc-600 font-body text-sm gap-3">
          <div className="w-4 h-4 border border-zinc-600 border-t-transparent rounded-full animate-spin" />
          Cargando PayPal...
        </div>
      )}
      <div ref={containerRef} />
    </div>
  );
};

const ShippingForm = ({ onBack, onContinue }) => {
  const [form, setForm] = useState({
    name: '', phone: '', address: '', email: '',
    country: 'República Dominicana', city: '', province: '', note: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const validate = () => {
    const required = ['name', 'phone', 'address', 'email', 'city', 'province'];
    const newErrors = {};
    required.forEach((f) => { if (!form[f].trim()) newErrors[f] = true; });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => { if (validate()) onContinue(form); };

  const inputCls = (field) =>
    `w-full px-4 py-3 bg-zinc-900 border ${errors[field] ? 'border-red-500/60' : 'border-zinc-800'} text-white font-body text-sm placeholder-zinc-600 focus:outline-none focus:border-accent/50 transition-colors rounded-none`;

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      className="space-y-5"
    >
      <div>
        <p className="text-zinc-600 font-body text-[10px] uppercase tracking-[0.2em] mb-1">
          Paso 2 de 3
        </p>
        <h3 className="font-display text-2xl tracking-wide text-white uppercase">
          Datos de envío
        </h3>
      </div>

      <div className="flex gap-3 p-4 bg-red-950/20 border border-red-900/30">
        <AlertCircle size={15} className="text-red-400/70 flex-shrink-0 mt-0.5" />
        <p className="text-red-400/70 font-body text-xs leading-relaxed">
          <strong>El costo de envío no está incluido.</strong> Te contactaremos después del pago para coordinar el envío y costo adicional según tu ubicación.
        </p>
      </div>

      <div className="space-y-3">
        {[
          { name: 'name', label: 'Nombre completo', placeholder: 'Juan Pérez', type: 'text' },
          { name: 'phone', label: 'Teléfono', placeholder: '809-000-0000', type: 'tel' },
          { name: 'address', label: 'Dirección', placeholder: 'Calle, sector, ciudad', type: 'text' },
          { name: 'email', label: 'Email', placeholder: 'tu@email.com', type: 'email' },
        ].map(({ name, label, placeholder, type }) => (
          <div key={name}>
            <label className="text-zinc-500 font-body text-[10px] uppercase tracking-[0.15em] mb-1.5 block">
              {label} <span className="text-zinc-700">*</span>
            </label>
            <input type={type} name={name} value={form[name]} onChange={handleChange} placeholder={placeholder} className={inputCls(name)} autoComplete={type === 'email' ? 'email' : type === 'tel' ? 'tel' : 'name'} />
            {errors[name] && <p className="text-red-400/70 font-body text-[10px] mt-1">Campo requerido</p>}
          </div>
        ))}

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-zinc-500 font-body text-[10px] uppercase tracking-[0.15em] mb-1.5 block">
              Ciudad <span className="text-zinc-700">*</span>
            </label>
            <input type="text" name="city" value={form.city} onChange={handleChange} placeholder="Santo Domingo" className={inputCls('city')} />
            {errors.city && <p className="text-red-400/70 font-body text-[10px] mt-1">Requerido</p>}
          </div>
          <div>
            <label className="text-zinc-500 font-body text-[10px] uppercase tracking-[0.15em] mb-1.5 block">
              Provincia <span className="text-zinc-700">*</span>
            </label>
            <input type="text" name="province" value={form.province} onChange={handleChange} placeholder="Distrito Nacional" className={inputCls('province')} />
            {errors.province && <p className="text-red-400/70 font-body text-[10px] mt-1">Requerido</p>}
          </div>
        </div>

        <div>
          <label className="text-zinc-500 font-body text-[10px] uppercase tracking-[0.15em] mb-1.5 block">
            Nota <span className="text-zinc-700 normal-case">(opcional)</span>
          </label>
          <textarea name="note" value={form.note} onChange={handleChange} placeholder="Indicaciones adicionales..." rows={2} className={inputCls('note') + ' resize-none'} />
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button onClick={onBack} className="btn-secondary text-xs px-4 py-3">
          <ArrowLeft size={13} /> Volver
        </button>
        <button onClick={handleSubmit} className="btn-primary flex-1 text-sm py-3">
          Continuar al pago <ArrowRight size={14} />
        </button>
      </div>
    </motion.div>
  );
};

const CartDrawer = () => {
  const {
    items, isOpen, setIsOpen, removeItem, updateQuantity, clearCart,
    promoCode, setPromoCode, subtotalDOP, discountDOP, totalDOP, totalUSD,
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const [promoStatus, setPromoStatus] = useState(null);
  const [orderDone, setOrderDone] = useState(false);
  const [paypalError, setPaypalError] = useState(false);
  const [step, setStep] = useState('cart');
  const [shippingData, setShippingData] = useState(null);

  const handleApplyPromo = () => {
    const code = promoInput.trim().toUpperCase();
    const promo = PROMO_CODES[code];
    if (promo) { setPromoCode({ code, ...promo }); setPromoStatus('valid'); }
    else { setPromoCode(null); setPromoStatus('invalid'); }
  };

  const handleRemovePromo = () => {
    setPromoCode(null); setPromoStatus(null); setPromoInput('');
  };

  const handleSuccess = async (details) => {
    try {
      const { decrementStock } = await import('../data/useStock');
      await Promise.all(items.map(({ product, quantity }) => decrementStock(product.slug, quantity)));
    } catch (err) { console.error('Stock error:', err); }

    try {
      const emailjs = await import('@emailjs/browser');
      const orderItems = items.map(({ product, quantity }) => `• ${product.name} x${quantity} — $${(product.price * quantity).toLocaleString()} DOP`).join('\n');
      await emailjs.default.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        customer_name: shippingData.name, customer_email: shippingData.email,
        customer_phone: shippingData.phone, customer_address: shippingData.address,
        customer_city: shippingData.city, customer_province: shippingData.province,
        customer_country: shippingData.country, customer_note: shippingData.note || 'Sin nota',
        order_items: orderItems, order_total: totalDOP.toLocaleString(), order_total_usd: totalUSD,
      }, EMAILJS_PUBLIC_KEY);
    } catch (err) { console.error('Email error:', err); }

    setOrderDone(true);
    clearCart();
    setStep('cart');
  };

  const handleClose = () => {
    setIsOpen(false);
    if (!orderDone) { setTimeout(() => setStep('cart'), 300); }
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="overlay"
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="drawer"
            className="fixed top-0 right-0 h-full w-full max-w-md bg-surface border-l border-zinc-800/50 z-50 flex flex-col"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-800/50">
              <h2 className="font-display text-2xl tracking-wide text-white uppercase flex items-center gap-3">
                <ShoppingBag size={18} className="text-accent" />
                Carrito
                {items.length > 0 && (
                  <span className="font-body text-xs text-zinc-600 normal-case">
                    ({items.reduce((a, i) => a + i.quantity, 0)})
                  </span>
                )}
              </h2>
              <button onClick={handleClose} className="p-1.5 text-zinc-500 hover:text-white transition-colors" aria-label="Cerrar carrito">
                <X size={18} />
              </button>
            </div>

            {items.length > 0 && !orderDone && (
              <div className="flex items-center gap-2 px-6 py-3 border-b border-zinc-800/30 bg-zinc-900/30">
                {['Carrito', 'Envío', 'Pago'].map((label, i) => {
                  const stepKey = ['cart', 'shipping', 'payment'][i];
                  const isActive = step === stepKey;
                  const isDone = (i === 0 && step !== 'cart') || (i === 1 && step === 'payment');
                  return (
                    <div key={label} className="flex items-center gap-2 flex-1">
                      <div className={`flex items-center gap-1.5 ${isActive ? 'text-accent' : isDone ? 'text-green-400/60' : 'text-zinc-700'}`}>
                        <div className={`w-5 h-5 flex items-center justify-center text-[9px] font-body font-bold border ${
                          isActive ? 'border-accent bg-accent/10 text-accent' :
                          isDone ? 'border-green-400/40 bg-green-400/5 text-green-400/60' :
                          'border-zinc-700 text-zinc-700'
                        }`}>
                          {isDone ? <CheckCircle size={10} /> : i + 1}
                        </div>
                        <span className="font-body text-[9px] hidden sm:block tracking-wider uppercase">{label}</span>
                      </div>
                      {i < 2 && <div className={`h-px flex-1 ${isDone ? 'bg-green-400/20' : 'bg-zinc-800'}`} />}
                    </div>
                  );
                })}
              </div>
            )}

            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
              {orderDone ? (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center h-full text-center gap-6 py-16">
                  <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center">
                    <CheckCircle size={32} className="text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-display text-3xl text-white mb-3 uppercase tracking-wide">¡Orden completada!</h3>
                    <p className="text-zinc-500 font-body text-sm leading-relaxed max-w-xs mx-auto">
                      Gracias por tu compra. Recibirás una confirmación de PayPal. Te contactaremos pronto para coordinar el envío.
                    </p>
                  </div>
                  <button onClick={() => { setOrderDone(false); setIsOpen(false); }} className="btn-primary text-sm">
                    Cerrar
                  </button>
                </motion.div>
              ) : items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center gap-5 py-20">
                  <ShoppingBag size={44} className="text-zinc-800" />
                  <div>
                    <p className="text-zinc-600 font-body text-sm mb-1">Tu carrito está vacío</p>
                    <p className="text-zinc-800 font-body text-xs">Explora nuestro catálogo</p>
                  </div>
                </div>
              ) : step === 'cart' ? (
                <AnimatePresence mode="wait">
                  <motion.div key="cart-step" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                    <div className="space-y-3">
                      {items.map(({ product, quantity }) => (
                        <motion.div key={product.id} layout initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="flex gap-4 p-4 bg-zinc-900/50 border border-zinc-800/30">
                          <img src={product.images[0]} alt={product.name} className="w-20 h-24 object-cover flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="font-display text-lg tracking-tight text-white truncate">{product.name}</p>
                            <p className="text-zinc-600 font-body text-[10px] uppercase tracking-wider mt-0.5">{product.color}</p>
                            <p className="font-display text-base text-zinc-300 mt-2">${(product.price * quantity).toLocaleString()} <span className="font-body text-[10px] text-zinc-600">DOP</span></p>
                            <div className="flex items-center gap-3 mt-3">
                              <button onClick={() => updateQuantity(product.id, quantity - 1)} className="w-7 h-7 flex items-center justify-center bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors" aria-label="Reducir cantidad"><Minus size={12} /></button>
                              <span className="text-white font-body text-sm w-4 text-center">{quantity}</span>
                              <button onClick={() => updateQuantity(product.id, quantity + 1)} disabled={quantity >= product.quantity} className="w-7 h-7 flex items-center justify-center bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors disabled:opacity-20" aria-label="Aumentar cantidad"><Plus size={12} /></button>
                              <button onClick={() => removeItem(product.id)} className="ml-auto text-zinc-700 hover:text-red-400 transition-colors p-1" aria-label="Eliminar producto"><Trash2 size={14} /></button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-zinc-800/30">
                      <p className="text-zinc-600 font-body text-[10px] uppercase tracking-[0.15em] mb-3">Código promocional</p>
                      {!promoCode ? (
                        <div className="flex gap-2">
                          <div className="relative flex-1">
                            <Tag size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" />
                            <input type="text" value={promoInput} onChange={(e) => { setPromoInput(e.target.value); setPromoStatus(null); }} onKeyDown={(e) => e.key === 'Enter' && handleApplyPromo()} placeholder="Tu código" className="w-full pl-9 pr-3 py-2.5 bg-zinc-900 border border-zinc-800 text-white font-body text-sm placeholder-zinc-700 focus:outline-none focus:border-accent/50 transition-colors uppercase tracking-wider" />
                          </div>
                          <button onClick={handleApplyPromo} className="px-4 py-2.5 bg-accent text-black font-body text-sm hover:bg-accent transition-colors font-bold">Aplicar</button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between px-4 py-3 bg-zinc-900/50 border border-zinc-800/50">
                          <div className="flex items-center gap-2 text-green-400/80 font-body text-sm">
                            <CheckCircle size={13} />
                            <span><strong>{promoCode.code}</strong> &mdash; {promoCode.label}</span>
                          </div>
                          <button onClick={handleRemovePromo} className="text-zinc-600 hover:text-white text-[10px] font-body transition-colors">Quitar</button>
                        </div>
                      )}
                      <AnimatePresence>
                        {promoStatus === 'invalid' && (
                          <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-1.5 mt-2 text-red-400/70 font-body text-[10px]">
                            <XCircle size={11} /> Código no válido
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>

                    <div className="pt-4 border-t border-zinc-800/30 space-y-2">
                      <div className="flex justify-between text-zinc-400 font-body text-sm"><span>Subtotal</span><span>${subtotalDOP.toLocaleString()} DOP</span></div>
                      {discountDOP > 0 && <div className="flex justify-between text-green-400/60 font-body text-sm"><span>Descuento</span><span>- ${discountDOP.toLocaleString()} DOP</span></div>}
                      <div className="flex justify-between font-display text-xl text-white pt-3 border-t border-zinc-800/50">
                        <span>Total</span>
                        <div className="text-right">
                          <p>${totalDOP.toLocaleString()} DOP</p>
                          <p className="text-zinc-600 font-body text-[10px] font-normal">≈ ${totalUSD} USD</p>
                        </div>
                      </div>
                    </div>

                    <button onClick={() => setStep('shipping')} className="btn-primary w-full text-sm">
                      Continuar <ArrowRight size={14} />
                    </button>
                  </motion.div>
                </AnimatePresence>
              ) : step === 'shipping' ? (
                <ShippingForm onBack={() => setStep('cart')} onContinue={(data) => { setShippingData(data); setStep('payment'); }} />
              ) : (
                <AnimatePresence mode="wait">
                  <motion.div key="payment-step" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
                    <div>
                      <p className="text-zinc-600 font-body text-[10px] uppercase tracking-[0.2em] mb-1">Paso 3 de 3</p>
                      <h3 className="font-display text-2xl tracking-wide text-white uppercase flex items-center gap-3">
                        <CreditCard size={18} className="text-accent" /> Pago
                      </h3>
                    </div>

                    <div className="p-5 bg-zinc-900/30 border border-zinc-800/30 space-y-3">
                      <p className="text-zinc-600 font-body text-[10px] uppercase tracking-[0.15em]">Resumen del pedido</p>
                      {items.map(({ product, quantity }) => (
                        <div key={product.id} className="flex justify-between font-body text-sm"><span className="text-zinc-400">{product.name} &times; {quantity}</span><span className="text-white">${(product.price * quantity).toLocaleString()} DOP</span></div>
                      ))}
                      {discountDOP > 0 && <div className="flex justify-between font-body text-sm text-green-400/60"><span>Descuento</span><span>- ${discountDOP.toLocaleString()} DOP</span></div>}
                      <div className="flex justify-between font-display text-lg text-white pt-3 border-t border-zinc-800/50"><span>Total</span><span>${totalDOP.toLocaleString()} DOP ≅ ${totalUSD} USD</span></div>
                    </div>

                    {shippingData && (
                      <div className="p-5 bg-zinc-900/30 border border-zinc-800/30 space-y-1.5">
                        <p className="text-zinc-600 font-body text-[10px] uppercase tracking-[0.15em] mb-2">Enviar a</p>
                        <p className="text-white font-body text-sm">{shippingData.name}</p>
                        <p className="text-zinc-500 font-body text-xs">{shippingData.phone} &middot; {shippingData.email}</p>
                        <p className="text-zinc-500 font-body text-xs">{shippingData.address}</p>
                        <p className="text-zinc-500 font-body text-xs">{shippingData.city}, {shippingData.province} &mdash; {shippingData.country}</p>
                        {shippingData.note && <p className="text-zinc-700 font-body text-[10px] italic">"{shippingData.note}"</p>}
                        <button onClick={() => setStep('shipping')} className="text-zinc-600 hover:text-accent font-body text-[10px] underline transition-colors mt-1 block">Editar datos</button>
                      </div>
                    )}

                    <div className="flex gap-3 p-4 bg-red-950/20 border border-red-900/30">
                      <AlertCircle size={15} className="text-red-400/70 flex-shrink-0 mt-0.5" />
                      <p className="text-red-400/70 font-body text-xs leading-relaxed"><strong>El costo de envío no está incluido.</strong> Te contactaremos después de tu compra para coordinar el envío.</p>
                    </div>

                    {paypalError && <p className="text-red-400/70 font-body text-xs text-center">Error con PayPal. Intenta de nuevo o contáctanos.</p>}
                    <PayPalButton totalUSD={totalUSD} onSuccess={handleSuccess} onError={() => setPaypalError(true)} />
                    <p className="text-zinc-700 font-body text-[10px] text-center">Pago seguro con PayPal</p>
                    <button onClick={() => setStep('shipping')} className="flex items-center gap-2 text-zinc-600 hover:text-white font-body text-[10px] transition-colors"><ArrowLeft size={11} /> Volver a datos de envío</button>
                  </motion.div>
                </AnimatePresence>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CartDrawer;
