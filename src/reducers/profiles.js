export default (state = {}, action) => {
    switch (action.type) {
        case 'SET_PROFILES':
            return [
                ...action.profiles
            ];
        default:
            return state;
    }
};
