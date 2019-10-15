import React from 'react'
import { fireEvent } from '@testing-library/react'

import { apiData, renderWithRedux, FormikWrapper } from '../../../tests/utils'
import CreatorFormIdentity from './CreatorFormIdentity'
import { characterOne } from '../../../tests/seedDatabase'


const setTouched = jest.fn()
const setFieldValue = jest.fn()
let props, state

beforeAll(async () => {
   const api = await apiData()
   props = {
      values: {
         race: api.races[characterOne.race]
      },      
      races: api.races,
      jobClasses: api.jobClasses,
      setTouched,
      setFieldValue
   }
   state = {
      specialAbilities: api.specialAbilities 
   }
})


test('should render CreatorFormIdentity correctly', () => {
   const { container } = renderWithRedux(<CreatorFormIdentity {...props} />, state, FormikWrapper)
   expect(container.firstChild).toMatchSnapshot()
})

