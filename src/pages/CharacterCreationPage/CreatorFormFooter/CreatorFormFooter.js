import React from 'react'

import './CreatorFormFooter.scss'


const CreatorFormFooter = ({
	page, 
	pageCount, 
	setPage,
	handleSubmit, 
	setErrors, 
	isSubmitting, 
	isValid
}) => (
	<footer className="CreatorFormFooter">
		<div className="container CreatorFormFooter__content">
			{page !== 1 && (
				<button 
					className="button--form-nav button--secondary" 
					type="button" 
					id="backButton" 
					onClick={() => {setPage(page - 1); setErrors({})}}
				>   
					Back
				</button>
			)}
			{page === pageCount ? (
				<button
					className="button--form-nav button--primary" 
					type="submit" 
					id="submitButton"
					disabled={isSubmitting || !isValid} 
					onClick={handleSubmit}
				>   
					Create Character
				</button>
			) : (                                        
				<button 
					className="button--form-nav button--primary" 
					type="button" 
					id="nextButton" 
					disabled={!isValid} 
					onClick={() => setPage(page + 1)}
				>   
					Next
				</button>
			)}
		</div>
	</footer>
)

export default CreatorFormFooter