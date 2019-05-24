import dotenv from 'dotenv'
dotenv.config()

import admin from 'firebase-admin'
import serviceAccount from './config/dnd-3-5-character-manager-e3f58e584d80.json'

import getAirtableRaces from './src/utils/getAirtableRaces'
import getAirtableJobClasses from './src/utils/getAirtableJobClasses'
import getAirtableFeats from './src/utils/getAirtableFeats'
import getAirtableSpecialAbilities from './src/utils/getAirtableSpecialAbilities'
import getAirtableSkills from './src/utils/getAirtableSkills'
import getAirtableItems from './src/utils/getAirtableItems'
import getAirtableSpells from './src/utils/getAirtableSpells'
import getAirtableProfile from './src/utils/getAirtableProfile'


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://dnd-3-5-character-manager.firebaseio.com"
})

const database = admin.database()


const setRaces = () => {
   getAirtableRaces().then((races) => {
      database.ref('api/races').set(races)
   })
}

const setJobClasses = () => {
   getAirtableJobClasses().then((jobClasses) => {
      database.ref('api/jobClasses').set(jobClasses)
   })
}

const setFeats = () => {
   getAirtableFeats().then((feats) => {
      database.ref('api/feats').set(feats)
   })
}

const setSpecialAbilities = () => {
   getAirtableSpecialAbilities().then((specialAbilities) => {
      database.ref('api/specialAbilities').set(specialAbilities)
   })
}

const setSkills = () => {
   getAirtableSkills().then((skills) => {
      database.ref('api/skills').set(skills)
   })
}

const setItems = () => {
   getAirtableItems().then((items) => {
      database.ref('api/items').set(items)
   })
}

const setSpells = () => {
   getAirtableSpells().then((spells) => {
      database.ref('api/spells').set(spells)
   })
}

const setProfile = (uid) => {
   getAirtableProfile(uid).then(({id, fields}) => {
      database.ref(`users/${uid}/profiles/${id}`).set(fields)
  });
}

// setRaces()
setJobClasses()
// setFeats()
// setSpecialAbilities()
// setSkills()
// setItems()
// setSpells()
// setProfile(process.env.USER_ID)

// Run the following in the CLI to execute file: ./node_modules/.bin/babel-node setFirebase.js