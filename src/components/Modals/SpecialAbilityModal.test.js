import React from 'react'
import { render } from '@testing-library/react'
import _ from 'lodash'

import SpecialAbilityModal from './SpecialAbilityModal'
import { apiData } from '../../test-utils/utils'


let props

beforeAll(async () => {
   const api = await apiData()
   props = {
      clickedAbility: _.values(api.specialAbilities)[0]
   }
})


test('should render SpecialAbilityModal', () => {
   const { baseElement } = render(<SpecialAbilityModal {...props} />)
   expect(baseElement).toMatchSnapshot()
})