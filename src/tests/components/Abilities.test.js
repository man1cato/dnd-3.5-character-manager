import React from 'react'
import { mount } from 'enzyme'

import Abilities from '../../components/Abilities'
import { characterOne } from '../utils/seedDatabase'


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

test('should handle input change', () => {
  const value = 14
  wrapper.find({ id: 'str' }).simulate('change', { target: { value } })
  
  expect(handleUpdate).toHaveBeenCalledWith({
    abilities: { 
      ...abilities, 
      str: { 
        score: abilities.str.score,
        tempScore: value
      } 
    }
  })
})
