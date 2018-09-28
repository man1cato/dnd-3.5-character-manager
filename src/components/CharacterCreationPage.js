import React from 'react';
import {connect} from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as Yup from "yup";

import Header from './Header';

const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .max(50, 'Too Long!')
      .required('Required')
});

const raceSelector = ({races, handleChange}) => (
    <label>
        Race: 
        <select name="race" onChange={handleChange}>
            {races.map((race) => (
                <option 
                    id={race.id}
                    name="races"
                    value={race.name} 
                    key={race.id}
                >
                    {race.name}
                </option>

            ))}
        </select>                                    
    </label>
);

export class CharacterCreationPage extends React.Component {

    render () {
        return (
            <div>
                <Header pageTitle="Character Creation" />
                <div className="container container--body">
                    <Formik
                        initialValues={{...this.props.races[0], name: ''}}
                        validationSchema={SignupSchema}
                        onSubmit={values => {
                            setTimeout(() => {
                                alert(JSON.stringify(values, null, 2));
                            }, 200);
                        }}
                    >
                        {({ values, errors, touched, handleChange }) => (
                            <Form className="form">
                                <label>
                                    Name: 
                                    <Field name="name" />
                                    {errors.name && touched.name ? ( <div className="form__error">{errors.name}</div> ) : null}
                                </label>

                                <label>
                                    Race: 
                                    <Field name="races" component="select" 
                                        onChange={(e) => {                                            
                                            handleChange(e);                                                                                                                     
                                            const id = e.target.value;
                                            const selected = this.props.races.find((race) => race.id === id);
                                            console.log('selected:', selected);
                                            values = {
                                                ...selected
                                            }
                                        }}
                                    >
                                        {this.props.races.map((race) => (
                                            <option 
                                                value={race.id} 
                                                key={race.id}
                                            >
                                                {race.name}
                                            </option>
                                        ))}
                                    </Field>                                    
                                </label>

                                <label>
                                    Size:                                    
                                    <div name="size">{values.size}</div>
                                </label>                             

                                <label>
                                    Default Languages:
                                    <div name="defaultLanguages">{values.defaultLanguages}</div>
                                </label>

                                <label>
                                    Bonus Languages:
                                    <div name="bonusLanguages">{values.bonusLanguages}</div>
                                </label>

                                <label>
                                    Racial Bonuses:
                                    <div name="racialBonuses">{values.racialBonuses}</div>
                                </label>

                                <button type="submit">Submit</button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        );
    }
} 

const mapStateToProps = (state) => ({
    races: state.races,
    feats: state.feats,
    specialAbilities: state.specialAbilities,
    skills: state.skills,
    spells: state.spells
  })

const mapDispatchToProps = (dispatch, props) => ({
    startEditProfile: (id, updates) => dispatch(startEditProfile(id, updates))
});


export default connect(mapStateToProps, mapDispatchToProps)(CharacterCreationPage);
