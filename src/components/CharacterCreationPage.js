import React, { useState } from 'react'
import { connect } from 'react-redux'
import Header from './Header'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import _ from 'lodash'

import { history } from '../routers/AppRouter'
import { startCreateProfile } from '../actions/profile'
import { apiObjectToArray, calcAbilityMod, calSizeMod } from '../utils/utils'
import { abilities } from '../utils/staticData'

import CreatorFormIdentity from './CreatorFormIdentity'
import CreatorFormJobClass from './CreatorFormJobClass'
import CreatorFormAbilities from './CreatorFormAbilities'
import CreatorFormFeats from './CreatorFormFeats'
import CreatorFormSkills from './CreatorFormSkills'
import CreatorFormEquipment from './CreatorFormEquipment'
import CreatorFormFooter from './CreatorFormFooter'


const pages = [CreatorFormIdentity, CreatorFormJobClass, CreatorFormAbilities, CreatorFormFeats, CreatorFormSkills, CreatorFormEquipment]

const abilityMessage = 'Enter an integer between 3 and 18'
const abilityValidation = Yup.number().integer(abilityMessage).min(3, abilityMessage).max(18, abilityMessage).required('Required').typeError(abilityMessage)
const validationSchema = Yup.object().shape({
	page1: Yup.object().shape({
		name: Yup.string().max(30, 'Name is too long!').required('Required').typeError('Required'),
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
		remainingSkillPoints: Yup.number().moreThan(-1, 'Too many skill points assigned').lessThan(1, 'Assign all skill points')
	}),
	page6: Yup.object().shape({
		equipment: Yup.array().required('Select at least one equipment')
	})
})


export const CharacterCreationPage = (props) => {
	const [page, setPage] = useState(1)
	const [selectedRace, setSelectedRace] = useState(_.find(props.races, (race) => race.name === 'Human'))
	const [selectedJobClass, setSelectedJobClass] = useState(_.find(props.jobClasses, (jobClass) => jobClass.name === 'Fighter'))

	const handleMultiSelect = (e, setFieldValue) => {
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
	
	return (
		<>
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
					alignment: 'Lawful Good',
					race: _.findKey(props.races, (race) => race.name === 'Human'),
					jobClass: _.findKey(props.jobClasses, (jobClass) => jobClass.name === 'Fighter'),
					bonusLanguages: [],
					deity: '',
					abilities: _.mapValues(abilities, () => ({ score: '', final: '' })),
					feats: [],
					equipment: [],
					equipped: {
						armor: null,
						shield: null,
						weapons: []
					},
					skillSet: apiObjectToArray(props.skills).map(skill => ({id: skill.id, ranks: 0 })),
					skillPoints: 0,
					remainingSkillPoints: 0
				}}
											
				validationSchema={Yup.reach(validationSchema, `page${page}`)}

				onSubmit={(values, {setErrors, setSubmitting}) => {
					const selectedJobClass = props.jobClasses[values.jobClass]
					const selectedRace = props.races[values.race]
					const abilities = _.mapValues(values.abilities, (ability) => ({ 
						score: ability.final,
						tempScore: ''
					}))
					const dexMod = calcAbilityMod(abilities.dex.score)
					let armorBonus = 0
					if (values.equipped.armor) { armorBonus += props.items[values.equipped.armor].armorBonus }
					if (values.equipped.shield) { armorBonus += props.items[values.equipped.shield].armorBonus }
					const baseArmorClass = 10 + armorBonus + calSizeMod(selectedRace.size) + dexMod
					const profile = {
						name: values.name,
						gender: values.gender,
						age: values.age,
						height: `${values.height.ft}'${values.height.in}"`,
						weight: values.weight,
						race: values.race,
						alignment: values.alignment,
						jobClass: values.jobClass,
						languages: _.orderBy(selectedRace.defaultLanguages.concat(values.bonusLanguages)),
						specialAbilities: selectedJobClass.levels["1"].specialAbilities,
						deity: !!values.deity ? values.deity : "None",
						abilities,
						feats: values.feats,
						skillSet: _.filter(values.skillSet, skill => skill.ranks > 0),
						equipment: values.equipment,
						equipped: values.equipped,
						ac: {
							base: baseArmorClass,
							flat: baseArmorClass - dexMod,
							touch: baseArmorClass - armorBonus
						},
						level: 1,
						xp: 0,
						iconUrl: selectedRace.iconUrl
					}
					if(!!values.school) {
						profile.school = values.school 
						profile.prohibitedSchools = values.prohibitedSchools
					}
					props.startCreateProfile(profile)
					
					setTimeout(() => { history.push('/profile') }, 1500)
					setSubmitting(false)
				}}
			>
				{({ values, setFieldValue, handleChange, handleSubmit, isSubmitting, isValid, validateForm, setErrors, setFieldError, setTouched}) => (
					<Form >
						<div className="container container--body">
							{{
								1: <CreatorFormIdentity 
									selectedRace={selectedRace}
									setSelectedRace={setSelectedRace}
									races={props.races}
									jobClasses={props.jobClasses}
									handleChange={handleChange} 
									setFieldValue={setFieldValue}
									setTouched={setTouched}
								/>,
								2: <CreatorFormJobClass
									values={values}
									selectedRace={selectedRace}
									selectedJobClass={selectedJobClass}
									setSelectedJobClass={setSelectedJobClass}
									jobClasses={props.jobClasses}
									handleChange={handleChange}
									handleMultiSelect={handleMultiSelect}
									setFieldValue={setFieldValue}
									setFieldError={setFieldError}
									validateForm={validateForm}
								/>,
								3: <CreatorFormAbilities
									values={values}
									selectedRace={selectedRace}
									selectedJobClass={selectedJobClass}
									handleChange={handleChange}
									setFieldValue={setFieldValue}
									setFieldError={setFieldError}		
									validateForm={validateForm}								
								/>,
								4: <CreatorFormFeats
									values={values}
									feats={props.feats}
									setFieldValue={setFieldValue}
								/>,
								5: <CreatorFormSkills
									values={values}
									skills={props.skills}
									setFieldValue={setFieldValue}
								/>,
								6: <CreatorFormEquipment
									values={values}
									items={props.items}
									setFieldValue={setFieldValue}
								/>
							}[page]}
						</div>
						
						<CreatorFormFooter 
							page={page}
							pageCount={pages.length}
							setPage={setPage}
							handleSubmit={handleSubmit}
							setErrors={setErrors}
							isSubmitting={isSubmitting}
							isValid={isValid}
							validateForm={validateForm}
						/>

					</Form>
				)}
			</Formik>
				
		</>
	)
}


const mapStateToProps = (state) => ({
	races: state.races,
	jobClasses: state.jobClasses,
	feats: _.omitBy(state.feats, (feat) => feat.prerequisites || _.includes(feat.types, 'Epic') || _.includes(feat.types, 'Creature')),
	items: _.omitBy(state.items, (item) => item.weaponType === 'Natural' || item.category === 'Creature Part'),
	skills: state.skills
})

const mapDispatchToProps = (dispatch, props) => ({
	startCreateProfile: (profile) => dispatch(startCreateProfile(profile))
})


export default connect(mapStateToProps, mapDispatchToProps)(CharacterCreationPage)