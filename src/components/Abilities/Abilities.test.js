import React from 'react'
import { mount } from 'enzyme'

import Abilities from './Abilities'
import { characterOne } from '../../tests/utils/seedDatabase'


const handleUpdate = jest.fn()
const abilities = characterOne.abilities
let wrapper
beforeEach(() => {
  wrapper = mount(
    <Abilities
      abilities={abilities}
      handleUpdate={handleUpdate}
    />
  )
})

test('should render Abilities with profile data', () => {
  expect(wrapper).toMatchSnapshot()
})
