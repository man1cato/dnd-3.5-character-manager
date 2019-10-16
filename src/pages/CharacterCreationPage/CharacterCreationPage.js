import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import _ from 'lodash'

import { history } from '../../routers/AppRouter'
import { startCreateProfile } from '../../store/actions/profile'
import { apiObjectToArray, calcAbilityMod, convertMoneyToDenominations, calcAttackBonuses } from '../../utils/utils'
import { abilities, sizeMods } from '../../utils/staticData'

import CreatorFormIdentity from './CreatorFormIdentity/CreatorFormIdentity'
import CreatorFormJobClass from './CreatorFormJobClass/CreatorFormJobClass'
import CreatorFormAbilities from './CreatorFormAbilities/CreatorFormAbilities'
import CreatorFormFeats from './CreatorFormFeats/CreatorFormFeats'
import CreatorFormSkills from './CreatorFormSkills/CreatorFormSkills'
import CreatorFormEquipment from './CreatorFormEquipment/CreatorFormEquipment'
import CreatorFormFooter from './CreatorFormFooter/CreatorFormFooter'


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
	page2: Yup.object().shape({
		startingGold: Yup.number().positive('Cannot be negative').integer('Enter an integer')
	}),
	page3: Yup.object().shape({
		abilities: Yup.object().shape(
			_.mapValues(abilities, () => Yup.object().shape({ score: abilityValidation }))
		)
	}),
	page4: Yup.object().shape({
		feats: Yup.array().required('Select at least one feat')
	}),
	page5: Yup.object().shape({
		remainingSkillPoints: Yup.number().moreThan(-1, 'Too many skill points assigned').lessThan(1, 'Assign all skill points')
	}),
	page6: Yup.object().shape({
		equipment: Yup.array().required('Select at least one equipment'),
		remainingGold: Yup.number().moreThan(-1, 'Purchases must not exceed available money')
	})
})


export const CharacterCreationPage = props => {
	const [page, setPage] = useState(1)

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
				race: _.find(props.races, race => race.name === 'Human'),
				jobClass: _.find(props.jobClasses, jobClass => jobClass.name === 'Fighter'),
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
				remainingSkillPoints: 0,
				startingGold: 0,
				remainingGold: 0
			}}
										
			validationSchema={Yup.reach(validationSchema, `page${page}`)}

			onSubmit={(values, { setSubmitting }) => {
				const { 
					name, gender, age, height, weight, race, alignment, jobClass, 
					remainingGold, bonusLanguages, deity, feats, skillSet,
					equipment, equipped, school, prohibitedSchools  
				} = values

				const abilities = _.mapValues(values.abilities, ability => ({ 
					score: ability.final,
					tempScore: ''
				}))
				const dexMod = calcAbilityMod(abilities.dex.score)
				let armorBonus = 0
				if (equipped.armor) { armorBonus += props.items[equipped.armor].armorBonus }
				if (equipped.shield) { armorBonus += props.items[equipped.shield].armorBonus }
				const baseArmorClass = 10 + armorBonus + sizeMods[race.size].size + dexMod
				
				const profile = {
					name,
					gender,
					age,
					height: `${height.ft}'${height.in}"`,
					weight,
					race: _.findKey(props.races, race),
					alignment,
					jobClass: _.findKey(props.jobClasses, jobClass),
					money: convertMoneyToDenominations(remainingGold),
					languages: _.sortBy(race.defaultLanguages.concat(bonusLanguages)),
					specialAbilities: jobClass.levels["1"].specialAbilities,
					deity: !!deity ? deity : "None",
					abilities,
					feats,
					skillSet: _.filter(skillSet, skill => skill.ranks > 0),
					equipment,
					equipped,
					ac: {
						base: baseArmorClass,
						flat: baseArmorClass - dexMod,
						touch: baseArmorClass - armorBonus
					},
					attackBonuses: _.mapValues(
						calcAttackBonuses(
							jobClass.levels[1].baseAttackBonuses || [0],
							race.size,
							abilities.str.score,
							abilities.dex.score
						),
						val => ({ base: val, mod: 0, total: val })
					),
					level: 1,
					hp: {
						base: Number(jobClass.hitDie.slice(1)) + calcAbilityMod(abilities.con.score)
					},
					xp: 0,
					iconUrl: race.iconUrl
				}
				if(!!school) {
					profile.school = school 
					profile.prohibitedSchools = prohibitedSchools
				}
				console.log('Created profile: ', profile)
				props.startCreateProfile(profile)
				
				setTimeout(() => { history.push('/profile') }, 1500)
				setSubmitting(true)
			}}
		>
			{({ values, setFieldValue, handleChange, handleSubmit, isSubmitting, isValid, validateForm, setErrors, setFieldError, setTouched}) => (
				<Form className="CreatorForm">
					{{
						1: <CreatorFormIdentity 
							values={values}
							races={props.races}
							jobClasses={props.jobClasses}
							setFieldValue={setFieldValue}
							setTouched={setTouched}
						/>,
						2: <CreatorFormJobClass
							values={values}
							jobClasses={props.jobClasses}
							handleChange={handleChange}
							handleMultiSelect={handleMultiSelect}
							setFieldValue={setFieldValue}
							setFieldError={setFieldError}
							validateForm={validateForm}
						/>,
						3: <CreatorFormAbilities
							values={values}
							handleChange={handleChange}
							setFieldValue={setFieldValue}
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
	)
}


const mapStateToProps = state => ({
	races: state.races,
	jobClasses: state.jobClasses,
	feats: _.omitBy(state.feats, feat => feat.prerequisites || _.includes(feat.types, 'Epic') || _.includes(feat.types, 'Creature')),
	items: _.omitBy(state.items, item => item.weaponType === 'Natural' || _.includes(['Creature Part', 'Money'], item.category)),
	skills: state.skills
})

const mapDispatchToProps = dispatch => ({
	startCreateProfile: profile => dispatch(startCreateProfile(profile))
})


export default connect(mapStateToProps, mapDispatchToProps)(CharacterCreationPage)