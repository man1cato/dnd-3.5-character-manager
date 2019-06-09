import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import authReducer from '../reducers/auth'
import profileReducer from '../reducers/profile'
import profilesReducer from '../reducers/profiles'
import {
	racesReducer, 
	jobClassesReducer, 
	featsReducer, 
	specialAbilitiesReducer, 
	spellsReducer, 
	skillsReducer, 
	itemsReducer
} from '../reducers/api'


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default () => {
	const store = createStore(
		combineReducers({
			auth: authReducer,
			profile: profileReducer,
			profiles: profilesReducer,
			spells: spellsReducer,
			skills: skillsReducer,
			feats: featsReducer,
			specialAbilities: specialAbilitiesReducer,
			items: itemsReducer,
			races: racesReducer,
			jobClasses: jobClassesReducer
		}),
		composeEnhancers(applyMiddleware(thunk))
	)

	return store
}
