import getRaces from '../utils/getRaces';


//SET SPELLS IN STORE
export const setRaces = (races) => ({
    type: 'SET_RACES',
    races
});

//GET SPELLS FROM AIRTABLE & DISPATCH TO STORE
export const startSetRaces = () => {
    return (dispatch) => {
      return getRaces().then((races) => {
        dispatch(setRaces(races));
      });
    };
};