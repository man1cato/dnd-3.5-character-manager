import React from 'react'
import { fireEvent } from '@testing-library/react'

import { CombatPage } from './CombatPage'
import { characterOne } from '../../tests/seedDatabase'
import { apiData, renderWithRedux } from '../../tests/utils'
 

const startEditProfile = jest.fn()
let props, state

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
    state = {
        profile: characterOne,
        races: api.races,
        items: api.items
    }
})


test('should render combat page with profile data', () => {
    const { container } = renderWithRedux(<CombatPage {...props} />, state)
    expect(container).toMatchSnapshot()
})