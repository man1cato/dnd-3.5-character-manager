import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import { ErrorMessage } from 'formik'

import FeatModal from '../../../components/Modals/FeatModal'
import Selector from '../../../components/Selector/Selector'
import { apiObjectToArray } from '../../../utils/utils'
import './CreatorFormFeats.scss'


const CreatorFormFeats = ({
	values, 
	feats, 
	setFieldValue 
}) => {
	const featsArray = apiObjectToArray(feats)
	const [availableFeats, setAvailableFeats] = useState(featsArray)
	const [selectedFeatIds, setSelectedFeatIds] = useState(values.feats)
	const [clickedFeat, setClickedFeat] = useState(undefined)

	const handleSelect = selectedFeatId => {
		setSelectedFeatIds([...selectedFeatIds, selectedFeatId])
	}

	useEffect(() => {
		setAvailableFeats(_.filter(featsArray, feat => 
			!_.includes(selectedFeatIds, feat.id)
		))
		setFieldValue('feats', selectedFeatIds)
	}, [selectedFeatIds])

	const SelectorContent = ({ currentItemId }) => {
		const currentFeat = feats[currentItemId]
		return (
			<div className="section">
				<p><b>Type(s):</b> {currentFeat.types.join(", ")}</p>
				<p><b>Description:</b> {currentFeat.description}</p>
			</div>
		)
	}
	
	return (
		<div className="container--body">						
			<h3 className="section__title">Select Feats</h3>

			<Selector
				items={availableFeats} 
				Content={SelectorContent}
				handleSelect={handleSelect}
			/>

			<div className="divider"></div>

			<h4>Selected Feats:</h4>
			{_.map(values.feats, featId => {
				const feat = { id: featId, ...feats[featId] }
				return (
					<div className="CreatorFormFeats__list" key={featId}>
						<button
							className="button--link"
							type="button"
							id={featId}
							onClick={() => setClickedFeat(feat)}
						>
							{feat.name}
						</button>
									
						<button 
							className="button" 
							type="button" 
							onClick={() => setSelectedFeatIds(_.without(selectedFeatIds, featId))}
						>
							<ion-icon name="close" size="small" />
						</button>
					</div>
				)
			})}

			<FeatModal
				clickedFeat={clickedFeat}
				handleCloseModal={() => setClickedFeat(undefined)}
			/>

			<ErrorMessage className="CreatorForm__error" name="feats" component="div" />
		</div>
	)
}


export default CreatorFormFeats