import React from 'react'
import {shallow} from 'enzyme'
import fs from 'fs'

import { EquipmentPage } from '../../components/EquipmentPage'
import profile from '../fixtures/profile'

let api
beforeAll(async () => {
	api = await fs.promises.readFile('src/tests/fixtures/api.json')
    api = JSON.parse(api)
})

test('should render equipment page with profile data', async () => {
    const props = {
        id: profile.id,
        money: profile.fields.money,
        equipment: profile.fields.equipment,
        items: api.items
    }
    const wrapper = shallow(<EquipmentPage {...props} />)
    expect(wrapper).toMatchSnapshot()
})
