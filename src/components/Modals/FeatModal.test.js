import React from 'react'
import { shallow } from 'enzyme'

import FeatModal from './FeatModal'
import { apiData } from '../../tests/utils/utils'


let props

beforeAll(async () => {
   const api = await apiData()
   props = {
      clickedFeat: Object.values(api.feats)[0]
   }
})

test('should render FeatModal', () => {
   const wrapper = shallow(<FeatModal {...props} />)
   expect(wrapper).toMatchSnapshot()
})