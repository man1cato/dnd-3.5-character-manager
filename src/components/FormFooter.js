import React from 'react';

const FormFooter = ({page, pages, handleBack, handleNext, setErrors, isSubmitting, isValid}) => (
    <footer className="bg-light">
        <div className="footer--form">
            {page !== 1 && (
                <button 
                    type="button" 
                    className="btn-secondary" 
                    key="backButton" 
                    onClick={() => handleBack(setErrors)}
                >   
                    Back
                </button>
            )}
            {page === pages.length ? (
                <button 
                    className="btn-primary" 
                    type="submit" 
                    key="submitButton" 
                    disabled={isSubmitting || !isValid}
                >   
                    Create Character
                </button>
            ) : (                                        
                <button 
                    className="btn-primary" 
                    type="button" 
                    key="nextButton" 
                    disabled={!isValid} 
                    onClick={handleNext}
                >   
                    Next
                </button>
            )}
        </div>
    </footer>
);

export default FormFooter;
