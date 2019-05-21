import React from 'react'
import {connect} from 'react-redux'
import Header from './Header'
import {Formik, Form} from 'formik'
import * as Yup from 'yup'

import Page1 from './CreatorFormPage1'
import Page2 from './CreatorFormPage2'
import Page3 from './CreatorFormPage3'
import CreatorFormFooter from './CreatorFormFooter'
import {history} from '../routers/AppRouter'
import {startCreateProfile} from '../actions/profile'
import {getSpecialAbilityIdsFromLevels} from '../utils/getSpecialAbilities'


const pages = [Page1, Page2, Page3]

const validationSchema = Yup.object().shape({
	page1: Yup.object().shape({
		name: Yup.string().min(2, 'Name is too short!').max(30, 'Name is too long!').required('Required'),
		age: Yup.number().required().positive().integer(),
		heightFt: Yup.number('Enter a positive integer').positive('Enter a positive integer').integer('Enter a positive integer').required('Required'),
		heightIn: Yup.number('Enter an integer between 0 and 12').positive('Enter an integer between 0 and 12').integer('Enter an integer between 0 and 12').max(11, 'Enter an integer between 0 and 12').required('Required'),
		weight: Yup.number('Enter a positive integer').positive('Enter a positive integer').integer('Enter a positive integer').required('Required')
	}),
	page2: undefined,
	page3: undefined
})

export class CharacterCreationPage extends React.Component {
	state = {
		selectedRace: this.props.races.find((race) => race.name === 'Human'),
		selectedJobClass: this.props.jobClasses.find((jobClass) => jobClass.name === 'Fighter'),
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
		if (name === 'jobClass') {
			if (value === this.props.jobClasses.find((jobClass) => jobClass.name === 'Paladin').id) { 
				setFieldValue('alignment', 'Lawful Good') 
			}
			if (value === this.props.jobClasses.find((jobClass) => jobClass.name === 'Wizard').id) { 
				setFieldValue('school', 'Universal') 
			} else {
				setFieldValue('school', null)
			}
		}
		
		this.setState((prevState) => {
			const selectedRace = name === 'race' ? this.props.races.find((race) => race.id === value) : prevState.selectedRace;
			const selectedJobClass = name === 'jobClass' ? this.props.jobClasses.find((jobClass) => jobClass.id === value) : prevState.selectedJobClass;
			
			return {
				selectedRace,
				selectedJobClass
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
						age: '',
						heightFt: '',
						heightIn: '',
						weight: '',
						race: this.props.races.find((race) => race.name === 'Human').id,
						jobClass: this.props.jobClasses.find((jobClass) => jobClass.name === 'Fighter').id,
						alignment: 'Lawful Good',
						deity: ''
					}}
												
					validationSchema={Yup.reach(validationSchema, `page${this.state.page}`)}

					onSubmit={(values, {setErrors, setSubmitting}) => {
						getSpecialAbilityIdsFromLevels(values.jobClass, 1).then((specialAbilities) => {
							const profile = {
								...values,
								race: this.state.selectedRace.name,
								size: this.state.selectedRace.size,
								specialAbilities,
								jobClass: this.state.selectedJobClass.name,
								height: `${values.heightFt}'${values.heightIn}"`,
								languages: this.state.selectedRace.defaultLanguages.concat(values.bonusLanguages),
								deity: !!values.deity ? values.deity : "None",
								level: 1,
								iconUrl: this.state.selectedRace.iconUrl
							}
							delete profile.heightFt
							delete profile.heightIn
							if(profile.school === null) {delete profile.school}
							this.props.startCreateProfile(profile)
						})							
						setTimeout(() => { history.push('/profile') }, 2000)
						setSubmitting(false)
					}}
				>

					{({values, setFieldValue, handleChange, isSubmitting, isValid, setErrors, setFieldError}) => (
						<Form >
							<div className="container container--body">
								{{
									1: <Page1 
										values={values}
										races={this.props.races}
										jobClasses={this.props.jobClasses}
										selectedRace={this.state.selectedRace} 
										handleChange={handleChange} 
										handleSelect={this.handleSelect}  
										setFieldValue={setFieldValue}
									/>,
									2: <Page2
										values={values}
										selectedRace={this.state.selectedRace} 
										jobClasses={this.props.jobClasses}
										selectedJobClass={this.state.selectedJobClass}
										alignments={this.props.alignments}
										schools={this.props.schools}
										handleChange={handleChange}
										handleSelect={this.handleSelect}
										handleMultiSelect={this.handleMultiSelect}
										setFieldValue={setFieldValue}
										setFieldError={setFieldError}
									/>,
									3: <Page3
										values={values}
										feats={this.props.feats}
										selectedJobClass={this.state.selectedJobClass}										
										handleChange={handleChange}
										handleSelect={this.handleSelect}
										handleMultiSelect={this.handleMultiSelect}
										setFieldValue={setFieldValue}
										setFieldError={setFieldError}
									/>
								}[this.state.page]}
							</div>
							
							<CreatorFormFooter 
								page={this.state.page}
								pages={pages}
								handleBack={this.handleBack}
								handleNext={this.handleNext}
								handleSubmit={this.handleSubmit}
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
	jobClasses: state.jobClasses,
	feats: state.feats,
	schools: [
		'Abjuration','Clairsentience', 'Conjuration', 'Divination', 
		'Enchantment', 'Evocation', 'Illusion', 'Metacreativity', 
		'Necromancy', 'Psychokinesis', 'Psychometabolism', 'Psychoportation', 
		'Telepathy', 'Transmutation', 'Universal'
	],
	alignments: [
		'Lawful Good', 'Neutral Good', 'Chaotic Good', 
		'Lawful Neutral', 'True Neutral', 'Chaotic Neutral', 
		'Lawful Evil', 'Neutral Evil', 'Chaotic Evil'
	]
});

const mapDispatchToProps = (dispatch, props) => ({
	startCreateProfile: (profile) => dispatch(startCreateProfile(profile))
});


export default connect(mapStateToProps, mapDispatchToProps)(CharacterCreationPage);
