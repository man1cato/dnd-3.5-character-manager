import React from 'react'
import { shallow } from 'enzyme'

import { CharacterCreationPage } from '../../components/CharacterCreationPage'
import getApi from '../../utils/getFirebaseData'
import { apiObjectToArray } from '../../utils/utils'

let api, wrapper, props

beforeAll(async () => {
	api = await getApi()
	props = {
		races: apiObjectToArray(api.races),
		jobClasses: apiObjectToArray(api.jobClasses),
		feats: apiObjectToArray(api.feats)
	}
})

beforeEach(() => {
	wrapper = shallow(<CharacterCreationPage {...props} />)
})


test('should render CharacterCreationPage', () => {
	expect(wrapper).toMatchSnapshot()
})
