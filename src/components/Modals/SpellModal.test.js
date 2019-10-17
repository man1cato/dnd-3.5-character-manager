import React from 'react'
import { render } from '@testing-library/react'
import _ from 'lodash'

import SpellModal from './SpellModal'
import { apiData } from '../../tests/utils'


let props

beforeAll(async () => {
   const api = await apiData()
   props = {
      clickedSpell: _.values(api.spells)[0]
   }
})


test('should render SpellModal', () => {
   const { baseElement } = render(<SpellModal {...props} />)
   expect(baseElement).toMatchSnapshot()
})