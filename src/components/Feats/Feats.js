import React, { useState } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import FeatModal from '../Modals/FeatModal'


export const Feats = props => { 
	const [clickedFeat, setClickedFeat] = useState(null)

	const feats = _.sortBy(props.featIds.map(featId => ({
		id: featId,
		...props.feats[featId]
	})), ['name'])

	return (
		<div>
			{feats.map(feat => (
				<button
					className="button--link"
					key={feat.id}
					type='button'
					onClick={() => setClickedFeat(feat)}
				>
					{feat.name}
				</button>
			))}

			<FeatModal 
				clickedFeat={clickedFeat}
				handleCloseModal={() => setClickedFeat(null)}
			/>
		</div>
	)
}


const mapStateToProps = state => ({
  	feats: state.feats
})

export default connect(mapStateToProps)(Feats)