import React from 'react';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';


const CreatorFormRace = ({
    values, 
    errors, 
    touched, 
    isSubmitting, 
    handleChange, 
    races, 
    selected, 
    handleSelect
}) => (
    <Form className="form layout__body-footer">
        <div className="container container--body">
            <div className="form__group">
                <div className="form__inline">
                    <h4>Name:</h4>
                    <Field name="name" value={values.name} />
                </div>
                {errors.name && touched.name ? ( <div className="form__error">{errors.name}</div> ) : null}
            </div>

            <div className="form__group form__inline">
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

            <div className="form__group form__inline">
                <h4>Size:</h4>                                 
                <div>{selected.size}</div>
            </div> 

            <div className="form__group form__inline">
                <h4>Racial Modifiers:</h4>     
                {Object.entries(selected.abilityMods).filter((mod) => mod[1] !== 0).length > 0 ?
                    Object.entries(selected.abilityMods).filter((mod) => mod[1] !== 0).map((mod) => (
                        <div key={mod}>{mod[0].toUpperCase()}: {mod[1]}</div>
                    ))
                    :
                    <div>None</div>
                }            
            </div>

            <div className="form__group">
                <h4>Default Language(s):</h4>
                <div>{selected.defaultLanguages}</div>
            </div>

            <div className="form__group">
                <h4>Bonus Languages:</h4>
                <div>{selected.bonusLanguages}</div>
            </div>

            <div className="form__group">
                <h4>Racial Bonuses:</h4>
                {selected.racialBonuses ? 
                    <ul>
                        {selected.racialBonuses.map((item, i) => (
                            <li key={`racialBonus${i}`}>{item}</li>
                        ))}
                    </ul>
                    :
                    <p>None</p>
                }
            </div>
        </div>
        <div className="container container--footer">
            <button type="submit" disabled={isSubmitting}>Continue</button>
        </div>
    </Form>
);

//NOTE: withFormik function MUST come after source form
export default withFormik({
    mapPropsToValues({race, selected}) {
        return {
            name: "",
            race: race || selected.id
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