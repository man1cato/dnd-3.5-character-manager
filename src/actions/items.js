import getItems from '../utils/getItems';


//SET ITEMS IN STORE
export const setItems = (items) => ({
    type: 'SET_ITEMS',
    items
});

//GET ITEMS FROM AIRTABLE & DISPATCH TO STORE
export const startSetItems = () => {
    return (dispatch) => {
      return getItems().then((items) => {
        dispatch(setItems(items));
      });
    };
};