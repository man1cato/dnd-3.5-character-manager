import React from 'react'
import { shallow } from 'enzyme'

import { SkillSet } from '../../components/SkillSet'
import profile from '../fixtures/profile'
import { apiData } from '../utils/utils'


let  props, wrapper, api

beforeAll(async () => {
	api = await apiData()

	props = {
		skillSet: profile.skillSet,
		skills: api.skills
	}
	
	wrapper = shallow(<SkillSet {...props} />)
})


test('should render SkillSet with profile data', () => {
	expect(wrapper).toMatchSnapshot()
})

test('should update selected in state on skill button click', () => {
	const id = props.skillSet[0].id
	wrapper.find(`#${id}`).simulate('click', {
		target: { id }
	})
	expect(wrapper.state('selected')).toBe(props.skills[id])
})