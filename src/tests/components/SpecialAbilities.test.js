import React from 'react';
import {shallow} from 'enzyme';

import { SpecialAbilities } from '../../components/SpecialAbilities';
import profile from '../fixtures/profile'
import specialAbilities from '../fixtures/specialAbilities'


const props = {
  specialAbilityIds: profile.fields.specialAbilities,
  specialAbilities
}

test('should render special abilities with profile data', () => {
  const wrapper = shallow(<SpecialAbilities {...props} />);
  expect(wrapper).toMatchSnapshot();
})
