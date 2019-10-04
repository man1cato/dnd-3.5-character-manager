import { setProfiles, removeProfiles } from './profiles'
import profiles from '../../tests/fixtures/profiles'


test('should setup profiles action object with provided values', () => {
   const action = setProfiles(profiles)
   expect(action).toEqual({
      type: 'SET_PROFILES',
      profiles
   })
})

test('should setup remove profiles action object', () => {
   const action = removeProfiles()
   expect(action).toEqual({
      type: 'REMOVE_PROFILES'
   })
})