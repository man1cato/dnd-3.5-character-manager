import React from 'react'
import { shallow } from 'enzyme'
import { render, fireEvent } from '@testing-library/react'

import { StatsPage } from '../../pages/StatsPage'
import { apiData } from '../utils/utils'
import { characterOne } from '../utils/seedDatabase'
 

const startEditProfile = jest.fn() 
let props

beforeAll(async () => {
	const api = await apiData()
	props = {
		profile: characterOne, 
		jobClasses: api.jobClasses,
		startEditProfile
	}
})


test('should render stats page with profile data', () => {
	const wrapper = shallow(<StatsPage {...props} />)
	expect(wrapper).toMatchSnapshot()
})
