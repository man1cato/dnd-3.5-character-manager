export default (state = {}, action) => {
    switch (action.type) {
        case 'SET_ITEMS':
            return [
                ...action.items
            ];
        default:
            return state;
    }
};
