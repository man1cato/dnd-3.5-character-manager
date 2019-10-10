import database from '../../firebase/firebase'
import { startGetProfiles } from './profiles'

//SET SELECTED PROFILE IN STORE
export const setProfile = (id, profile) => ({
    type: 'SET_PROFILE',
    id,
    profile
})

//READ PROFILE FROM FIREBASE
export const startSetProfile = (uid, profileId) => {
    return async dispatch => {
        try {
            const snapshot = await database.ref(`users/${uid}/profiles/${profileId}`).once('value')
            const profile = snapshot.val()
            dispatch(setProfile(profileId, profile))
            localStorage.setItem('selectedCharacterId', profileId)
        } catch (e) {
            console.log(e)
        }
    }
}

//CREATE PROFILE IN FIREBASE
export const startCreateProfile = profile => {    
    return async (dispatch, getState) => {
        try {
            const uid = getState().auth.uid       
            const ref = await database.ref(`users/${uid}/profiles`).push(profile)
            dispatch(setProfile(ref.key, profile))
            dispatch(startGetProfiles(uid))
            localStorage.setItem('selectedCharacterId', ref.key)
        } catch (e) {
            console.log(e)
        }
    }
}


//UPDATE PROFILE IN STORE
export const editProfile = (updates) => ({
    type: 'EDIT_PROFILE',
    updates
})

//UPDATE PROFILE IN FIREBASE
export const startEditProfile = (id, updates) => {
    return async (dispatch, getState) => {
        try {
            const uid = getState().auth.uid
            await database.ref(`users/${uid}/profiles/${id}`).update(updates)
            dispatch(editProfile(updates))
        } catch {
            console.log(e)
        }
    }
}

//REMOVE PROFILE FROM STORE
export const removeProfile = () => ({
    type: 'REMOVE_PROFILE'
})

//REMOVE PROFILE FROM FIREBASE
export const startRemoveProfile = profileId => {
    return async (dispatch, getState) => {
        const uid = getState().auth.uid
        try {
            await database.ref(`users/${uid}/profiles/${profileId}`).remove()
            dispatch(removeProfile())
            dispatch(startGetProfiles(uid))
            localStorage.removeItem('selectedCharacterId')
        } catch (e) {
            console.log(e)
        }
    }
}

//LEVEL UP CHARACTER IN STORE
// export const levelUp = (character) => ({
//     type: 'LEVEL_UP',
//     character
// });
