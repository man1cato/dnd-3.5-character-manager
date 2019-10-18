import React from 'react'
import _ from 'lodash'

import CreatorFormJobClass from './CreatorFormJobClass'
import { apiData, renderWithRedux, FormikWrapper } from '../../../test-utils/utils'
import { characterOne } from '../../../test-utils/seedDatabase'


const handleChange = jest.fn()
const handleMultiSelect = jest.fn()
const setFieldValue = jest.fn()
const setFieldError = jest.fn()

let props

beforeAll(async () => {
   const api = await apiData()
   
   props = {
      values: { 
         race: api.races[characterOne.race],
         jobClass: api.jobClasses[characterOne.jobClass],
         school: characterOne.school 
      },
      jobClasses: api.jobClasses,
      handleChange,
      handleMultiSelect,
      setFieldValue,
      setFieldError
   }
})


test('should render CreatorFormJobClass', () => {
   const { container } = renderWithRedux(<CreatorFormJobClass {...props} />, null, FormikWrapper)
   expect(container.firstChild).toMatchSnapshot()
})

