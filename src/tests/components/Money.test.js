import React from 'react';
import { shallow } from 'enzyme';

import Money from '../../components/Money';
import profile from '../fixtures/profile';

const money = profile.fields.money;

test('should render Money with profile data', () => {
    const wrapper = shallow(<Money money={money} />);
    expect(wrapper).toMatchSnapshot();
})
