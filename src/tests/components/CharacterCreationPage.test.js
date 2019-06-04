import React from 'react'
import { shallow } from 'enzyme'
import fs from 'fs'

import { CharacterCreationPage } from '../../components/CharacterCreationPage'
import { apiObjectToArray } from '../../utils/utils'

let api, wrapper, props

beforeAll(async () => {
	api = await fs.promises.readFile('src/tests/fixtures/api.json')
	api = JSON.parse(api)
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
