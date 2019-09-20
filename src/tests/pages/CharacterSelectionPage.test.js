import React from 'react'
import { shallow } from 'enzyme'

import { CharacterSelectionPage } from '../../pages/CharacterSelectionPage'
import profiles from '../fixtures/profiles'
import { apiData } from '../utils/utils'


const startSetProfile = jest.fn()
const uid = 'abc123'
let wrapper, props

beforeAll(async () => {
	const api = await apiData()
	props = {
		uid: 'abc123',
		profiles,
		startSetProfile,
		jobClasses: api.jobClasses,
		races: api.races
	}
})

beforeEach(() => {
	wrapper = shallow(<CharacterSelectionPage {...props}	/>)
})


test('should render CharacterSelectionPage with profiles data', () => {
	expect(wrapper).toMatchSnapshot()
})

test('should disable buttons and call startSetProfile', () => {
	const id = profiles[0].id 
	wrapper.find(`#${id}`).simulate('click', {
		currentTarget: { id }
	})
    
	expect(wrapper.state('disabled')).toBe(true)
	expect(wrapper.find('button').at(1).props().disabled).toBe(true)
	expect(startSetProfile).toHaveBeenCalledWith(uid, id)
})