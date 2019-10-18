import profilesReducer from './profiles'
import profiles from '../../test-utils/fixtures/profiles'


test('should set profiles', () => {
    const action = {
        type: 'SET_PROFILES',
        profiles
    }
    const state = profilesReducer(undefined, action)
    expect(state).toEqual(profiles)
})

test('should clear profiles', () => {
    const action = {
        type: 'REMOVE_PROFILES'
    }
    const state = profilesReducer(profiles, action)
    expect(state).toEqual([])
})