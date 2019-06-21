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
			<div className="input-group--80">

				<select 
					className="input-group__item"
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

				<button 
					className="input-group__item"
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
