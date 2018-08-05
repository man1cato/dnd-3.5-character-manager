export default (state = {}, action) => {
    switch (action.type) {
        case 'SET_FEATS':
            return [
                ...action.feats
            ];
        default:
            return state;
    }
};
