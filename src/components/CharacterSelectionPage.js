import React from 'react'
import {connect} from 'react-redux';

import Header from './Header'
import {startSetProfile} from '../actions/profile'
import {history} from '../routers/AppRouter'


export class CharacterSelectionPage extends React.Component {
   state = {
      disabled: false 
   }

   handleClick = (e) => {
		const id = e.currentTarget.id
		this.setState(() => ({
			disabled: true
		}))
      this.props.startSetProfile(id)
      setTimeout(() => { history.push('/profile') }, 1500)
   }

   render() {
      return (
         <div className="layout">
            <Header pageTitle="Character Selection" />

            <div className="container container--body">
               <h3>Select your character:</h3>
               {this.props.profiles.map((profile, i) => (

                  <button 
                     key={i}
                     className="button-profile"
                     id={profile.id}   
                     disabled={this.state.disabled}
                     onClick={this.handleClick}
                  >
                     <img src={profile.iconUrl} />
                     <div>
                        <h3>{profile.name}</h3>
                        <div>{profile.gender} {profile.race}</div>
                        <div>{profile.jobClass}</div>
                        <div>{profile.alignment}</div>
                        <div>{`Level ${profile.level}`}</div>
                     </div>
                  </button>
               ))}

            </div>
         </div>
      )
   }
}

const mapStateToProps = (state) => ({
	profiles: state.profiles
})

const mapDispatchToProps = (dispatch, props) => ({
   startSetProfile: (id) => dispatch(startSetProfile(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(CharacterSelectionPage)