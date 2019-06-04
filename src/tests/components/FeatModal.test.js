import React from 'react'
import {shallow} from 'enzyme'

import FeatModal from '../../components/FeatModal'
import { getFeats } from '../../utils/getFirebaseData'


const handleCloseModal = jest.fn()
let feats, props

beforeAll(async () => {
   feats = await getFeats()
   props = {
      selected: Object.values(feats)[0],
      handleCloseModal
   }
})

test('should render FeatModal', () => {
   const wrapper = shallow(<FeatModal {...props} />)
   expect(wrapper).toMatchSnapshot()
})