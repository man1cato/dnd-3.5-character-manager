import React from 'react'
import {shallow} from 'enzyme'
import fs from 'fs'

import SpecialAbilityModal from '../../components/SpecialAbilityModal'


let props

beforeAll(async () => {
   const api = await fs.promises.readFile('src/tests/fixtures/api.json')
   const specialAbilities = JSON.parse(api).specialAbilities
   props = {
      selected: Object.values(specialAbilities)[0]
   }
})


test('should render SpecialAbilityModal', () => {
   const wrapper = shallow(<SpecialAbilityModal {...props} />)
   expect(wrapper).toMatchSnapshot()
})