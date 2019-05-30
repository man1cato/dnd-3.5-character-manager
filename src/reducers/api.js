export const featsReducer = (state = {}, action) => {
   switch (action.type) {
		case 'SET_FEATS':
			return action.feats            
		default:
			return state
   }
}

export const itemsReducer = (state = {}, action) => {
	switch (action.type) {
		case 'SET_ITEMS':
			return action.items
		default:
			return state
	}
}

export const jobClassesReducer = (state = {}, action) => {
	switch (action.type) {
		case 'SET_JOB_CLASSES':
			return action.jobClasses			
		default:
			return state
	}
}

export const racesReducer = (state = {}, action) => {
	switch (action.type) {
		case 'SET_RACES':
			return action.races			
		default:
			return state
	}
}

export const skillsReducer = (state = {}, action) => {
	switch (action.type) {
		case 'SET_SKILLS':
			return action.skills
		default:
			return state
	}
}

export const specialAbilitiesReducer = (state = {}, action) => {
	switch (action.type) {
		case 'SET_SPECIAL_ABILITIES':
			return action.specialAbilities
		default:
			return state
	}
}

export const spellsReducer = (state = {}, action) => {
	switch (action.type) {
		case 'SET_SPELLS':
			return action.spells
		default:
			return state
	}
}