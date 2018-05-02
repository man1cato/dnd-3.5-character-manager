import React from 'react';
import { shallow } from 'enzyme';

import {CombatPage} from '../../components/CombatPage';
import profile from '../fixtures/profile';

const props = {
    id: profile.id,
    hp: profile.fields.hp,
    speed: profile.fields.speed,
    ac: profile.fields.ac,
    initiative: profile.fields.abilities.dex.mod,
    ...profile.fields.saves,
    ...profile.fields.attacks
};

let wrapper;

beforeEach(() => {
    wrapper = shallow(<CombatPage {...props} />);
});

test('should render combat page with profile data', () => {
    expect(wrapper).toMatchSnapshot();
});