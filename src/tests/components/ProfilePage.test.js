import React from 'react'
import ConnectedProfilePage from '../../components/ProfilePage'
import profile from '../fixtures/profile'
import { apiData, createConnectedWrapper } from '../utils'


const profileData = {
	id: profile.id,
	...profile.fields
}

let wrapper

beforeAll(async () => {
	const api = await apiData()
	wrapper = createConnectedWrapper(ConnectedProfilePage,
		{
			profile: profileData,
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
