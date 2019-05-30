import React from 'react'
import {shallow} from 'enzyme'

import FeatModal from '../../components/FeatModal'
import profile from '../fixtures/profile'
import { getFeats } from '../../utils/getFirebaseData'

const handleCloseModal = jest.fn()

const props = {
   selected: {
      name: "Manyshot",
      description: "Shoot two or more arrows simultaneously",
      types: ["General", "Fighter Bonus"]
   },
   handleCloseModal
}

test('should render FeatModal', () => {
   const wrapper = shallow(<FeatModal {...props} />)
   expect(wrapper).toMatchSnapshot()
})