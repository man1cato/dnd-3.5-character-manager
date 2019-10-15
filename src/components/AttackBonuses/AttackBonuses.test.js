import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import AttackBonuses from './AttackBonuses'
import { characterOne } from '../../tests/seedDatabase'
import { apiData } from '../../tests/utils'


const handleUpdate = jest.fn()
const attackBonusMods = characterOne.attackBonusMods
let props

beforeAll(async () => {
    const api = await apiData()
    props = {
        attackBonusMods,
        abilities: characterOne.abilities,
        baseAttackBonuses: api.jobClasses[characterOne.jobClass].levels[characterOne.level].baseAttackBonuses,
        size: api.races[characterOne.race].size,
        handleUpdate
    }
})


test('should render attacks with default profile data', () => {
    const { container } = render(<AttackBonuses {...props} />)
    expect(container.firstChild).toMatchSnapshot()
})

test('should trigger handleUpdate when input changes', () => {
    const { getByTestId } = render(<AttackBonuses {...props} />)
    const value = 2
    const meleeInputNode = getByTestId('melee')
    fireEvent.change(meleeInputNode, { target: { value } })

    expect(meleeInputNode.value).toBe(`${value}`)
})