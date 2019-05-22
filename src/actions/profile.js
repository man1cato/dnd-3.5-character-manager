import database from '../firebase/firebase';
import getAirtableProfile from '../utils/getAirtableProfile';


//GET PROFILE FROM AIRTABLE & UPDATE IN FIREBASE
export const startSetAirtableProfile = (uid) => {
  return (dispatch) => {
    return getAirtableProfile(uid).then(({id, fields}) => {
        database.ref(`users/${uid}/profiles/${id}`).set(fields)
        dispatch(setProfile(id, fields))
    });
  };
};


//SET PROFILE IN STORE
export const setProfile = (id, profile) => ({
    type: 'SET_PROFILE',
    id,
    profile
});

//READ PROFILE FROM FIREBASE
export const startSetProfile = (id) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/profiles/${id}`).once('value').then((snapshot) => {
            const profile = snapshot.val();
            dispatch(setProfile(id, profile));
        });
    };
};

//CREATE PROFILE IN FIREBASE
export const startCreateProfile = (profile) => {    
    return (dispatch, getState) => {
        const uid = getState().auth.uid       
        return database.ref(`users/${uid}/profiles`).push(profile).then((ref) => {
            dispatch(setProfile(ref.key, profile))
        })
    }
}


//UPDATE PROFILE IN STORE
export const editProfile = (updates) => ({
    type: 'EDIT_PROFILE',
    updates
});

//UPDATE PROFILE IN FIREBASE
export const startEditProfile = (id, updates) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/profiles/${id}`).update(updates).then(() => {
            dispatch(editProfile(updates));
        });
    };
};



//LEVEL UP CHARACTER IN STORE
// export const levelUp = (character) => ({
//     type: 'LEVEL_UP',
//     character
// });
