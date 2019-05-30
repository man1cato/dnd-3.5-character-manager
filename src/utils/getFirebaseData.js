import admin from 'firebase-admin'
import serviceAccount from '../../config/dnd-3-5-character-manager-e3f58e584d80.json'

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

export const getRaces = async () => {
   try {
      const snapshot = await database.ref('api/races').once('value')
      return snapshot.val()
   } catch (e) {
      console.error(e)
   }
}

export const getJobClasses = async () => {
   try {
      const snapshot = await database.ref('api/jobClasses').once('value')
      return snapshot.val()
   } catch (e) {
      console.error(e)
   }
}

export const getSkills = async () => {
   try {
      const snapshot = await database.ref('api/skills').once('value')
      return snapshot.val()
   } catch (e) {
      console.error(e)
   }
}

export const getFeats = async () => {
   try {
      const snapshot = await database.ref('api/feats').once('value')
      return snapshot.val()
   } catch (e) {
      console.error(e)
   }
}

export const getSpecialAbilities = async () => {
   try {
      const snapshot = await database.ref('api/specialAbilities').once('value')
      return snapshot.val()
   } catch (e) {
      console.error(e)
   }
}

export const getItems = async () => {
   try {
      const snapshot = await database.ref('api/items').once('value')
      return snapshot.val()
   } catch (e) {
      console.error(e)
   }
}

export const getSpells = async () => {
   try {
      const snapshot = await database.ref('api/spells').once('value')
      return snapshot.val()
   } catch (e) {
      console.error(e)
   }
}