import React from 'react'
import { shallow } from 'enzyme'

import PreparedSpells from '../../components/PreparedSpells'
import profile from '../fixtures/profile'


const spellbook = profile.spellbook

test('should render PreparedSpells with profile data', () => {
    const wrapper = shallow(<PreparedSpells spellbook={spellbook} />)
    expect(wrapper).toMatchSnapshot()
})