import React from 'react'
import {shallow} from 'enzyme'
import {Footer} from '../../components/Footer'
import profile from '../fixtures/profile'


test('should render footer correctly', () => {
  const wrapper = shallow(<Footer profile={profile}/>)
  expect(wrapper).toMatchSnapshot()
})