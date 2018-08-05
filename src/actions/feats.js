import getFeats from '../utils/getFeats';


//SET FEATS IN STORE
export const setFeats = (feats) => ({
    type: 'SET_FEATS',
    feats
});

//GET FEATS FROM AIRTABLE & DISPATCH TO STORE
export const startSetFeats = () => {
    return (dispatch) => {
      return getFeats().then((feats) => {
        dispatch(setFeats(feats));
      });
    };
};