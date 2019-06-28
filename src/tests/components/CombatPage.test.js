import React from 'react'
import { shallow } from 'enzyme'

import { CombatPage } from '../../components/CombatPage'
import { characterOne } from '../utils/seedDatabase'
import { apiData } from '../utils/utils'
 

const startEditProfile = jest.fn()
let props, wrapper

beforeAll(async () => {
    const api = await apiData()
    const jobClasses = api.jobClasses
    props = {
        profile: characterOne,
        races: api.races,
        jobClasses,
        spells: api.spells,
        startEditProfile
    }
})

beforeEach(() => {
    wrapper = shallow(<CombatPage {...props} />)
})


test('should render combat page with profile data', () => {
    expect(wrapper).toMatchSnapshot()
})