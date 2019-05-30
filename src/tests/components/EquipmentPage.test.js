import React from 'react'
import {shallow} from 'enzyme'

import { EquipmentPage } from '../../components/EquipmentPage'
import profile from '../fixtures/profile'
import { getItems } from '../../utils/getFirebaseData'


test('should render equipment page with profile data', async () => {
    const props = {
        id: profile.id,
        money: profile.fields.money,
        equipment: profile.fields.equipment,
        items: await getItems()
    }
    const wrapper = shallow(<EquipmentPage {...props} />)
    expect(wrapper).toMatchSnapshot()
})
