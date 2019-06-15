import React, { useEffect } from 'react'
import _ from 'lodash'
import { Field, ErrorMessage } from 'formik'


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
	useEffect(() => {
		validateForm()
	}, [])

	return (
		<div>
			<div className="form__group form__content--tall">
				<h4>Feats:</h4>
				<Field name="feats" component="select" multiple onChange={(e) => {handleMultiSelect(e, setFieldValue)}}>
					{feats.map((feat, i) => (
						<option 
							value={feat.id} 
							key={`feat${i}`}
						>
							{feat.name}
						</option>
					))}
				</Field>       
			</div>
			<ErrorMessage name="feats" component="div" />
		</div>
	)
}

export default CreatorFormPage4
