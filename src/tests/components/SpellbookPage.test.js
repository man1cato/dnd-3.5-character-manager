import React from 'react';
import { shallow } from 'enzyme';

import { SpellbookPage } from '../../components/SpellbookPage';
import profile from '../fixtures/profile';

const props = {
    id: profile.id,
    spellbook: profile.fields.spellbook
}

test('should render combat page with profile data', () => {
    const wrapper = shallow(<SpellbookPage {...props} />);
    expect(wrapper).toMatchSnapshot();
});