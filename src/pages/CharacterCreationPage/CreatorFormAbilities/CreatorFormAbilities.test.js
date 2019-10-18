import React from 'react'
import { fireEvent } from '@testing-library/react'
import _ from 'lodash'

import CreatorFormAbilities from './CreatorFormAbilities'
import { abilities } from '../../../utils/staticData'
import { apiData, renderWithRedux, FormikWrapper } from '../../../test-utils/utils'
import { characterOne } from '../../../test-utils/seedDatabase'


const setFieldValue = jest.fn()
const validateForm = jest.fn()
let props
beforeAll(async () => {
   const api = await apiData()
   props = {
      values: { 
         race: api.races[characterOne.race],
         abilities: _.mapValues(abilities, () => ({ score: '' })) 
      },
      selectedJobClass: api.jobClasses[characterOne.jobClass],
      setFieldValue,
      validateForm
   }
})


test('should render CreatorFormAbilities correctly', () => {
   const { container } = renderWithRedux(<CreatorFormAbilities {...props} />, null, FormikWrapper)
   expect(container.firstChild).toMatchSnapshot()
})

test('should fill out all inputs with numbers when roll button is clicked', () => {
   // const { getByTestId } = render(<CreatorFormAbilities {...props} />)
   // fireEvent.click(getByTestId('abilitiesRollButton'))
   // expect(getByTestId('strInput').value).toEqual(expect.any(Number))
   // expect(getByTestId('dexInput').value).toEqual(expect.any(Number))
   // expect(getByTestId('conInput').value).toEqual(expect.any(Number))
   // expect(getByTestId('intInput').value).toEqual(expect.any(Number))
   // expect(getByTestId('wisInput').value).toEqual(expect.any(Number))
   // expect(getByTestId('chaInput').value).toEqual(expect.any(Number))
})