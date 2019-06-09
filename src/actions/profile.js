import database from '../firebase/firebase'
import { startGetProfiles } from './profiles'

//SET SELECTED PROFILE IN STORE
export const setProfile = (id, profile) => ({
    type: 'SET_PROFILE',
    id,
    profile
})

//READ PROFILE FROM FIREBASE
export const startSetProfile = (uid, id) => {
    return (dispatch, getState) => {
        return database.ref(`users/${uid}/profiles/${id}`).once('value').then((snapshot) => {
            const profile = snapshot.val()
            dispatch(setProfile(id, profile))
        })
    }
}

//CREATE PROFILE IN FIREBASE
export const startCreateProfile = (profile) => {    
    return (dispatch, getState) => {
        const uid = getState().auth.uid       
        return database.ref(`users/${uid}/profiles`).push(profile).then((ref) => {
            dispatch(setProfile(ref.key, profile))
            dispatch(startGetProfiles(uid))
            localStorage.setItem('selectedCharacterId', ref.key)
        })
    }
}


//UPDATE PROFILE IN STORE
export const editProfile = (updates) => ({
    type: 'EDIT_PROFILE',
    updates
})

//UPDATE PROFILE IN FIREBASE
export const startEditProfile = (id, updates) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/profiles/${id}`).update(updates).then(() => {
            dispatch(editProfile(updates));
        })
    }
}

//DELETE PROFILE FROM STORE
export const deleteProfile = () => ({
    type: 'DELETE_PROFILE'
})

//LEVEL UP CHARACTER IN STORE
// export const levelUp = (character) => ({
//     type: 'LEVEL_UP',
//     character
// });
