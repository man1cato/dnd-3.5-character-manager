import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import CreatorFormSkills from '../../components/CreatorForm/CreatorFormSkills'
import { apiData } from '../utils/utils'
import { characterOne } from '../utils/seedDatabase'
import { apiObjectToArray } from '../../utils/utils'


const setFieldValue = jest.fn()
let wrapper, props
beforeAll(async () => {
   const api = await apiData()
   props = {
      values: { 
         skillSet: apiObjectToArray(api.skills).map(skill => ({ id: skill.id, ranks: 0 })),
         skillPoints: characterOne.skillPoints
      },
      skills: api.skills,
      setFieldValue
   }
   wrapper = shallow(<CreatorFormSkills {...props} />)
})


test('should render CreatorFormSkills correctly', () => {
	expect(wrapper).toMatchSnapshot()
})
