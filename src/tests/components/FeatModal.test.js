import React from 'react'
import { shallow } from 'enzyme'

import FeatModal from '../../components/FeatModal'
import { apiData } from '../utils/utils'


let props

beforeAll(async () => {
   const api = await apiData()
   props = {
      selected: Object.values(api.feats)[0]
   }
})

test('should render FeatModal', () => {
   const wrapper = shallow(<FeatModal {...props} />)
   expect(wrapper).toMatchSnapshot()
})