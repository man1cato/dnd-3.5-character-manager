import React from 'react'
import { mount } from 'enzyme'

import AttackBonuses from '../../components/AttackBonuses'
import { characterOne } from '../utils/seedDatabase'
import { apiData } from '../utils/utils'


const handleUpdate = jest.fn()
const profileAttackBonusMods = characterOne.attackBonusMods
let props, wrapper

beforeAll(async () => {
    const api = await apiData()
    props = {
        profileAttackBonusMods,
        abilities: characterOne.abilities,
        baseAttackBonuses: api.jobClasses[characterOne.jobClass].levels[characterOne.level].baseAttackBonuses,
        size: api.races[characterOne.race].size,
        handleUpdate
    }
})

beforeEach(() => {
    wrapper = mount(<AttackBonuses {...props} />)
})

test('should render attacks with default profile data', () => {
    expect(wrapper).toMatchSnapshot()
})

test('should trigger handleChange when input changes', () => {
    const value = 2
	wrapper.find('#melee').simulate('change', { target: { value } })
    expect(handleUpdate).toHaveBeenCalledWith({
        attackBonusMods: { ...profileAttackBonusMods, melee: value }
    })
})