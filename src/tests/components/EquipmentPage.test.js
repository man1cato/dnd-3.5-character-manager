import React from 'react';
import {shallow} from 'enzyme';

import { EquipmentPage } from '../../components/EquipmentPage';
import profile from '../fixtures/profile';

const props = {
    id: profile.id,
    money: profile.fields.money,
    items: profile.fields.items
}

let wrapper;

beforeEach(() => {
    wrapper = shallow(<EquipmentPage {...props} />);
});


test('should render equipment page with profile data', () => {
    expect(wrapper).toMatchSnapshot();
});
