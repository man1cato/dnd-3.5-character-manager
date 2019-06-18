import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'
import CreatorFormPage3 from '../../components/CreatorFormPage3'
import { abilities } from '../../utils/staticData'
import { apiData } from '../utils'
import profile from '../fixtures/profile'


let wrapper, props
beforeAll(async () => {
   const api = await apiData()
   props = {
      values: { abilities: _.mapValues(abilities, () => ({ score: '' })) },
      selectedRace: api.races[profile.race]
   }
   wrapper = shallow(<CreatorFormPage3 {...props} />)
})


test('should render CreatorFormPage3 correctly', () => {
	expect(wrapper).toMatchSnapshot()
})