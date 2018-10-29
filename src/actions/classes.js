import getClasses from '../utils/getClasses';


//SET CLASSES IN STORE
export const setClasses = (classes) => ({
    type: 'SET_CLASSES',
    classes
});

//GET CLASSES FROM AIRTABLE & DISPATCH TO STORE
export const startSetClasses = () => {
    return (dispatch) => {
      return getClasses().then((classes) => {
        dispatch(setClasses(classes));
      });
    };
};