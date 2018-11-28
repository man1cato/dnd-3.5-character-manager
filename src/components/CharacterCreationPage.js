import React from 'react';
import {connect} from 'react-redux';
import Header from './Header';
import {Formik, Form} from 'formik';
import * as Yup from 'yup';

import Page1 from './CreatorFormPage1';
import Page2 from './CreatorFormPage2';
import Page3 from './CreatorFormPage3';
import FormFooter from './FormFooter';
import {dieRoll} from '../utils/utils';

const pages = [Page1, Page2, Page3];

const validationSchema = Yup.object().shape({
    page1: Yup.object().shape({
        name: Yup.string().min(2, 'Name is too short!').max(30, 'Name is too long!').required('Required')
    }),
    page2: undefined,
    page3: Yup.object().shape({
        str: Yup.number().min(0, 'Value must be at least 0').max(18, 'Value must be at most 18').required('Required'),
        dex: Yup.number().min(0, 'Value must be at least 0').max(18, 'Value must be at most 18').required('Required'),
        con: Yup.number().min(0, 'Value must be at least 0').max(18, 'Value must be at most 18').required('Required'),
        int: Yup.number().min(0, 'Value must be at least 0').max(18, 'Value must be at most 18').required('Required'),
        wis: Yup.number().min(0, 'Value must be at least 0').max(18, 'Value must be at most 18').required('Required'),
        cha: Yup.number().min(0, 'Value must be at least 0').max(18, 'Value must be at most 18').required('Required')
    })
});

export class CharacterCreationPage extends React.Component {
    state = {
        selectedRace: this.props.races.find((race) => race.name === 'Human'),
        selectedClass: this.props.classes.find((jobClass) => jobClass.name === 'Fighter'),
        page: 1
    }

    handleSelect = (e, setFieldValue, setFieldError) => {
        const name = e.target.name;
        const value = e.target.value;
        if (name === 'raceId') { setFieldValue('bonusLanguages', []) } 
        if (name === 'school') {
            setFieldValue('prohibitedSchools', []);
            if (value === 'Universal') {
                setFieldError('prohibitedSchools', undefined);
            } 
        } 
        this.setState((prevState) => {
            const selectedRace = name === 'raceId' ? this.props.races.find((race) => race.id === value) : prevState.selectedRace;
            const selectedClass = name === 'jobClassId' ? this.props.classes.find((jobClass) => jobClass.id === value) : prevState.selectedClass;
            if (selectedClass.name !== 'Wizard') { setFieldValue('school', undefined) };
            if (selectedClass.name !== 'Psion') { setFieldValue('discipline', undefined) };
            
            return {
                selectedRace,
                selectedClass
            }
        });
    }

    handleMultiSelect = (e, setFieldValue) => {
        const name = e.target.name;
        const options = e.target.options;
        const value = [];
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        setFieldValue(name, value);
    }

    handleAbilityScoreRoll = (setFieldValue) => {
        const abilityScoreRoll = () => dieRoll(6) + dieRoll(6) + dieRoll(6);

        setFieldValue('str', abilityScoreRoll());
        setFieldValue('dex', abilityScoreRoll());
        setFieldValue('con', abilityScoreRoll());
        setFieldValue('int', abilityScoreRoll());
        setFieldValue('wis', abilityScoreRoll());
        setFieldValue('cha', abilityScoreRoll());
    }

    handleBack = (setErrors) => {
        this.setState((prevState) => ({
            page: prevState.page - 1
        }));        
        setErrors({});
    }

    handleNext = () => {
        this.setState((prevState) => ({
            page: prevState.page + 1
        }));
    }    

    render() {        
        return (
            <Formik
                initialValues={{
                    name: '',
                    gender: 'Male',
                    raceId: this.props.races.find((race) => race.name === 'Human').id,
                    jobClassId: this.props.classes.find((jobClass) => jobClass.name === 'Fighter').id,
                    school: 'Universal'
                }}
                                    
                validationSchema={Yup.reach(validationSchema, `page${this.state.page}`)}

                onSubmit={(values, {setErrors, setSubmitting}) => {
                    console.log('Submitted:', values);
                    setSubmitting(false);
                }}
            >

                {({values, setFieldValue, handleChange, isSubmitting, isValid, setErrors, setFieldError}) => (
                    
                    <Form className="layout">
                        <Header pageTitle="Character Creation" />

                        <div className="layout__body">
                            {{
                                1: <Page1 
                                        values={values}
                                        races={this.props.races}
                                        classes={this.props.classes}
                                        selectedRace={this.state.selectedRace} 
                                        handleChange={handleChange} 
                                        handleSelect={this.handleSelect}  
                                        setFieldValue={setFieldValue}
                                    />,
                                2: <Page2
                                        values={values}
                                        selectedRace={this.state.selectedRace} 
                                        classes={this.props.classes}
                                        selectedClass={this.state.selectedClass}
                                        disciplines={this.props.disciplines}
                                        schools={this.props.schools}
                                        handleChange={handleChange}
                                        handleSelect={this.handleSelect}
                                        handleMultiSelect={this.handleMultiSelect}
                                        setFieldValue={setFieldValue}
                                        setFieldError={setFieldError}
                                    />,
                                3: <Page3 
                                        setFieldValue={setFieldValue}
                                        handleAbilityScoreRoll={this.handleAbilityScoreRoll}
                                    />
                            }[this.state.page]}
                        </div>

                        <FormFooter 
                            page={this.state.page}
                            pages={pages}
                            handleBack={this.handleBack}
                            handleNext={this.handleNext}
                            setErrors={setErrors}
                            isSubmitting={isSubmitting}
                            isValid={isValid}
                        />
                    </Form>

                )}
            </Formik>
        )
    }
};


const mapStateToProps = (state) => ({
    races: state.races,
    classes: state.classes,
    schools: [
        'Abjuration', 'Conjuration', 'Divination', 
        'Enchantment', 'Evocation', 'Illusion',  
        'Necromancy',  'Transmutation', 'Universal'
    ], 
    disciplines: [
        'Clairsentience', 'Metacreativity','Psychokinesis', 
        'Psychometabolism', 'Psychoportation', 'Telepathy'
    ]
});

const mapDispatchToProps = (dispatch, props) => ({
    startEditProfile: (id, updates) => dispatch(startEditProfile(id, updates))
});


export default connect(mapStateToProps, mapDispatchToProps)(CharacterCreationPage);
