import database from '../firebase/firebase';
import getAirtableProfile from '../utils/getAirtableProfile';


//SET PROFILE IN STORE
export const setProfile = (id, fields) => ({
    type: 'SET_PROFILE',
    id,
    fields
});
//GET PROFILE FROM AIRTABLE & UPDATE IN FIREBASE
// export const startSetProfile = (uid) => {
//   return (dispatch) => {
//     return getAirtableProfile(uid).then(({id, fields}) => {
//       dispatch(setProfile(id, fields));
//       database.ref(`users/${uid}/profiles/${id}`).set(fields);
//     });
//   };
// };

//GET PROFILE FROM FIREBASE
export const startSetProfile = (uid) => {
  return (dispatch) => {
    return database.ref(`users/${uid}/profiles`).once('value').then((snapshot) => {
        const profiles = snapshot.val();
        if (profiles) {
            const id = Object.keys(profiles)[0];
            const fields = profiles[id];
            dispatch(setProfile(id, fields));
        }
        return profiles;
    });
  };
};


//EDIT PROFILE IN STORE
export const editProfile = (updates) => ({
    type: 'EDIT_PROFILE',
    updates
});

//EDIT PROFILE IN FIREBASE
export const startEditProfile = (id, updates) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/profiles/${id}`).update(updates).then(() => {
            dispatch(editProfile(updates));
        });
    };
};


//LEVEL UP CHARACTER
export const levelUp = (character) => ({
    type: 'LEVEL_UP',
    character
});
