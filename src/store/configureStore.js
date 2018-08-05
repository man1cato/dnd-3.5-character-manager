import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
import profileReducer from '../reducers/profile';
import spellsReducer from '../reducers/spells';
import skillsReducer from '../reducers/skills';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    const store = createStore(
        combineReducers({
            auth: authReducer,
            profile: profileReducer,
            spells: spellsReducer,
            skills: skillsReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
    );

    return store;
};
