import React from 'react'

import { CompanionPage } from './CompanionPage'
import profile from '../../test-utils/fixtures/profile'
import companion from '../../test-utils/fixtures/companion'
import { apiData, renderWithRedux } from '../../test-utils/utils'


const startEditProfile = jest.fn()
let props, state
beforeEach(async () => {
    const api = await apiData()
    props = {
        id: profile.id,
        companion,
        startEditProfile
    }
    state = {
        specialAbilities: api.specialAbilities,
        feats: api.feats,
        skills: api.skills
    }
})


test('should render CompanionPage with profile data', () => {
    const { container } = renderWithRedux(<CompanionPage {...props} />, state)
    expect(container.firstChild).toMatchSnapshot()
})