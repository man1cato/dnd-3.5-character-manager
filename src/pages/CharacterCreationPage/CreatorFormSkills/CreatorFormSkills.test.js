import React from 'react'
import _ from 'lodash'

import CreatorFormSkills from './CreatorFormSkills'
import { apiData, renderWithRedux, FormikWrapper } from '../../../test-utils/utils'
import { apiObjectToArray } from '../../../utils/utils'


const setFieldValue = jest.fn()
let props
beforeAll(async () => {
   const api = await apiData()
   props = {
      values: { 
         skillSet: apiObjectToArray(api.skills).map(skill => ({ id: skill.id, ranks: 0 })),
         skillPoints: 0
      },
      skills: api.skills,
      setFieldValue
   }
})


test('should render CreatorFormSkills correctly', () => {
   const { container } = renderWithRedux(<CreatorFormSkills {...props} />, null, FormikWrapper)
   expect(container.firstChild).toMatchSnapshot()
})
