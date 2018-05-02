import React from 'react';
import {shallow} from 'enzyme';

import Skills from '../../components/Skills';
import profile from '../fixtures/profile';

const props = {skills: profile.fields.skills};

test('should render skills with profile data', () => {
  const wrapper = shallow(<Skills {...props} />);
  expect(wrapper).toMatchSnapshot();
})
