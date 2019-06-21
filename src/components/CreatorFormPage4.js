import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import { ErrorMessage } from 'formik'
import FeatModal from './FeatModal'
import Selector from './Selector'

const CreatorFormPage4 = ({
	values, 
	feats, 
	setFieldValue, 
	validateForm
}) => {
	const [selectedFeatIds, setSelectedFeatIds] = useState([])
	const [selected, setSelected] = useState(undefined)

	useEffect(() => {
		setFieldValue('feats', selectedFeatIds)
	}, [selectedFeatIds])

	useEffect(() => {
		validateForm()
	}, [])

	const Content = ({selected}) => (
		<p>
			Description: {selected.description}
		</p>
	)
	
	return (
		<div>
			<h3 className="row--center">Feats</h3>

			<Selector
				apiObject={feats} 
				fieldName="feats"
				Content={Content}
				selectedObjIds={selectedFeatIds}
				setSelectedObjIds={setSelectedFeatIds}
			/>

			<h4 className="row--left">Selected Feats:</h4>
			{_.map(values.feats, (featId) => {
				const feat = {id: featId, ...feats[featId]}
				return (
					<div className="row--left" key={featId}>
						<button
							className="button--link"
							type="button"
							id={featId}
							onClick={() => setSelected(feat)}
						>
							{feat.name}
						</button>
									
						<button type="button" onClick={() => setSelectedFeatIds(_.without(selectedFeatIds, featId))}>x</button>
					</div>
				)
			})}

			<FeatModal
				selected={selected}
				handleCloseModal={() => setSelected(undefined)}
			/>

			<ErrorMessage className="row--left" name="feats" component="div" />
		</div>
	)
}
export default CreatorFormPage4