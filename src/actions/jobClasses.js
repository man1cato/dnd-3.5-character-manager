import database from '../firebase/firebase'
// import getAirtableJobClasses from '../utils/getAirtableJobClasses';


//SET CLASSES IN STORE
export const setJobClasses = (jobClasses) => ({
    type: 'SET_JOB_CLASSES',
    jobClasses
});

//GET CLASSES FROM AIRTABLE & DISPATCH TO STORE
// export const startSetJobClasses = () => {
//     return (dispatch) => {
//       return getAirtableJobClasses().then((jobClasses) => {
//         dispatch(setJobClasses(jobClasses));
//       });
//     };
// };

//GET JOB CLASSES FROM FIREBASE & DISPATCH TO STORE
export const startSetJobClasses = () => {
  return (dispatch) => {
    return database.ref('api/jobClasses').once('value').then((snapshot) => {
      const jobClasses = snapshot.val()
      dispatch(setJobClasses(jobClasses))
    })
  }
}