import React from 'react'
import {shallow} from 'enzyme'

import { SpecialAbilities } from '../../components/SpecialAbilities'
import profile from '../fixtures/profile'
import { apiData } from '../utils'


let props, wrapper
beforeAll(async () => {
	const api = await apiData()
	const specialAbilities = api.specialAbilities
  props = {
    specialAbilityIds: profile.specialAbilities,
    specialAbilities
  }
	
  wrapper = shallow(<SpecialAbilities {...props} />)
})

test('should render special abilities with profile data', async () => {
  expect(wrapper).toMatchSnapshot()
})
