import React from 'react'
import { mount } from 'enzyme'

import Saves from '../../components/Saves/Saves'
import { characterOne } from '../utils/seedDatabase'
import { apiData } from '../utils/utils'

const handleUpdate = jest.fn()
const saveMods = characterOne.saveMods
let props, wrapper

beforeAll(async () => {
	const api = await apiData()
	props = {
		saveMods,
		saveBases: api.jobClasses[characterOne.jobClass].levels[characterOne.level].saves,
		handleUpdate
	}
})

beforeEach(() => {
	wrapper = mount(<Saves {...props} />)
})


test('should render saves with profile data', () => {
	expect(wrapper).toMatchSnapshot()
})

test('should trigger handleUpdate when mod field changes', () => {
	const value = 3
	wrapper.find('#fortitude').simulate('change', {	target: { value }	})
	expect(handleUpdate).toHaveBeenCalledWith({
		saveMods: { ...saveMods, fortitude: value }
	})
})