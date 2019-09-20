import React from 'react'
import { shallow } from 'enzyme'
import { render, fireEvent } from '@testing-library/react'

import { characterOne } from '../utils/seedDatabase'
import { apiData } from '../utils/utils'
import { ProfilePage } from '../../pages/ProfilePage';


let props

beforeAll(async () => {
	const api = await apiData()
	props = {
		...characterOne,
		race: api.races[characterOne.race],
		jobClass: api.jobClasses[characterOne.jobClass]
	}	
	
})

test('should render ProfilePage with profile data', () => {
	const wrapper = shallow(<ProfilePage {...props}/>)
	expect(wrapper).toMatchSnapshot()
})
