import React from 'react';
import {shallow} from 'enzyme';

import { SpecialAbilities } from '../../components/SpecialAbilities';
import profile from '../fixtures/profile'
import { getSpecialAbilities } from '../../utils/getFirebaseData'



test('should render special abilities with profile data', async () => {
  const props = {
    specialAbilityIds: profile.fields.specialAbilities,
    specialAbilities: await getSpecialAbilities()
  }
  const wrapper = shallow(<SpecialAbilities {...props} />);
  expect(wrapper).toMatchSnapshot();
})
