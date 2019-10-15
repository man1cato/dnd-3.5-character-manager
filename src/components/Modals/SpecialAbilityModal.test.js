import React from 'react'
import { shallow } from 'enzyme'

import SpecialAbilityModal from './SpecialAbilityModal'
import { apiData } from '../../tests/utils'


let props

beforeAll(async () => {
   const api = await apiData()
   const specialAbilities = api.specialAbilities
   props = {
      clickedAbility: Object.values(specialAbilities)[0]
   }
})


test('should render SpecialAbilityModal', () => {
   const wrapper = shallow(<SpecialAbilityModal {...props} />)
   expect(wrapper).toMatchSnapshot()
})