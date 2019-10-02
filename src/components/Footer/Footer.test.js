import React from 'react'
import {shallow} from 'enzyme'
import {Footer} from './Footer'
import profile from '../../tests/fixtures/profile'


test('should render footer correctly', () => {
  const wrapper = shallow(<Footer profile={profile}/>)
  expect(wrapper).toMatchSnapshot()
})