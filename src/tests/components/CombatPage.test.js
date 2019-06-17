import React from 'react'
import { shallow } from 'enzyme'

import {CombatPage} from '../../components/CombatPage'
import profile from '../fixtures/profile'

const props = {
    id: profile.id,
    ...profile.fields
}

test('should render combat page with profile data', () => {
    const wrapper = shallow(<CombatPage {...props} />)
    expect(wrapper).toMatchSnapshot()
})