import React from 'react'
import ConnectedStatsPage from '../../components/StatsPage'
import profile from '../fixtures/profile'
import { apiData, createConnectedWrapper } from '../utils/utils'
 

let wrapper

beforeAll(async () => {
	const api = await apiData()
	wrapper = createConnectedWrapper(ConnectedStatsPage,
		{
			profile,
			jobClasses: api.jobClasses,
			skills: api.skills
		}
	)
})

test('should render stats page with profile data', () => {
  	expect(wrapper).toMatchSnapshot()
})
