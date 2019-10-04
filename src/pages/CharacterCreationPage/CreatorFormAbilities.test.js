import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import CreatorFormAbilities from './CreatorFormAbilities'
import { abilities } from '../../utils/staticData'
import { apiData } from '../../tests/utils/utils'
import { characterOne } from '../../tests/utils/seedDatabase'


const setFieldValue = jest.fn()
let wrapper, props
beforeAll(async () => {
   const api = await apiData()
   props = {
      values: { abilities: _.mapValues(abilities, () => ({ score: '' })) },
      selectedJobClass: api.jobClasses[characterOne.jobClass],
      selectedRace: api.races[characterOne.race],
      setFieldValue
   }
})

beforeEach(() => {
   wrapper = shallow(<CreatorFormAbilities {...props} />)
})

test('should render CreatorFormAbilities correctly', () => {
	expect(wrapper).toMatchSnapshot()
})

test('should call setFieldValue when roll button is clicked', () => {
   wrapper.find('#abilitiesRollButton').simulate('click')
   expect(setFieldValue).toHaveBeenCalled()
})