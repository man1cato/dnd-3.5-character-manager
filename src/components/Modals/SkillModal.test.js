import React from 'react'
import {shallow} from 'enzyme'

import SkillModal from './SkillModal'
import { apiData } from '../../tests/utils/utils'


let props

beforeAll(async () => {
   const api = await apiData()
   const skills = api.skills
   props = {
      clickedSkill: Object.values(skills)[0]
   }
})


test('should render SkillModal', () => {
   const wrapper = shallow(<SkillModal {...props} />)
   expect(wrapper).toMatchSnapshot()
})