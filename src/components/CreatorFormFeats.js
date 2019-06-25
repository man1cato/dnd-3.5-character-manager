import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import { ErrorMessage } from 'formik'
import FeatModal from './FeatModal'
import Selector from './Selector'

const CreatorFormFeats = ({
	values, 
	feats, 
	setFieldValue, 
	validateForm
}) => {
	const [selectedFeatIds, setSelectedFeatIds] = useState(values.feats)
	const [selected, setSelected] = useState(undefined)

	useEffect(() => {
		setFieldValue('feats', selectedFeatIds)
	}, [selectedFeatIds])

	useEffect(() => {
		validateForm()
	}, [])

	const Content = ({selected}) => (
		<div>
			<div className="form-group--35"><b>Type(s):</b> <div>{selected.types.join(", ")}</div></div>
			<div className="form-group--35 align-top"><b>Description:</b> <div>{selected.description}</div></div>
		</div>
	)
	
	return (
		<div>
			<h3 className="row--center">Select Feats</h3>

			<Selector
				apiObject={feats} 
				fieldName="feats"
				Content={Content}
				selectedObjIds={selectedFeatIds}
				setSelectedObjIds={setSelectedFeatIds}
			/>

			<div className="divider"></div>

			<h4 className="row--left">Selected Feats:</h4>
			{_.map(values.feats, (featId) => {
				const feat = {id: featId, ...feats[featId]}
				return (
					<div className="form-group--80" key={featId}>
						<button
							className="button--link"
							type="button"
							id={featId}
							onClick={() => setSelected(feat)}
						>
							{feat.name}
						</button>
									
						<button className="button" type="button" onClick={() => setSelectedFeatIds(_.without(selectedFeatIds, featId))}>x</button>
					</div>
				)
			})}

			<FeatModal
				selected={selected}
				handleCloseModal={() => setSelected(undefined)}
			/>

			<ErrorMessage className="row--left form-group--error" name="feats" component="div" />
		</div>
	)
}
export default CreatorFormFeats