import React from 'react';
import { shallow } from 'enzyme';

import Items from '../../components/Items';
import profile from '../fixtures/profile';

const items = profile.fields.items;

test('should render Items with profile data', () => {
    const wrapper = shallow(<Items items={items} />);
    expect(wrapper).toMatchSnapshot();
})
