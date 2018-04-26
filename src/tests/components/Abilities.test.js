import React from 'react';
import {shallow} from 'enzyme';

import Abilities from '../../components/Abilities';
import profile from '../fixtures/profile';

const profileData = {
  id: profile.id,
  ...profile.fields
};

test('should render abilities with profile data', () => {
  const wrapper = shallow(<Abilities {...profileData} />);
  expect(wrapper).toMatchSnapshot();
})
