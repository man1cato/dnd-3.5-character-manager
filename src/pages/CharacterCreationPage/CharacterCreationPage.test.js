import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import _ from 'lodash'

import { apiData, renderWithRedux } from '../../tests/utils'
import { CharacterCreationPage } from './CharacterCreationPage'


const startCreateProfile = jest.fn()

let props

beforeAll(async () => {
	const api = await apiData()
	props = {
		races: api.races,
		jobClasses: api.jobClasses,
		feats: _.omitBy(api.feats, feat => feat.prerequisites || _.includes(feat.types, 'Epic') || _.includes(feat.types, 'Creature')),
		items: _.omitBy(api.items, item => item.weaponType === 'Natural' || _.includes(['Creature Part', 'Money'], item.category)),
		skills: api.skills,
		startCreateProfile
	}
})

test('should render default state of CharacterCreationPage correctly', () => {
	const { container } = render(<CharacterCreationPage {...props} />)
	expect(container.firstChild).toMatchSnapshot()
})

test('should make form page 1 valid after inputting required fields', () => {
	// expect(wrapper.find(CreatorFormFooter).prop('isValid')).toBe(false)

	// wrapper.find('input').at(0).simulate("change", { target: { id: '1', name: 'name', value: "Arc" } })
	// wrapper.find('input').at(1).simulate("change", { target: { id: '2', name: 'age', value: "21" } })
	// wrapper.find('input').at(2).simulate("change", { target: { id: '3', name: 'height.ft', value: "4" } })
	// wrapper.find('input').at(3).simulate("change", { target: { id: '4', name: 'height.in', value: "7" } })
	// wrapper.find('input').at(4).simulate("change", { target: { id: '5', name: 'weight', value: "153" } })

	// expect(wrapper.find(CreatorFormFooter).prop('isValid')).toBe(true)
})

test('should render page 2 when page 1 is valid and next is clicked', () => {
	// expect(wrapper.find(CreatorFormIdentity)).toHaveLength(1)
	// expect(wrapper.find(CreatorFormJobClass)).toHaveLength(0)
	// expect(wrapper.find(CreatorFormFooter).prop('isValid')).toBe(true)

	// wrapper.find('#nextButton').simulate('click')

	// expect(wrapper.find(CreatorFormIdentity)).toHaveLength(0)
	// expect(wrapper.find(CreatorFormJobClass)).toHaveLength(1)
	// expect(wrapper.find('#submitButton')).toHaveLength(0)
})

test('should go back a page when back button is clicked', () => {
	// expect(wrapper.find(CreatorFormJobClass)).toHaveLength(1)

	// wrapper.find('#backButton').simulate('click')

	// expect(wrapper.find(CreatorFormIdentity)).toHaveLength(1)
	// expect(wrapper.find(CreatorFormJobClass)).toHaveLength(0)

	// wrapper.find('#nextButton').simulate('click')
	// expect(wrapper.find(CreatorFormJobClass)).toHaveLength(1)
})

test('should render page 3 when page 2 is valid and next is clicked', () => {	
	// expect(wrapper.find(CreatorFormJobClass)).toHaveLength(1)
	// expect(wrapper.find(CreatorFormFooter).prop('isValid')).toBe(true)
	
	// wrapper.find('#nextButton').simulate('click')

	// expect(wrapper.find(CreatorFormJobClass)).toHaveLength(0)
	// expect(wrapper.find(CreatorFormAbilities)).toHaveLength(1)
	// expect(wrapper.find('#submitButton')).toHaveLength(0)
})
 
// test('should render page 4 when page 3 is valid and next is clicked', () => {
// 	expect(wrapper.find(CreatorFormAbilities)).toHaveLength(1)
// 	expect(wrapper.find(CreatorFormFooter).prop('isValid')).toBe(false)

// 	wrapper.find('#abilitiesRollButton').simulate('click')
	
// 	expect(wrapper.find(CreatorFormFooter).prop('isValid')).toBe(true)
	
// 	wrapper.find('#nextButton').simulate('click')
	
// 	expect(wrapper.find(CreatorFormAbilities)).toHaveLength(0)
// 	expect(wrapper.find(CreatorFormFeats)).toHaveLength(1)
// })

// test('should call startCreateProfile when on final page of form and submit button is clicked', () => {
// 	const pageCount = wrapper.find(CreatorFormFooter).props().pages.length
	
// 	expect(wrapper.find('#nextButton')).toHaveLength(1)
	
// 	wrapper.find(CharacterCreationPage).setState({ page: pageCount })

// 	expect(wrapper.find('#nextButton')).toHaveLength(0)
// 	expect(wrapper.find('#submitButton')).toHaveLength(1)
	
// 	wrapper.find('#submitButton').simulate('click')

// 	expect(wrapper.find(Provider).prop('store').getState()).toHaveProperty('profile')
// })