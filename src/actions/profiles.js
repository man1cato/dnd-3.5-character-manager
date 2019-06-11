import database from '../firebase/firebase';


//SET PROFILE IDS IN STORE
export const setProfiles = (profiles) => ({
    type: 'SET_PROFILES',
    profiles
})

//READ PROFILES FROM FIREBASE 
export const startGetProfiles = (uid) => {
    return (dispatch) => {
        return database.ref(`users/${uid}/profiles`).once('value').then((snapshot) => {
            let profiles = snapshot.val()
            if (profiles) {
                const profileIds = Object.keys(profiles)
                profiles = profileIds.map((id) => ({
                    id,
                    name: profiles[id].name,
                    race: profiles[id].race,
                    gender: profiles[id].gender,
                    jobClass: profiles[id].jobClass,
                    alignment: profiles[id].alignment,
                    level: profiles[id].level,
                    iconUrl: profiles[id].iconUrl
                }))
                dispatch(setProfiles(profiles))
            }
        })
    }
}

//REMOVE PROFILES FROM STORE
export const removeProfiles = () => ({
    type: 'REMOVE_PROFILES'
})