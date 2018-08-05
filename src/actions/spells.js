import getSpells from '../utils/getSpells';


//SET SPELLS IN STORE
export const setSpells = (spells) => ({
    type: 'SET_SPELLS',
    spells
});

//GET SPELLS FROM AIRTABLE & DISPATCH TO STORE
export const startSetSpells = () => {
    return (dispatch) => {
      return getSpells().then((spells) => {
        dispatch(setSpells(spells));
      });
    };
};