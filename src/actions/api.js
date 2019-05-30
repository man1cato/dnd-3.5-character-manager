import database from '../firebase/firebase'


//SET FEATS IN STORE
const setFeats = (feats) => ({
   type: 'SET_FEATS',
   feats
})

//SET ITEMS IN STORE
const setItems = (items) => ({
   type: 'SET_ITEMS',
   items
})

//SET JOB CLASSES IN STORE
const setJobClasses = (jobClasses) => ({
   type: 'SET_JOB_CLASSES',
   jobClasses
})

//SET RACES IN STORE
const setRaces = (races) => ({
	type: 'SET_RACES',
	races
})

//SET SKILLS IN STORE
const setSkills = (skills) => ({
   type: 'SET_SKILLS',
   skills
})

//SET SPECIAL ABILITIES IN STORE
const setSpecialAbilities = (specialAbilities) => ({
   type: 'SET_SPECIAL_ABILITIES',
   specialAbilities
})

//SET SPELLS IN STORE
const setSpells = (spells) => ({
   type: 'SET_SPELLS',
   spells
})


//GET API FROM FIREBASE & DISPATCH TO STORE
export default () => {
   return (dispatch) => {
      return database.ref('api').once('value').then((snapshot) => {
         const api = snapshot.val()
         dispatch(setFeats(api.feats))
         dispatch(setItems(api.items))
         dispatch(setJobClasses(api.jobClasses))
         dispatch(setRaces(api.races))
         dispatch(setSkills(api.skills))
         dispatch(setSpecialAbilities(api.specialAbilities))
         dispatch(setSpells(api.spells))
      })
   }
}