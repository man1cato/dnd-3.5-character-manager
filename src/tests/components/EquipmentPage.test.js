import React from 'react'
import {shallow} from 'enzyme'

import { EquipmentPage } from '../../components/EquipmentPage'
import profile from '../fixtures/profile'
import items from '../fixtures/items'

const props = {
    id: profile.id,
    money: profile.fields.money,
    equipment: profile.fields.equipment,
    items
}


test('should render equipment page with profile data', () => {
    const wrapper = shallow(<EquipmentPage {...props} />)
    expect(wrapper).toMatchSnapshot()
})
