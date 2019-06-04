import React from 'react'
import {shallow} from 'enzyme'

import SkillModal from '../../components/SkillModal'
import { getSkills } from '../../utils/getFirebaseData'

const handleCloseModal = jest.fn()
let skills, props

beforeAll(async () => {
   skills = await getSkills()
   props = {
      selected: Object.values(skills)[0],
      handleCloseModal
   }
})


test('should render SkillModal', () => {
   const wrapper = shallow(<SkillModal {...props} />)
   expect(wrapper).toMatchSnapshot()
})