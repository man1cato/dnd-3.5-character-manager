import React from 'react';
import { shallow } from 'enzyme';

import { CompanionPage } from '../../components/CompanionPage';
import profile from '../fixtures/profile';

const props = {
    id: profile.id,
    companion: profile.companion
}

test('should render CompanionPage with profile data', () => {
    const wrapper = shallow(<CompanionPage {...props} />);
    expect(wrapper).toMatchSnapshot();
});