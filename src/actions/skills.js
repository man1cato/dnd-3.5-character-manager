import database from '../firebase/firebase'
// import getAirtableSkills from '../utils/getAirtableSkills';


//SET SKILLS IN STORE
export const setSkills = (skills) => ({
    type: 'SET_SKILLS',
    skills
});

//GET SKILLS FROM AIRTABLE & DISPATCH TO STORE
// export const startSetSkills = () => {
//     return (dispatch) => {
//       return getAirtableSkills().then((skills) => {
//         dispatch(setSkills(skills));
//       });
//     };
// };

//GET SKILLS FROM FIREBASE & DISPATCH TO STORE
export const startSetSkills = () => {
  return (dispatch) => {
    return database.ref('api/skills').once('value').then((snapshot) => {
      const skills = snapshot.val()
      dispatch(setSkills(skills))
    })
  }
}