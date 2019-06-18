import React from 'react'
import { shallow } from 'enzyme'

import { CombatPage } from '../../components/CombatPage'
import profile from '../fixtures/profile'


test('should render combat page with profile data', () => {
    const wrapper = shallow(<CombatPage {...profile} />)
    expect(wrapper).toMatchSnapshot()
})