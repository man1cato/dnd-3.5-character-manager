export default (state = {}, action) => {
    switch (action.type) {
        case 'SET_CLASSES':
            return [
                ...action.classes
            ];
        default:
            return state;
    }
};
