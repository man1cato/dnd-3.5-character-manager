import React from 'react'
import { shallow } from 'enzyme'

import SpecialAbilityModal from '../../components/SpecialAbilityModal'
import { apiData } from '../utils/utils'


let props

beforeAll(async () => {
   const api = await apiData()
   const specialAbilities = api.specialAbilities
   props = {
      selected: Object.values(specialAbilities)[0]
   }
})


test('should render SpecialAbilityModal', () => {
   const wrapper = shallow(<SpecialAbilityModal {...props} />)
   expect(wrapper).toMatchSnapshot()
})