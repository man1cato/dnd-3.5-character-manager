import React from 'react';
import { Field, ErrorMessage } from 'formik';

const CreatorFormPage2 = ({selectedRace, selectedClass, schools}) => (
    <div>
        <h4>Languages: {selectedRace.defaultLanguages.join(', ')}</h4>

        <div className="form__group form__content--flex">
            <h4>Choose Bonus Languages:</h4>
            <Field name="bonusLanguages" component="select">
                {selectedRace.bonusLanguages.map((language) => (
                    <option 
                        value={language} 
                        key={language}
                    >
                        {language}
                    </option>
                ))}
            </Field>                                    
        </div>

        <div className="form__group form__content--flex">
            <h4>Deity:</h4>
            <Field name="deity" />
        </div>

        {selectedClass.name === 'Wizard' &&
            <div>
                <div className="form__group form__content--flex">
                    <h4>School:</h4>
                    <Field name="school" component="select">
                        {schools.map((school) => (
                            <option 
                                value={school} 
                                key={school}
                            >
                                {school}
                            </option>
                        ))}
                    </Field>
                </div>

                <div className="form__group form__content--flex">
                    <h4>Prohibited Schools:</h4>
                    <Field name="prohibitedSchools" component="select">
                        <option 
                            value=""
                            key={`prohibitedNone`}
                        >
                            None
                        </option>
                        {schools.map((school) => (
                            <option 
                                value={school} 
                                key={`prohibited${school}`}
                            >
                                {school}
                            </option>
                        ))}
                    </Field>
                </div>
            </div>
        }
    </div>
);


export default CreatorFormPage2;
