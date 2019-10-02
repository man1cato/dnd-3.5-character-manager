import React, { useState } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import FeatModal from '../FeatModal'


export const Feats = (props) => { 
	const [selected, setSelected] = useState(undefined)

	const feats = _.sortBy(props.featIds.map((featId) => ({
		...props.feats[featId],
		id: featId
	})), ['name'])

	return (
		<div>
			{feats.map((feat, i) => (
				<button
					className="button--link"
					id={feat.id}
					key={`feat${i}`}
					type='button'
					onClick={() => setSelected(feat)}
				>
					{feat.name}
				</button>
			))}

			<FeatModal 
				selected={selected}
				handleCloseModal={() => setSelected(undefined)}
			/>
		</div>
	)
}


const mapStateToProps = (state) => ({
  	feats: state.feats
})

export default connect(mapStateToProps)(Feats)