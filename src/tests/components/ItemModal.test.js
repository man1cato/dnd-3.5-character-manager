import React from 'react'
import {shallow} from 'enzyme'
import fs from 'fs'

import ItemModal from '../../components/ItemModal'


let items, props

beforeAll(async () => {
   const api = await fs.promises.readFile('src/tests/fixtures/api.json')
   items = JSON.parse(api).items
   props = {
      selected: Object.values(items)[0]
   }
})


test('should render ItemModal', () => {
   const wrapper = shallow(<ItemModal {...props} />)
   expect(wrapper).toMatchSnapshot()
})