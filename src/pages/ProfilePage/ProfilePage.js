import React from 'react'
import { connect } from 'react-redux'

import Feats from '../../components/Feats/Feats'
import SpecialAbilities from '../../components/SpecialAbilities/SpecialAbilities'
import './ProfilePage.scss'


export const ProfilePage = props => (
	<div className="container--body">
		<div className="ProfilePage__grid">
			<img className="ProfilePage__avatar" src={props.iconUrl} />

			<h4 className="ProfilePage__name">{props.name}</h4>
			<div>{props.race.name}</div>
			<div>{props.gender}</div>
			<div>{props.jobClass.name}</div>
			<div>{props.age} yrs</div>
			<div>{props.alignment}</div>
			<div>{props.height}</div>
			<div>{props.race.size}</div>
			<div>{props.weight} lbs</div>

			<h4 className="grid__col1">Languages</h4>
			<div className="ProfilePage__features">{props.languages.join(', ')}</div>

			<h4 className="grid__col1">Deity</h4>
			<div className="ProfilePage__features">{props.deity}</div>

			{props.school && 
				<>
					<h4 className="grid__col1">School</h4>
					<div className="ProfilePage__features">{props.school}</div>
				</>
			}

			{props.prohibitedSchools && 
				<>
					<h4 className="grid__col1">Prohibited Schools</h4>
					<div className="ProfilePage__features">{props.prohibitedSchools.join(', ')}</div>
				</>
			}
				
			<h4 className="grid__col1">Special Abilities</h4>
			<div className="ProfilePage__features">
				{props.specialAbilities &&
					<SpecialAbilities specialAbilityIds={props.specialAbilities} />
					||
					"None"
				}				
			</div> 

			<h4 className="grid__col1">Feats</h4>
			<div className="ProfilePage__features">
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