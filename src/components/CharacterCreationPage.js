import React from 'react';
import {connect} from 'react-redux';
import { Form, Field, withFormik } from 'formik';
import * as Yup from "yup";

import Header from './Header';


const CreatorForm = ({
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
                <label>
                    Name: 
                    <Field name="name" />
                </label>
                {errors.name && touched.name ? ( <div className="form__error">{errors.name}</div> ) : null}
            </div>

            <label className="form__group">
                Race: 
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
            </label>

            <div className="form__group">
                <h4>Size:</h4>                                 
                <div>{selected.size}</div>
            </div> 

            <div className="form__group">
                <h4>Racial Modifiers:</h4>     
                {Object.entries(selected.abilityMods).filter((mod) => mod[1] !== 0).length > 0 ?
                    Object.entries(selected.abilityMods).filter((mod) => mod[1] !== 0).map((mod) => (
                        <div key={mod}>{mod[0].toUpperCase()}: {mod[1]}</div>
                    ))
                    :
                    'None'
                }            
            </div>

            <div className="form__group">
                <h4>Default Languages:</h4>
                <div>{selected.defaultLanguages}</div>
            </div>

            <div className="form__group">
                <h4>Bonus Languages:</h4>
                <div>{selected.bonusLanguages}</div>
            </div>

            <div className="form__group">
                <h4>Racial Bonuses:</h4>
                <div>{selected.racialBonuses}</div>
            </div>
        </div>
        <div className="container container--footer">
            <button type="submit" disabled={isSubmitting}>Continue</button>
        </div>
    </Form>
);


const FormikCreatorForm = withFormik({
    mapPropsToValues({race, selected}) {
        return {
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
})(CreatorForm);


export class CharacterCreationPage extends React.Component {
    state = {
        selected: this.props.races.find((race) => race.name === 'Human')
    }

    handleSelect = (e) => {
        const raceId = e.target.value;
        this.setState(() => ({
            selected: this.props.races.find((race) => race.id === raceId)
        }));
    }

    render() {
        return (
            <div className="layout">
                <Header pageTitle="Character Creation" />
                <FormikCreatorForm 
                    races={this.props.races} 
                    selected={this.state.selected} 
                    handleSelect={this.handleSelect}                    
                />
            </div>
        )
    }
};


const mapStateToProps = (state) => ({
    races: state.races,
    feats: state.feats,
    specialAbilities: state.specialAbilities,
    skills: state.skills,
    spells: state.spells
});

const mapDispatchToProps = (dispatch, props) => ({
    startEditProfile: (id, updates) => dispatch(startEditProfile(id, updates))
});


export default connect(mapStateToProps, mapDispatchToProps)(CharacterCreationPage);
