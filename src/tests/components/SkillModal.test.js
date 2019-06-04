import React from 'react'
import {shallow} from 'enzyme'
import fs from 'fs'

import SkillModal from '../../components/SkillModal'


let skills, props

beforeAll(async () => {
   const api = await fs.promises.readFile('src/tests/fixtures/api.json')
   skills = JSON.parse(api).skills
   props = {
      selected: Object.values(skills)[0]
   }
})


test('should render SkillModal', () => {
   const wrapper = shallow(<SkillModal {...props} />)
   expect(wrapper).toMatchSnapshot()
})