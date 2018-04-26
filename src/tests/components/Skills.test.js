import React from 'react';
import {shallow} from 'enzyme';

import Skills from '../../components/Skills';
import profile from '../fixtures/profile';

const profileData = {
  id: profile.id,
  ...profile.fields
};

test('should render skills with profile data', () => {
  const wrapper = shallow(<Skills {...profileData} />);
  expect(wrapper).toMatchSnapshot();
})
