import React from 'react'
import {shallow} from 'enzyme'
import fs from 'fs'

import FeatModal from '../../components/FeatModal'


let feats, props

beforeAll(async () => {
   const api = await fs.promises.readFile('src/tests/fixtures/api.json')
   feats = JSON.parse(api).feats
   props = {
      selected: Object.values(feats)[0]
   }
})

test('should render FeatModal', () => {
   const wrapper = shallow(<FeatModal {...props} />)
   expect(wrapper).toMatchSnapshot()
})