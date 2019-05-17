import getJobClasses from '../utils/getJobClasses';


//SET CLASSES IN STORE
export const setJobClasses = (jobClasses) => ({
    type: 'SET_JOB_CLASSES',
    jobClasses
});

//GET CLASSES FROM AIRTABLE & DISPATCH TO STORE
export const startSetJobClasses = () => {
    return (dispatch) => {
      return getJobClasses().then((jobClasses) => {
        dispatch(setJobClasses(jobClasses));
      });
    };
};