import profileReducer from '../../store/reducers/profile'
import profile from '../fixtures/profile'
import update from 'immutability-helper'
import _ from 'lodash'


test('should set default state', () => {
    const state = profileReducer(undefined, {type: '@@INIT'})
    expect(state).toEqual({})
})

test('should set profile', () => {
  const action = {
    type: 'SET_PROFILE',
    id: profile.id,
    profile: _.omit(profile, ['id'])
  }
  const state = profileReducer(undefined, action);
  expect(state).toEqual(profile)
})

test('should update an ability', () => {
  const updatedAbilities = update(profile.abilities, {
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
  const state = profileReducer(profile, action)
  expect(state.abilities).toEqual(updatedAbilities)
})
