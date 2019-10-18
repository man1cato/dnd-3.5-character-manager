import React from 'react'
import _ from 'lodash'

import { apiData, renderWithRedux, FormikWrapper } from '../../../test-utils/utils'
import CreatorFormFeats from './CreatorFormFeats'


const setFieldValue = jest.fn()
let props

beforeAll(async () => {
   const api = await apiData()
   props = {
      values: { feats: [] },
      feats: _.omitBy(api.feats, (feat) => !!feat.prerequisites || _.includes(feat.types, 'Epic')),
      setFieldValue
   }
})


test('should correctly render CreatorFormFeats', () => {
   const { container } = renderWithRedux(<CreatorFormFeats {...props} />, null, FormikWrapper)
   expect(container.firstChild).toMatchSnapshot()
})