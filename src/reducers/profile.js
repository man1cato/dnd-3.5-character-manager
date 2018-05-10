export default (state = {}, action) => {
    switch (action.type) {
        case 'SET_PROFILE':
            return {
                id: action.id,
                ...action.fields
            };
        case 'EDIT_PROFILE':
            return {
                ...state,
                ...action.updates
            };
        default:
            return state;
    }
};
