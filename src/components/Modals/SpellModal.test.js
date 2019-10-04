import React from 'react'
import {shallow} from 'enzyme'

import SpellModal from './SpellModal'
import { apiData } from '../../tests/utils/utils'


let props

beforeAll(async () => {
   const api = await apiData()
   const spells = api.spells
   props = {
      clickedSpell: Object.values(spells)[0]
   }
})


test('should render SpellModal', () => {
   const wrapper = shallow(<SpellModal {...props} />)
   expect(wrapper).toMatchSnapshot()
})