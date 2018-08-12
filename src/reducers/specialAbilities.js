export default (state = {}, action) => {
    switch (action.type) {
        case 'SET_SPECIALABILITIES':
            return [
                ...action.specialAbilities
            ];
        default:
            return state;
    }
};
