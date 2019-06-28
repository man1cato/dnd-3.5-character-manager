import React, { useState } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import SpecialAbilityModal from './SpecialAbilityModal'


export const SpecialAbilities = (props) => {
	const [selected, setSelected] = useState(undefined)	 
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
					onClick={() => setSelected(specialAbility)}
				>
					{specialAbility.name}
				</button>
			))}

			<SpecialAbilityModal 
				selected={selected}
				handleCloseModal={() => setSelected(undefined)}
			/>
		</div>
	)	
}

const mapStateToProps = (state) => ({
  	specialAbilities: state.specialAbilities
})

export default connect(mapStateToProps)(SpecialAbilities)