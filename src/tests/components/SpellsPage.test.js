import React from 'react';
import { shallow } from 'enzyme';

import { SpellsPage } from '../../components/SpellsPage';
import profile from '../fixtures/profile';

const props = {
    ...profile
}

test('should render combat page with profile data', () => {
    const wrapper = shallow(<SpellsPage {...props} />);
    expect(wrapper).toMatchSnapshot();
});