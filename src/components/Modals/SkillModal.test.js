import React from 'react'
import { render } from '@testing-library/react'
import _ from 'lodash'

import SkillModal from './SkillModal'
import { apiData } from '../../tests/utils'


let props

beforeAll(async () => {
   const api = await apiData()
   props = {
      clickedSkill: _.values(api.skills)[0]
   }
})


test('should render SkillModal', () => {
   const { baseElement } = render(<SkillModal {...props} />)
   expect(baseElement).toMatchSnapshot()
})