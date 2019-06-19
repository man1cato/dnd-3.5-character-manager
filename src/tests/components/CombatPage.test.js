import React from 'react'
import { shallow } from 'enzyme'

import { CombatPage } from '../../components/CombatPage'
import { characterOne } from '../utils/seedDatabase'


test('should render combat page with profile data', () => {
    const wrapper = shallow(<CombatPage {...characterOne} />)
    expect(wrapper).toMatchSnapshot()
})