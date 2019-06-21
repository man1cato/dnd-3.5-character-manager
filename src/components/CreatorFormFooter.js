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
	<footer className="footer">
		<div className="container footer__form">
			{page !== 1 && (
				<button className="button--secondary" type="button" id="backButton" onClick={() => handleBack(setErrors)}>   
					Back
				</button>
			)}
			{page === pages.length ? (
				<button className="button" type="submit" id="submitButton" disabled={isSubmitting || !isValid} onClick={handleSubmit}>   
					Create Character
				</button>
			) : (                                        
				<button className="button" type="button" id="nextButton" disabled={!isValid} onClick={() => handleNext()}>   
					Next
				</button>
			)}
		</div>
	</footer>
)

export default CreatorFormFooter