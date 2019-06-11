export default (state = [], action) => {
    switch (action.type) {
        case 'SET_PROFILES':
            return action.profiles
        case 'REMOVE_PROFILES':
            return []
        default:
            return state
    }
}
