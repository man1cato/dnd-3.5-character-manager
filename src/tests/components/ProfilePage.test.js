import React from 'react'
import ConnectedProfilePage from '../../components/ProfilePage'
import profile from '../fixtures/profile'
import { apiData, createConnectedWrapper } from '../utils/utils'


let wrapper

beforeAll(async () => {
	const api = await apiData()
	wrapper = createConnectedWrapper(ConnectedProfilePage,
		{
			profile,
			jobClasses: api.jobClasses,
			races: api.races,
			feats: api.feats,
			specialAbilities: api.specialAbilities 
		}	
	)
})

test('should render ProfilePage with profile data', () => {
	expect(wrapper).toMatchSnapshot()
})
