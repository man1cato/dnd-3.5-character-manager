import React from 'react';
import {shallow} from 'enzyme';

import Abilities from '../../components/Abilities';
import profile from '../fixtures/profile';

const profileData = {
  id: profile.id,
  ...profile.fields
};

let wrapper, onInputChange;

beforeEach(() => {
  onInputChange = jest.fn();
  wrapper = shallow(
    <Abilities
      onInputChange={onInputChange}
      {...profileData}
    />
  );
});

test('should render abilities with profile data', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should handle input change', () => {
  const value = 14;
  wrapper.find({ id: 'str' }).simulate('change', {
    target: { value }
  });
  expect(onInputChange).toHaveBeenCalledWith({
    target: { value }
  });
});
