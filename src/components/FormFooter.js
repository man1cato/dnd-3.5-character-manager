import React from 'react';

const FormFooter = ({page, pages, handleBack, handleNext, setErrors, isSubmitting, isValid}) => (
    <div className="container container--footer form__footer">
        {page !== 1 && (
            <button type="button" key="backButton" onClick={() => handleBack(setErrors)}>   
                Back
            </button>
        )}
        {page === pages.length ? (
            <button type="submit" key="submitButton" disabled={isSubmitting || !isValid}>   
                Create Character
            </button>
        ) : (                                        
            <button type="button" key="nextButton" disabled={!isValid} onClick={handleNext}>   
                Next
            </button>
        )}
    </div>
);

export default FormFooter;
