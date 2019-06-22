import React from 'react'
import { connect } from 'react-redux'
import Header from './Header'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import _ from 'lodash'

import Page1 from './CreatorFormPage1'
import Page2 from './CreatorFormPage2'
import Page3 from './CreatorFormPage3'
import Page4 from './CreatorFormPage4'
import Page5 from './CreatorFormPage5'
import CreatorFormFooter from './CreatorFormFooter'
import { history } from '../routers/AppRouter'
import { startCreateProfile } from '../actions/profile'
import { apiObjectToArray } from '../utils/utils'
import { abilities } from '../utils/staticData'


const pages = [Page1, Page2, Page3, Page4, Page5]

const abilityMessage = 'Enter an integer between 3 and 18'
const abilityValidation = Yup.number().integer(abilityMessage).min(3, abilityMessage).max(18, abilityMessage).required('Required').typeError('')
const validationSchema = Yup.object().shape({
	page1: Yup.object().shape({
		name: Yup.string().max(30, 'Name is too long!').required('Required'),
		age: Yup.number().positive().integer().required('Required').typeError('Enter a number'),
		height: Yup.object().shape({
			ft: Yup.number().positive('Enter a positive integer').integer('Enter a positive integer').required('Required').typeError('Enter a number').typeError('Enter a number'),
			in: Yup.number().positive('Enter an integer between 0 and 12').integer('Enter an integer between 0 and 12').max(11, 'Enter an integer between 0 and 12').required('Required').typeError('Enter a number'),
		}),
		weight: Yup.number().positive('Enter a positive integer').integer('Enter a positive integer').required('Required').typeError('Enter a number')
	}),
	page2: undefined,
	page3: Yup.object().shape({
		abilities: Yup.object().shape({
			str: Yup.object().shape({ score: abilityValidation	}),
			dex: Yup.object().shape({ score: abilityValidation }),
			con: Yup.object().shape({ score: abilityValidation }),
			int: Yup.object().shape({ score: abilityValidation }),
			wis: Yup.object().shape({ score: abilityValidation }),
			cha: Yup.object().shape({ score: abilityValidation }),
		})
	}),
	page4: Yup.object().shape({
		feats: Yup.array().required('Select at least one feat')
	}),
	page5: Yup.object().shape({
		equipment: Yup.array().required('Select at least one equipment')
	})
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
			setFieldValue('prohibitedSchools', [])
			if (value === 'Universal') {
				setFieldError('prohibitedSchools', undefined)
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
		})
	}

	handleMultiSelect = (e, setFieldValue) => {
		const name = e.target.name
		const options = e.target.options
		const value = []
		for (let i = 0; i < options.length; i++) {
			if (options[i].selected) {
				value.push(options[i].value)
			}
		}
		setFieldValue(name, value)
	}

	handleBack = (setErrors) => {
		this.setState((prevState) => ({
			page: prevState.page - 1
		}))
		setErrors({})
	}

	handleNext = () => {
		this.setState((prevState) => ({
			page: prevState.page + 1
		}))
	}    

	render() {        
		return (
			<div>
				<Header pageTitle="Character Creation" />
				
				<Formik
					initialValues={{
						name: '',
						gender: 'Male',
						age: '',
						height: {
							ft: '',
							in: ''
						},
						weight: '',
						race: this.state.selectedRace.id,
						alignment: 'Lawful Good',
						jobClass: this.state.selectedJobClass.id,
						bonusLanguages: [],
						deity: '',
						abilities: _.mapValues(abilities, () => ({ score: '', final: '' })),
						feats: [],
						equipment: [],
						equipped: {
							armor: null,
							shield: null,
							weapons: []
						}
					}}
												
					validationSchema={Yup.reach(validationSchema, `page${this.state.page}`)}

					onSubmit={(values, {setErrors, setSubmitting}) => {
						const profile = {
							name: values.name,
							gender: values.gender,
							age: values.age,
							height: `${values.height.ft}'${values.height.in}"`,
							weight: values.weight,
							race: this.state.selectedRace.id,
							alignment: values.alignment,
							jobClass: this.state.selectedJobClass.id,
							languages: _.orderBy(this.state.selectedRace.defaultLanguages.concat(values.bonusLanguages)),
							specialAbilities: this.state.selectedJobClass.levels["1"].specialAbilities,
							deity: !!values.deity ? values.deity : "None",
							abilities: _.mapValues(values.abilities, (ability) => ({score: ability.final})),
							feats: values.feats,
							equipment: values.equipment,
							equipped: values.equipped,
							level: 1,
							xp: 0,
							iconUrl: this.state.selectedRace.iconUrl
						}
						if(!!values.school) {
							profile.school = values.school 
							profile.prohibitedSchools = values.prohibitedSchools
						}
						this.props.startCreateProfile(profile)
						
						setTimeout(() => { history.push('/profile') }, 1500)
						setSubmitting(false)
					}}
				>

					{({ values, setFieldValue, handleChange, isSubmitting, isValid, validateForm, setErrors, setFieldError}) => (
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
										handleChange={handleChange}
										handleSelect={this.handleSelect}
										handleMultiSelect={this.handleMultiSelect}
										setFieldValue={setFieldValue}
										setFieldError={setFieldError}
										validateForm={validateForm}
									/>,
									3: <Page3
										values={values}
										selectedRace={this.state.selectedRace} 
										handleChange={handleChange}
										setFieldValue={setFieldValue}
										setFieldError={setFieldError}		
										validateForm={validateForm}								
									/>,
									4: <Page4
										values={values}
										feats={this.props.feats}
										selectedJobClass={this.state.selectedJobClass}
										setFieldValue={setFieldValue}
										validateForm={validateForm}
									/>,
									5: <Page5
										values={values}
										items={this.props.items}
										selectedJobClass={this.state.selectedJobClass}
										setFieldValue={setFieldValue}
										validateForm={validateForm}
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
								validateForm={validateForm}
							/>

						</Form>
					)}
				</Formik>
					
			</div>
		)
	}
}


const mapStateToProps = (state) => ({
	races: apiObjectToArray(state.races),
	jobClasses: apiObjectToArray(state.jobClasses),
	feats: _.omitBy(state.feats, (feat) => feat.prerequisites || _.includes(feat.types, 'Epic')),
	items: _.omitBy(state.items, (item) => item.weaponType === 'Natural' || item.category === 'Creature Part')
})

const mapDispatchToProps = (dispatch, props) => ({
	startCreateProfile: (profile) => dispatch(startCreateProfile(profile))
})


export default connect(mapStateToProps, mapDispatchToProps)(CharacterCreationPage)