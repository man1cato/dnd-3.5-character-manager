import React from 'react'
import {shallow} from 'enzyme'

import SkillModal from '../../components/SkillModal'
import { apiData } from '../utils/utils'


let props

beforeAll(async () => {
   const api = await apiData()
   const skills = api.skills
   props = {
      selected: Object.values(skills)[0]
   }
})


test('should render SkillModal', () => {
   const wrapper = shallow(<SkillModal {...props} />)
   expect(wrapper).toMatchSnapshot()
})