export default (state = {}, action) => {
    switch (action.type) {
        case 'SET_RACES':
            return [
                ...action.races
            ];
        default:
            return state;
    }
};
