import React from 'react'
import { shallow } from 'enzyme'

import { StatsPage } from '../../components/StatsPage'
import { apiData } from '../utils/utils'
import { characterOne } from '../utils/seedDatabase'
 

const startEditProfile = jest.fn() 
let wrapper, props

beforeAll(async () => {
	const api = await apiData()
	props = {
		profile: characterOne, 
		jobClasses: api.jobClasses,
		startEditProfile
	}
})

beforeEach(() => {
	wrapper = shallow(<StatsPage {...props}/>)
})


test('should render stats page with profile data', () => {
  	expect(wrapper).toMatchSnapshot()
})
