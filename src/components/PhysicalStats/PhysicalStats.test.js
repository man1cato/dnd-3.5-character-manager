import React from 'react'
import { render, fireEvent, getNodeText } from '@testing-library/react'

import PhysicalStats from './PhysicalStats'
import { characterOne } from '../../tests/seedDatabase'
import { apiData } from '../../tests/utils'


const handleUpdate = jest.fn()
let props

beforeAll(() => {
    props = {
        hp: {
            base: 32,
            mod: 0,
            damage: 0
        },
        ac: {
            base: 14,
            flat: 10,
            touch: 14
        },
        initBase: 4,
        initMod:  0,
        speed: 30,
        handleUpdate
    }
})


test('should render attacks with default profile data', () => {
    const { container } = render(<PhysicalStats {...props} />)
    expect(container.firstChild).toMatchSnapshot()
})

test('should change current hp when input changes', () => {
    const value = 2
    const { getByTestId } = render(<PhysicalStats {...props} />)
    const hpModNode = getByTestId('hpMod')
    const hpTotalNode = getByTestId('hpTotal')

    fireEvent.change(hpModNode, { target: { value } })
    expect(getNodeText(hpTotalNode)).toBe(`${props.hp.base + value}`)
})