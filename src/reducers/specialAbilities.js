export default (state = {}, action) => {
    switch (action.type) {
        case 'SET_SPECIAL_ABILITIES':
            return [
                ...action.specialAbilities
            ];
        default:
            return state;
    }
};
