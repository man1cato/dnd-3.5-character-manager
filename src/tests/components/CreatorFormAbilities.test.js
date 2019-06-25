import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import CreatorFormAbilities from '../../components/CreatorFormAbilities'
import { abilities } from '../../utils/staticData'
import { apiData } from '../utils/utils'
import { characterOne } from '../utils/seedDatabase'


const setFieldValue = jest.fn()
let wrapper, props
beforeAll(async () => {
   const api = await apiData()
   props = {
      values: { 
         abilities: _.mapValues(abilities, () => ({ score: '' })), 
         race: characterOne.race,
         jobClass: characterOne.jobClass
      },
      races: api.races,
      jobClasses: api.jobClasses, 
      setFieldValue
   }
   wrapper = shallow(<CreatorFormAbilities {...props} />)
})


test('should render CreatorFormAbilities correctly', () => {
	expect(wrapper).toMatchSnapshot()
})

test('should call setFieldValue when roll button is clicked', () => {
   wrapper.find('#abilitiesRollButton').simulate('click')
   expect(setFieldValue).toHaveBeenCalled()
})