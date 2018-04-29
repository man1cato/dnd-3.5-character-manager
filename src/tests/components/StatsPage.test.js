import React from 'react';
import {shallow} from 'enzyme';

import {StatsPage} from '../../components/StatsPage';
import profile from '../fixtures/profile';

const profileData = {
  id: profile.id,
  ...profile.fields
};

let wrapper;

beforeEach(() => {
  wrapper = shallow(
    <StatsPage 
      {...profileData} 
    />
  );
});

test('should render stats page with profile data', () => {
  expect(wrapper).toMatchSnapshot();
});