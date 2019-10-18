import React from 'react'
import { render } from '@testing-library/react'

import { characterOne } from '../../test-utils/seedDatabase'
import { apiData, renderWithRedux } from '../../test-utils/utils'
import { ProfilePage } from './ProfilePage'


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
