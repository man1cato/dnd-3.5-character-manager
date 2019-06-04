import React from 'react'
import {shallow} from 'enzyme'
import fs from 'fs'

import SpellModal from '../../components/SpellModal'


let spells, props

beforeAll(async () => {
   const api = await fs.promises.readFile('src/tests/fixtures/api.json')
   spells = JSON.parse(api).spells
   props = {
      selected: Object.values(spells)[0]
   }
})


test('should render SpellModal', () => {
   const wrapper = shallow(<SpellModal {...props} />)
   expect(wrapper).toMatchSnapshot()
})