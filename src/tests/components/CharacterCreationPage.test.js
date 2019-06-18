import React from 'react'
import { apiData, createConnectedWrapper } from '../utils'
import ConnectedCharacterCreationPage, { CharacterCreationPage } from '../../components/CharacterCreationPage'
import CreatorFormPage1 from '../../components/CreatorFormPage1'
import CreatorFormPage2 from '../../components/CreatorFormPage2'
import CreatorFormPage3 from '../../components/CreatorFormPage3'
import CreatorFormPage4 from '../../components/CreatorFormPage4'
import CreatorFormFooter from '../../components/CreatorFormFooter'


const startCreateProfile = jest.fn()

let wrapper

beforeAll(async () => {
	const api = await apiData()
	wrapper = createConnectedWrapper(
		ConnectedCharacterCreationPage,
		{
			races: api.races,
			jobClasses: api.jobClasses,
			feats: api.feats
		}
	)
})

test('should render default state of CharacterCreationPage correctly', () => {
	expect(wrapper).toMatchSnapshot()
})

test('should make form page 1 valid after inputting required fields', () => {
	expect(wrapper.find(CreatorFormFooter).prop('isValid')).toBe(false)

	wrapper.find('input').at(0).simulate("change", { target: { id: '1', name: 'name', value: "Arc" } })
	wrapper.find('input').at(1).simulate("change", { target: { id: '2', name: 'age', value: "21" } })
	wrapper.find('input').at(2).simulate("change", { target: { id: '3', name: 'heightFt', value: "4" } })
	wrapper.find('input').at(3).simulate("change", { target: { id: '4', name: 'heightIn', value: "7" } })
	wrapper.find('input').at(4).simulate("change", { target: { id: '5', name: 'weight', value: "153" } })

	expect(wrapper.find(CreatorFormFooter).prop('isValid')).toBe(true)
})

test('should render page 2 when page 1 is valid and next is clicked', () => {
	expect(wrapper.find(CreatorFormPage1)).toHaveLength(1)
	expect(wrapper.find(CreatorFormPage2)).toHaveLength(0)
	expect(wrapper.find(CreatorFormFooter).prop('isValid')).toBe(true)

	wrapper.find('#nextButton').simulate('click')

	expect(wrapper.find(CreatorFormPage1)).toHaveLength(0)
	expect(wrapper.find(CreatorFormPage2)).toHaveLength(1)
	expect(wrapper.find('#submitButton')).toHaveLength(0)
})

test('should go back a page when back button is clicked', () => {
	expect(wrapper.find(CreatorFormPage2)).toHaveLength(1)

	wrapper.find('#backButton').simulate('click')

	expect(wrapper.find(CreatorFormPage1)).toHaveLength(1)
	expect(wrapper.find(CreatorFormPage2)).toHaveLength(0)

	wrapper.find('#nextButton').simulate('click')
	expect(wrapper.find(CreatorFormPage2)).toHaveLength(1)
})

test('should render page 3 when page 2 is valid and next is clicked', () => {	
	expect(wrapper.find(CreatorFormPage2)).toHaveLength(1)
	expect(wrapper.find(CreatorFormFooter).prop('isValid')).toBe(true)
	
	wrapper.find('#nextButton').simulate('click')

	expect(wrapper.find(CreatorFormPage2)).toHaveLength(0)
	expect(wrapper.find(CreatorFormPage3)).toHaveLength(1)
	expect(wrapper.find('#submitButton')).toHaveLength(0)
})

// test('should render page 4 when page 3 is valid and next is clicked', () => {
// 	expect(wrapper.find(CreatorFormPage3)).toHaveLength(1)
// 	expect(wrapper.find(CreatorFormFooter).prop('isValid')).toBe(false)

// 	wrapper.find('#strButton').simulate('click')
// 	wrapper.find('#dexButton').simulate('click')
// 	wrapper.find('#conButton').simulate('click')
// 	wrapper.find('#intButton').simulate('click')
// 	wrapper.find('#wisButton').simulate('click')
// 	wrapper.find('#chaButton').simulate('click')
	
// 	expect(wrapper.find(CreatorFormFooter).prop('isValid')).toBe(true)
	
// 	wrapper.find('#nextButton').simulate('click')
	
// 	expect(wrapper.find(CreatorFormPage3)).toHaveLength(0)
// 	expect(wrapper.find(CreatorFormPage4)).toHaveLength(1)
// 	expect(wrapper.find('#nextButton')).toHaveLength(0)
// 	expect(wrapper.find('#submitButton')).toHaveLength(1)
// 	expect(wrapper.find(CreatorFormFooter).prop('isSubmitting')).toBe(false)
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