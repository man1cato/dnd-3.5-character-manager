import React from 'react'
import { mount } from 'enzyme'

import PhysicalStats from './PhysicalStats'
import { characterOne } from '../../tests/utils/seedDatabase'
import { apiData } from '../../tests/utils/utils'

const hp = characterOne.hp
const handleUpdate = jest.fn()
let props, wrapper

beforeAll(async () => {
    const api = await apiData()
    props = {
        hp,
        ac: characterOne.ac,
        initBase: 4,
        initMod: characterOne.initMod,
        speed: api.races[characterOne.race].speed,
        handleUpdate
    }
})

beforeEach(() => {
    wrapper = mount(<PhysicalStats {...props} />)
})

test('should render attacks with default profile data', () => {
    expect(wrapper).toMatchSnapshot()
})

test('should trigger handleUpdate when input changes', () => {
    const value = 2
	wrapper.find('#hpMod').simulate('change', { target: { value } })
    expect(handleUpdate).toHaveBeenCalledWith({
        hp: { ...hp, mod: value }
    })
})