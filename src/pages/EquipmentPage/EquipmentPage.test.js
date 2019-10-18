import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import { EquipmentPage } from './EquipmentPage'
import { characterOne } from '../../test-utils/seedDatabase'
import { apiData } from '../../test-utils/utils'
import { calcTotalMoney } from '../../utils/utils'


const startEditProfile = jest.fn()
let props
beforeAll(async () => {
	const api = await apiData()
    props = {
        id: characterOne.id,
        money: characterOne.money,
        equipment: characterOne.equipment,
        equipped: characterOne.equipped,
        items: api.items,
        startEditProfile
    }
})

test('should render equipment page with profile data', () => {
    const { container } = render(<EquipmentPage {...props} />)
    expect(container.firstChild).toMatchSnapshot()
})

test('should update total money when money field changed', async () => {
    const { getByTestId  } = render(<EquipmentPage {...props} />)
    const gpInputNode = getByTestId('gp')
    let totalMoney = calcTotalMoney(props.money)
    const gp = 60
    
    expect(getByTestId('totalMoney').textContent).toEqual(`Total money: ${totalMoney} gp`)
    
    fireEvent.change(gpInputNode, { target: { value: gp }})
    
    totalMoney = calcTotalMoney({ ...props.money, gp })
    expect(getByTestId('totalMoney').textContent).toEqual(`Total money: ${totalMoney} gp`)
})

// test('should update item value and weight when qty changes', async () => {
//     const { getByTestId } = render(<EquipmentPage {...props} />)
//     const itemId = props.equipment[0].id
//     const item = props.items[itemId]
//     const value = item.value
//     const weight = item.weight
//     const qty = 2

//     expect(getByTestId(`${itemId}TotalValue`).textContent).toEqual(`${value}`)
//     expect(getByTestId(`${itemId}TotalWeight`).textContent).toEqual(`${weight}`)

//     fireEvent.change(getByTestId(itemId), { target: { value: qty } })

//     expect(getByTestId(`${itemId}TotalValue`).textContent).toEqual(`${value * qty} gp`)
//     expect(getByTestId(`${itemId}TotalWeight`).textContent).toEqual(`${weight * qty} lbs`)
// })