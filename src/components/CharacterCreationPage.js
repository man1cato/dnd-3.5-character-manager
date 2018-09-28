import React from 'react';
import {connect} from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as Yup from "yup";

import Header from './Header';

const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .max(50, 'Too Long!')
      .required('Required'),
    race: Yup.string()
      .required('Required'),
});


export class CharacterCreationPage extends React.Component {
    handleSubmit = (e) => {

    }

    render () {
        return (
            <div>
                <Header pageTitle="Character Creation" />
                <div className="container container--body">
                    <Formik
                        initialValues={{
                            name: '',
                            race: 'Human',
                        }}
                        validationSchema={SignupSchema}
                        onSubmit={values => {
                            name
                            console.log(values);
                        }}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                <Field name="name" />
                                {errors.name && touched.name ? (
                                    <div>{errors.name}</div>
                                ) : null}
                                <Field name="race" component="select" >
                                    {this.props.races.map((race) => (
                                        <option 
                                            id={race.id}
                                            value={race.name} 
                                            key={race.id}
                                        >
                                            {race.name}
                                        </option>

                                    ))}
                                </Field>
                                {errors.race && touched.race ? <div>{errors.race}</div> : null}
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
