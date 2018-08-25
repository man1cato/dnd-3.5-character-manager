import React from 'react';
import {shallow} from 'enzyme';

import SkillSet from '../../components/SkillSet';
import profile from '../fixtures/profile';

const props = {skills: profile.fields.skills};

test('should render skills with profile data', () => {
  const wrapper = shallow(<SkillSet {...props} />);
  expect(wrapper).toMatchSnapshot();
})
