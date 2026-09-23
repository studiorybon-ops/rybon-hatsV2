export const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || ''
export const ORDER_ENABLED = Boolean(WHATSAPP_NUMBER)

export function orderUrl(product) {
  if (!WHATSAPP_NUMBER) return null
  const parts = ['Hola Rybon! Quiero pedir la gorra', product.name]
  if (product.color) parts.push(`(${product.color})`)
  if (product.price) parts.push(`por $${Number(product.price).toLocaleString()} DOP`)
  parts.push('. ¿Está disponible?')
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(parts.join(' '))}`
}