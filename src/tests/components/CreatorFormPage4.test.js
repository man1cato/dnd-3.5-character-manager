import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'
import { apiData } from '../utils'
import CreatorFormPage4 from '../../components/CreatorFormPage4'


let api, wrapper, props

beforeAll(async () => {
   api = await apiData()
   props = {
      feats: _.omitBy(api.feats, (feat) => !!feat.prerequisites || _.includes(feat.types, 'Epic')),
      values: { feats: [] }
   }
   wrapper = shallow(<CreatorFormPage4 {...props} />)
})


test('should correctly render CreatorFormPage4', () => {
	expect(wrapper).toMatchSnapshot()
})