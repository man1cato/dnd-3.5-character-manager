import React from 'react'
import {shallow} from 'enzyme'

import SpellModal from '../../components/SpellModal'
import { getSpells } from '../../utils/getFirebaseData'

const handleCloseModal = jest.fn()
let spells, props

beforeAll(async () => {
   spells = await getSpells()
   props = {
      selected: Object.values(spells)[0],
      handleCloseModal
   }
})


test('should render SpellModal', () => {
   const wrapper = shallow(<SpellModal {...props} />)
   expect(wrapper).toMatchSnapshot()
})