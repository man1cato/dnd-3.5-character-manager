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
    saves: profile.fields.saves,
    attacks: profile.fields.attacks,
    bab: profile.fields.bab,
    initiative: profile.fields.initiative
};

test('should render combat page with profile data', () => {
    const wrapper = shallow(<CombatPage {...props} />);
    expect(wrapper).toMatchSnapshot();
});