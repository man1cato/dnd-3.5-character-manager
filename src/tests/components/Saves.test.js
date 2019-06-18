import React from 'react'
import { shallow } from 'enzyme'

import Saves from '../../components/Saves'
import profile from '../fixtures/profile'
import { apiData, createConnectedWrapper } from '../utils'

const handleChange = jest.fn()

let saves, wrapper

beforeAll(async () => {
	const api = await apiData()
	const jobClassLevel = api.jobClasses[profile.jobClass].levels[profile.level]
	saves = {
		fortitude: {
			base: jobClassLevel.saves.fortitude,
			mod: profile.saves.fortitude.mod
		},
		reflex: {
			base: jobClassLevel.saves.reflex,
			mod: profile.saves.fortitude.mod
		},
		will: {
			base: jobClassLevel.saves.will,
			mod: profile.saves.fortitude.mod
		}
	}	
})

beforeEach(() => {
	wrapper = shallow(<Saves saves={saves} handleChange={handleChange} />)
})

test('should render saves with profile data', () => {
	expect(wrapper).toMatchSnapshot()
})

test('should trigger handleChange when mod field changes', () => {
	const value = 3 
	wrapper.find('#fortitude').simulate('change', {
		target: { value }
	})
	expect(handleChange).toHaveBeenCalledWith({
		target: { value }
	})
})