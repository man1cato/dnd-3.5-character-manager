import database from '../firebase/firebase'
// import getAirtableFeats from '../utils/getAirtableFeats'


//SET FEATS IN STORE
export const setFeats = (feats) => ({
    type: 'SET_FEATS',
    feats
})

//GET FEATS FROM AIRTABLE & DISPATCH TO STORE
// export const startSetFeats = () => {
//     return (dispatch) => {
//       return getAirtableFeats().then((feats) => {
//         dispatch(setFeats(feats));
//       });
//     };
// };

//GET FEATS FROM FIREBASE & DISPATCH TO STORE
export const startSetFeats = () => {
  return (dispatch) => {
    return database.ref('api/feats').once('value').then((snapshot) => {
      const feats = snapshot.val()
      dispatch(setFeats(feats))
    })
  }
}