import React from 'react';
import { shallow } from 'enzyme';

import Saves from '../../components/Saves';
import profile from '../fixtures/profile';

const saves = {
    fortitude: {
        base: profile.fields.saves.fortitude.base,
        mod: 2
    },
    reflex: {
        base: profile.fields.saves.reflex.base,
        mod: 0
    },
    will: {
        base: profile.fields.saves.will.base,
        mod: 1
    }
}

test('should render saves with profile data', () => {
    const wrapper = shallow(<Saves saves={saves} />);
    expect(wrapper).toMatchSnapshot();
})
