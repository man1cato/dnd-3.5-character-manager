import database from '../firebase/firebase'
// import getAirtableSpells from '../utils/getAirtableSpells';


//SET SPELLS IN STORE
export const setSpells = (spells) => ({
    type: 'SET_SPELLS',
    spells
});

//GET SPELLS FROM AIRTABLE & DISPATCH TO STORE
// export const startSetSpells = () => {
//     return (dispatch) => {
//       return getAirtableSpells().then((spells) => {
//         dispatch(setSpells(spells));
//       });
//     };
// };

//GET SPELLS FROM FIREBASE & DISPATCH TO STORE
export const startSetSpells = () => {
  return (dispatch) => {
    return database.ref('api/spells').once('value').then((snapshot) => {
      const spells = snapshot.val()
      dispatch(setSpells(spells))
    })
  }
}