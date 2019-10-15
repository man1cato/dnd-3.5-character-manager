import React from 'react'
import { render } from '@testing-library/react'

import { StatsPage } from './StatsPage'
import { apiData } from '../../tests/utils'
import { characterOne } from '../../tests/seedDatabase'
import { renderWithRedux } from '../../tests/utils'
 

const startEditProfile = jest.fn() 
let props, api

beforeAll(async () => {
	api = await apiData()
	props = {
		profile: characterOne, 
		jobClasses: api.jobClasses,
		startEditProfile
	}
})


test('should render stats page with profile data', () => {
	const { container } = renderWithRedux(<StatsPage {...props} />, {
		abilities: api.abilities,
		skills: api.skills
	})
	expect(container.firstChild).toMatchSnapshot()
})
