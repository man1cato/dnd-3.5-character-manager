import React, { useState } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import SpecialAbilityModal from '../Modals/SpecialAbilityModal'


export const SpecialAbilities = (props) => {
	const [clickedAbility, setClickedAbility] = useState(null)	 
	const specialAbilities = _.sortBy(props.specialAbilityIds.map((id) => {
		return {
			...props.specialAbilities[id],
			id
		}
	}), ['name'])

	return (
		<div>
			{specialAbilities.map((specialAbility, i) => (
				<button
					className="button--link"
					id={specialAbility.id}
					key={`specialAbility${i}`}
					type='button'
					onClick={() => setClickedAbility(specialAbility)}
				>
					{specialAbility.name}
				</button>
			))}

			<SpecialAbilityModal 
				clickedAbility={clickedAbility}
				handleCloseModal={() => setClickedAbility(null)}
			/>
		</div>
	)	
}

const mapStateToProps = (state) => ({
  	specialAbilities: state.specialAbilities
})

export default connect(mapStateToProps)(SpecialAbilities)