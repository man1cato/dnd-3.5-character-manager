import admin from 'firebase-admin'
import serviceAccount from '../../config/dnd-3-5-character-manager-key.json'

admin.initializeApp({
   credential: admin.credential.cert(serviceAccount),
   databaseURL: "https://dnd-3-5-character-manager.firebaseio.com"
 })
 
const database = admin.database()

export default async () => {
   try {
      const snapshot = await database.ref('api').once('value')
      return snapshot.val()
   } catch (e) {
      console.error(e)
   }
}
