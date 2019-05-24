import {firebase, googleAuthProvider} from '../firebase/firebase'

import {deleteProfile} from './profile'
import {deleteProfiles} from './profiles'


export const login = (uid) => ({
    type: 'LOGIN',
    uid
})

export const startLogin = () => {
    return () => {
        return firebase.auth().signInWithPopup(googleAuthProvider)
    }
}


export const logout = () => ({
    type: 'LOGOUT'
})

export const startLogout = () => {
    return (dispatch) => {
        dispatch(deleteProfile())
        dispatch(deleteProfiles())
        return firebase.auth().signOut()
    }
}