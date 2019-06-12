import React from 'react'

const CreatorFormFooter = ({
	page, 
	pages, 
	handleBack, 
	handleNext, 
	handleSubmit, 
	setErrors, 
	isSubmitting, 
	isValid
}) => (
	<div className="container container--footer form__footer">
		{page !== 1 && (
			<button type="button" id="backButton" onClick={() => handleBack(setErrors)}>   
				Back
			</button>
		)}
		{page === pages.length ? (
			<button type="submit" id="submitButton" disabled={isSubmitting || !isValid} onClick={handleSubmit}>   
				Create Character
			</button>
		) : (                                        
			<button type="button" id="nextButton" disabled={!isValid} onClick={handleNext}>   
				Next
			</button>
		)}
	</div>
)

export default CreatorFormFooter