import React from 'react';
import {shallow} from 'enzyme';

import {StatsPage} from '../../components/StatsPage';
import profile from '../fixtures/profile';

const profileData = {
  id: profile.id,
  ...profile.fields
};


test('should render stats page with profile data', () => {
  const wrapper = shallow(<StatsPage {...profileData} />);
  expect(wrapper).toMatchSnapshot();
})
