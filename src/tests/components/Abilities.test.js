import React from 'react'
import { shallow } from 'enzyme'

import Abilities from '../../components/Abilities'
import profile from '../fixtures/profile'


const profileData = {
  id: profile.id,
  ...profile.fields
}
const handleChange = jest.fn()

let wrapper
beforeEach(() => {
  wrapper = shallow(
    <Abilities
      handleChange={handleChange}
      abilities={profile.fields.abilities}
    />
  )
})

test('should render Abilities with profile data', () => {
  expect(wrapper).toMatchSnapshot()
})

test('should handle input change', () => {
  const value = 14
  wrapper.find({ id: 'str' }).simulate('change', {
    target: { value }
  })
  expect(handleChange).toHaveBeenCalledWith({
    target: { value }
  })
})
