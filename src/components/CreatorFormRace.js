import React from 'react';
import {connect} from 'react-redux';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';

import SpecialAbilities from './SpecialAbilities';


const CreatorFormRace = ({
    values, 
    errors, 
    touched, 
    isSubmitting, 
    handleChange, 
    handleSelect,
    classes, 
    races, 
    specialAbilities,
    selectedClass,
    selectedRace
}) => (
    <Form className="form layout__body-footer">
        <div className="container container--body">
            <div className="form__group">
                <div className="form__content--flex">
                    <h4>Name:</h4>
                    <Field name="name" value={values.name} />
                </div>
                {errors.name && touched.name ? ( <div className="form__error">{errors.name}</div> ) : null}
            </div>
            
            <div className="divider"></div>

            <div className="form__group form__content--flex">
                <h4>Race:</h4>
                <Field name="race" component="select" onChange={(e) => {handleChange(e); handleSelect(e)}}>
                    {races.map((race) => (
                        <option 
                            value={race.id} 
                            key={race.id}
                        >
                            {race.name}
                        </option>
                    ))}
                </Field>                                    
            </div>

            <div className="form__group form__content--flex">
                <h4>Size:</h4>                                 
                <div>{selectedRace.size}</div>
            </div> 

            <div className="form__group form__content--flex">
                <h4>Speed:</h4>                                 
                <div>{selectedRace.speed}</div>
            </div> 

            <div className="form__group form__content--flex">
                <h4>Racial Modifiers:</h4>     
                <div>
                    {Object.entries(selectedRace.abilityMods).filter((mod) => mod[1] !== 0).length > 0 ?
                        Object.entries(selectedRace.abilityMods).filter((mod) => mod[1] !== 0).map((mod) => (
                            <div key={mod}>{mod[0].toUpperCase()}: {mod[1]}</div>
                        ))
                        :
                        <div>None</div>
                    }            
                </div>
            </div>

            <div className="form__group form__content--flex">
                <h4>Default Language(s):</h4>
                <div>{selectedRace.defaultLanguages}</div>
            </div>

            <div className="form__group form__content--flex">
                <h4>Bonus Languages:</h4>
                <div>{selectedRace.bonusLanguages}</div>
            </div>

            <div className="form__group form__content">
                <h4>Racial Bonuses:</h4>
                {selectedRace.racialBonuses ? 
                    <ul>
                        {selectedRace.racialBonuses.map((item, i) => (
                            <li key={`racialBonus${i}`}>{item}</li>
                        ))}
                    </ul>
                    :
                    <p>None</p>
                }
            </div>

            <div className="form__group form__content--flex">
                <h4>Special Abilities:</h4>
                {selectedRace.specialAbilities ?
                    <SpecialAbilities specialAbilityIds={selectedRace.specialAbilities} />
                    :
                    <div>None</div>
                }
            </div>

            <div className="form__group form__content--flex">
                <h4>Favored Class:</h4>
                <div>
                    {selectedRace.favoredClass ? 
                        classes.find((jobClass) => selectedRace.favoredClass === jobClass.id).name
                        :
                        'Any'
                    }
                </div>
            </div>

            <div className="divider"></div>

            <div className="form__group form__content--flex">
                <h4>Class:</h4>
                <Field name="jobClass" component="select" onChange={(e) => {handleChange(e); handleSelect(e)}}>
                    {classes.map((jobClass) => (
                        <option 
                            value={jobClass.id} 
                            key={jobClass.id}
                        >
                            {jobClass.name}
                        </option>
                    ))}
                </Field>                                    
            </div>
            
            <div className="form__group form__content--flex">
                <h4>Hit Die:</h4>
                <div>{selectedClass.hitDie}</div>
            </div>

            <div className="form__group form__content--flex">
                <h4>Proficiencies:</h4>
                <div>{selectedClass.proficiencies}</div>
            </div>

        </div>
        <div className="container container--footer">
            <button type="submit" disabled={isSubmitting}>Continue</button>
        </div>
    </Form>
);

//NOTE: FormikForm function MUST come after source form
const FormikForm = withFormik({
    mapPropsToValues({jobClass, selectedClass, race, selectedRace}) {
        return {
            name: "",
            jobClass: jobClass || selectedClass.id,
            race: race || selectedRace.id
        }
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().min(2, 'Name is too short!').max(30, 'Name is too long!').required('Required')
    }),
    handleSubmit(values, {setErrors, setSubmitting}) {
        console.log(values);
        setSubmitting(false);
    }
})(CreatorFormRace);


const mapStateToProps = (state) => ({
    races: state.races,
    classes: state.classes,
    specialAbilities: state.specialAbilities,
    skills: state.skills
});

export default connect(mapStateToProps)(FormikForm);
