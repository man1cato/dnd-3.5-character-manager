export default (state = {}, action) => {
    switch (action.type) {
        case 'SET_JOB_CLASSES':
            return [
                ...action.jobClasses
            ];
        default:
            return state;
    }
};
