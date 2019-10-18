import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import { Weapons } from './Weapons'
import { apiData } from '../../test-utils/utils'
import profile from '../../test-utils/fixtures/profile'
import { apiObjectToArray } from '../../utils/utils'


let props
beforeAll(async () => {
    const api = await apiData()
    props = { 
        equippedWeapons: profile.equipped.weapons,
        weapons: apiObjectToArray(api.items).filter(item => item.category === "Weapon"),
        characterSize: 'Medium',
        attackBonuses: profile.attackBonuses
    }
})

test('should render weapons with profile data', async () => {
    const { container } = render(<Weapons {...props} />)
    expect(container).toMatchSnapshot()
})
