import profileReducer from '../../reducers/profile'
import profile from '../fixtures/profile'
import update from 'immutability-helper'

const charId = profile.id;
const fields = profile.fields;
const storeProfile = {
  id: charId,
  ...fields
}

test('should set default state', () => {
    const state = profileReducer(undefined, {type: '@@INIT'})
    expect(state).toEqual({})
})

test('should set profile', () => {
  const action = {
    type: 'SET_PROFILE',
    id: profile.id,
    profile: profile.fields
  }
  const state = profileReducer(undefined, action);
  expect(state).toEqual(storeProfile)
})

test('should update an ability', () => {
  const updatedAbilities = update(storeProfile.abilities, {
    str: {
      tempScore: {$set: 14},
      tempMod: {$set: 1}
    },
    int: {
      tempScore: {$set: 22},
      tempMod: {$set: 5}
    }
  })
  const action = {
    type: 'EDIT_PROFILE',
    updates: {
      abilities: updatedAbilities
    }
  }
  const state = profileReducer(storeProfile, action)
  expect(state.abilities).toEqual(updatedAbilities)
})
