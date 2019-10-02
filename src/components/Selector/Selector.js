import React, { useEffect, useState } from 'react'
import _ from 'lodash'

import './Selector.scss'


const Selector = ({ items, Content, handleSelect }) => {	
	const [currentItemId, setCurrentItemId] = useState(items[0].id)

	useEffect(() => {
		setCurrentItemId(items[0].id)
	}, [items])

	return (
		<>
			<div className="Selector__row">
				<select 
					className="Selector__dropdown select"
					value={currentItemId} 
					onChange={(e) => setCurrentItemId(e.target.value)}
				>
					{_.map(items, item => (
						<option 
							value={item.id} 
							key={item.id}
						>
							{item.name}
						</option>
					))}
				</select> 
				
				<button 
					className="Selector__button button"
					type="button" 
					onClick={() => handleSelect(currentItemId)}
				>
					Select
				</button>
			</div>

			<Content
				currentItemId={currentItemId}
			/>
		</>
	)
}

export default Selector