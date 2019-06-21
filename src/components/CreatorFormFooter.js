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
	<footer className="footer--form">
		<div className="container footer--form__content">
			{page !== 1 && (
				<button className="button--secondary button--form-nav" type="button" id="backButton" onClick={() => handleBack(setErrors)}>   
					Back
				</button>
			)}
			{page === pages.length ? (
				<button className="button--form-nav" type="submit" id="submitButton" disabled={isSubmitting || !isValid} onClick={handleSubmit}>   
					Create Character
				</button>
			) : (                                        
					<button className="button--form-nav" type="button" id="nextButton" disabled={!isValid} onClick={() => handleNext()}>   
					Next
				</button>
			)}
		</div>
	</footer>
)

export default CreatorFormFooter