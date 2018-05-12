import React from 'react';
import { shallow } from 'enzyme';

import Weapons from '../../components/Weapons';
import profile from '../fixtures/profile';

const props = { weapons: profile.fields.weapons };

test('should render skills with profile data', () => {
    const wrapper = shallow(<Weapons {...props} />);
    expect(wrapper).toMatchSnapshot();
})
