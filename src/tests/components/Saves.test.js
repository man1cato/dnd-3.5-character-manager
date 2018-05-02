import React from 'react';
import { shallow } from 'enzyme';

import Saves from '../../components/Saves';
import profile from '../fixtures/profile';

const props = {
    fortitude: {
        base: profile.fields.saves.base,
        mod: 2
    },
    reflex: {
        base: profile.fields.saves.reflex,
        mod: 0
    },
    will: {
        base: profile.fields.saves.will ,
        mod: 1
    }
}

test('should render saves with profile data', () => {
    const wrapper = shallow(<Saves {...props} />);
    expect(wrapper).toMatchSnapshot();
})
