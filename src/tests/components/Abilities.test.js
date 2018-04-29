import React from 'react';
import {shallow} from 'enzyme';

import Abilities from '../../components/Abilities';
import profile from '../fixtures/profile';

const profileData = {
  id: profile.id,
  ...profile.fields
};

let wrapper, onTempScoreChange;

beforeEach(() => {
  onTempScoreChange = jest.fn();
  wrapper = shallow(
    <Abilities
      onTempScoreChange={onTempScoreChange}
      {...profileData}
    />
  );
});

test('should render abilities with profile data', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should handle temp score change', () => {
  const value = 14;
  wrapper.find({ id: 'str' }).simulate('change', {
    target: { value }
  });
  expect(onTempScoreChange).toHaveBeenCalledWith({
    target: { value }
  });
});
