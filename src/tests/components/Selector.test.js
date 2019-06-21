import React from 'react'
import { shallow } from 'enzyme'
import Selector from '../../components/Selector'
import FeatModal from '../../components/FeatModal'
import { apiData } from '../utils/utils'


let props, wrapper
beforeAll(async () => {
   const api = await apiData()
   const Content = ({selectedObj}) => (
		<p>
			Description: {selectedObj.description}
		</p>
	)
   props = {
      values: { feats: [] },
      apiObject: api.feats, 
      fieldName: 'feats',
      setFieldValue: jest.fn(),
      Content,
      Modal: FeatModal
   }
   wrapper = shallow(<Selector {...props}/>)
})

test('should render Selector correctly with feats data', () => {
   expect(wrapper).toMatchSnapshot()
})