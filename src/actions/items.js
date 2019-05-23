import database from '../firebase/firebase'
// import getAirtableItems from '../utils/getAirtableItems';


//SET ITEMS IN STORE
export const setItems = (items) => ({
    type: 'SET_ITEMS',
    items
});

//GET ITEMS FROM AIRTABLE & DISPATCH TO STORE
// export const startSetItems = () => {
//     return (dispatch) => {
//       return getAirtableItems().then((items) => {
//         dispatch(setItems(items));
//       });
//     };
// };

//GET ITEMS FROM FIREBASE & DISPATCH TO STORE
export const startSetItems = () => {
  return (dispatch) => {
    return database.ref('api/items').once('value').then((snapshot) => {
      const items = snapshot.val()
      dispatch(setItems(items))
    })
  }
}