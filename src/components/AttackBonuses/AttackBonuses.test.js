import React from 'react'
import { render, fireEvent, getNodeText } from '@testing-library/react'

import AttackBonuses from './AttackBonuses'


const handleUpdate = jest.fn()
let props

beforeAll(() => {
    props = {
        attackBonuses: {
            melee: {
                base: [4, 2],
                mod: 0,
                total: [4, 2]
            },
            ranged: {
                base: [6],
                mod: 0,
                total: [6]
            },
            grapple: {
                base: [4],
                mod: 1,
                total: [5]
            }
        },
        handleUpdate
    }
})


test('should render attacks with default profile data', () => {
    const { container } = render(<AttackBonuses {...props} />)
    expect(container.firstChild).toMatchSnapshot()
})

// test('should update total when input changes', async () => {
//     //REQUIRES A STORE
//     const { getByTestId, findByText } = render(<AttackBonuses {...props} />)

//     fireEvent.change(getByTestId('meleeMod'), { target: { value: 2 } })
    
//     const meleeTotalNode = await findByText('6 / 4')
//     expect(meleeTotalNode).toBeDefined()
// })