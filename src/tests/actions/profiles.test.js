import { setProfiles, deleteProfiles } from '../../actions/profiles'
import profiles from '../fixtures/profiles'


test('should setup profiles action object with provided values', () => {
   const action = setProfiles(profiles)
   expect(action).toEqual({
      type: 'SET_PROFILES',
      profiles
   })
})

test('should setup delete profiles action object', () => {
   const action = deleteProfiles()
   expect(action).toEqual({
      type: 'DELETE_PROFILES'
   })
})