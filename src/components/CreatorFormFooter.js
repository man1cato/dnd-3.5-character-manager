import React from 'react'

const CreatorFormFooter = ({
	page, 
	pageCount, 
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
					<button className="button--form-nav button--secondary" type="button" id="backButton" onClick={() => handleBack(setErrors)}>   
					Back
				</button>
			)}
			{page === pageCount ? (
				<button className="button--form-nav button--primary" type="submit" id="submitButton" disabled={isSubmitting || !isValid} onClick={handleSubmit}>   
					Create Character
				</button>
			) : (                                        
				<button className="button--form-nav button--primary" type="button" id="nextButton" disabled={!isValid} onClick={() => handleNext()}>   
					Next
				</button>
			)}
		</div>
	</footer>
)

export default CreatorFormFooter