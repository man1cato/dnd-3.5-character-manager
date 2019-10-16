import dotenv from 'dotenv'
import admin from 'firebase-admin'
import serviceAccountDev from './config/dnd-3-5-character-manager-key.json'
import serviceAccountTest from './config/dnd-3-5-character-manager-test-key.json'


import { getRaces, getJobClasses, getFeats, getSpecialAbilities, getSkills, getItems, getSpells } from './src/utils/getAirtableData'
import getAirtableProfile from './src/utils/getAirtableProfile'

let serviceAccount
if (process.env.NODE_ENV === 'test') {
   dotenv.config({ path: './config/test.env' })
   serviceAccount = serviceAccountTest
} else if (process.env.NODE_ENV === 'development') {
   dotenv.config({ path: './config/dev.env' })
   serviceAccount = serviceAccountDev
}

admin.initializeApp({
   credential: admin.credential.cert(serviceAccount),
   databaseURL: process.env.FIREBASE_DATABASE_URL
})

const database = admin.database()


const setRaces = () => {
   getRaces().then((races) => {
      database.ref('api/races').set(races)
   })
}

const setJobClasses = () => {
   getJobClasses().then((jobClasses) => {
      database.ref('api/jobClasses').set(jobClasses)
   })
}

const setFeats = () => {
   getFeats().then((feats) => {
      database.ref('api/feats').set(feats)
   })
}

const setSpecialAbilities = () => {
   getSpecialAbilities().then((specialAbilities) => {
      database.ref('api/specialAbilities').set(specialAbilities)
   })
}

const setSkills = () => {
   getSkills().then((skills) => {
      database.ref('api/skills').set(skills)
   })
}

const setItems = () => {
   getItems().then((items) => {
      database.ref('api/items').set(items)
   })
}

const setSpells = () => {
   getSpells().then((spells) => {
      database.ref('api/spells').set(spells)
   })
}

const setProfile = (uid) => {
   getAirtableProfile(uid).then(({id, fields}) => {
      database.ref(`users/${uid}/profiles/${id}`).set(fields)
  })
}

// setRaces()
// setJobClasses()
// setFeats()
// setSpecialAbilities()
// setSkills()
setItems()
// setSpells()
// setProfile(process.env.USER_ID)

// Run the following in the powershell to set env var: 
// $env:NODE_ENV="test"
// $env:AIRTABLE_API_KEY="key"
// Run the following in the CLI to execute file: ./node_modules/.bin/babel-node setFirebase.js