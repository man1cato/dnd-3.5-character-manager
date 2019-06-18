import React from 'react'
import { shallow } from 'enzyme'

import { EquipmentPage } from '../../components/EquipmentPage'
import profile from '../fixtures/profile'
import { apiData } from '../utils/utils'

let props
beforeAll(async () => {
	const api = await apiData()
    props = {
        id: profile.id,
        money: profile.money,
        equipment: profile.equipment,
        items: api.items
    }
})

test('should render equipment page with profile data', async () => {
    const wrapper = shallow(<EquipmentPage {...props} />)
    expect(wrapper).toMatchSnapshot()
})
