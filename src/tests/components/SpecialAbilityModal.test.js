import React from 'react'
import {shallow} from 'enzyme'

import SpecialAbilityModal from '../../components/SpecialAbilityModal'
import { getSpecialAbilities } from '../../utils/getFirebaseData'

const handleCloseModal = jest.fn()
let specialAbilities, props

beforeAll(async () => {
   specialAbilities = await getSpecialAbilities()
   props = {
      selected: Object.values(specialAbilities)[0],
      handleCloseModal
   }
})


test('should render SpecialAbilityModal', () => {
   const wrapper = shallow(<SpecialAbilityModal {...props} />)
   expect(wrapper).toMatchSnapshot()
})