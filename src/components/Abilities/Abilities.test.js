import React from 'react'
import { render, fireEvent, getNodeText } from '@testing-library/react'

import Abilities from './Abilities'
import { characterOne } from '../../tests/seedDatabase'
import { calcAbilityMod } from '../../utils/utils'


const handleUpdate = jest.fn()
let props
beforeEach(() => {
  props = {
    abilities: characterOne.abilities,
    handleUpdate
  }
})

test('should render Abilities with profile data', () => {
  const { container } = render(<Abilities {...props} />)
  expect(container.firstChild).toMatchSnapshot()
})

test('should update mod value when temp score input changed', () => {
  const { getAllByDisplayValue, getByTestId } = render(<Abilities {...props} />)
  const strInput = getAllByDisplayValue('0')[0]
  const strMod = getByTestId('strMod')
  const value = 20
  const mod = calcAbilityMod(value)

  fireEvent.change(strInput, { target: { value } })
  expect(getNodeText(strMod)).toBe(`${mod}`)
})