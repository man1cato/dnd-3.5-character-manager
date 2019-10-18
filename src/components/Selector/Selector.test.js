import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import Selector from './Selector'
import { apiData } from '../../test-utils/utils'
import { apiObjectToArray } from '../../utils/utils'


const handleSelect = jest.fn()
let props
beforeAll(async () => {
   const api = await apiData()
   props = {
      items: apiObjectToArray(api.feats),
      Content: () => (
         <p>
            Description: Feat description
         </p>
      ),
      handleSelect
   }
})

test('should render Selector correctly with feats data', () => {
   const { container } = render(<Selector {...props} />)
   expect(container).toMatchSnapshot()
})