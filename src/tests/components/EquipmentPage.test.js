import React from 'react';
import {shallow} from 'enzyme';

import { EquipmentPage } from '../../components/EquipmentPage';
import profile from '../fixtures/profile';

const props = {

}

let wrapper;

beforeEach(() => {
    wrapper = shallow(<EquipmentPage {...props} />);
});


test('should render equipment page with profile data', () => {
    expect(wrapper).toMatchSnapshot();
});
