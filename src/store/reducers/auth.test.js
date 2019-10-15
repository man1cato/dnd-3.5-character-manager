import authReducer from './auth'


test('should set uid for login', () => {
    const uid = 'KHfaehfUenv'
    const action = {
        type: 'LOGIN',
        uid
    }
    const state = authReducer({}, action)
    expect(state.uid).toBe(uid)
})

test('should clear uid for logout', () => {
    const action = {
        type: 'LOGOUT'
    }
    const state = authReducer({uid: 'KHfaehfUenv'}, action)
    expect(state).toEqual({})
})