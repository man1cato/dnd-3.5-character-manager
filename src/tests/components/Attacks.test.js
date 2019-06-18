import React from 'react';
import { shallow } from 'enzyme';

import Attacks from '../../components/Attacks';
import profile from '../fixtures/profile';

const attacks = {
    bab: profile.attacks.bab,
    melee: {
        base: profile.attacks.melee.base,
        mod: 3
    },
    ranged: {
        base: profile.attacks.ranged.base,
        mod: 3
    },
    grapple: {
        base: profile.attacks.grapple.base,
        mod: 3
    }
}

test('should render attacks with profile data', () => {
    const wrapper = shallow(<Attacks attacks={attacks} />);
    expect(wrapper).toMatchSnapshot();
})
