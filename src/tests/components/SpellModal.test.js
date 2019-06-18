import React from 'react'
import {shallow} from 'enzyme'

import SpellModal from '../../components/SpellModal'
import { apiData } from '../utils'


let props

beforeAll(async () => {
   const api = await apiData()
   const spells = api.spells
   props = {
      selected: Object.values(spells)[0]
   }
})


test('should render SpellModal', () => {
   const wrapper = shallow(<SpellModal {...props} />)
   expect(wrapper).toMatchSnapshot()
})