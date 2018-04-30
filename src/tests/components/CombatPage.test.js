import React from 'react';
import { shallow } from 'enzyme';

import {CombatPage} from '../../components/CombatPage';
import profile from '../fixtures/profile';

const profileData = {
    id: profile.id,
    ...profile.fields
};

let wrapper;

beforeEach(() => {
    wrapper = shallow(
        <CombatPage
            {...profileData}
        />
    );
});

test('should render combat page with profile data', () => {
    expect(wrapper).toMatchSnapshot();
});