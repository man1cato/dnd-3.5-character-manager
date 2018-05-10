import React from 'react';
import { shallow } from 'enzyme';

import Attacks from '../../components/Attacks';
import profile from '../fixtures/profile';

const attacks = {
    bab: profile.fields.attacks.bab,
    melee: {
        base: profile.fields.attacks.melee.base,
        mod: 3
    },
    ranged: {
        base: profile.fields.attacks.ranged.base,
        mod: 3
    },
    grapple: {
        base: profile.fields.attacks.grapple.base,
        mod: 3
    }
}

test('should render attacks with profile data', () => {
    const wrapper = shallow(<Attacks attacks={attacks} />);
    expect(wrapper).toMatchSnapshot();
})
