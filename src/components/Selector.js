import React, { useEffect, useState } from 'react'
import _ from 'lodash'


const Selector = ({
	apiObject, 
	fieldName,
	Content,
	selectedObjIds,
	setSelectedObjIds
}) => {
	const objIds = _.map( 
		_.sortBy( 
			_.toPairs(apiObject), 
			[(pair) => pair[1].name] 
		), 
		(pair) => pair[0]
	)
	const [availableObjIds, setAvailableObjIds] = useState(objIds)
	const [selectedObjId, setSelectedObjId] = useState(objIds[0])
	
	useEffect(() => {
		setAvailableObjIds(_.difference(objIds, selectedObjIds))
	}, [selectedObjIds])

	useEffect(() => {
		setSelectedObjId(availableObjIds[0])
	}, [availableObjIds])

	return (
		<div>
			<div className="form-group--70">
				<div>
					<select 
						className="select"
						name={fieldName} 
						value={selectedObjId} 
						onChange={(e) => setSelectedObjId(e.target.value)}
					>
						{_.map(availableObjIds, (objId, i) => (
							<option 
								value={objId} 
								key={fieldName + i}
							>
								{apiObject[objId].name}
							</option>
						))}
					</select> 
				</div>
				
				<button 
					className="button--secondary"
					type="button" 
					onClick={() => setSelectedObjIds([...selectedObjIds, selectedObjId])}
				>
					Select
				</button>

			</div>
			      
			
			<div className="section">
				<Content 
					selected={apiObject[selectedObjId]}
				/>				
			</div>
		</div>
	)
}

export default Selector
