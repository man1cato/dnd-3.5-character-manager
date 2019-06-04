import React from 'react'
import {shallow} from 'enzyme'

import ItemModal from '../../components/ItemModal'
import { getItems } from '../../utils/getFirebaseData'

const handleCloseModal = jest.fn()
let items, props

beforeAll(async () => {
   items = await getItems()
   props = {
      selected: Object.values(items)[0],
      handleCloseModal
   }
})


test('should render ItemModal', () => {
   const wrapper = shallow(<ItemModal {...props} />)
   expect(wrapper).toMatchSnapshot()
})