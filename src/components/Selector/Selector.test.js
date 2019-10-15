import React from 'react'
import { shallow } from 'enzyme'

import Selector from './Selector'
import { apiData } from '../../tests/utils'
import { apiObjectToArray } from '../../utils/utils'


let props, wrapper
beforeAll(async () => {
   const api = await apiData()
   const Content = ({ currentItemId }) => (
		<p>
         Description: {api.items[currentItemId].description}
		</p>
	)
   props = {
      items: apiObjectToArray(api.feats),
      Content,
      handleSelect: jest.fn() 
   }
   wrapper = shallow(<Selector {...props}/>)
})

test('should render Selector correctly with feats data', () => {
   expect(wrapper).toMatchSnapshot()
})