import React from 'react'
import {shallow} from 'enzyme'

import { Feats } from '../../components/Feats'
import profile from '../fixtures/profile'
import { getFeats } from '../../utils/getFirebaseData'


test('should render Feats with profile data', async () => {
	const props = {
		featIds: profile.fields.feats,
		feats: await getFeats()
	}
	const wrapper = shallow(<Feats {...props} />)
	expect(wrapper).toMatchSnapshot()
})
