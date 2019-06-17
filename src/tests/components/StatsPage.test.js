import React from 'react'
import ConnectedStatsPage from '../../components/StatsPage'
import profile from '../fixtures/profile'
import { apiData, createConnectedWrapper } from '../utils'
 

const profileData = {
	id: profile.id,
	...profile.fields
}

let wrapper

beforeAll(async () => {
	const api = await apiData()
	wrapper = createConnectedWrapper(ConnectedStatsPage,
		{
			profile: profileData,
			jobClasses: api.jobClasses,
			skills: api.skills
		}
	)
})

test('should render stats page with profile data', () => {
  	expect(wrapper).toMatchSnapshot()
})
