import React from 'react'
import { shallow } from 'enzyme'

import { CompanionPage } from '../../components/CompanionPage'
import profile from '../fixtures/profile'


const startEditProfile = jest.fn()
let wrapper, props
beforeEach(() => {
    props = {
        id: profile.id,
        companion: profile.companion,
        startEditProfile
    }
    
    wrapper = shallow(<CompanionPage {...props} />)
})


test('should render CompanionPage with profile data', () => {
    expect(wrapper).toMatchSnapshot()
})