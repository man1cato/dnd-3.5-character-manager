import React from 'react';
import {connect} from 'react-redux';
import Header from './Header';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import CreatorFormPage1 from './CreatorFormPage1';
import CreatorFormPage2 from './CreatorFormPage2';


const validationSchema = Yup.object().shape({
    name: Yup.string().min(2, 'Name is too short!').max(30, 'Name is too long!').required('Required')
});

export class CharacterCreationPage extends React.Component {
    state = {
        selectedRace: this.props.races.find((race) => race.name === 'Human'),
        selectedClass: this.props.classes.find((jobClass) => jobClass.name === 'Fighter'),
        page: 1
    }

    handleSelect = (e) => {
        const name = e.target.name;
        const id = e.target.value;
        this.setState((prevState) => {
            const selectedRace = name === 'race' ? this.props.races.find((race) => race.id === id) : prevState.selectedRace;
            const selectedClass = name === 'jobClass' ? this.props.classes.find((jobClass) => jobClass.id === id) : prevState.selectedClass;
            return {
                selectedRace,
                selectedClass
            }
        });
    }

    handleNext = () => {
        this.setState((prevState) => ({
            page: prevState.page + 1
        })) 
    }

    handleBack = () => {
        this.setState((prevState) => ({
            page: prevState.page - 1
        }))
    }

    render() {
        return (
            <div className="layout">
                <Header pageTitle="Character Creation" />
                
                <Formik
                    initialValues={{
                        name: '',
                        gender: 'Male',
                        race: 'Human',
                        jobClass: 'Fighter',
                        deity: '',
                        school: 'Universal',
                        prohibitedSchools: []
                    }}

                    validationSchema={validationSchema}

                    handleSubmit={(values, {setErrors, setSubmitting}) => {
                        console.log('Submitted:',values);
                        setSubmitting(false);
                    }}
                >

                    {(values, handleChange, isSubmitting, validateForm) => (
                        <Form >
                            <div className="container container--body">
                                {{
                                    1: <CreatorFormPage1 
                                            races={this.props.races}
                                            classes={this.props.classes}
                                            selectedRace={this.state.selectedRace} 
                                            selectedClass={this.state.selectedClass}
                                            handleSelect={this.handleSelect}  
                                            handleChange={handleChange}   
                                        />,
                                    2: <CreatorFormPage2
                                            selectedRace={this.state.selectedRace}
                                            selectedClass={this.state.selectedClass}
                                            schools={this.props.schools}
                                        />
                                }[this.state.page]}
                            </div>
                            
                            <div className="container container--footer">
                                {this.state.page === 3 ? (
                                    <button 
                                        className="form__button" 
                                        type="submit" 
                                        disabled={isSubmitting}
                                    >   
                                        Create Character
                                    </button>
                                ) : (
                                    <div>
                                        {this.state.page !== 1 && (
                                            <button type="button" onClick={this.handleBack}>   
                                                Back
                                            </button>
                                        )}
                                        <button type="button" onClick={this.handleNext}>   
                                            Next
                                        </button>
                                    </div>
                                )}
                            </div>
                        </Form>
                    )}
                </Formik>
                
            </div>
        )
    }
};


const mapStateToProps = (state) => ({
    races: state.races,
    classes: state.classes,
    schools: [
        'Abjuration','Clairsentience', 'Conjuration', 'Divination', 
        'Enchantment', 'Evocation', 'Illusion', 'Metacreativity', 
        'Necromancy', 'Psychokinesis', 'Psychometabolism', 'Psychoportation', 
        'Telepathy', 'Transmutation', 'Universal'
    ]
});

const mapDispatchToProps = (dispatch, props) => ({
    startEditProfile: (id, updates) => dispatch(startEditProfile(id, updates))
});


export default connect(mapStateToProps, mapDispatchToProps)(CharacterCreationPage);
