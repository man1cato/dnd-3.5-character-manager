import React from 'react'
import {shallow} from 'enzyme'
import fs from 'fs'

import { SpecialAbilities } from '../../components/SpecialAbilities'
import profile from '../fixtures/profile'


let props, wrapper
beforeAll(async () => {
	const api = await fs.promises.readFile('src/tests/fixtures/api.json')
	const specialAbilities = JSON.parse(api).specialAbilities
  props = {
    specialAbilityIds: profile.fields.specialAbilities,
    specialAbilities
  }
	
  wrapper = shallow(<SpecialAbilities {...props} />)
})

test('should render special abilities with profile data', async () => {
  expect(wrapper).toMatchSnapshot()
})
