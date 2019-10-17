import React from 'react'
import { render } from '@testing-library/react'
import _ from 'lodash'

import FeatModal from './FeatModal'
import { apiData } from '../../tests/utils'


let props, feat

beforeAll(async () => {
   const api = await apiData()
   feat = _.values(api.feats)[0]
   props = {
      clickedFeat: feat
   }
})

test('should render FeatModal', () => {
   const { baseElement } = render(<FeatModal {...props} />)
   expect(baseElement).toMatchSnapshot()
})