import React from 'react';
import {connect} from 'react-redux';
import Header from './Header';
import {Formik, Form} from 'formik';
import * as Yup from 'yup';

import Page1 from './CreatorFormPage1';
import Page2 from './CreatorFormPage2';
import FormFooter from './FormFooter';


const pages = [Page1, Page2];

const validationSchema = Yup.object().shape({
	page1: Yup.object().shape({
		name: Yup.string().min(2, 'Name is too short!').max(30, 'Name is too long!').required('Required')
	}),
	page2:  undefined
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
		if (name === 'race') { setFieldValue('bonusLanguages', []) } 
		if (name === 'school') {
			setFieldValue('prohibitedSchools', []);
			if (value === 'Universal') {
				setFieldError('prohibitedSchools', undefined);
			} 
		} 
		this.setState((prevState) => {
			const selectedRace = name === 'race' ? this.props.races.find((race) => race.id === value) : prevState.selectedRace;
			const selectedClass = name === 'jobClass' ? this.props.classes.find((jobClass) => jobClass.id === value) : prevState.selectedClass;
			
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
			<div className="layout">
				<Header pageTitle="Character Creation" />
				
				<Formik
					initialValues={{
						name: '',
						gender: 'Male',
						race: this.props.races.find((race) => race.name === 'Human').id,
						jobClass: this.props.classes.find((jobClass) => jobClass.name === 'Fighter').id,
						deity: '',
						school: 'Universal'
					}}
												
					validationSchema={Yup.reach(validationSchema, `page${this.state.page}`)}

					onSubmit={(values, {setErrors, setSubmitting}) => {
						console.log('Submitted:', values);
						setSubmitting(false);
					}}
				>

					{({values, setFieldValue, handleChange, isSubmitting, isValid, setErrors, setFieldError}) => (
						<Form >
							<div className="container container--body">
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
										schools={this.props.schools}
										handleChange={handleChange}
										handleSelect={this.handleSelect}
										handleMultiSelect={this.handleMultiSelect}
										setFieldValue={setFieldValue}
										setFieldError={setFieldError}
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
