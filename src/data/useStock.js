import { doc, runTransaction } from 'firebase/firestore'
import { db } from '../lib/firebase'

export const decrementStock = async (slug, quantity) => {
  try {
    const productRef = doc(db, 'products', slug)
    await runTransaction(db, async (transaction) => {
      const docSnap = await transaction.get(productRef)
      if (!docSnap.exists()) throw new Error('Producto no encontrado')
      const newStock = docSnap.data().stock - quantity
      if (newStock < 0) throw new Error('Stock insuficiente')
      transaction.update(productRef, { stock: newStock })
    })
  } catch (err) {
    console.error('Error al actualizar stock:', err)
  }
}
