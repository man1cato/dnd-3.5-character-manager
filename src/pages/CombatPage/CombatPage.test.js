import React from 'react'
import { shallow } from 'enzyme'
import { render, fireEvent } from '@testing-library/react'

import { CombatPage } from './CombatPage'
import { characterOne } from '../../tests/utils/seedDatabase'
import { apiData } from '../../tests/utils/utils'
 

const startEditProfile = jest.fn()
let props

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


test('should render combat page with profile data', () => {
    const wrapper = shallow(<CombatPage {...props} />)
    expect(wrapper).toMatchSnapshot()
})