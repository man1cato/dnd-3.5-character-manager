import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import _ from 'lodash'

import database from '../../firebase/firebase'
import profile from '../fixtures/profile'
import { setProfile, editProfile, removeProfile, startSetProfile, startCreateProfile, startEditProfile } from '../../actions/profile'
import seedDatabase, { userOne, userTwo, characterOne, characterTwo, characterThree } from '../utils/seedDatabase'


beforeAll(async () => {
	await seedDatabase()
})

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

test('should setup set profile action object with provided values', () => {
	const charId = profile.id
	const fields = _.omit(profile, ['id'])
	const action = setProfile(charId, fields)
	expect(action).toEqual({
		type: 'SET_PROFILE',
		id: charId,
		profile: fields
	})
})

test('should setup edit profile action object with provided values', () => {
	const updates = {
		hp: 45,
		xp: 18000,
		abilities: {
			str: {
			tempScore: 15,
			tempMod: 2
			},
			int: {
			tempScore: 22,
			tempMod: 5
			}
		}
	}
	const action = editProfile(updates)
	expect(action).toEqual({
		type: 'EDIT_PROFILE',
		updates
	})
})

test('should setup remove profile action object', () => {
	const action = removeProfile()
	expect(action).toEqual({
		type: 'REMOVE_PROFILE'
	})
})

test('should retrieve character profile from firebase and dispatch to store', async () => {
	const store = mockStore({})
	const id = userOne.characterIds[0]
	const expectedActions = [{ 
		type: 'SET_PROFILE', 
		id, 
		profile: characterOne 
	}]
	await store.dispatch(startSetProfile(userOne.uid, id))
	expect(store.getActions()).toEqual(expectedActions)
})


test('should create new character profile in firebase and dispatch to store', async () => {
	const store = mockStore({ auth: { uid: userTwo.uid } })
	const newCharacter = {
		name: 'Tara',
		gender: 'Female',
		age: 31
	}

	await store.dispatch(startCreateProfile(newCharacter))
	expect(store.getActions()[0].profile).toEqual(newCharacter)
	const snapshot = await database.ref('users/userTwo/profiles').once('value')
	expect(_.values(snapshot.val())).toContainEqual(newCharacter)
})


test('should create new character profile in firebase and dispatch to store', async () => {
	const uid = userOne.uid
	const id = userOne.characterIds[0]
	const age = 45
	const store = mockStore({ auth: { uid } })
	const updates = { age }
	const expectedActions = [{
		type: 'EDIT_PROFILE',
		updates
	}]
	await store.dispatch(startEditProfile(id, updates))
	expect(store.getActions()).toEqual(expectedActions)
	const snapshot = await database.ref(`users/${uid}/profiles/${id}`).once('value')
	expect(snapshot.val().age).toEqual(age)
})