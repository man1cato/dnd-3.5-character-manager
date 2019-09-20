import React, { Fragment } from 'react'
import { connect } from 'react-redux'

import Feats from '../components/Feats'
import SpecialAbilities from '../components/SpecialAbilities'


export const ProfilePage = (props) => (
	<div className="container container--body">
		<div className="grid--profile">
			<img className="grid--profile__img" src={props.iconUrl} />

			<h4 className="grid--profile__name">{props.name}</h4>
			<div>{props.race.name}</div>
			<div>{props.gender}</div>
			<div>{props.jobClass.name}</div>
			<div>{props.age} yrs</div>
			<div>{props.alignment}</div>
			<div>{props.height}</div>
			<div>{props.race.size}</div>
			<div>{props.weight} lbs</div>

			<h4 className="grid--profile__features-key">Languages</h4>
			<div className="grid--profile__features-value">{props.languages.join(', ')}</div>

			<h4 className="grid--profile__features-key">Deity</h4>
			<div className="grid--profile__features-value">{props.deity}</div>

			{props.school && 
				<Fragment>
					<h4 className="grid--profile__features-key">School</h4>
					<div className="grid--profile__features-value">{props.school}</div>
				</Fragment>
			}

			{props.prohibitedSchools && 
				<Fragment>
					<h4 className="grid--profile__features-key">Prohibited Schools</h4>
					<div className="grid--profile__features-value">{props.prohibitedSchools.join(', ')}</div>
				</Fragment>
			}
				
			<h4 className="grid--profile__features-key">Special Abilities</h4>
			<div className="grid--profile__features-value">
				{props.specialAbilities &&
					<SpecialAbilities specialAbilityIds={props.specialAbilities} />
					||
					"None"
				}				
			</div> 

			<h4 className="grid--profile__features-key">Feats</h4>
			<div className="grid--profile__features-value">
				<Feats featIds={props.feats} />
			</div>

		</div>
	</div>
)


const mapStateToProps = ({profile, races, jobClasses}) => ({
	...profile,
	race: races[profile.race],
	jobClass: jobClasses[profile.jobClass]
})

export default connect(mapStateToProps)(ProfilePage)