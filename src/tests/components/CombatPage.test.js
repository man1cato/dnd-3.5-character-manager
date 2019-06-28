import React from 'react'
import { shallow } from 'enzyme'

import { CombatPage } from '../../components/CombatPage'
import { characterOne } from '../utils/seedDatabase'
import { apiData } from '../utils/utils'
 

let props, wrapper

beforeAll(async () => {
    const api = await apiData()
    const jobClasses = api.jobClasses
    props = {
        ...characterOne,
        jobClassLevel: jobClasses[characterOne.jobClass].levels[characterOne.level],
        races: api.races,
        jobClasses,
        spells: api.spells
    }
})

beforeEach(() => {
    wrapper = shallow(<CombatPage {...props} />)
})


test('should render combat page with profile data', () => {
    expect(wrapper).toMatchSnapshot()
})