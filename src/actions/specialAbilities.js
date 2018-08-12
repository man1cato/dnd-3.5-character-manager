import getSpecialAbilities from '../utils/getSpecialAbilities';

//SET SPECIAL ABILITIES IN STORE
export const setSpecialAbilities = (specialAbilities) => ({
    type: 'SET_SPECIALABILITIES',
    specialAbilities
});

//GET SPECIAL ABILITIES FROM AIRTABLE & DISPATCH TO STORE
export const startSetSpecialAbilities = () => {
    return (dispatch) => {
      return getSpecialAbilities().then((specialAbilities) => {
        dispatch(setSpecialAbilities(specialAbilities));
      });
    };
};