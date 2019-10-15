import React from 'react'
import { render } from '@testing-library/react'

import { characterOne } from '../../tests/seedDatabase'
import { apiData } from '../../tests/utils'
import { ProfilePage } from './ProfilePage'
import { renderWithRedux } from '../../tests/utils'


let props, api

beforeAll(async () => {
	api = await apiData()
	props = {
		...characterOne,
		race: api.races[characterOne.race],
		jobClass: api.jobClasses[characterOne.jobClass]
	}		
})

test('should render ProfilePage with profile data', () => {
	const { container } = renderWithRedux(<ProfilePage {...props}/>, {
		specialAbilities: api.specialAbilities,
		feats: api.feats
	})
	expect(container.firstChild).toMatchSnapshot()
})
