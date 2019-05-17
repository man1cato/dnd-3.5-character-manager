import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
import profileReducer from '../reducers/profile';
import spellsReducer from '../reducers/spells';
import skillsReducer from '../reducers/skills';
import featsReducer from '../reducers/feats';
import specialAbilitiesReducer from '../reducers/specialAbilities';
import itemsReducer from '../reducers/items';
import racesReducer from '../reducers/races';
import jobClassesReducer from '../reducers/jobClasses';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
	const store = createStore(
		combineReducers({
			auth: authReducer,
			profile: profileReducer,
			spells: spellsReducer,
			skills: skillsReducer,
			feats: featsReducer,
			specialAbilities: specialAbilitiesReducer,
			items: itemsReducer,
			races: racesReducer,
			jobClasses: jobClassesReducer
		}),
		composeEnhancers(applyMiddleware(thunk))
	);

	return store;
};
