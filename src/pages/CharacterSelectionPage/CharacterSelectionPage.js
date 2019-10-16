import React, { useState } from 'react'
import { connect } from 'react-redux'

import ConfirmationModal from '../../components/Modals/ConfirmationModal'
import { startSetProfile, startRemoveProfile } from '../../store/actions/profile'
import { history } from '../../routers/AppRouter'
import './CharacterSelectionPage.scss'


export const CharacterSelectionPage = props => {
   const [characterToRemove, setCharacterToRemove] = useState(null)
   const [disabled, setDisabled] = useState(false)

   const handleSelectCharacter = async profileId => {
      try {
         setDisabled(true)
         await props.startSetProfile(props.uid, profileId)
         history.push('/profile')
      } catch (e) {
         setDisabled(false)
         alert('An error occurred. Please try again.')
         console.log(e)
      }      
   }

   return (
      <div className="container--body CharacterSelectionPage">
         {props.profiles.map(profile => (
            <div className="profile-container" key={profile.id}>
               <button 
                  className="profile__select-button"
                  data-testid={profile.id}
                  disabled={disabled}
                  onClick={() => handleSelectCharacter(profile.id)}
               >
                  <img src={profile.iconUrl} />
                  <div>
                     <h3>{profile.name}</h3>
                     <div>{profile.gender} {props.races[profile.race].name}</div>
                     <div>{props.jobClasses[profile.jobClass].name}</div>
                     <div>{profile.alignment}</div>
                     <div>{`Level ${profile.level}`}</div>
                  </div>
               </button>
               <button
                  className="profile__remove-button"
                  data-testid={profile.id + 'RemoveButton'}
                  disabled={disabled}
                  onClick={() => setCharacterToRemove(profile)}
               >
                  <ion-icon name="trash" size="large"/>
               </button>
            </div>
         ))}
         <ConfirmationModal
            clickedItem={characterToRemove}
            messageTitle={`Delete Character ${characterToRemove && characterToRemove.name}?`}
            message="This action cannot be undone!"
            handleConfirm={() => props.startRemoveProfile(characterToRemove.id)}
            handleCloseModal={() => setCharacterToRemove(null)}
         />
      </div>
   )
}

const mapStateToProps = state => ({
   uid: state.auth.uid,
   profiles: state.profiles,
   jobClasses: state.jobClasses,
   races: state.races
})

const mapDispatchToProps = dispatch => ({
   startSetProfile: (uid, profileId) => dispatch(startSetProfile(uid, profileId)),
   startRemoveProfile: profileId => dispatch(startRemoveProfile(profileId))
})

export default connect(mapStateToProps, mapDispatchToProps)(CharacterSelectionPage)