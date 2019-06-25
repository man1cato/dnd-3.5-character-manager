import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'
import { apiData } from '../utils/utils'
import CreatorFormFeats from '../../components/CreatorFormFeats'


let api, wrapper, props

beforeAll(async () => {
   api = await apiData()
   props = {
      feats: _.omitBy(api.feats, (feat) => !!feat.prerequisites || _.includes(feat.types, 'Epic')),
      values: { feats: [] }
   }
   wrapper = shallow(<CreatorFormFeats {...props} />)
})


test('should correctly render CreatorFormFeats', () => {
	expect(wrapper).toMatchSnapshot()
})