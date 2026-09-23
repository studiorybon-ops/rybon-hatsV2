import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../lib/firebase'

export function listenAnnouncement(callback) {
  const ref = doc(db, 'settings', 'announcement')
  return onSnapshot(
    ref,
    (snap) => {
      if (snap.exists()) {
        const data = snap.data()
        callback({ text: data.text || '', active: data.active !== false })
      } else {
        callback({ text: '', active: false })
      }
    },
    () => callback({ text: '', active: false })
  )
}