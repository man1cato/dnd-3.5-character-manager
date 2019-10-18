import _ from 'lodash'
import profile from './fixtures/profile'
import database from '../firebase/firebase'


export const characterOne = {
   ..._.omit(profile, ['id'])
}

export const characterTwo = {
   name: 'Korg',
   gender: 'Male',
   race: 'recoDD3gAaQXU3A56',
   jobClass: 'recbxccm8pp3fTmQw',
   alignment: 'Lawful Evil',
   level: 5,
   iconUrl: 'images/orc.svg'
}

export const characterThree = {
   name: 'Rylia',
   gender: 'Female',
   race: 'recFEpQ9zuD9Yqu7l',
   jobClass: 'recQrfCKtksnnSsaZ',
   alignment: 'Chaotic Neutral',
   level: 3,
   iconUrl: 'images/halfling.svg'
}

export const userOne = {
   uid: 'userOne',
   characterIds: ['characterOne', 'characterTwo']
}

export const userTwo = {
   uid: 'userTwo',
   characterIds: ['characterThree']
}


export default async () => {
   await database.ref('users').remove()
   await database.ref(`users/${userOne.uid}/profiles/${userOne.characterIds[0]}`).set(characterOne)
   await database.ref(`users/${userOne.uid}/profiles/${userOne.characterIds[1]}`).set(characterTwo)
   await database.ref(`users/${userTwo.uid}/profiles/${userTwo.characterIds[0]}`).set(characterThree)
}