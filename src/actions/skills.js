import getSkills from '../utils/getSkills';


//SET SKILLS IN STORE
export const setSkills = (skills) => ({
    type: 'SET_SKILLS',
    skills
});

//GET SKILLS FROM AIRTABLE & DISPATCH TO STORE
export const startSetSkills = () => {
    return (dispatch) => {
      return getSkills().then((skills) => {
        dispatch(setSkills(skills));
      });
    };
};