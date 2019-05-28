import React from 'react'
import {shallow} from 'enzyme'
import {Footer} from '../../components/Footer'
import profile from '../fixtures/profile';

const profileData = {
  id: profile.id,
  ...profile.fields
}

test('should render footer correctly', () => {
  const wrapper = shallow(<Footer profile={profileData}/>);
  expect(wrapper).toMatchSnapshot();
});
