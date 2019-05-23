import database from '../firebase/firebase'
// import getAirtableRaces from '../utils/getAirtableRaces';


//SET SPELLS IN STORE
export const setRaces = (races) => ({
    type: 'SET_RACES',
    races
});

//GET SPELLS FROM AIRTABLE & DISPATCH TO STORE
// export const startSetRaces = () => {
//     return (dispatch) => {
//       return getAirtableRaces().then((races) => {
//         dispatch(setRaces(races));
//       });
//     };
// };

//GET RACES FROM FIREBASE & DISPATCH TO STORE
export const startSetRaces = () => {
  return (dispatch) => {
    return database.ref('api/races').once('value').then((snapshot) => {
      const races = snapshot.val()
      dispatch(setRaces(races))
    })
  }
}