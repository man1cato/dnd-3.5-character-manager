import database from '../firebase/firebase'
// import getAirtableSpecialAbilities from '../utils/getAirtableSpecialAbilities';

//SET SPECIAL ABILITIES IN STORE
export const setSpecialAbilities = (specialAbilities) => ({
    type: 'SET_SPECIAL_ABILITIES',
    specialAbilities
});

//GET SPECIAL ABILITIES FROM AIRTABLE & DISPATCH TO STORE
// export const startSetSpecialAbilities = () => {
//     return (dispatch) => {
//       return getAirtableSpecialAbilities().then((specialAbilities) => {
//         dispatch(setSpecialAbilities(specialAbilities));
//       });
//     };
// };

//GET SPECIAL ABILITIES FROM FIREBASE & DISPATCH TO STORE
export const startSetSpecialAbilities = () => {
  return (dispatch) => {
    return database.ref('api/specialAbilities').once('value').then((snapshot) => {
      const specialAbilities = snapshot.val()
      dispatch(setSpecialAbilities(specialAbilities))
    })
  }
}

