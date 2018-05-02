import React from 'react';
import { shallow } from 'enzyme';

import Attacks from '../../components/Attacks';
import profile from '../fixtures/profile';

const props = {
    bab: profile.fields.attacks.bab,
    melee: {
        base: profile.fields.attacks.melee,
        mod: 3
    },
    ranged: {
        base: profile.fields.attacks.ranged,
        mod: 3
    },
    grapple: {
        base: profile.fields.attacks.grapple,
        mod: 3
    }
}

test('should render saves with profile data', () => {
    const wrapper = shallow(<Attacks {...props} />);
    expect(wrapper).toMatchSnapshot();
})
