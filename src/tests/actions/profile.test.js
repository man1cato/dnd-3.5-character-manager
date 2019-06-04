import { setProfile, editProfile, deleteProfile } from '../../actions/profile'
import profile from '../fixtures/profile'

const charId = profile.id
const fields = profile.fields


test('should setup set profile action object with provided values', () => {
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

test('should setup delete profile action object', () => {
  const action = deleteProfile()
  expect(action).toEqual({
    type: 'DELETE_PROFILE'
  })
})