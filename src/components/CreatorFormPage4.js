import React, { useEffect, useState } from 'react'
import _ from 'lodash'
import { Field, ErrorMessage } from 'formik'
import FeatModal from './FeatModal'


const CreatorFormPage4 = ({
	values, 
	feats, 
	handleChange, 
	handleSelect, 
	handleMultiSelect, 
	setFieldValue, 
	setFieldError,
	validateForm
}) => {
	const featIds = _.map( 
		_.sortBy( 
			_.toPairs(feats), 
			[(pair) => pair[1].name] 
		), 
		(pair) => pair[0]
	)
	const [availableFeatIds, setAvailableFeatIds] = useState(featIds)
	const [selectedFeatId, setSelectedFeatId] = useState(featIds[0])
	const [selectedFeatIds, setSelectedFeatIds] = useState([])
	const [selected, setSelected] = useState(undefined)
	
	useEffect(() => {
		setFieldValue('feats', selectedFeatIds)
		setAvailableFeatIds(_.difference(featIds, selectedFeatIds))
	}, [selectedFeatIds])

	useEffect(() => {
		setSelectedFeatId(availableFeatIds[0])
	}, [availableFeatIds])

	useEffect(() => {
		validateForm()
	}, [])

	return (
		<div>
			<h3 className="row--center">Feats</h3>

			<select name="feats" value={selectedFeatId} onChange={(e) => setSelectedFeatId(e.target.value)}>
				{_.map(availableFeatIds, (featId, i) => (
					<option 
						value={featId} 
						key={`feat${i}`}
					>
						{feats[featId].name}
					</option>
				))}
			</select>       

			<p>
				Description: {feats[selectedFeatId].description}
			</p>

			<div className="row--center">
				<button 
					type="button" 
					onClick={() => setSelectedFeatIds([...selectedFeatIds, selectedFeatId])}
				>
					Select
				</button>
			</div>

			<h4 className="row--center">Selected Feats:</h4>
			<div>
				{_.map(values.feats, (featId) => (
					<div className="row--center" key={featId}>
						<button
							className="button--link"
							type="button"
							id={featId}
							onClick={() => setSelected(feats[featId])}
						>
							{feats[featId].name}
						</button>
						<button type="button" onClick={() => setSelectedFeatIds(_.without(selectedFeatIds, featId))}>x</button>
					</div>
				))}
				<ErrorMessage name="feats" component="div" className="row--center" />
			</div>

			<FeatModal
				selected={selected}
				handleCloseModal={() => setSelected(undefined)}
			/>
		</div>
	)
}

export default CreatorFormPage4
